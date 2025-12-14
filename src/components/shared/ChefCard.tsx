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
      className="bg-white dark:bg-dark-bg-elevated rounded-2xl shadow-lg dark:shadow-xl dark:shadow-black/20 overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer border border-gray-100 dark:border-dark-border"
    >
      {/* Horizontal Layout */}
      <div className="flex flex-col sm:flex-row">
        {/* Chef Photo - Compact */}
        <div className="relative w-full sm:w-40 h-40 sm:h-auto flex-shrink-0 bg-gray-200 dark:bg-dark-bg-secondary">
          <img
            src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=400&fit=crop'}
            alt={chef.name}
            className="w-full h-full object-cover"
          />
          
          {/* LIVE Badge - Overlay on Image */}
          {chef.isLive && (
            <div className="absolute top-3 right-3">
              <div className="bg-rose-500 text-white px-3 py-1.5 rounded-full font-bold text-xs shadow-lg flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                LIVE
              </div>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            {/* Name & Rating Row */}
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-dark-text">{chef.name}</h3>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Rating value={chef.rating} readonly size="sm" />
                <span className="text-sm text-gray-600 dark:text-dark-text-secondary">({chef.totalReviews})</span>
              </div>
            </div>

            {/* Categories - Compact */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {chef.categories.slice(0, 3).map((category) => (
                <span 
                  key={category}
                  className="bg-slate-700 dark:bg-slate-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                >
                  {category}
                </span>
              ))}
              {chef.categories.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-dark-text-muted px-2 py-1">
                  +{chef.categories.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Bottom Row - Distance & Subscribers */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-dark-border">
            {distance !== undefined && (
              <div className="flex items-center gap-1.5 text-gray-600 dark:text-dark-text-secondary">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">{distance.toFixed(1)} mi</span>
              </div>
            )}
            
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-dark-text-secondary">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <span className="text-sm font-medium">{chef.activeSubscribers} subscribers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


