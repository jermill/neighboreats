import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Orders
 * 
 * GET /api/orders
 * - Auth: Required (customer, chef, driver)
 * - Query params: 
 *   - role: 'customer' | 'chef' | 'driver' (filter by role context)
 *   - status: string (optional filter)
 * - Response: Order[]
 * 
 * POST /api/orders
 * - Auth: Required (customer)
 * - Body: {
 *     chefId: string
 *     items: Array<{ menuItemId: string, quantity: number }>
 *     fulfillmentType: 'pickup' | 'delivery'
 *     deliveryAddress?: string
 *     specialInstructions?: string
 *   }
 * - Response: { orderId: string, order: Order }
 */

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['customer', 'chef', 'driver'])
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('orders')
      .select(`
        *,
        chef:chefs(*),
        customer:users!orders_customer_id_fkey(*),
        order_items(
          *,
          menu_item:menu_items(*)
        )
      `)

    // Filter by user role
    if (user.role === 'customer') {
      query = query.eq('customer_id', user.id)
    } else if (user.role === 'chef') {
      query = query.eq('chef_id', user.id)
    } else if (user.role === 'driver') {
      query = query.eq('driver_id', user.id)
    }

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status)
    }

    query = query.order('created_at', { ascending: false })

    const { data: orders, error } = await query

    if (error) {
      console.error('Orders fetch error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch orders', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ orders: orders || [] })
  } catch (error: any) {
    console.error('Orders API error:', error)
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

    const { chefId, items, fulfillmentType, deliveryAddress, specialInstructions } = body

    // Validate required fields
    if (!chefId || !items || items.length === 0 || !fulfillmentType) {
      return NextResponse.json(
        { error: 'Missing required fields: chefId, items, fulfillmentType' },
        { status: 400 }
      )
    }

    // Fetch menu items to calculate total
    const menuItemIds = items.map((item: any) => item.menuItemId)
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('*')
      .in('id', menuItemIds)

    if (menuError || !menuItems) {
      return NextResponse.json(
        { error: 'Failed to fetch menu items' },
        { status: 500 }
      )
    }

    // Calculate total price
    let totalPrice = 0
    const itemsMap = new Map(menuItems.map(item => [item.id, item]))
    
    for (const item of items) {
      const menuItem = itemsMap.get(item.menuItemId)
      if (menuItem) {
        totalPrice += menuItem.price * item.quantity
      }
    }

    // Calculate delivery fee (mock - would be based on distance in production)
    const deliveryFee = fulfillmentType === 'delivery' ? 5.99 : 0

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: user.id,
        chef_id: chefId,
        total_price: totalPrice,
        delivery_fee: deliveryFee,
        status: 'pending',
        fulfillment_type: fulfillmentType,
        delivery_address: deliveryAddress,
        special_instructions: specialInstructions
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return NextResponse.json(
        { error: 'Failed to create order', details: orderError?.message },
        { status: 500 }
      )
    }

    // Create order items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      menu_item_id: item.menuItemId,
      quantity: item.quantity,
      price_at_time: itemsMap.get(item.menuItemId)?.price || 0
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) {
      console.error('Order items creation error:', itemsError)
      // Rollback order if items fail
      await supabase.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      orderId: order.id, 
      order 
    }, { status: 201 })
  } catch (error: any) {
    console.error('Create order API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
