import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Menu Item by ID
 * 
 * GET /api/menu/[id]
 * - Auth: Optional
 * - Response: MenuItem
 * 
 * PATCH /api/menu/[id]
 * - Auth: Required (chef - owner only)
 * - Body: Partial<MenuItem>
 * - Response: MenuItem
 * 
 * DELETE /api/menu/[id]
 * - Auth: Required (chef - owner only)
 * - Response: { success: boolean }
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createServerClient()

    const { data: menuItem, error } = await supabase
      .from('menu_items')
      .select(`
        *,
        chef:chefs(*)
      `)
      .eq('id', id)
      .single()

    if (error || !menuItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ menuItem })
  } catch (error: any) {
    console.error('Get menu item API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireRole(['chef'])
    const supabase = createServerClient()
    const body = await request.json()

    // Verify ownership
    const { data: existingItem, error: fetchError } = await supabase
      .from('menu_items')
      .select('chef_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    if (existingItem.chef_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You can only update your own menu items' },
        { status: 403 }
      )
    }

    // Update menu item
    const updateData: any = {}
    if (body.name) updateData.name = body.name
    if (body.description !== undefined) updateData.description = body.description
    if (body.price !== undefined) updateData.price = body.price
    if (body.category) updateData.category = body.category
    if (body.dietaryTags !== undefined) updateData.dietary_tags = body.dietaryTags
    if (body.photoUrl !== undefined) updateData.photo_url = body.photoUrl
    if (body.isAvailable !== undefined) updateData.is_available = body.isAvailable

    const { data: menuItem, error: updateError } = await supabase
      .from('menu_items')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update menu item', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ menuItem })
  } catch (error: any) {
    console.error('Update menu item API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireRole(['chef'])
    const supabase = createServerClient()

    // Verify ownership
    const { data: existingItem, error: fetchError } = await supabase
      .from('menu_items')
      .select('chef_id')
      .eq('id', id)
      .single()

    if (fetchError || !existingItem) {
      return NextResponse.json(
        { error: 'Menu item not found' },
        { status: 404 }
      )
    }

    if (existingItem.chef_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You can only delete your own menu items' },
        { status: 403 }
      )
    }

    // Delete menu item
    const { error: deleteError } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)

    if (deleteError) {
      return NextResponse.json(
        { error: 'Failed to delete menu item', details: deleteError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete menu item API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
