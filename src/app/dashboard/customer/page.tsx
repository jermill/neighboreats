'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import DashboardLayout from '@/components/shared/DashboardLayout'
import StatCard from '@/components/shared/StatCard'
import OrderCard from '@/components/shared/OrderCard'
import ChefCard from '@/components/shared/ChefCard'
import { ordersApi, subscriptionsApi } from '@/lib/api-client'
import { useGeolocation, calculateDistance } from '@/lib/useGeolocation'
import { Chef, Order } from '@/types'
import { useRouter } from 'next/navigation'

export default function CustomerDashboard() {
  const router = useRouter()
  const { currentUser } = useStore()
  const [chefs, setChefs] = useState<Chef[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [activeSubs, setActiveSubs] = useState(0)
  const { coords } = useGeolocation()

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/chefs')
        if (response.ok) {
          const data = await response.json()
          setChefs(data.chefs || [])
        }
      } catch (error) {
        console.error('Error fetching chefs:', error)
      }
      try {
        const { orders: fetched } = await ordersApi.getAll()
        setOrders(fetched)
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
      try {
        const { subscriptions } = await subscriptionsApi.getAll()
        setActiveSubs((subscriptions || []).filter((s: any) => s.status === 'ACTIVE' || s.status === 'active').length)
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      }
    }
    fetchData()
  }, [])

  const recentOrders = orders.slice(0, 3)
  const liveChefs = chefs.filter(chef => chef.isLive)
  const now = new Date()
  const ordersThisMonth = orders.filter(o => {
    const d = new Date(o.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length

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
            value={String(ordersThisMonth)}
          />
          <StatCard
            icon="🧾"
            label="Total Orders"
            value={String(orders.length)}
          />
          <StatCard
            icon="👨‍🍳"
            label="Chefs Near You"
            value={String(chefs.length)}
          />
          <StatCard
            icon="🔥"
            label="Active Subscriptions"
            value={String(activeSubs)}
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
                  distance={calculateDistance(coords.latitude, coords.longitude, chef.latitude, chef.longitude)}
                  onClick={() => router.push(`/dashboard/customer/chef/${chef.id}`)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Orders */}
        {recentOrders.length > 0 && (
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
        )}

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
