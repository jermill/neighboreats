import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Subscriptions
 * 
 * GET /api/subscriptions
 * - Auth: Required (customer, chef)
 * - Query params:
 *   - customerId: string (filter by customer)
 *   - chefId: string (filter by chef)
 *   - status: 'active' | 'paused' | 'cancelled'
 * - Response: Subscription[]
 * 
 * POST /api/subscriptions
 * - Auth: Required (customer)
 * - Body: {
 *     tierId: string
 *     chefId: string
 *   }
 * - Response: Subscription
 */

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['customer', 'chef'])
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('subscriptions')
      .select(`
        *,
        chef:chefs(*),
        customer:users!subscriptions_customer_id_fkey(*),
        tier:subscription_tiers(*)
      `)

    // Filter by user role
    if (user.role === 'customer') {
      query = query.eq('customer_id', user.id)
    } else if (user.role === 'chef') {
      // Get subscriptions for chef's tiers
      const { data: tiers } = await supabase
        .from('subscription_tiers')
        .select('id')
        .eq('chef_id', user.id)
      
      if (tiers && tiers.length > 0) {
        const tierIds = tiers.map(t => t.id)
        query = query.in('tier_id', tierIds)
      } else {
        return NextResponse.json({ subscriptions: [] })
      }
    }

    if (status) {
      query = query.eq('status', status)
    }

    query = query.order('created_at', { ascending: false })

    const { data: subscriptions, error } = await query

    if (error) {
      console.error('Subscriptions fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscriptions', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscriptions: subscriptions || [] })
  } catch (error: any) {
    console.error('Subscriptions API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['customer'])
    const supabase = createServerClient()
    const body = await request.json()

    const { tierId, chefId } = body

    if (!tierId || !chefId) {
      return NextResponse.json(
        { error: 'Missing required fields: tierId, chefId' },
        { status: 400 }
      )
    }

    // Verify tier exists and belongs to chef
    const { data: tier, error: tierError } = await supabase
      .from('subscription_tiers')
      .select('*')
      .eq('id', tierId)
      .eq('chef_id', chefId)
      .single()

    if (tierError || !tier) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      )
    }

    // Check if customer already has active subscription with this chef
    const { data: existing } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('customer_id', user.id)
      .eq('tier_id', tierId)
      .eq('status', 'active')
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'You already have an active subscription with this chef' },
        { status: 400 }
      )
    }

    // Create subscription
    const nextBillingDate = new Date()
    nextBillingDate.setMonth(nextBillingDate.getMonth() + 1)

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert({
        customer_id: user.id,
        tier_id: tierId,
        status: 'active',
        next_billing_date: nextBillingDate.toISOString()
      })
      .select(`
        *,
        chef:subscription_tiers!inner(chef_id, chefs(*)),
        tier:subscription_tiers(*)
      `)
      .single()

    if (error || !subscription) {
      console.error('Subscription creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create subscription', details: error?.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscription }, { status: 201 })
  } catch (error: any) {
    console.error('Create subscription API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
