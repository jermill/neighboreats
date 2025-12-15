import { NextRequest, NextResponse } from 'next/server'
import { requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Create Payment Intent
 * 
 * POST /api/payments/create-payment-intent
 * - Auth: Required (customer)
 * - Body: {
 *     amount: number (in cents)
 *     orderId: string
 *     chefId: string
 *     driverId?: string
 *   }
 * - Response: {
 *     clientSecret: string
 *     paymentIntentId: string
 *   }
 */

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['customer'])
    const body = await request.json()
    const { amount, orderId, chefId, driverId } = body

    if (!amount || !orderId || !chefId) {
      return NextResponse.json(
        { error: 'Missing required fields: amount, orderId, chefId' },
        { status: 400 }
      )
    }

    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('Stripe not configured, returning mock payment intent')
      return NextResponse.json({
        clientSecret: 'mock_client_secret_' + orderId,
        paymentIntentId: 'mock_pi_' + orderId,
        mock: true,
        message: 'Configure STRIPE_SECRET_KEY in .env.local to enable real payments'
      })
    }

    // Initialize Stripe
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    const { createServerClient } = require('@/lib/supabase-server')
    const supabase = createServerClient()
    
    // Calculate platform commission (15%)
    const platformFee = Math.round(amount * 0.15)
    const chefAmount = amount - platformFee

    // Get chef's Stripe Connect account ID
    const { data: chefData } = await supabase
      .from('chefs')
      .select('stripe_account_id')
      .eq('id', chefId)
      .single()

    if (!chefData?.stripe_account_id) {
      return NextResponse.json(
        { error: 'Chef has not set up payment account. Please contact support.' },
        { status: 400 }
      )
    }

    // Get or create customer's Stripe customer ID
    const { data: userData } = await supabase
      .from('users')
      .select('stripe_customer_id, email')
      .eq('id', user.id)
      .single()

    let customerId = userData?.stripe_customer_id

    if (!customerId) {
      // Create Stripe customer
      const customer = await stripe.customers.create({
        email: userData?.email || user.email,
        metadata: {
          userId: user.id
        }
      })
      customerId = customer.id

      // Save to database
      await supabase
        .from('users')
        .update({ stripe_customer_id: customerId })
        .eq('id', user.id)
    }

    // Create payment intent with Stripe Connect
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
      application_fee_amount: platformFee,
      transfer_data: {
        destination: chefData.stripe_account_id
      },
      metadata: {
        orderId,
        customerId: user.id,
        chefId,
        driverId: driverId || '',
        platformFee: platformFee.toString(),
        chefAmount: chefAmount.toString()
      }
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })

  } catch (error: any) {
    console.error('Create payment intent API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
