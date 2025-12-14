'use client'

import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'
import Map from '@/components/shared/Map'
import { mockDeliveries } from '@/lib/mockData'
import toast from 'react-hot-toast'

export default function DeliveriesPage() {
  const router = useRouter()
  const driverName = "Alex Martinez"

  const handleAccept = (deliveryId: string) => {
    toast.success('Delivery accepted! Navigate to chef location.')
    router.push('/dashboard/driver/active')
  }

  return (
    <DashboardLayout userRole="driver" userName={driverName}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Available Deliveries</h1>

        {/* Map View */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Delivery Locations</h2>
          <Map height="300px" />
        </Card>

        {/* Available Deliveries */}
        <div className="space-y-4">
          {mockDeliveries.map(delivery => (
            <Card key={delivery.id}>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{delivery.chefName}</h3>
                    <Badge variant="info">{delivery.distance.toFixed(1)} mi away</Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600">📍 Pickup:</span>
                      <span className="font-medium">{delivery.chefAddress}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600">🏠 Drop-off:</span>
                      <span className="font-medium">{delivery.customerAddress}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-gray-600">⏱️ Est. Time:</span>
                      <span className="font-medium">15-20 minutes</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-green-600">
                        ${delivery.deliveryFee.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-600">Delivery fee</p>
                    </div>
                    <Button onClick={() => handleAccept(delivery.id)}>
                      Accept Delivery
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {mockDeliveries.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No deliveries available</h3>
              <p className="text-gray-600">Check back soon for new delivery requests</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

