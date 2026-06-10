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

// Map raw Supabase rows (snake_case, nested joins) to the app's Order shape
function transformOrder(row: any) {
  return {
    id: row.id,
    customerId: row.customer_id,
    chefId: row.chef_id,
    driverId: row.driver_id,
    chef: row.chef
      ? {
          id: row.chef.id,
          name: row.chef.user?.name || 'Chef',
          photoUrl: row.chef.user?.photo_url || undefined,
          rating: row.chef.rating,
          kitchenAddress: row.chef.kitchen_address || '',
          latitude: row.chef.latitude,
          longitude: row.chef.longitude,
        }
      : null,
    customer: row.customer
      ? { id: row.customer.id, name: row.customer.name, phone: row.customer.phone }
      : null,
    items: (row.order_items || []).map((oi: any) => ({
      quantity: oi.quantity,
      menuItem: oi.menu_item
        ? {
            id: oi.menu_item.id,
            chefId: oi.menu_item.chef_id,
            name: oi.menu_item.name,
            description: oi.menu_item.description,
            price: oi.menu_item.price,
            category: oi.menu_item.category,
            dietaryTags: oi.menu_item.dietary_tags || [],
            photoUrl: oi.menu_item.photo_url || '',
            isAvailable: oi.menu_item.is_available,
          }
        : { id: oi.menu_item_id, name: 'Item', price: oi.price_at_time, quantity: oi.quantity },
    })),
    totalPrice: row.total_price,
    deliveryFee: row.delivery_fee || 0,
    status: row.status,
    fulfillmentType: row.fulfillment_type,
    deliveryAddress: row.delivery_address || undefined,
    specialInstructions: row.special_instructions || undefined,
    createdAt: row.created_at,
    chefRating: row.chef_rating || undefined,
    driverRating: row.driver_rating || undefined,
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await requireRole(['customer', 'chef', 'driver'])
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const available = searchParams.get('available')

    let query = supabase
      .from('orders')
      .select(`
        *,
        chef:chefs(*, user:users(name, photo_url)),
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
      if (available === 'true') {
        // unclaimed orders ready for pickup (RLS limits this to active drivers)
        query = query.eq('status', 'ready').is('driver_id', null)
      } else {
        query = query.eq('driver_id', user.id)
      }
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

    return NextResponse.json({ orders: (orders || []).map(transformOrder) })
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
        order_type: 'a_la_carte',
        meal_price: totalPrice,
        total_price: totalPrice + deliveryFee,
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

