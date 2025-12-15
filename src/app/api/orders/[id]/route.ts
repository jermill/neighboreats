import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Order by ID
 * 
 * GET /api/orders/[id]
 * - Auth: Required (customer, chef, driver)
 * - Response: Order
 * 
 * PATCH /api/orders/[id]
 * - Auth: Required (chef, driver)
 * - Body: { status: string, driverRating?: number, chefRating?: number }
 * - Response: Order
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireRole(['customer', 'chef', 'driver'])
    const supabase = createServerClient()

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        chef:chefs(*),
        customer:users!orders_customer_id_fkey(*),
        driver:drivers(*),
        order_items(
          *,
          menu_item:menu_items(*)
        )
      `)
      .eq('id', id)
      .single()

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Verify user has access to this order
    const hasAccess = 
      order.customer_id === user.id ||
      order.chef_id === user.id ||
      order.driver_id === user.id

    if (!hasAccess) {
      return NextResponse.json(
        { error: 'Forbidden - You do not have access to this order' },
        { status: 403 }
      )
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error('Get order API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireRole(['customer', 'chef', 'driver'])
    const supabase = createServerClient()
    const body = await request.json()

    // Get existing order
    const { data: existingOrder, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError || !existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Verify user has permission to update
    const canUpdate = 
      (user.role === 'chef' && existingOrder.chef_id === user.id) ||
      (user.role === 'driver' && existingOrder.driver_id === user.id) ||
      (user.role === 'customer' && existingOrder.customer_id === user.id)

    if (!canUpdate) {
      return NextResponse.json(
        { error: 'Forbidden - You cannot update this order' },
        { status: 403 }
      )
    }

    // Update order
    const updateData: any = {}
    if (body.status) updateData.status = body.status
    if (body.chefRating !== undefined) updateData.chef_rating = body.chefRating
    if (body.driverRating !== undefined) updateData.driver_rating = body.driverRating

    const { data: order, error: updateError } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update order', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ order })
  } catch (error: any) {
    console.error('Update order API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
