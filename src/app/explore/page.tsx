'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Slider from '@/components/shared/Slider'
import ChefCard from '@/components/shared/ChefCard'
import EmptyState from '@/components/shared/EmptyState'
import { mockChefs, calculateDistance } from '@/lib/mockData'
import { Search, ShoppingCart, ChefHat, Car } from 'lucide-react'

const categories = ['All', 'Mexican', 'Asian', 'American', 'Indian', 'Healthy', 'Baked Goods']
const dietaryTags = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Healthy']

export default function ExplorePage() {
  const router = useRouter()
  const [searchRadius, setSearchRadius] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance')

  const customerLat = 39.7459
  const customerLon = -75.5466

  const filteredChefs = useMemo(() => {
    let chefs = mockChefs.map(chef => ({
      ...chef,
      distance: calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude)
    }))

    // Filter by radius
    chefs = chefs.filter(chef => chef.distance <= searchRadius)

    // Filter by category
    if (selectedCategory !== 'All') {
      chefs = chefs.filter(chef => chef.categories.includes(selectedCategory))
    }

    // Filter by dietary tags
    if (selectedDietary.length > 0) {
      chefs = chefs.filter(chef =>
        selectedDietary.some(tag => chef.categories.includes(tag))
      )
    }

    // Sort
    if (sortBy === 'distance') {
      chefs.sort((a, b) => a.distance - b.distance)
    } else {
      chefs.sort((a, b) => b.rating - a.rating)
    }

    return chefs
  }, [searchRadius, selectedCategory, selectedDietary, sortBy])

  const toggleDietaryTag = (tag: string) => {
    setSelectedDietary(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">
              🍽️ Neighbor<span className="text-teal-600">Eats</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/auth/signup/chef"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-teal-600 transition font-medium"
              >
                <ChefHat className="w-5 h-5" />
                Become a Chef
              </Link>
              <Link
                href="/auth/signup/driver"
                className="hidden md:flex items-center gap-2 text-gray-700 hover:text-teal-600 transition font-medium"
              >
                <Car className="w-5 h-5" />
                Become a Driver
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 hover:text-teal-600 transition font-medium"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup/customer"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Local Chefs Near You
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Browse neighborhood chefs, view their menus, and discover fresh, homemade meals
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md">
              <Search className="w-5 h-5 text-teal-600" />
              <span className="text-gray-700 font-medium">
                Showing chefs in Wilmington, DE area
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-amber-900">
              👋 <strong>Guest Mode:</strong> You're browsing as a guest. 
              <Link href="/auth/signup/customer" className="text-amber-700 font-semibold hover:underline ml-1">
                Sign up for free
              </Link> to place orders and save your favorites!
            </p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Radius Slider */}
            <Slider
              value={searchRadius}
              onChange={setSearchRadius}
              min={0.5}
              max={15}
              step={0.5}
              label="Search Radius"
              valueLabel="miles"
            />

            {/* Categories */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full font-medium transition ${
                      selectedCategory === category
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filters */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleDietaryTag(tag)}
                    className={`px-4 py-2 rounded-full font-medium transition ${
                      selectedDietary.includes(tag)
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('distance')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    sortBy === 'distance'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  📍 Distance
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    sortBy === 'rating'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  ⭐ Rating
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div>
            <p className="text-gray-600 mb-4">
              Found {filteredChefs.length} chef{filteredChefs.length !== 1 ? 's' : ''} within {searchRadius} miles
            </p>

            {filteredChefs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredChefs.map(chef => (
                  <ChefCard
                    key={chef.id}
                    chef={chef}
                    distance={chef.distance}
                    onClick={() => router.push(`/explore/chef/${chef.id}`)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                icon="🔍"
                title="No chefs found"
                description="Try adjusting your filters or expanding your search radius"
                action={{
                  label: 'Reset Filters',
                  onClick: () => {
                    setSearchRadius(5)
                    setSelectedCategory('All')
                    setSelectedDietary([])
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
