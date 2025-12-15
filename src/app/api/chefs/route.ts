import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

/**
 * API Contract: Public Chef Listing
 * 
 * GET /api/chefs
 * - Auth: Not required (public endpoint)
 * - Query params:
 *   - latitude?: number
 *   - longitude?: number
 *   - radius?: number (in miles)
 * - Response: Chef[] (approved chefs only)
 */

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    
    const latitude = searchParams.get('latitude')
    const longitude = searchParams.get('longitude')
    const radius = searchParams.get('radius')

    // Fetch approved chefs with their user data
    const { data: chefs, error } = await supabase
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
      .eq('account_status', 'ACTIVE')
      .eq('background_check_status', 'APPROVED')

    if (error) {
      console.error('Error fetching chefs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch chefs', details: error.message },
        { status: 500 }
      )
    }

    // Transform data to match Chef interface
    const transformedChefs = (chefs || []).map((chef: any) => ({
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
    }))

    // Filter by distance if coordinates and radius provided
    if (latitude && longitude && radius) {
      const userLat = parseFloat(latitude)
      const userLon = parseFloat(longitude)
      const searchRadius = parseFloat(radius)

      const filteredChefs = transformedChefs
        .filter((chef: any) => {
          if (!chef.latitude || !chef.longitude) return false
          
          const distance = calculateDistance(
            userLat,
            userLon,
            chef.latitude,
            chef.longitude
          )
          
          return distance <= searchRadius
        })

      return NextResponse.json({ chefs: filteredChefs })
    }

    return NextResponse.json({ chefs: transformedChefs })
  } catch (error: any) {
    console.error('Get chefs API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
