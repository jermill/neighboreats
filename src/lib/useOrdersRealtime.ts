'use client'

/**
 * useOrdersRealtime
 *
 * Subscribes to Supabase realtime postgres_changes on public.orders
 * and invokes the provided callback on every change (INSERT/UPDATE/DELETE).
 * RLS applies to the subscription, so users only receive events for
 * orders they can see.
 *
 * Usage:
 *   useOrdersRealtime((payload) => fetchOrders())
 */

import { useEffect, useRef } from 'react'
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase'

export type OrdersRealtimePayload = RealtimePostgresChangesPayload<Record<string, any>>

export function useOrdersRealtime(onChange: (payload: OrdersRealtimePayload) => void) {
  // Keep the latest callback without re-subscribing on every render
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    const supabase = createClient()

    const channel = supabase
      .channel('orders-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload: OrdersRealtimePayload) => onChangeRef.current(payload)
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])
}
