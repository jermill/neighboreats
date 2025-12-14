'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Slider from '@/components/shared/Slider'
import ChefCard from '@/components/shared/ChefCard'
import EmptyState from '@/components/shared/EmptyState'
import { mockChefs, calculateDistance } from '@/lib/mockData'
import { Search, ShoppingCart, ChefHat, Car } from 'lucide-react'
import ThemeToggle from '@/components/shared/ThemeToggle'

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
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Header/Navbar */}
      <nav className="bg-white dark:bg-dark-bg-secondary shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold">
              🍽️ Neighbor<span className="text-brand-teal dark:text-primary-dark">Eats</span>
            </Link>

            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Link
                href="/auth/signup/chef"
                className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-teal dark:hover:text-primary-dark transition font-medium"
              >
                <ChefHat className="w-5 h-5" />
                Become a Chef
              </Link>
              <Link
                href="/auth/signup/driver"
                className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-brand-teal dark:hover:text-primary-dark transition font-medium"
              >
                <Car className="w-5 h-5" />
                Become a Driver
              </Link>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-brand-teal dark:hover:text-primary-dark transition font-medium"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup/customer"
                className="px-4 py-2 bg-brand-teal dark:bg-primary-dark text-white rounded-lg hover:bg-brand-teal dark:hover:bg-brand-teal transition font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-dark-bg-secondary dark:to-dark-bg py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text mb-4">
              Explore Local Chefs Near You
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              Browse neighborhood chefs, view their menus, and discover fresh, homemade meals
            </p>
            <div className="inline-flex items-center gap-2 bg-white dark:bg-dark-bg-secondary px-6 py-3 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
              <Search className="w-5 h-5 text-brand-teal dark:text-primary-dark" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Showing chefs in Wilmington, DE area
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Info Banner */}
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
            <p className="text-amber-900 dark:text-amber-200">
              👋 <strong>Guest Mode:</strong> You're browsing as a guest. 
              <Link href="/auth/signup/customer" className="text-amber-700 dark:text-amber-400 font-semibold hover:underline ml-1">
                Sign up for free
              </Link> to place orders and save your favorites!
            </p>
          </div>

          {/* Filters - Modern Compact Design */}
          <div className="bg-white dark:bg-dark-bg-secondary rounded-3xl shadow-xl p-5 space-y-5 border border-gray-100 dark:border-gray-800">
            {/* Radius Slider */}
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

            {/* Categories and Dietary Combined Row */}
            <div className="grid md:grid-cols-2 gap-5">
              {/* Categories */}
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-dark-text mb-3 block">Categories</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                        selectedCategory === category
                          ? 'bg-brand-teal dark:bg-primary-dark text-white shadow-md'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Filters */}
              <div>
                <label className="text-base font-bold text-gray-900 dark:text-dark-text mb-3 block">Dietary</label>
                <div className="flex flex-wrap gap-2">
                  {dietaryTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleDietaryTag(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                        selectedDietary.includes(tag)
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white dark:bg-dark-bg text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-600'
                      }`}
                    >
                      {selectedDietary.includes(tag) && '✓ '}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sort - Compact */}
            <div className="flex items-center gap-3">
              <label className="text-base font-bold text-gray-900 whitespace-nowrap">Sort:</label>
              <div className="flex gap-2 flex-1">
                <button
                  onClick={() => setSortBy('distance')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'distance'
                      ? 'bg-brand-teal text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Nearest
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'rating'
                      ? 'bg-amber-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>⭐</span>
                  Top Rated
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

