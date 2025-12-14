'use client'

import { useStore } from '@/lib/store'
import DashboardLayout from '@/components/shared/DashboardLayout'
import StatCard from '@/components/shared/StatCard'
import OrderCard from '@/components/shared/OrderCard'
import ChefCard from '@/components/shared/ChefCard'
import { mockOrders, mockChefs, calculateDistance } from '@/lib/mockData'
import { useRouter } from 'next/navigation'

export default function CustomerDashboard() {
  const router = useRouter()
  const { currentUser } = useStore()

  const recentOrders = mockOrders.slice(0, 3)
  const liveChefs = mockChefs.filter(chef => chef.isLive)
  const customerLat = 39.7459
  const customerLon = -75.5466

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-gray-600">Discover fresh, local meals from your neighborhood chefs</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon="📦"
            label="Orders this Month"
            value="8"
            trend={{ value: 25, isPositive: true }}
          />
          <StatCard
            icon="⭐"
            label="Favorite Chefs"
            value="3"
          />
          <StatCard
            icon="💰"
            label="Total Saved"
            value="$127"
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            icon="🔥"
            label="Active Subscription"
            value="1"
          />
        </div>

        {/* Live Chefs */}
        {liveChefs.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">🔴 Chefs Cooking LIVE Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {liveChefs.map((chef) => (
                <ChefCard
                  key={chef.id}
                  chef={chef}
                  distance={calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude)}
                  onClick={() => router.push(`/dashboard/customer/chef/${chef.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Recent Orders</h2>
            <button
              onClick={() => router.push('/dashboard/customer/orders')}
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                userRole="customer"
                onViewDetails={() => router.push(`/dashboard/customer/orders`)}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-lg p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Discover Amazing Local Chefs</h3>
          <p className="mb-6">Fresh, homemade meals from your neighborhood</p>
          <button
            onClick={() => router.push('/dashboard/customer/search')}
            className="bg-white text-teal-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Find Chefs Near You
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

