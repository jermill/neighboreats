'use client'

import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'

export default function ChefEarningsPage() {
  const chefName = "Maria Rodriguez"

  const earnings = {
    today: 247.50,
    week: 1247.50,
    month: 4892.00,
    allTime: 23456.00
  }

  const payouts = [
    { id: 1, date: '2025-12-08', amount: 1247.50, status: 'completed' },
    { id: 2, date: '2025-12-01', amount: 1189.25, status: 'completed' },
    { id: 3, date: '2025-11-24', amount: 1056.75, status: 'completed' },
  ]

  return (
    <DashboardLayout userRole="chef" userName={chefName}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>

        {/* Earnings Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <p className="text-sm text-gray-600 mb-2">Today</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.today.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs yesterday</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">This Week</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.week.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">↑ 8% vs last week</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">This Month</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.month.toFixed(2)}</p>
            <p className="text-xs text-green-600 mt-1">↑ 15% vs last month</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">All Time</p>
            <p className="text-3xl font-bold text-teal-600">${earnings.allTime.toFixed(2)}</p>
          </Card>
        </div>

        {/* Commission Breakdown */}
        <Card className="bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-teal-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Commission Breakdown</h2>
              <p className="text-sm text-gray-600 mt-1">This month's earnings breakdown</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Your Rate</p>
              <p className="text-2xl font-bold text-teal-600">85%</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 font-medium">Total Order Value</span>
                <span className="text-xl font-bold text-gray-900">${(earnings.month / 0.85).toFixed(2)}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div className="bg-gray-400 h-2 rounded-full" style={{ width: '100%' }} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-teal-600 rounded-full mr-2"></span>
                    <span className="text-gray-700">Your Earnings (85%)</span>
                  </div>
                  <span className="font-bold text-teal-600">${earnings.month.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
                    <span className="text-gray-700">Platform Fee (15%)</span>
                  </div>
                  <span className="font-bold text-gray-600">${((earnings.month / 0.85) * 0.15).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                <strong>💡 How it works:</strong> NeighborEats takes a 15% commission from each order to cover payment processing, customer support, platform maintenance, and marketing. You keep 85% of every sale!
              </p>
            </div>
          </div>
        </Card>

        {/* Revenue Chart Placeholder */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Revenue Trend</h2>
          <div className="h-64 bg-gradient-to-br from-teal-50 to-blue-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📈</div>
              <p className="text-gray-600 font-medium">Revenue Chart</p>
              <p className="text-sm text-gray-500">Chart visualization coming soon</p>
            </div>
          </div>
        </Card>

        {/* Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold mb-4">Revenue by Type</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-700">À la Carte</span>
                <span className="font-bold text-teal-600">$2,847.50 (58%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-teal-600 h-2 rounded-full" style={{ width: '58%' }} />
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-700">Subscriptions</span>
                <span className="font-bold text-blue-600">$2,044.50 (42%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }} />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold mb-4">Top Categories</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Meals</span>
                <span className="font-bold">$3,247.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Beverages</span>
                <span className="font-bold">$892.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Baked Goods</span>
                <span className="font-bold">$752.50</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Payout History */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Payout History</h2>
            <Badge variant="info">Next payout: Dec 15</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map(payout => (
                  <tr key={payout.id} className="border-b border-gray-100">
                    <td className="py-3 px-4">{new Date(payout.date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-bold text-teal-600">${payout.amount.toFixed(2)}</td>
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


