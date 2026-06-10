'use client'

import { useState, useEffect, useCallback } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'
import Map from '@/components/shared/Map'
import { OrderCardSkeleton } from '@/components/shared/SkeletonLoader'
import { ordersApi } from '@/lib/api-client'
import { Order } from '@/types'
import { useStore } from '@/lib/store'
import { useOrdersRealtime } from '@/lib/useOrdersRealtime'
import toast from 'react-hot-toast'

export default function DeliveriesPage() {
  const { currentUser } = useStore()
  const [available, setAvailable] = useState<Order[]>([])
  const [mine, setMine] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [claimingId, setClaimingId] = useState<string | null>(null)

  const fetchDeliveries = useCallback(async () => {
    try {
      const [availableRes, mineRes] = await Promise.all([
        ordersApi.getAvailable(),
        ordersApi.getAll(),
      ])
      setAvailable(availableRes.orders)
      setMine(mineRes.orders.filter((o: Order) => ['ready', 'out_for_delivery'].includes(o.status)))
    } catch (error: any) {
      toast.error('Failed to load deliveries')
      console.error('Deliveries fetch error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDeliveries()
  }, [fetchDeliveries])

  useOrdersRealtime(() => {
    fetchDeliveries()
  })

  const handleClaim = async (orderId: string) => {
    setClaimingId(orderId)
    try {
      await ordersApi.claim(orderId)
      toast.success('Delivery claimed! Head to the pickup location.')
      fetchDeliveries()
    } catch (error: any) {
      if (error.status === 409) {
        toast.error('Another driver grabbed this one')
      } else {
        toast.error(error.message || 'Failed to claim delivery')
      }
      fetchDeliveries()
    } finally {
      setClaimingId(null)
    }
  }

  const handleProgress = async (order: Order) => {
    const nextStatus = order.status === 'ready' ? 'out_for_delivery' : 'delivered'
    try {
      await ordersApi.updateStatus(order.id, nextStatus)
      toast.success(nextStatus === 'out_for_delivery' ? 'Picked up — on the way!' : 'Delivered! Nice work.')
      fetchDeliveries()
    } catch (error) {
      toast.error('Failed to update delivery')
    }
  }

  const renderDelivery = (order: Order, action: React.ReactNode) => (
    <Card key={order.id}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-bold">{order.chef?.name || 'Chef'}</h3>
            <Badge variant="info">Order #{order.id.slice(0, 8)}</Badge>
            {order.status === 'out_for_delivery' && <Badge variant="warning">Out for delivery</Badge>}
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-gray-600">📍 Pickup:</span>
              <span className="font-medium">{order.chef?.kitchenAddress || 'Chef location'}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600">🏠 Drop-off:</span>
              <span className="font-medium">{order.deliveryAddress || 'Customer location'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-green-600">
                ${order.deliveryFee.toFixed(2)}
              </p>
              <p className="text-sm text-gray-600">Delivery fee</p>
            </div>
            {action}
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <DashboardLayout userRole="driver" userName={currentUser?.name}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Deliveries</h1>

        <Card>
          <h2 className="text-xl font-bold mb-4">Delivery Locations</h2>
          <Map height="300px" />
        </Card>

        {loading ? (
          <OrderCardSkeleton count={3} />
        ) : (
          <>
            {mine.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">My deliveries</h2>
                {mine.map(order =>
                  renderDelivery(
                    order,
                    <Button onClick={() => handleProgress(order)}>
                      {order.status === 'ready' ? 'Mark Picked Up' : 'Mark Delivered'}
                    </Button>
                  )
                )}
              </div>
            )}

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Available deliveries</h2>
              {available.map(order =>
                renderDelivery(
                  order,
                  <Button
                    onClick={() => handleClaim(order.id)}
                    loading={claimingId === order.id}
                    disabled={claimingId !== null}
                  >
                    Claim Delivery
                  </Button>
                )
              )}

              {available.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚗</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No deliveries available</h3>
                  <p className="text-gray-600">New delivery requests will appear here automatically</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
