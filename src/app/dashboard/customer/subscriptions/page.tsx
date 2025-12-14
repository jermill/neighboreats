'use client'

import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Badge from '@/components/shared/Badge'
import Button from '@/components/shared/Button'
import EmptyState from '@/components/shared/EmptyState'
import { mockSubscriptions } from '@/lib/mockData'

export default function SubscriptionsPage() {
  const router = useRouter()
  const { currentUser } = useStore()

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">My Subscriptions</h1>
          <Button onClick={() => router.push('/dashboard/customer/search')}>
            Browse Plans
          </Button>
        </div>

        {mockSubscriptions.length > 0 ? (
          <div className="space-y-4">
            {mockSubscriptions.map((sub) => (
              <Card key={sub.id}>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={sub.chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400'}
                      alt={sub.chef.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{sub.tier.name}</h3>
                        <p className="text-gray-600">by {sub.chef.name}</p>
                      </div>
                      <Badge variant={sub.status === 'active' ? 'success' : 'warning'}>
                        {sub.status}
                      </Badge>
                    </div>

                    <p className="text-gray-700 mb-3">{sub.tier.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Meals/Week</p>
                        <p className="font-bold">{sub.tier.mealsPerWeek}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monthly Price</p>
                        <p className="font-bold text-teal-600">${sub.tier.monthlyPrice.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Next Billing</p>
                        <p className="font-bold">{new Date(sub.nextBillingDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-bold capitalize">{sub.status}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {sub.status === 'active' && (
                        <>
                          <Button variant="outline" size="sm">Pause</Button>
                          <Button variant="outline" size="sm">Upgrade</Button>
                          <Button variant="danger" size="sm">Cancel</Button>
                        </>
                      )}
                      {sub.status === 'paused' && (
                        <Button size="sm">Resume</Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="📅"
            title="No active subscriptions"
            description="Subscribe to your favorite chefs for regular weekly meals and save up to 25%"
            action={{
              label: 'Browse Meal Plans',
              onClick: () => router.push('/dashboard/customer/search')
            }}
          />
        )}
      </div>
    </DashboardLayout>
  )
}


