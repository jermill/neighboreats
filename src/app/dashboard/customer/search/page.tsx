'use client'

import { useState, useMemo } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import ChefCard from '@/components/shared/ChefCard'
import Slider from '@/components/shared/Slider'
import Badge from '@/components/shared/Badge'
import EmptyState from '@/components/shared/EmptyState'
import { mockChefs, calculateDistance } from '@/lib/mockData'

const categories = ['All', 'Mexican', 'Asian', 'American', 'Indian', 'Healthy', 'Baked Goods']
const dietaryTags = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Healthy']

export default function SearchPage() {
  const router = useRouter()
  const { currentUser, searchRadius, setSearchRadius } = useStore()
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
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Local Chefs</h1>
          <p className="text-gray-600">Discover fresh, homemade meals from your neighborhood</p>
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
                  onClick={() => router.push(`/dashboard/customer/chef/${chef.id}`)}
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
    </DashboardLayout>
  )
}

