import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole, getCurrentUser } from '@/lib/supabase-server'

/**
 * API Contract: User Profiles
 * 
 * GET /api/profiles
 * - Auth: Required
 * - Response: User (with role-specific data)
 * 
 * PATCH /api/profiles
 * - Auth: Required
 * - Body: Partial<User> + role-specific fields
 * - Response: User
 */

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createServerClient()
    let profileData = { ...user }

    // Fetch role-specific data
    if (user.role === 'chef') {
      const { data: chefData } = await supabase
        .from('chefs')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (chefData) {
        profileData = { ...profileData, ...chefData }
      }
    } else if (user.role === 'driver') {
      const { data: driverData } = await supabase
        .from('drivers')
        .select('*')
        .eq('id', user.id)
        .single()
      
      if (driverData) {
        profileData = { ...profileData, ...driverData }
      }
    }

    return NextResponse.json({ profile: profileData })
  } catch (error: any) {
    console.error('Get profile API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createServerClient()
    const body = await request.json()

    // Update base user data
    const userUpdateData: any = {}
    if (body.name) userUpdateData.name = body.name
    if (body.email) userUpdateData.email = body.email
    if (body.phone) userUpdateData.phone = body.phone
    if (body.photoUrl !== undefined) userUpdateData.photo_url = body.photoUrl

    if (Object.keys(userUpdateData).length > 0) {
      const { error: userError } = await supabase
        .from('users')
        .update(userUpdateData)
        .eq('id', user.id)

      if (userError) {
        return NextResponse.json(
          { error: 'Failed to update user profile', details: userError.message },
          { status: 500 }
        )
      }
    }

    // Update role-specific data
    if (user.role === 'chef') {
      const chefUpdateData: any = {}
      if (body.bio !== undefined) chefUpdateData.bio = body.bio
      if (body.kitchenAddress) chefUpdateData.kitchen_address = body.kitchenAddress
      if (body.latitude !== undefined) chefUpdateData.latitude = body.latitude
      if (body.longitude !== undefined) chefUpdateData.longitude = body.longitude
      if (body.deliveryRadius !== undefined) chefUpdateData.delivery_radius = body.deliveryRadius
      if (body.categories !== undefined) chefUpdateData.categories = body.categories

      if (Object.keys(chefUpdateData).length > 0) {
        const { error: chefError } = await supabase
          .from('chefs')
          .update(chefUpdateData)
          .eq('id', user.id)

        if (chefError) {
          return NextResponse.json(
            { error: 'Failed to update chef profile', details: chefError.message },
            { status: 500 }
          )
        }
      }
    } else if (user.role === 'driver') {
      const driverUpdateData: any = {}
      if (body.vehicle) driverUpdateData.vehicle = body.vehicle
      if (body.vehicleModel) driverUpdateData.vehicle_model = body.vehicleModel
      if (body.vehicleColor) driverUpdateData.vehicle_color = body.vehicleColor
      if (body.vehiclePlate) driverUpdateData.vehicle_plate = body.vehiclePlate

      if (Object.keys(driverUpdateData).length > 0) {
        const { error: driverError } = await supabase
          .from('drivers')
          .update(driverUpdateData)
          .eq('id', user.id)

        if (driverError) {
          return NextResponse.json(
            { error: 'Failed to update driver profile', details: driverError.message },
            { status: 500 }
          )
        }
      }
    }

    // Fetch updated profile
    const { data: updatedUser } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

    return NextResponse.json({ profile: updatedUser })
  } catch (error: any) {
    console.error('Update profile API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
