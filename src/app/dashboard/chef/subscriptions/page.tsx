'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import toast from 'react-hot-toast'

export default function SubscriptionsPage() {
  const chefName = "Maria Rodriguez"
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({
    name: '',
    mealsPerWeek: '',
    monthlyPrice: '',
    description: ''
  })

  const tiers = [
    { id: 1, name: '5-Day Meal Plan', mealsPerWeek: 5, monthlyPrice: 95.00, subscribers: 24, active: true },
    { id: 2, name: '7-Day Full Week', mealsPerWeek: 7, monthlyPrice: 129.00, subscribers: 18, active: true },
    { id: 3, name: '3-Day Starter', mealsPerWeek: 3, monthlyPrice: 54.00, subscribers: 12, active: true },
  ]

  const handleSave = () => {
    toast.success('Subscription tier created!')
    setShowModal(false)
  }

  return (
    <DashboardLayout userRole="chef" userName={chefName}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Subscription Tiers</h1>
          <Button onClick={() => setShowModal(true)}>
            + Create New Tier
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <p className="text-sm text-gray-600 mb-2">Total Subscribers</p>
            <p className="text-3xl font-bold text-teal-600">54</p>
            <p className="text-xs text-green-600 mt-1">↑ 6 this week</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">Monthly Recurring Revenue</p>
            <p className="text-3xl font-bold text-teal-600">$5,346</p>
            <p className="text-xs text-green-600 mt-1">↑ 12% vs last month</p>
          </Card>
          <Card>
            <p className="text-sm text-gray-600 mb-2">Avg Subscriber Value</p>
            <p className="text-3xl font-bold text-teal-600">$99</p>
          </Card>
        </div>

        {/* Tiers */}
        <div className="space-y-4">
          {tiers.map(tier => (
            <Card key={tier.id}>
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold">{tier.name}</h3>
                    {tier.active && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3">
                    {tier.mealsPerWeek} meals per week
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Price</p>
                      <p className="text-xl font-bold text-teal-600">${tier.monthlyPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Subscribers</p>
                      <p className="text-xl font-bold">{tier.subscribers}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-xl font-bold text-green-600">
                        ${(tier.monthlyPrice * tier.subscribers).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View Subscribers</Button>
                    <Button variant="danger" size="sm">Deactivate</Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="bg-teal-50 border-2 border-teal-200">
          <h3 className="text-lg font-bold mb-2">💡 Subscription Tips</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Offer 15-25% discount vs à la carte to encourage subscriptions</li>
            <li>• Higher meal counts earn you higher payout percentages (up to 85%)</li>
            <li>• Subscribers provide predictable recurring revenue</li>
            <li>• Consider offering a "Chef's Choice" tier for variety</li>
          </ul>
        </Card>
      </div>

      {/* Create Tier Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Create Subscription Tier"
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
          <Input
            label="Tier Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="e.g., 5-Day Meal Plan"
            required
          />
          <Input
            label="Meals Per Week"
            type="number"
            value={form.mealsPerWeek}
            onChange={(e) => setForm({ ...form, mealsPerWeek: e.target.value })}
            placeholder="5"
            required
          />
          <Input
            label="Monthly Price"
            type="number"
            step="0.01"
            value={form.monthlyPrice}
            onChange={(e) => setForm({ ...form, monthlyPrice: e.target.value })}
            placeholder="95.00"
            required
          />
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Perfect for weekday lunches..."
          />
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">Create Tier</Button>
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  )
}


