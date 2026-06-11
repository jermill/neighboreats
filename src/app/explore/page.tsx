'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Slider from '@/components/shared/Slider'
import ChefCard from '@/components/shared/ChefCard'
import EmptyState from '@/components/shared/EmptyState'
import { useGeolocation, calculateDistance } from '@/lib/useGeolocation'
import { Chef } from '@/types'
import { Search, ShoppingCart, ChefHat, Car, MapPin, Star, TrendingUp, Filter, X } from 'lucide-react'

const categories = ['All', 'Mexican', 'Asian', 'American', 'Indian', 'Healthy', 'Baked Goods']
const dietaryTags = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Healthy']

export default function ExplorePage() {
  const router = useRouter()
  const [searchRadius, setSearchRadius] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance')
  const [showFilters, setShowFilters] = useState(false)
  const [chefs, setChefs] = useState<Chef[]>([])
  const [loading, setLoading] = useState(true)

  const { coords, status: geoStatus } = useGeolocation()
  const customerLat = coords.latitude
  const customerLon = coords.longitude

  // Fetch real chefs from database
  useEffect(() => {
    async function fetchChefs() {
      try {
        const response = await fetch('/api/chefs')
        if (response.ok) {
          const data = await response.json()
          setChefs(data.chefs || [])
        }
      } catch (error) {
        console.error('Error fetching chefs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchChefs()
  }, [])

  const filteredChefs = useMemo(() => {
    if (loading) return []
    
    let filteredList = chefs.map(chef => ({
      ...chef,
      distance: calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude)
    }))

    // Filter by radius
    filteredList = filteredList.filter(chef => chef.distance <= searchRadius)

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredList = filteredList.filter(chef => chef.categories.includes(selectedCategory))
    }

    // Filter by dietary tags
    if (selectedDietary.length > 0) {
      filteredList = filteredList.filter(chef =>
        selectedDietary.some(tag => chef.categories.includes(tag))
      )
    }

    // Sort
    if (sortBy === 'distance') {
      filteredList.sort((a, b) => a.distance - b.distance)
    } else {
      filteredList.sort((a, b) => b.rating - a.rating)
    }

    return filteredList
  }, [chefs, loading, searchRadius, selectedCategory, selectedDietary, sortBy])

  const toggleDietaryTag = (tag: string) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  const resetFilters = () => {
    setSearchRadius(5)
    setSelectedCategory('All')
    setSelectedDietary([])
    setSortBy('distance')
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedDietary.length > 0 || searchRadius !== 5

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
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

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-brand-teal transition font-medium"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup/customer"
                className="px-5 py-2 bg-brand-burgundy text-white rounded-xl hover:bg-customer-500 transition font-semibold shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Vertical Centered */}
      <div className="relative overflow-hidden py-16 md:py-20">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-burgundy/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-coral/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200">
              <MapPin className="w-4 h-4 text-brand-teal" />
              <span className="text-sm font-medium text-gray-700">
                Wilmington, DE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Discover Local Chefs
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse neighborhood chefs, explore their menus, and order fresh homemade meals
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-customer-500" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">{filteredChefs.length}</div>
                  <div className="text-sm text-gray-600">Local Chefs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900">4.8</div>
                  <div className="text-sm text-gray-600">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Mode Banner */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 shadow-lg">
          <p className="text-amber-900 text-center">
            👋 <strong>Guest Mode:</strong> Browsing as a guest. 
            <Link href="/auth/signup/customer" className="text-amber-700 font-bold hover:underline ml-1">
              Sign up free
            </Link> to order!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Filter Toggle Button (Mobile) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Browse Chefs
            <span className="text-base font-normal text-gray-500 ml-2">
              ({filteredChefs.length} nearby)
            </span>
          </h2>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-xl hover:border-brand-teal transition font-semibold text-gray-700"
          >
            {showFilters ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 bg-brand-burgundy text-white text-xs rounded-full">
                {(selectedCategory !== 'All' ? 1 : 0) + selectedDietary.length}
              </span>
            )}
          </button>
        </div>

        {/* Filters Section - Collapsible */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 space-y-6 animate-fadeIn">
            {/* Search Radius */}
            <div>
              <Slider
                value={searchRadius}
                onChange={setSearchRadius}
                min={0.5}
                max={15}
                step={0.5}
                label="Search Radius"
                valueLabel="miles"
              />
            </div>

            {/* Sort Options */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-3 block">Sort By</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSortBy('distance')}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'distance'
                      ? 'bg-brand-teal text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Nearest
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'rating'
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Top Rated
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-3 block">Cuisine</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-brand-burgundy text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filters */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-3 block">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleDietaryTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                      selectedDietary.includes(tag)
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-emerald-400'
                    }`}
                  >
                    {selectedDietary.includes(tag) && '✓ '}
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="w-full px-4 py-2 text-sm font-semibold text-gray-600 hover:text-brand-burgundy transition"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Chef Cards - Vertical Stack */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-burgundy"></div>
            </div>
          ) : filteredChefs.length > 0 ? (
            filteredChefs.map((chef, index) => (
              <div 
                key={chef.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <ChefCard
                  chef={chef}
                  distance={chef.distance}
                  onClick={() => router.push(`/explore/chef/${chef.id}`)}
                />
              </div>
            ))
          ) : (
            <EmptyState
              icon="🔍"
              title="No chefs found"
              description="Try adjusting your filters or expanding your search radius"
              action={{
                label: 'Reset Filters',
                onClick: resetFilters
              }}
            />
          )}
        </div>

        {/* Bottom CTA */}
        {filteredChefs.length > 0 && (
          <div className="mt-12 bg-gradient-to-br from-brand-burgundy to-customer-600 rounded-3xl p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Order?
            </h3>
            <p className="text-white/90 mb-6">
              Sign up to place orders and save your favorite chefs
            </p>
            <Link
              href="/auth/signup/customer"
              className="inline-block px-8 py-4 bg-white text-brand-burgundy font-bold rounded-2xl hover:bg-gray-100 transition shadow-xl"
            >
              Sign Up Free
            </Link>
          </div>
        )}
      </div>

      {/* Dark Mode Toggle */}
    </div>
  )
}
