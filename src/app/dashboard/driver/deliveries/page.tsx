'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'
import Map from '@/components/shared/Map'
import { OrderCardSkeleton } from '@/components/shared/SkeletonLoader'
import { ordersApi } from '@/lib/api-client'
import { Order } from '@/types'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function DeliveriesPage() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [deliveries, setDeliveries] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = async () => {
    try {
      setLoading(true)
      // Fetch orders that are ready for delivery
      const { orders } = await ordersApi.getAll({ status: 'ready' })
      setDeliveries(orders)
    } catch (error: any) {
      toast.error('Failed to load deliveries')
      console.error('Deliveries fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async (orderId: string) => {
    try {
      await ordersApi.updateStatus(orderId, 'out_for_delivery')
      toast.success('Delivery accepted! Navigate to chef location.')
      router.push('/dashboard/driver/active')
    } catch (error) {
      toast.error('Failed to accept delivery')
    }
  }

  return (
    <DashboardLayout userRole="driver" userName={currentUser?.name}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Available Deliveries</h1>

        {/* Map View */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Delivery Locations</h2>
          <Map height="300px" />
        </Card>

        {/* Available Deliveries */}
        {loading ? (
          <OrderCardSkeleton count={3} />
        ) : (
          <div className="space-y-4">
            {deliveries.map(order => (
            <Card key={order.id}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{order.chef?.name || 'Chef'}</h3>
                    <Badge variant="info">Order #{order.id.slice(0, 8)}</Badge>
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
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600">⏱️ Est. Time:</span>
                      <span className="font-medium">15-20 minutes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${order.deliveryFee.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Delivery fee</p>
                    </div>
                    <Button onClick={() => handleAccept(order.id)}>
                      Accept Delivery
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {deliveries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No deliveries available</h3>
              <p className="text-gray-600">Check back soon for new delivery requests</p>
            </div>
          )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


