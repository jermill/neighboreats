'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Map from '@/components/shared/Map'
import StatusTimeline from '@/components/shared/StatusTimeline'
import { ordersApi } from '@/lib/api-client'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function ActiveDeliveryPage() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [currentStatus, setCurrentStatus] = useState('out_for_delivery')
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  const statuses = [
    { key: 'out_for_delivery', label: 'Heading to Chef', timestamp: new Date() },
    { key: 'arrived_at_chef', label: 'Arrived at Chef' },
    { key: 'picked_up', label: 'Picked Up Meal' },
    { key: 'heading_to_customer', label: 'Heading to Customer' },
    { key: 'delivered', label: 'Delivered' }
  ]

  // In a real app, you'd fetch the active delivery order
  useEffect(() => {
    const fetchActiveDelivery = async () => {
      try {
        const { orders } = await ordersApi.getAll({ status: 'out_for_delivery' })
        if (orders.length > 0) {
          setActiveOrderId(orders[0].id)
        }
      } catch (error) {
        console.error('Failed to fetch active delivery:', error)
      }
    }
    fetchActiveDelivery()
  }, [])

  const handleNextStatus = async () => {
    if (!activeOrderId) {
      toast.error('No active delivery found')
      return
    }

    const currentIndex = statuses.findIndex(s => s.key === currentStatus)
    if (currentIndex < statuses.length - 1) {
      const nextStatus = statuses[currentIndex + 1]
      
      setUpdating(true)
      try {
        await ordersApi.updateStatus(activeOrderId, nextStatus.key)
        setCurrentStatus(nextStatus.key)
        toast.success(`Status updated: ${nextStatus.label}`)
        
        if (nextStatus.key === 'delivered') {
          setTimeout(() => {
            router.push('/dashboard/driver/deliveries')
          }, 2000)
        }
      } catch (error) {
        toast.error('Failed to update status')
      } finally {
        setUpdating(false)
      }
    }
  }

  return (
    <DashboardLayout userRole="driver" userName={currentUser?.name}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Active Delivery</h1>
          <div className="text-right">
            <p className="text-sm text-gray-600">Earnings</p>
            <p className="text-2xl font-bold text-green-600">$4.50</p>
          </div>
        </div>

        {/* Map */}
        <Card>
          <h2 className="text-lg font-bold mb-3">Route Navigation</h2>
          <Map height="250px" />
          <Button className="w-full mt-4" variant="outline">
            🗺️ Open in Maps App
          </Button>
        </Card>

        {/* Order Details */}
        <Card>
          <h2 className="text-lg font-bold mb-3">Order Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-bold">DEL-001</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Chef</p>
              <p className="font-medium">Maria Rodriguez</p>
              <p className="text-sm text-gray-500">123 Market St, Wilmington, DE</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Customer</p>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500">456 Oak Ave, Wilmington, DE</p>
              <p className="text-sm text-gray-500">Phone: (302) 555-0123</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Special Instructions</p>
              <p className="font-medium">Ring doorbell, leave at door</p>
            </div>
          </div>
        </Card>

        {/* Status Timeline */}
        <Card>
          <h2 className="text-lg font-bold mb-4">Delivery Progress</h2>
          <StatusTimeline currentStatus={currentStatus} statuses={statuses} />
          
          {currentStatus !== 'delivered' && (
            <Button 
              className="w-full mt-6" 
              onClick={handleNextStatus}
              loading={updating}
              disabled={updating}
            >
              {updating ? 'Updating...' : (
                <>
                  {currentStatus === 'out_for_delivery' && '✓ Arrived at Chef'}
                  {currentStatus === 'arrived_at_chef' && '✓ Picked Up Meal'}
                  {currentStatus === 'picked_up' && '🚗 Start Delivery to Customer'}
                  {currentStatus === 'heading_to_customer' && '✓ Mark as Delivered'}
                </>
              )}
            </Button>
          )}

          {currentStatus === 'delivered' && (
            <div className="mt-6 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold mb-2">Delivery Complete!</h3>
              <p className="text-gray-600 mb-4">Great job! You earned $4.50</p>
              <Button className="w-full" onClick={() => router.push('/dashboard/driver/deliveries')}>
                Find Next Delivery
              </Button>
            </div>
          )}
        </Card>

        {/* Timer */}
        <Card className="bg-teal-50 border-2 border-teal-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Elapsed Time</p>
            <p className="text-4xl font-bold text-teal-600">12:34</p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}


