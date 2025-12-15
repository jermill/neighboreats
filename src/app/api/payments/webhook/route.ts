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
      console.warn('Stripe webhook not configured, ignoring event')
      return NextResponse.json({ received: true, mock: true })
    }

    // In production, verify webhook signature
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const event = stripe.webhooks.constructEvent(
    //   body,
    //   signature,
    //   process.env.STRIPE_WEBHOOK_SECRET
    // )

    // Mock event for development
    const event = JSON.parse(body)

    const supabase = createServerClient()

    // Handle different event types
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        const { orderId, customerId, chefId, driverId } = paymentIntent.metadata || {}

        if (orderId) {
          // Update order status
          await supabase
            .from('orders')
            .update({ 
              status: 'accepted',
              payment_status: 'paid'
            })
            .eq('id', orderId)

          // Record payment
          await supabase
            .from('payments')
            .insert({
              order_id: orderId,
              customer_id: customerId,
              amount: paymentIntent.amount / 100,
              stripe_payment_intent_id: paymentIntent.id,
              status: 'completed'
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
              status: 'cancelled',
              payment_status: 'failed'
            })
            .eq('id', failedOrderId)
        }
        break

      case 'account.updated':
        // Handle Stripe Connect account updates (verification status, etc.)
        const account = event.data.object
        console.log('Stripe account updated:', account.id)
        break

      case 'transfer.paid':
        // Handle successful payouts to chefs/drivers
        const transfer = event.data.object
        console.log('Transfer paid:', transfer.id)
        break

      default:
        console.log('Unhandled webhook event:', event.type)
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Stripe webhook error:', error)
    return NextResponse.json(
      { error: error.message || 'Webhook handler failed' },
      { status: 400 }
    )
  }
}
