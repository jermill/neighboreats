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
        mock: true
      })
    }

    // In production, initialize Stripe here
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    // Calculate platform commission (15%)
    const platformFee = Math.round(amount * 0.15)
    const chefAmount = amount - platformFee

    // Create payment intent with Stripe Connect
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount,
    //   currency: 'usd',
    //   customer: user.stripe_customer_id,
    //   transfer_data: {
    //     destination: chefStripeAccountId,
    //     amount: chefAmount
    //   },
    //   metadata: {
    //     orderId,
    //     customerId: user.id,
    //     chefId,
    //     driverId: driverId || ''
    //   }
    // })

    // For now, return mock data
    return NextResponse.json({
      clientSecret: 'mock_client_secret_' + orderId,
      paymentIntentId: 'mock_pi_' + orderId,
      mock: true,
      message: 'Configure STRIPE_SECRET_KEY in .env.local to enable real payments'
    })

  } catch (error: any) {
    console.error('Create payment intent API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
