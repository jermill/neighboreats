import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole, getCurrentUser } from '@/lib/supabase-server'

/**
 * API Contract: Menu Items
 * 
 * GET /api/menu
 * - Auth: Optional (public can view, auth shows personalized)
 * - Query params:
 *   - chefId: string (filter by chef)
 *   - category: string (filter by category)
 *   - available: boolean (filter by availability)
 * - Response: MenuItem[]
 * 
 * POST /api/menu
 * - Auth: Required (chef)
 * - Body: {
 *     name: string
 *     description: string
 *     price: number
 *     category: string
 *     dietaryTags: string[]
 *     photoUrl: string
 *     isAvailable: boolean
 *   }
 * - Response: MenuItem
 */

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const chefId = searchParams.get('chefId')
    const category = searchParams.get('category')
    const available = searchParams.get('available')

    let query = supabase
      .from('menu_items')
      .select(`
        *,
        chef:chefs(*)
      `)

    if (chefId) {
      query = query.eq('chef_id', chefId)
    }

    if (category) {
      query = query.eq('category', category)
    }

    if (available !== null) {
      query = query.eq('is_available', available === 'true')
    }

    query = query.order('created_at', { ascending: false })

    const { data: menuItems, error } = await query

    if (error) {
      console.error('Menu items fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch menu items', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ menuItems: menuItems || [] })
  } catch (error: any) {
    console.error('Menu API error:', error)
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

    const { name, description, price, category, dietaryTags, photoUrl, isAvailable } = body

    // Validate required fields
    if (!name || !price || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: name, price, category' },
        { status: 400 }
      )
    }

    // Create menu item
    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .insert({
        chef_id: user.id,
        name,
        description,
        price,
        category,
        dietary_tags: dietaryTags || [],
        photo_url: photoUrl,
        is_available: isAvailable !== undefined ? isAvailable : true
      })
      .select()
      .single()

    if (error || !menuItem) {
      console.error('Menu item creation error:', error)
      return NextResponse.json(
        { error: 'Failed to create menu item', details: error?.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ menuItem }, { status: 201 })
  } catch (error: any) {
    console.error('Create menu item API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
