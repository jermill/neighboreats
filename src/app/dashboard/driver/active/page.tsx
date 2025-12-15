'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Map from '@/components/shared/Map'
import StatusTimeline from '@/components/shared/StatusTimeline'
import toast from 'react-hot-toast'

const timelineStages = [
  { key: 'heading_to_chef', label: 'Heading to Chef', status: 'out_for_delivery' },
  { key: 'arrived_at_chef', label: 'Arrived at Chef', status: 'out_for_delivery' },
  { key: 'picked_up', label: 'Picked Up Meal', status: 'out_for_delivery' },
  { key: 'heading_to_customer', label: 'Heading to Customer', status: 'out_for_delivery' },
  { key: 'delivered', label: 'Delivered', status: 'delivered' }
]

export default function ActiveDeliveryPage() {
  const driverName = "Alex Martinez"
  const [stageIndex, setStageIndex] = useState(0)
  const currentStage = timelineStages[stageIndex]
  const currentStatus = currentStage.status

  const handleNextStatus = () => {
    if (stageIndex < timelineStages.length - 1) {
      const nextIndex = stageIndex + 1
      setStageIndex(nextIndex)
      const nextStage = timelineStages[nextIndex]
      toast.success(`Status updated: ${nextStage.label}`)
    }
  }

  return (
    <DashboardLayout userRole="driver" userName={driverName}>
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
          <StatusTimeline currentStatus={currentStage.key} statuses={timelineStages} />
          
          {currentStatus !== 'delivered' && (
            <Button className="w-full mt-6" onClick={handleNextStatus}>
              {currentStage.key === 'heading_to_chef' && '✓ Arrived at Chef'}
              {currentStage.key === 'arrived_at_chef' && '✓ Picked Up Meal'}
              {currentStage.key === 'picked_up' && '🚗 Start Delivery to Customer'}
              {currentStage.key === 'heading_to_customer' && '✓ Mark as Delivered'}
            </Button>
          )}

          {currentStatus === 'delivered' && (
            <div className="mt-6 text-center">
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold mb-2">Delivery Complete!</h3>
              <p className="text-gray-600 mb-4">Great job! You earned $4.50</p>
              <Button className="w-full">Find Next Delivery</Button>
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

