'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Badge from '@/components/shared/Badge'
import ConnectOnboarding from '@/components/shared/ConnectOnboarding'
import { profileApi } from '@/lib/api-client'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function DriverProfilePage() {
  const { currentUser } = useStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    vehicle: '',
    vehicleModel: '',
    vehicleColor: '',
    vehiclePlate: ''
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { profile } = await profileApi.get()
        setForm({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          vehicle: profile.vehicle || '',
          vehicleModel: profile.vehicleModel || '',
          vehicleColor: profile.vehicleColor || '',
          vehiclePlate: profile.vehiclePlate || ''
        })
      } catch (error) {
        console.error('Profile fetch error:', error)
      }
    }
    fetchProfile()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setLoading(true)
    try {
      await profileApi.update({
        name: form.name,
        email: form.email,
        phone: form.phone,
        vehicle: form.vehicle,
        vehicleModel: form.vehicleModel,
        vehicleColor: form.vehicleColor,
        vehiclePlate: form.vehiclePlate
      })
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout userRole="driver" userName={currentUser?.name}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">My Profile</h1>

        {/* Profile Picture */}
        <Card>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              AM
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Profile Photo</h2>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>
        </Card>

        {/* Stripe Connect Onboarding */}
        <ConnectOnboarding userRole="driver" />

        {/* Profile Form */}
        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Personal Information</h2>
            <div className="space-y-4">
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
            </div>
          </Card>

          {/* Vehicle Information */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Vehicle Information</h2>
            <div className="space-y-4">
              <Input
                label="Vehicle Make & Model"
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                required
              />
              <Input
                label="Vehicle Model"
                value={form.vehicleModel}
                onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
                placeholder="Civic, Camry, etc."
              />
              <Input
                label="Vehicle Color"
                value={form.vehicleColor}
                onChange={(e) => setForm({ ...form, vehicleColor: e.target.value })}
                placeholder="Black, White, etc."
              />
              <Input
                label="License Plate"
                value={form.vehiclePlate}
                onChange={(e) => setForm({ ...form, vehiclePlate: e.target.value })}
                required
              />
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button 
              type="submit" 
              className="px-8"
              loading={loading}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save All Changes'}
            </Button>
          </div>
        </form>

        {/* Verification Status */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Verification Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-dark-text">Background Check</p>
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted">Includes driving record - Completed Dec 1, 2025</p>
                </div>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-dark-text">Stripe Account</p>
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted">Connected and active</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-dark-text">Driver's License</p>
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted">Verified and current</p>
                </div>
              </div>
              <Badge variant="success">Valid</Badge>
            </div>
          </div>
        </Card>

        {/* Performance Stats */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Performance Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Total Deliveries</p>
              <p className="text-3xl font-bold text-teal-600 dark:text-teal-400">247</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Rating</p>
              <p className="text-3xl font-bold text-yellow-500">4.9 ⭐</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">On-Time %</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">98%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Tier</p>
              <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">GOLD ⭐</p>
            </div>
          </div>
        </Card>

        {/* Tier Progress */}
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-yellow-200 dark:border-yellow-800">
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-dark-text">🏆 Tier Progress</h3>
          <p className="text-gray-700 dark:text-dark-text-muted mb-4">
            You're GOLD tier earning $4.50 per delivery. Complete 253 more deliveries with 4.9★+ rating to reach PLATINUM ($5.00/delivery)
          </p>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-4 rounded-full" style={{ width: '49.4%' }} />
          </div>
          <p className="text-sm text-gray-600">247 / 500 deliveries</p>
        </Card>
      </div>
    </DashboardLayout>
  )
}


