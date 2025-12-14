'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import DashboardLayout from '@/components/shared/DashboardLayout'
import OrderCard from '@/components/shared/OrderCard'
import Modal from '@/components/shared/Modal'
import Rating from '@/components/shared/Rating'
import Textarea from '@/components/shared/Textarea'
import Button from '@/components/shared/Button'
import EmptyState from '@/components/shared/EmptyState'
import { mockOrders } from '@/lib/mockData'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function OrdersPage() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all')
  const [showRating, setShowRating] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')

  const filteredOrders = mockOrders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return ['pending', 'accepted', 'preparing', 'ready', 'out_for_delivery'].includes(order.status)
    if (filter === 'completed') return order.status === 'delivered'
    if (filter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  const handleRate = (order: typeof mockOrders[0]) => {
    setSelectedOrder(order)
    setShowRating(true)
  }

  const submitRating = () => {
    toast.success('Thank you for your feedback!')
    setShowRating(false)
    setRating(5)
    setReview('')
  }

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All Orders' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition whitespace-nowrap ${
                filter === key
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                userRole="customer"
                onRate={() => handleRate(order)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📦"
            title="No orders found"
            description="You haven't placed any orders yet"
            action={{
              label: 'Find Chefs',
              onClick: () => router.push('/dashboard/customer/search')
            }}
          />
        )}
      </div>

      {/* Rating Modal */}
      <Modal
        isOpen={showRating}
        onClose={() => setShowRating(false)}
        title="Rate Your Order"
      >
        {selectedOrder && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Chef: {selectedOrder.chef.name}</p>
              <p className="text-sm text-gray-600">
                Order #{selectedOrder.id.slice(0, 8)}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                How was your experience?
              </label>
              <div className="flex justify-center">
                <Rating value={rating} onChange={setRating} size="lg" />
              </div>
            </div>

            <Textarea
              label="Write a review (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Share details about your experience..."
            />

            <Button onClick={submitRating} className="w-full">
              Submit Rating
            </Button>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  )
}

