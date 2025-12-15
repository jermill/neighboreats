import { NextRequest, NextResponse } from 'next/server'
import { requireRole, createServerClient } from '@/lib/supabase-server'

/**
 * API Contract: Stripe Connect Account Management
 * 
 * POST /api/payments/connect-account
 * - Auth: Required (chef, driver)
 * - Body: {
 *     returnUrl: string
 *     refreshUrl: string
 *   }
 * - Response: {
 *     accountLink: string (URL to Stripe Connect onboarding)
 *   }
 * 
 * GET /api/payments/connect-account
 * - Auth: Required (chef, driver)
 * - Response: {
 *     accountId: string
 *     verified: boolean
 *     payoutsEnabled: boolean
 *   }
 */

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['chef', 'driver'])
    const body = await request.json()
    const { returnUrl, refreshUrl } = body

    if (!returnUrl || !refreshUrl) {
      return NextResponse.json(
        { error: 'Missing required fields: returnUrl, refreshUrl' },
        { status: 400 }
      )
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.warn('Stripe not configured, returning mock Connect link')
      return NextResponse.json({
        accountLink: `https://connect.stripe.com/express/oauth/v2/authorize?client_id=MOCK_CLIENT_ID&state=${user.id}`,
        mock: true,
        message: 'Configure STRIPE_SECRET_KEY and STRIPE_CONNECT_CLIENT_ID in .env.local'
      })
    }

    // In production:
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    
    // Check if user already has a Connect account
    const supabase = createServerClient()
    const table = user.role === 'chef' ? 'chefs' : 'drivers'
    
    const { data: profileData } = await supabase
      .from(table)
      .select('stripe_account_id')
      .eq('id', user.id)
      .single()

    let accountId = profileData?.stripe_account_id

    // Create or retrieve Connect account
    // if (!accountId) {
    //   const account = await stripe.accounts.create({
    //     type: 'express',
    //     email: user.email,
    //     capabilities: {
    //       card_payments: { requested: true },
    //       transfers: { requested: true }
    //     }
    //   })
    //   accountId = account.id
    //   
    //   await supabase
    //     .from(table)
    //     .update({ stripe_account_id: accountId })
    //     .eq('id', user.id)
    // }

    // Create account link
    // const accountLink = await stripe.accountLinks.create({
    //   account: accountId,
    //   refresh_url: refreshUrl,
    //   return_url: returnUrl,
    //   type: 'account_onboarding'
    // })

    return NextResponse.json({
      accountLink: `https://connect.stripe.com/express/oauth/v2/authorize?client_id=MOCK&state=${user.id}`,
      mock: true,
      message: 'Configure Stripe to enable real Connect onboarding'
    })

  } catch (error: any) {
    console.error('Stripe Connect API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['chef', 'driver'])
    const supabase = createServerClient()
    const table = user.role === 'chef' ? 'chefs' : 'drivers'

    const { data: profileData } = await supabase
      .from(table)
      .select('stripe_account_id, stripe_verified')
      .eq('id', user.id)
      .single()

    if (!profileData?.stripe_account_id) {
      return NextResponse.json({
        accountId: null,
        verified: false,
        payoutsEnabled: false
      })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        accountId: profileData.stripe_account_id,
        verified: profileData.stripe_verified || false,
        payoutsEnabled: profileData.stripe_verified || false,
        mock: true
      })
    }

    // In production, fetch actual account status
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
    // const account = await stripe.accounts.retrieve(profileData.stripe_account_id)

    return NextResponse.json({
      accountId: profileData.stripe_account_id,
      verified: profileData.stripe_verified || false,
      payoutsEnabled: profileData.stripe_verified || false,
      mock: true
    })

  } catch (error: any) {
    console.error('Get Stripe Connect account API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
