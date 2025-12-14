'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Slider from '@/components/shared/Slider'
import ChefCard from '@/components/shared/ChefCard'
import EmptyState from '@/components/shared/EmptyState'
import { mockChefs, calculateDistance } from '@/lib/mockData'
import { Search, ShoppingCart, ChefHat, Car, MapPin, Star, TrendingUp, Filter, X } from 'lucide-react'
import DarkModeToggle from '@/components/shared/DarkModeToggle'

const categories = ['All', 'Mexican', 'Asian', 'American', 'Indian', 'Healthy', 'Baked Goods']
const dietaryTags = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Healthy']

export default function ExplorePage() {
  const router = useRouter()
  const [searchRadius, setSearchRadius] = useState(5)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<'distance' | 'rating'>('distance')
  const [showFilters, setShowFilters] = useState(false)

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

  const resetFilters = () => {
    setSearchRadius(5)
    setSelectedCategory('All')
    setSelectedDietary([])
    setSortBy('distance')
  }

  const hasActiveFilters = selectedCategory !== 'All' || selectedDietary.length > 0 || searchRadius !== 5

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg">
      {/* Sticky Header */}
      <nav className="bg-white dark:bg-dark-bg-elevated shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-dark-border">
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
                className="px-4 py-2 text-gray-700 dark:text-dark-text-secondary hover:text-brand-teal dark:hover:text-primary-dark transition font-medium"
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-burgundy/10 dark:bg-brand-burgundy/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-coral/10 dark:bg-brand-coral/5 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white dark:bg-dark-bg-elevated px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-dark-border">
              <MapPin className="w-4 h-4 text-brand-teal dark:text-primary-dark" />
              <span className="text-sm font-medium text-gray-700 dark:text-dark-text-secondary">
                Wilmington, DE
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-dark-text">
              Discover Local Chefs
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-dark-text-secondary max-w-2xl mx-auto">
              Browse neighborhood chefs, explore their menus, and order fresh homemade meals
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-customer-500 dark:text-red-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-dark-text">{filteredChefs.length}</div>
                  <div className="text-sm text-gray-600 dark:text-dark-text-muted">Local Chefs</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-amber-500 dark:fill-amber-400" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-gray-900 dark:text-dark-text">4.8</div>
                  <div className="text-sm text-gray-600 dark:text-dark-text-muted">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Mode Banner */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
        <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-2xl p-4 shadow-lg">
          <p className="text-amber-900 dark:text-amber-200 text-center">
            👋 <strong>Guest Mode:</strong> Browsing as a guest. 
            <Link href="/auth/signup/customer" className="text-amber-700 dark:text-amber-400 font-bold hover:underline ml-1">
              Sign up free
            </Link> to order!
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Filter Toggle Button (Mobile) */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
            Browse Chefs
            <span className="text-base font-normal text-gray-500 dark:text-dark-text-muted ml-2">
              ({filteredChefs.length} nearby)
            </span>
          </h2>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-dark-bg-elevated border-2 border-gray-200 dark:border-dark-border rounded-xl hover:border-brand-teal dark:hover:border-primary-dark transition font-semibold text-gray-700 dark:text-dark-text"
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
          <div className="bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/30 p-6 mb-8 border border-gray-100 dark:border-dark-border space-y-6 animate-fadeIn">
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
              <label className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 block">Sort By</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setSortBy('distance')}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'distance'
                      ? 'bg-brand-teal dark:bg-primary-dark text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  Nearest
                </button>
                <button
                  onClick={() => setSortBy('rating')}
                  className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    sortBy === 'rating'
                      ? 'bg-amber-500 dark:bg-amber-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg'
                  }`}
                >
                  <Star className="w-4 h-4" />
                  Top Rated
                </button>
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 block">Cuisine</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      selectedCategory === category
                        ? 'bg-brand-burgundy text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-dark-bg-secondary text-gray-700 dark:text-dark-text-secondary hover:bg-gray-200 dark:hover:bg-dark-bg border border-gray-200 dark:border-dark-border'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Filters */}
            <div>
              <label className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 block">Dietary Preferences</label>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleDietaryTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border-2 ${
                      selectedDietary.includes(tag)
                        ? 'bg-emerald-600 dark:bg-emerald-700 text-white border-emerald-600 dark:border-emerald-700 shadow-lg'
                        : 'bg-white dark:bg-dark-bg text-gray-700 dark:text-dark-text-secondary border-gray-200 dark:border-dark-border hover:border-emerald-400 dark:hover:border-emerald-600'
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
                className="w-full px-4 py-2 text-sm font-semibold text-gray-600 dark:text-dark-text-muted hover:text-brand-burgundy dark:hover:text-red-400 transition"
              >
                Reset All Filters
              </button>
            )}
          </div>
        )}

        {/* Chef Cards - Vertical Stack */}
        <div className="space-y-6">
          {filteredChefs.length > 0 ? (
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
          <div className="mt-12 bg-gradient-to-br from-brand-burgundy to-customer-600 dark:from-brand-burgundy/90 dark:to-customer-700 rounded-3xl p-8 text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">
              Ready to Order?
            </h3>
            <p className="text-white/90 mb-6">
              Sign up to place orders and save your favorite chefs
            </p>
            <Link
              href="/auth/signup/customer"
              className="inline-block px-8 py-4 bg-white dark:bg-dark-bg-elevated text-brand-burgundy dark:text-dark-text font-bold rounded-2xl hover:bg-gray-100 dark:hover:bg-dark-bg-secondary transition shadow-xl"
            >
              Sign Up Free
            </Link>
          </div>
        )}
      </div>

      {/* Dark Mode Toggle */}
      <DarkModeToggle />
    </div>
  )
}
