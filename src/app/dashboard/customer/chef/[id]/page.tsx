'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Rating from '@/components/shared/Rating'
import Badge from '@/components/shared/Badge'
import Button from '@/components/shared/Button'
import MenuItemCard from '@/components/shared/MenuItemCard'
import LiveBadge from '@/components/shared/LiveBadge'
import { mockChefs, mockMenuItems, mockReviews, calculateDistance } from '@/lib/mockData'
import { Chef, MenuItem, Review } from '@/types'
import toast from 'react-hot-toast'

export default function ChefProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { currentUser, addToCart, cart } = useStore()
  const [activeTab, setActiveTab] = useState<'menu' | 'subscriptions' | 'reviews'>('menu')
  const [chef, setChef] = useState<Chef | null>(null)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchChefDetails() {
      try {
        const response = await fetch(`/api/chefs/${params.id}`)
        if (response.ok) {
          const data = await response.json()
          setChef(data.chef)
          setMenuItems(data.menuItems || [])
          setReviews(data.reviews || [])
        } else {
          // Fallback to mock data
          const mockChef = mockChefs.find(c => c.id === params.id)
          if (mockChef) {
            setChef(mockChef)
            setMenuItems(mockMenuItems.filter(item => item.chefId === params.id))
            setReviews(mockReviews.filter(r => r.chefId === params.id))
          }
        }
      } catch (error) {
        console.error('Error fetching chef details:', error)
        // Fallback to mock data
        const mockChef = mockChefs.find(c => c.id === params.id)
        if (mockChef) {
          setChef(mockChef)
          setMenuItems(mockMenuItems.filter(item => item.chefId === params.id))
          setReviews(mockReviews.filter(r => r.chefId === params.id))
        }
      } finally {
        setLoading(false)
      }
    }

    fetchChefDetails()
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout userRole="customer" userName={currentUser?.name}>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!chef) {
    return (
      <DashboardLayout userRole="customer" userName={currentUser?.name}>
        <div>Chef not found</div>
      </DashboardLayout>
    )
  }

  const customerLat = 39.7459
  const customerLon = -75.5466
  const distance = calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude)

  const handleAddToCart = (item: typeof menuItems[0]) => {
    addToCart({ menuItem: item, quantity: 1, chef })
    toast.success(`${item.name} added to cart!`)
  }

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        {/* Chef Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-teal-600 to-teal-700" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row gap-6 -mt-16">
              <div className="w-32 h-32 rounded-lg overflow-hidden border-4 border-white shadow-lg bg-white">
                <img
                  src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400'}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 mt-16 md:mt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">{chef.name}</h1>
                      {chef.isLive && <LiveBadge viewerCount={12} />}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Rating value={chef.rating} readonly size="sm" showValue />
                        <span className="text-sm">({chef.totalReviews} reviews)</span>
                      </div>
                      <span>📍 {distance.toFixed(1)} miles away</span>
                      <span>👥 {chef.activeSubscribers} subscribers</span>
                    </div>
                  </div>

                  {chef.isLive && (
                    <Button variant="danger" className="mt-4 md:mt-0">
                      🔴 Watch LIVE
                    </Button>
                  )}
                </div>

                <p className="text-gray-700 mb-4">{chef.bio}</p>

                <div className="flex flex-wrap gap-2">
                  {chef.categories.map(category => (
                    <Badge key={category} variant="info">{category}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              {['menu', 'subscriptions', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`py-4 font-semibold capitalize transition ${
                    activeTab === tab
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map(item => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                ))}
              </div>
            )}

            {/* Subscriptions Tab */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-4">
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">5-Day Meal Plan</h3>
                  <p className="text-gray-700 mb-4">Perfect for weekday lunches. Save 15% vs à la carte!</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-600">$95/month</span>
                    <Button>Subscribe Now</Button>
                  </div>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2">7-Day Full Week</h3>
                  <p className="text-gray-700 mb-4">Complete week coverage. Save 20%!</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-teal-600">$129/month</span>
                    <Button>Subscribe Now</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold">{review.customerName}</span>
                      <Rating value={review.rating} readonly size="sm" />
                      <span className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Cart Button */}
        {cartItemCount > 0 && (
          <div className="fixed bottom-20 md:bottom-6 right-6 z-40">
            <Button
              size="lg"
              onClick={() => router.push('/dashboard/customer/cart')}
              className="shadow-lg"
            >
              🛒 View Cart ({cartItemCount})
            </Button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


