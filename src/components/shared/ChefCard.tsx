import { Chef } from '@/types'
import Rating from './Rating'
import Badge from './Badge'
import Card from './Card'

interface ChefCardProps {
  chef: Chef
  distance?: number
  onClick?: () => void
}

export default function ChefCard({ chef, distance, onClick }: ChefCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
    >
      {/* Chef Photo - Larger, more prominent */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-200 relative">
        <img
          src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=450&fit=crop'}
          alt={chef.name}
          className="w-full h-full object-cover"
        />
        
        {/* LIVE Badge - Overlay on Image */}
        {chef.isLive && (
          <div className="absolute bottom-4 right-4">
            <div className="bg-rose-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{chef.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Rating value={chef.rating} readonly size="sm" />
          <span className="text-gray-600">({chef.totalReviews})</span>
        </div>

        {/* Distance */}
        {distance !== undefined && (
          <div className="flex items-center gap-2 text-gray-700 mb-4">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">{distance.toFixed(1)} miles away</span>
          </div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {chef.categories.slice(0, 3).map((category) => (
            <span 
              key={category}
              className="bg-slate-700 text-white px-4 py-2 rounded-full text-sm font-medium"
            >
              {category}
            </span>
          ))}
        </div>

        {/* Subscribers */}
        <p className="text-gray-700 font-medium">{chef.activeSubscribers} active subscribers</p>
      </div>
    </div>
  )
}


