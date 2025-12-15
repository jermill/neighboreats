import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

/**
 * API Contract: Stripe Webhook Handler
 * 
 * POST /api/payments/webhook
 * - Auth: Stripe signature verification
 * - Body: Stripe webhook event
 * - Response: { received: true }
 * 
 * Handles events:
 * - payment_intent.succeeded
 * - payment_intent.payment_failed
 * - account.updated (for Connect accounts)
 * - transfer.paid (for chef/driver payouts)
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')

    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
      console.warn('Stripe webhook not configured, accepting mock events')
      const event = JSON.parse(body)
      const supabase = createServerClient()
      await processWebhookEvent(event, supabase)
      return NextResponse.json({ received: true, mock: true })
    }

    if (!signature) {
      return NextResponse.json(
        { error: 'No signature provided' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    let event
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    await processWebhookEvent(event, supabase)

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

async function processWebhookEvent(event: any, supabase: any) {

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      const { orderId, customerId, chefId, driverId, platformFee, chefAmount } = paymentIntent.metadata || {}

      if (orderId) {
        // Update order status
        await supabase
          .from('orders')
          .update({ 
            status: 'accepted',
            stripe_payment_id: paymentIntent.id
          })
          .eq('id', orderId)

        // Record payment with commission split
        await supabase
          .from('payments')
          .insert({
            order_id: orderId,
            payment_type: 'ORDER',
            total_amount: paymentIntent.amount / 100,
            chef_amount: chefAmount ? parseFloat(chefAmount) / 100 : 0,
            platform_commission: platformFee ? parseFloat(platformFee) / 100 : 0,
            stripe_transaction_id: paymentIntent.id,
            status: 'COMPLETED',
            completed_at: new Date().toISOString()
          })
      }
      break

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object
      const failedOrderId = failedIntent.metadata?.orderId

      if (failedOrderId) {
        await supabase
          .from('orders')
          .update({ 
            status: 'CANCELLED'
          })
          .eq('id', failedOrderId)

        // Record failed payment
        await supabase
          .from('payments')
          .insert({
            order_id: failedOrderId,
            payment_type: 'ORDER',
            total_amount: failedIntent.amount / 100,
            chef_amount: 0,
            platform_commission: 0,
            stripe_transaction_id: failedIntent.id,
            status: 'FAILED'
          })
      }
      break

    case 'account.updated':
      // Handle Stripe Connect account updates (verification status, etc.)
      const account = event.data.object
      const payoutsEnabled = account.payouts_enabled
      const chargesEnabled = account.charges_enabled
      
      // Update chef or driver account status
      // Try both tables since we don't know which type of account this is
      await supabase
        .from('chefs')
        .update({ 
          stripe_verified: payoutsEnabled && chargesEnabled,
          account_status: payoutsEnabled && chargesEnabled ? 'ACTIVE' : 'PENDING'
        })
        .eq('stripe_account_id', account.id)

      await supabase
        .from('drivers')
        .update({ 
          stripe_verified: payoutsEnabled && chargesEnabled,
          account_status: payoutsEnabled && chargesEnabled ? 'ACTIVE' : 'PENDING'
        })
        .eq('stripe_account_id', account.id)
      
      console.log('Stripe account updated:', account.id, { payoutsEnabled, chargesEnabled })
      break

    case 'transfer.paid':
      // Handle successful payouts to chefs/drivers
      const transfer = event.data.object
      console.log('Transfer paid:', transfer.id, 'amount:', transfer.amount / 100)
      break

    default:
      console.log('Unhandled webhook event:', event.type)
  }
}
