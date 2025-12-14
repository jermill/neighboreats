'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { currentUser } = useStore()
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '123 Main St',
    city: 'Wilmington',
    state: 'DE',
    zip: '19801'
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Profile updated successfully!')
  }

  const dietaryPreferences = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Paleo']
  const [selectedDietary, setSelectedDietary] = useState<string[]>(['Gluten-Free'])

  const toggleDietary = (pref: string) => {
    setSelectedDietary(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    )
  }

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

        {/* Profile Picture */}
        <Card>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              {currentUser?.name?.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">{currentUser?.name}</h2>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        {/* Delivery Address */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Default Delivery Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Street Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                label="City"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                required
              />
              <Input
                label="State"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                required
              />
              <Input
                label="ZIP"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Save Address</Button>
          </form>
        </Card>

        {/* Dietary Preferences */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Dietary Preferences</h2>
          <p className="text-gray-600 mb-4">
            Help us show you relevant chefs and meals
          </p>
          <div className="flex flex-wrap gap-2">
            {dietaryPreferences.map(pref => (
              <button
                key={pref}
                onClick={() => toggleDietary(pref)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedDietary.includes(pref)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </Card>

        {/* Account Stats */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-teal-600">23</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-lg font-bold">Jan 2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Favorite Chefs</p>
              <p className="text-2xl font-bold text-teal-600">3</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Savings</p>
              <p className="text-2xl font-bold text-green-600">$127</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}

