import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

/**
 * API Contract: Public Chef Details
 * 
 * GET /api/chefs/[id]
 * - Auth: Not required (public endpoint)
 * - Response: Chef (with menu items and reviews)
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    // Fetch chef with user data
    const { data: chef, error: chefError } = await supabase
      .from('chefs')
      .select(`
        *,
        users!inner (
          id,
          name,
          email,
          phone,
          photo_url
        )
      `)
      .eq('id', id)
      .eq('account_status', 'ACTIVE')
      .eq('background_check_status', 'APPROVED')
      .single()

    if (chefError || !chef) {
      return NextResponse.json(
        { error: 'Chef not found' },
        { status: 404 }
      )
    }

    // Fetch menu items
    const { data: menuItems } = await supabase
      .from('menu_items')
      .select('*')
      .eq('chef_id', id)
      .eq('is_available', true)

    // Transform chef data
    const transformedChef = {
      id: chef.id,
      name: chef.users.name,
      email: chef.users.email,
      phone: chef.users.phone,
      role: 'chef',
      photoUrl: chef.users.photo_url,
      bio: chef.bio,
      rating: chef.rating || 5.0,
      totalReviews: 0, // TODO: Calculate from reviews table when implemented
      categories: chef.categories || [],
      kitchenAddress: chef.kitchen_address,
      latitude: chef.latitude,
      longitude: chef.longitude,
      isLive: chef.is_live || false,
      deliveryRadius: chef.delivery_radius_miles || 5,
      activeSubscribers: 0 // TODO: Calculate from subscriptions table
    }

    // Transform menu items
    const transformedMenuItems = (menuItems || []).map((item: any) => ({
      id: item.id,
      chefId: item.chef_id,
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      dietaryTags: item.dietary_tags || [],
      photoUrl: item.photo_url,
      isAvailable: item.is_available
    }))

    return NextResponse.json({
      chef: transformedChef,
      menuItems: transformedMenuItems,
      reviews: [] // TODO: Fetch reviews when implemented
    })
  } catch (error: any) {
    console.error('Get chef details API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
