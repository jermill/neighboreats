'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import OrderCard from '@/components/shared/OrderCard'
import EmptyState from '@/components/shared/EmptyState'
import { OrderCardSkeleton } from '@/components/shared/SkeletonLoader'
import { ordersApi } from '@/lib/api-client'
import { Order } from '@/types'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function ChefOrdersPage() {
  const { currentUser } = useStore()
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready' | 'completed'>('pending')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const { orders: fetchedOrders } = await ordersApi.getAll()
      setOrders(fetchedOrders)
    } catch (error: any) {
      toast.error('Failed to load orders')
      console.error('Orders fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter orders by status
  const ordersByTab = {
    pending: orders.filter(o => o.status === 'pending'),
    preparing: orders.filter(o => o.status === 'preparing'),
    ready: orders.filter(o => o.status === 'ready'),
    completed: orders.filter(o => o.status === 'delivered')
  }

  const handleAccept = async (orderId: string) => {
    try {
      await ordersApi.updateStatus(orderId, 'accepted')
      toast.success('Order accepted!')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to accept order')
    }
  }

  const handleReject = async (orderId: string) => {
    try {
      await ordersApi.updateStatus(orderId, 'cancelled')
      toast.error('Order rejected')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to reject order')
    }
  }

  const handleMarkReady = async (orderId: string) => {
    try {
      await ordersApi.updateStatus(orderId, 'ready')
      toast.success('Order marked as ready!')
      fetchOrders()
    } catch (error) {
      toast.error('Failed to update order')
    }
  }

  return (
    <DashboardLayout userRole="chef" userName={currentUser?.name}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {[
                { key: 'pending', label: 'Pending', count: ordersByTab.pending.length },
                { key: 'preparing', label: 'Preparing', count: ordersByTab.preparing.length },
                { key: 'ready', label: 'Ready', count: ordersByTab.ready.length },
                { key: 'completed', label: 'Completed', count: ordersByTab.completed.length }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 font-semibold transition relative ${
                    activeTab === tab.key
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="ml-2 px-2 py-0.5 bg-teal-600 text-white text-xs rounded-full">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <OrderCardSkeleton count={6} />
              </div>
            ) : ordersByTab[activeTab].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ordersByTab[activeTab].map(order => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    userRole="chef"
                    onAccept={() => handleAccept(order.id)}
                    onReject={() => handleReject(order.id)}
                    onMarkReady={() => handleMarkReady(order.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="📦"
                title={`No ${activeTab} orders`}
                description={`You don't have any ${activeTab} orders at the moment`}
              />
            )}
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Today's Orders</p>
            <p className="text-3xl font-bold text-teal-600">8</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">This Week</p>
            <p className="text-3xl font-bold text-teal-600">42</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
            <p className="text-3xl font-bold text-green-600">98%</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Avg Prep Time</p>
            <p className="text-3xl font-bold text-blue-600">32min</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}


