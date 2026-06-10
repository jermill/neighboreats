'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import StatCard from '@/components/shared/StatCard'
import OrderCard from '@/components/shared/OrderCard'
import Button from '@/components/shared/Button'
import { ordersApi, profileApi } from '@/lib/api-client'
import { useStore } from '@/lib/store'
import { Order } from '@/types'
import toast from 'react-hot-toast'

export default function ChefDashboard() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [rating, setRating] = useState<number | null>(null)

  const fetchOrders = async () => {
    try {
      const { orders: fetched } = await ordersApi.getAll()
      setOrders(fetched)
    } catch (error) {
      console.error('Orders fetch error:', error)
    }
  }

  useEffect(() => {
    fetchOrders()
    profileApi.get()
      .then(({ profile }) => setRating(profile?.chef?.rating ?? profile?.rating ?? null))
      .catch(() => {})
  }, [])

  const handleStatus = async (orderId: string, status: string) => {
    try {
      await ordersApi.updateStatus(orderId, status)
      toast.success(status === 'accepted' ? 'Order accepted!' : 'Order updated')
      fetchOrders()
    } catch {
      toast.error('Failed to update order')
    }
  }

  const pendingOrders = orders.filter(o => o.status === 'pending').slice(0, 3)
  const today = new Date().toDateString()
  const todayOrders = orders.filter(o => new Date(o.createdAt).toDateString() === today).length
  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - 7)
  const weekRevenue = orders
    .filter(o => new Date(o.createdAt) >= weekStart && o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.totalPrice - o.deliveryFee), 0)

  const firstName = currentUser?.name?.split(' ')[0] || 'Chef'

  return (
    <DashboardLayout userRole="chef" userName={currentUser?.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {firstName}! 👨‍🍳
            </h1>
            <p className="text-gray-600">Here's what's happening with your kitchen today</p>
          </div>
          <Button
            variant="danger"
            size="lg"
            onClick={() => router.push('/dashboard/chef/live')}
          >
            🔴 Go LIVE
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon="📦"
            label="Orders Today"
            value={todayOrders}
          />
          <StatCard
            icon="💰"
            label="Revenue This Week"
            value={`$${weekRevenue.toFixed(0)}`}
          />
          <StatCard
            icon="🧾"
            label="Total Orders"
            value={orders.length}
          />
          <StatCard
            icon="⭐"
            label="Your Rating"
            value={rating !== null ? rating.toFixed(1) : '—'}
          />
        </div>

        {/* Pending Orders */}
        {pendingOrders.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">⏰ Pending Orders</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/dashboard/chef/orders')}
              >
                View All →
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pendingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  userRole="chef"
                  onAccept={() => handleStatus(order.id, 'accepted')}
                  onReject={() => handleStatus(order.id, 'cancelled')}
                />
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/chef/menu')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-xl font-bold mb-2">Manage Menu</h3>
            <p className="text-gray-600">Add, edit, or update your menu items</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/chef/subscriptions')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">📅</div>
            <h3 className="text-xl font-bold mb-2">Subscription Tiers</h3>
            <p className="text-gray-600">Manage your meal subscription plans</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/chef/earnings')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2">View Earnings</h3>
            <p className="text-gray-600">Track your revenue and payouts</p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}
