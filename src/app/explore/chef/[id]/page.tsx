'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Rating from '@/components/shared/Rating'
import Badge from '@/components/shared/Badge'
import Button from '@/components/shared/Button'
import MenuItemCard from '@/components/shared/MenuItemCard'
import LiveBadge from '@/components/shared/LiveBadge'
import Modal from '@/components/shared/Modal'
import { mockChefs, mockMenuItems, mockReviews, calculateDistance } from '@/lib/mockData'
import { ChefHat, Car, ArrowLeft } from 'lucide-react'

export default function GuestChefProfilePage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'menu' | 'subscriptions' | 'reviews'>('menu')
  const [showSignupModal, setShowSignupModal] = useState(false)

  const chef = mockChefs.find(c => c.id === params.id)
  const menuItems = mockMenuItems.filter(item => item.chefId === params.id)
  const reviews = mockReviews.filter(r => r.chefId === params.id)

  if (!chef) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Chef not found</h1>
          <Link href="/explore" className="text-brand-teal hover:underline">
            Back to explore
          </Link>
        </div>
      </div>
    )
  }

  const customerLat = 39.7459
  const customerLon = -75.5466
  const distance = calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude)

  const handleOrderAttempt = () => {
    setShowSignupModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="NeighborEats"
                width={160}
                height={48}
                className="h-10 w-auto"
              />
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/apply/chef"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-brand-teal transition font-medium"
              >
                <ChefHat className="w-5 h-5" />
                Become a Chef
              </Link>
              <Link
                href="/apply/driver"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-brand-teal transition font-medium"
              >
                <Car className="w-5 h-5" />
                Become a Driver
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-brand-teal transition font-medium"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup/customer"
                className="px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal transition font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Back Button */}
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-gray-700 hover:text-brand-teal transition font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all chefs
          </Link>

          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900">
              👋 <strong>Guest Mode:</strong> 
              <Link href="/auth/signup/customer" className="text-amber-700 font-semibold hover:underline ml-1">
                Sign up for free
              </Link> to order from this chef!
            </p>
          </div>

          {/* Chef Profile Card - Modern Design */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Hero Image Section with Extended Gradient */}
            <div className="relative overflow-hidden">
              {/* Chef Photo - Extended height for stats */}
              <div className="h-[75vh] min-h-[600px]">
                <img
                  src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&h=1200&fit=crop'}
                  alt={chef.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Extended Gradient Overlay - seamless fade */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/95" />
              
              {/* Live Badge (Top Right) */}
              {chef.isLive && (
                <div className="absolute top-6 right-6 z-10">
                  <button 
                    onClick={handleOrderAttempt}
                    className="px-5 py-2.5 bg-red-600/95 backdrop-blur-sm text-white rounded-full font-bold shadow-xl hover:bg-red-700 transition-all flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></span>
                    LIVE
                  </button>
                </div>
              )}

              {/* Content Overlay - Name, Bio, Categories, Stats */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{chef.name}</h1>
                <p className="text-lg text-white/90 mb-5">{chef.bio}</p>
                
                {/* Categories/Specialties */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {chef.categories.map((category, index) => {
                    const icons = ['🍽️', '🥗', '🍕', '🥘', '🍰'];
                    const colors = [
                      'bg-brand-teal/90',
                      'bg-amber-500/90',
                      'bg-amber-700/90',
                      'bg-blue-500/90',
                      'bg-purple-500/90',
                    ];
                    return (
                      <div 
                        key={category} 
                        className={`${colors[index % colors.length]} backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold text-sm flex items-center gap-2 shadow-lg`}
                      >
                        <span>{icons[index % icons.length]}</span>
                        {category}
                      </div>
                    );
                  })}
                </div>

                {/* Stats Pills - Unified Dark Style */}
                <div className="bg-slate-800/95 backdrop-blur-md rounded-full px-2 py-2 shadow-xl">
                  <div className="flex gap-2 items-center">
                    {/* Rating */}
                    <div className="px-4 py-1.5 flex items-center gap-1.5">
                      <span className="text-white font-bold">⭐ {chef.rating}</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-px h-4 bg-white/20"></div>
                    
                    {/* Total Orders */}
                    <div className="px-4 py-1.5 flex items-center gap-1.5">
                      <span className="text-white font-semibold">{chef.totalReviews}</span>
                      <span className="text-white/70 text-sm">orders</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-px h-4 bg-white/20"></div>
                    
                    {/* Distance */}
                    <div className="px-4 py-1.5 flex items-center gap-1.5">
                      <span className="text-white font-semibold">{distance.toFixed(1)} mi</span>
                    </div>
                    
                    {/* Divider */}
                    <div className="w-px h-4 bg-white/20"></div>
                    
                    {/* Followers */}
                    <div className="px-4 py-1.5 flex items-center gap-1.5">
                      <span className="text-white font-semibold">{chef.activeSubscribers}</span>
                      <span className="text-white/70 text-sm">followers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs - Modern Style */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="bg-gray-50 px-4 py-3">
              <div className="flex gap-2">
                {['menu', 'subscriptions', 'reviews'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`flex-1 py-3 px-4 font-bold capitalize transition-all rounded-2xl ${
                      activeTab === tab
                        ? 'bg-brand-teal text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
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
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu Items</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={item}
                        onAddToCart={handleOrderAttempt}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Subscriptions Tab */}
              {activeTab === 'subscriptions' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Meal Plans</h2>
                  <div className="space-y-6">
                    {/* Plan 1 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all">
                      <div className="absolute top-4 right-4 bg-brand-teal text-white px-4 py-1.5 rounded-full text-xs font-bold">
                        SAVE 15%
                      </div>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">5-Day Meal Plan</h3>
                        <p className="text-gray-700 text-base">Perfect for weekday lunches. Fresh meals delivered Monday through Friday.</p>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <span className="text-4xl font-bold text-brand-teal">$95</span>
                          <span className="text-gray-600 text-lg">/month</span>
                          <p className="text-sm text-gray-500 mt-1">~$19 per day</p>
                        </div>
                        <Button className="px-8 py-3" onClick={handleOrderAttempt}>
                          Subscribe
                        </Button>
                      </div>
                    </div>

                    {/* Plan 2 */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-amber-50 border-2 border-rose-200 rounded-3xl p-6 md:p-8 hover:shadow-2xl transition-all">
                      <div className="absolute top-4 right-4 bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold">
                        SAVE 20%
                      </div>
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">7-Day Full Week</h3>
                        <p className="text-gray-700 text-base">Complete week coverage. Every day taken care of with delicious meals.</p>
                      </div>
                      <div className="flex items-center justify-between mt-6">
                        <div>
                          <span className="text-4xl font-bold text-rose-600">$129</span>
                          <span className="text-gray-600 text-lg">/month</span>
                          <p className="text-sm text-gray-500 mt-1">~$18 per day</p>
                        </div>
                        <Button className="px-8 py-3" onClick={handleOrderAttempt}>
                          Subscribe
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                  <div className="space-y-4">
                    {reviews.map(review => (
                      <div key={review.id} className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all">
                        <div className="flex items-start gap-4">
                          {/* Avatar */}
                          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-brand-teal rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                            {review.customerName.charAt(0)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <span className="font-bold text-gray-900">{review.customerName}</span>
                                <div className="flex items-center gap-2 mt-1">
                                  <Rating value={review.rating} readonly size="sm" />
                                  <span className="text-sm text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <Modal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} title="Sign Up to Order">
        <div className="space-y-4">
          <p className="text-gray-700">
            Create a free account to place orders, save favorites, and get personalized recommendations!
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Order from local chefs</strong>
                <p className="text-sm text-gray-600">Browse menus and place orders</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Track your orders</strong>
                <p className="text-sm text-gray-600">Get real-time updates on delivery</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Save your favorites</strong>
                <p className="text-sm text-gray-600">Quick reorder from your favorite chefs</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => router.push('/auth/signup/customer')}
            >
              Sign Up Free
            </Button>
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => router.push('/auth/login')}
            >
              Log In
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

