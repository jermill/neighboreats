'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'

export default function DriverEarningsPage() {
  const driverName = "Alex Martinez"

  const earnings = {
    today: 54.00,
    week: 287.50,
    month: 1124.00,
    allTime: 5678.00
  }

  const payouts = [
    { id: 1, date: '2025-12-08', amount: 287.50, deliveries: 64, status: 'completed' },
    { id: 2, date: '2025-12-01', amount: 271.25, deliveries: 61, status: 'completed' },
    { id: 3, date: '2025-11-24', amount: 253.50, deliveries: 58, status: 'completed' },
  ]

  return (
    <DashboardLayout userRole="driver" userName={driverName}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>

        {/* Earnings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm text-gray-600 mb-2">Today</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.today.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">12 deliveries</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">This Week</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.week.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">64 deliveries</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">This Month</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.month.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">247 deliveries</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">All Time</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.allTime.toFixed(2)}</p>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600">On-Time Rate</p>
              <p className="text-3xl font-bold text-green-600">98%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-3xl font-bold text-yellow-500">4.9 ⭐</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-3xl font-bold text-blue-600">99.5%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg per Delivery</p>
              <p className="text-3xl font-bold text-teal-600">$4.55</p>
            </div>
          </div>
        </Card>

        {/* Tier Information */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
          <h2 className="text-xl font-bold mb-3">⭐ GOLD Tier Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-900">Base Pay</p>
              <p className="text-2xl font-bold text-green-600">$4.50 per delivery</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">Weekly Bonus Eligible</p>
              <p className="text-lg text-gray-700">+$0.50/delivery for 95%+ on-time</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Next Tier:</strong> Reach PLATINUM at 500 deliveries with 4.9★+ rating for $5.00 per delivery!
            </p>
          </div>
        </Card>

        {/* Earnings Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">This Week Breakdown</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Base Pay (64 deliveries)</span>
                <span className="font-bold">$288.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">On-Time Bonus</span>
                <span className="font-bold text-green-600">+$32.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Perfect Week Bonus</span>
                <span className="font-bold text-green-600">+$25.00</span>
              </div>
              <div className="border-t pt-3 flex justify-between text-lg">
                <span className="font-bold">Total</span>
                <span className="font-bold text-teal-600">${earnings.week.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Bonus Opportunities</h2>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-800">✓ Perfect Week</p>
                <p className="text-sm text-gray-600">Zero late deliveries</p>
                <p className="font-bold text-green-600">+$25</p>
              </div>
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="font-semibold text-blue-800">On-Time Bonus</p>
                <p className="text-sm text-gray-600">95%+ on-time rate</p>
                <p className="font-bold text-blue-600">+$0.50/delivery</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payout History */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Payout History</h2>
            <Badge variant="info">Next payout: Friday</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Deliveries</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map(payout => (
                  <tr key={payout.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{new Date(payout.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-bold text-teal-600">${payout.amount.toFixed(2)}</td>
                    <td className="py-3 px-4">{payout.deliveries}</td>
                    <td className="py-3 px-4">
                      <Badge variant="success">Completed</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}


