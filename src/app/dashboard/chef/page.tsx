'use client'

import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import StatCard from '@/components/shared/StatCard'
import OrderCard from '@/components/shared/OrderCard'
import Button from '@/components/shared/Button'
import LiveBadge from '@/components/shared/LiveBadge'
import { mockOrders } from '@/lib/mockData'

export default function ChefDashboard() {
  const router = useRouter()
  const chefName = "Maria Rodriguez" // Mock chef

  const pendingOrders = mockOrders.filter(o => o.status === 'pending').slice(0, 3)
  const todayOrders = 8
  const weekRevenue = 1247.50
  const activeSubscribers = 24
  const rating = 4.9

  return (
    <DashboardLayout userRole="chef" userName={chefName}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Maria! 👨‍🍳
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
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            icon="💰"
            label="Revenue This Week"
            value={`$${weekRevenue.toFixed(0)}`}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            icon="👥"
            label="Active Subscribers"
            value={activeSubscribers}
          />
          <StatCard
            icon="⭐"
            label="Your Rating"
            value={rating}
            trend={{ value: 0.2, isPositive: true }}
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
                  onAccept={() => alert('Order accepted')}
                  onReject={() => alert('Order rejected')}
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

        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <span className="font-bold text-green-700">11:00 AM</span>
              <span className="text-gray-700">Lunch prep starts - 5 orders</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="font-bold text-blue-700">5:00 PM</span>
              <span className="text-gray-700">Dinner prep starts - 3 orders</span>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Recent Reviews</h2>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">John Doe</span>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700">"Best mole sauce I've ever had! Will definitely order again."</p>
            </div>
            <div className="border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold">Jane Smith</span>
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
              <p className="text-gray-700">"Authentic flavors and generous portions. Highly recommend!"</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

