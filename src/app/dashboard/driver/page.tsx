'use client'

import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import StatCard from '@/components/shared/StatCard'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'

export default function DriverDashboard() {
  const router = useRouter()
  const driverName = "Alex Martinez"

  const stats = {
    deliveriesToday: 12,
    earningsToday: 54.00,
    onTimeRate: 98,
    tier: 'GOLD' as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM'
  }

  const tierColors: Record<'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM', string> = {
    BRONZE: 'bg-orange-100 text-orange-800',
    SILVER: 'bg-gray-200 text-gray-800',
    GOLD: 'bg-yellow-100 text-yellow-800',
    PLATINUM: 'bg-purple-100 text-purple-800'
  }

  return (
    <DashboardLayout userRole="driver" userName={driverName}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome, Alex! 🚗
            </h1>
            <p className="text-gray-600">Ready to start delivering?</p>
          </div>
          <Badge variant="warning" size="md">
            <span className={`px-3 py-1 rounded-full font-bold ${tierColors[stats.tier]}`}>
              ⭐ {stats.tier} TIER
            </span>
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard
            icon="📦"
            label="Deliveries Today"
            value={stats.deliveriesToday}
            trend={{ value: 3, isPositive: true }}
          />
          <StatCard
            icon="💰"
            label="Earnings Today"
            value={`$${stats.earningsToday.toFixed(2)}`}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            icon="⏱️"
            label="On-Time Rate"
            value={`${stats.onTimeRate}%`}
          />
          <StatCard
            icon="⚡"
            label="Avg per Delivery"
            value="$4.50"
          />
        </div>

        {/* Available Deliveries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Available Deliveries Nearby</h2>
            <Badge variant="info">3 orders within 5 miles</Badge>
          </div>
          <Button
            size="lg"
            onClick={() => router.push('/dashboard/driver/deliveries')}
            className="w-full"
          >
            View Available Deliveries →
          </Button>
        </div>

        {/* Earnings Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Today's Earnings</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Base Pay</p>
              <p className="text-2xl font-bold text-teal-600">$48.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bonuses</p>
              <p className="text-2xl font-bold text-green-600">$6.00</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-blue-600">$54.00</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/driver/deliveries')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">🚗</div>
            <h3 className="text-xl font-bold mb-2">Find Deliveries</h3>
            <p className="text-gray-600">Browse available orders nearby</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/driver/earnings')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2">View Earnings</h3>
            <p className="text-gray-600">Track your income and bonuses</p>
          </button>

          <button
            onClick={() => router.push('/dashboard/driver/profile')}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition text-left"
          >
            <div className="text-4xl mb-3">👤</div>
            <h3 className="text-xl font-bold mb-2">My Profile</h3>
            <p className="text-gray-600">Update your information</p>
          </button>
        </div>

        {/* Tier Progress */}
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">🏆 Tier Progress</h3>
          <p className="text-gray-700 mb-4">
            You're {stats.tier} tier! Complete 53 more deliveries with 4.8★+ rating to reach PLATINUM
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full" style={{ width: '75%' }} />
          </div>
          <p className="text-sm text-gray-600">247 / 300 deliveries to Platinum</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

