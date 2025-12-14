'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import OrderCard from '@/components/shared/OrderCard'
import EmptyState from '@/components/shared/EmptyState'
import { mockOrders } from '@/lib/mockData'
import toast from 'react-hot-toast'

export default function ChefOrdersPage() {
  const chefName = "Maria Rodriguez"
  const [activeTab, setActiveTab] = useState<'pending' | 'preparing' | 'ready' | 'completed'>('pending')

  // Filter orders by status
  const orders = {
    pending: mockOrders.filter(o => o.status === 'pending'),
    preparing: mockOrders.filter(o => o.status === 'preparing'),
    ready: mockOrders.filter(o => o.status === 'ready'),
    completed: mockOrders.filter(o => o.status === 'delivered')
  }

  const handleAccept = (orderId: string) => {
    toast.success('Order accepted!')
    // In real app, update order status
  }

  const handleReject = (orderId: string) => {
    toast.error('Order rejected')
    // In real app, update order status
  }

  const handleMarkReady = (orderId: string) => {
    toast.success('Order marked as ready!')
    // In real app, update order status
  }

  return (
    <DashboardLayout userRole="chef" userName={chefName}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>

        {/* Status Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {[
                { key: 'pending', label: 'Pending', count: orders.pending.length },
                { key: 'preparing', label: 'Preparing', count: orders.preparing.length },
                { key: 'ready', label: 'Ready', count: orders.ready.length },
                { key: 'completed', label: 'Completed', count: orders.completed.length }
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
            {orders[activeTab].length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {orders[activeTab].map(order => (
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

