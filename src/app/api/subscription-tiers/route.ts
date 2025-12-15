import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Subscription Tiers
 * 
 * GET /api/subscription-tiers
 * - Auth: Optional
 * - Query params:
 *   - chefId: string (filter by chef)
 * - Response: SubscriptionTier[]
 * 
 * POST /api/subscription-tiers
 * - Auth: Required (chef)
 * - Body: {
 *     name: string
 *     mealsPerWeek: number
 *     monthlyPrice: number
 *     description: string
 *   }
 * - Response: SubscriptionTier
 */

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const chefId = searchParams.get('chefId')

    let query = supabase
      .from('subscription_tiers')
      .select('*')

    if (chefId) {
      query = query.eq('chef_id', chefId)
    }

    query = query.order('monthly_price', { ascending: true })

    const { data: tiers, error } = await query

    if (error) {
      console.error('Subscription tiers fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscription tiers', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ tiers: tiers || [] })
  } catch (error: any) {
    console.error('Subscription tiers API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireRole(['chef'])
    const supabase = createServerClient()
    const body = await request.json()

    const { name, mealsPerWeek, monthlyPrice, description } = body

    if (!name || !mealsPerWeek || !monthlyPrice) {
      return NextResponse.json(
        { error: 'Missing required fields: name, mealsPerWeek, monthlyPrice' },
        { status: 400 }
      )
    }

    const { data: tier, error } = await supabase
      .from('subscription_tiers')
      .insert({
        chef_id: user.id,
        name,
        meals_per_week: mealsPerWeek,
        monthly_price: monthlyPrice,
        description
      })
      .select()
      .single()

    if (error || !tier) {
      console.error('Subscription tier creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create subscription tier', details: error?.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ tier }, { status: 201 })
  } catch (error: any) {
    console.error('Create subscription tier API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
