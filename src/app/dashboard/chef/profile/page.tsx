'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Card from '@/components/shared/Card'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Button from '@/components/shared/Button'
import Slider from '@/components/shared/Slider'
import Badge from '@/components/shared/Badge'
import ConnectOnboarding from '@/components/shared/ConnectOnboarding'
import { profileApi } from '@/lib/api-client'
import { useStore } from '@/lib/store'
import toast from 'react-hot-toast'

export default function ChefProfilePage() {
  const { currentUser } = useStore()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    bio: '',
    kitchenAddress: '',
    deliveryRadius: 5
  })

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = ['Mexican', 'Asian', 'American', 'Italian', 'Indian', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Healthy']

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { profile } = await profileApi.get()
        setForm({
          name: profile.name || '',
          email: profile.email || '',
          phone: profile.phone || '',
          bio: profile.bio || '',
          kitchenAddress: profile.kitchenAddress || '',
          deliveryRadius: profile.deliveryRadius || 5
        })
        setSelectedCategories(profile.categories || [])
      } catch (error) {
        console.error('Profile fetch error:', error)
      }
    }
    fetchProfile()
  }, [])

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await profileApi.update({
        name: form.name,
        email: form.email,
        phone: form.phone,
        bio: form.bio,
        kitchenAddress: form.kitchenAddress,
        deliveryRadius: form.deliveryRadius,
        categories: selectedCategories
      })
      toast.success('Profile updated!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout userRole="chef" userName={currentUser?.name}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-dark-text">My Profile</h1>

        {/* Profile Picture */}
        <Card>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
              MR
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Profile Photo</h2>
              <Button variant="outline" size="sm">Change Photo</Button>
            </div>
          </div>
        </Card>

        {/* Stripe Connect Onboarding */}
        <ConnectOnboarding userRole="chef" />

        {/* Public Profile Preview */}
        <Card className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20">
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-dark-text">Public Profile</h3>
          <p className="text-gray-600 dark:text-dark-text-muted mb-3">This is how customers see your profile</p>
          <div className="bg-white dark:bg-dark-card rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text">{form.name || 'Your Name'}</h4>
              <Badge variant="success">⭐ 4.9</Badge>
            </div>
            <p className="text-gray-700 dark:text-dark-text-muted mb-3">{form.bio || 'Add your bio to let customers know about your cooking style...'}</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.length > 0 ? (
                selectedCategories.map(cat => (
                  <Badge key={cat} variant="info">{cat}</Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-dark-text-muted">Select categories below</p>
              )}
            </div>
          </div>
        </Card>

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
              <Textarea
                label="Bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                helperText="Tell customers about your cooking style and specialties"
                required
              />
            </div>
          </Card>

          {/* Kitchen Information */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Kitchen Information</h2>
            <div className="space-y-4">
              <Input
                label="Kitchen Address"
                value={form.kitchenAddress}
                onChange={(e) => setForm({ ...form, kitchenAddress: e.target.value })}
                required
              />
              <Slider
                value={form.deliveryRadius}
                onChange={(val) => setForm({ ...form, deliveryRadius: val })}
                min={1}
                max={15}
                step={0.5}
                label="Delivery Radius"
                valueLabel="miles"
              />
            </div>
          </Card>

          {/* Categories */}
          <Card>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Your Categories</h2>
            <p className="text-gray-600 dark:text-dark-text-muted mb-4">Select all that apply to your cooking style</p>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    selectedCategories.includes(cat)
                      ? 'bg-gradient-to-r from-teal-600 to-teal-500 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-dark-border'
                  }`}
                >
                  {cat}
                </button>
              ))}
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
                  <p className="text-sm text-gray-600 dark:text-dark-text-muted">Completed on Dec 1, 2025</p>
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
          </div>
        </Card>

        {/* Account Stats */}
        <Card>
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-dark-text">Account Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Total Orders</p>
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">487</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Rating</p>
              <p className="text-2xl font-bold text-yellow-500">4.9 ⭐</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Subscribers</p>
              <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-dark-text-muted">Member Since</p>
              <p className="text-lg font-bold text-gray-900 dark:text-dark-text">Jan 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}


