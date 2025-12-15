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
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>

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
        <Card className="bg-gray-50">
          <h3 className="text-lg font-bold mb-2">Public Profile</h3>
          <p className="text-gray-600 mb-3">This is how customers see your profile</p>
          <div className="bg-white rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="text-xl font-bold">{form.name}</h4>
              <Badge variant="success">⭐ 4.9</Badge>
            </div>
            <p className="text-gray-700 mb-3">{form.bio}</p>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map(cat => (
                <Badge key={cat} variant="info">{cat}</Badge>
              ))}
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
            <Textarea
              label="Bio"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              helperText="Tell customers about your cooking style and specialties"
              required
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        {/* Kitchen Information */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Kitchen Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button type="submit">Save Changes</Button>
          </form>
        </Card>

        {/* Categories */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Your Categories</h2>
          <p className="text-gray-600 mb-4">Select all that apply to your cooking style</p>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategories.includes(cat)
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Card>

        {/* Verification Status */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Verification Status</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold">Background Check</p>
                  <p className="text-sm text-gray-600">Completed on Dec 1, 2025</p>
                </div>
              </div>
              <Badge variant="success">Verified</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="font-semibold">Stripe Account</p>
                  <p className="text-sm text-gray-600">Connected and active</p>
                </div>
              </div>
              <Badge variant="success">Connected</Badge>
            </div>
          </div>
        </Card>

        {/* Account Stats */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Account Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-teal-600">487</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-yellow-500">4.9 ⭐</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Subscribers</p>
              <p className="text-2xl font-bold text-teal-600">24</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-lg font-bold">Jan 2025</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}


