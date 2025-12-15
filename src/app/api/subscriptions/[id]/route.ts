import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, requireRole } from '@/lib/supabase-server'

/**
 * API Contract: Subscription by ID
 * 
 * PATCH /api/subscriptions/[id]
 * - Auth: Required (customer - owner only)
 * - Body: { status: 'active' | 'paused' | 'cancelled' }
 * - Response: Subscription
 * 
 * DELETE /api/subscriptions/[id]
 * - Auth: Required (customer - owner only)
 * - Response: { success: boolean }
 */

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const user = await requireRole(['customer'])
    const supabase = createServerClient()
    const body = await request.json()

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('subscriptions')
      .select('customer_id')
      .eq('id', id)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    if (existing.customer_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You can only manage your own subscriptions' },
        { status: 403 }
      )
    }

    // Update subscription
    const updateData: any = {}
    if (body.status) updateData.status = body.status

    const { data: subscription, error: updateError } = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        tier:subscription_tiers(*)
      `)
      .single()

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to update subscription', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ subscription })
  } catch (error: any) {
    console.error('Update subscription API error:', error)
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
    const user = await requireRole(['customer'])
    const supabase = createServerClient()

    // Verify ownership
    const { data: existing, error: fetchError } = await supabase
      .from('subscriptions')
      .select('customer_id')
      .eq('id', id)
      .single()

    if (fetchError || !existing) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    if (existing.customer_id !== user.id) {
      return NextResponse.json(
        { error: 'Forbidden - You can only delete your own subscriptions' },
        { status: 403 }
      )
    }

    // Soft delete by setting status to cancelled
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('id', id)

    if (updateError) {
      return NextResponse.json(
        { error: 'Failed to cancel subscription', details: updateError.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Delete subscription API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: error.message?.includes('Unauthorized') ? 401 : 500 }
    )
  }
}
