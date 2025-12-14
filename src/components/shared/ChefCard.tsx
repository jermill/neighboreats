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
    <Card hoverable onClick={onClick} className="relative">
      {chef.isLive && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="danger" size="sm">
            🔴 LIVE
          </Badge>
        </div>
      )}
      
      <div className="aspect-video rounded-lg overflow-hidden mb-4 bg-gray-200">
        <img
          src={chef.photoUrl || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400'}
          alt={chef.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-lg font-bold text-gray-900 mb-1">{chef.name}</h3>
      
      <div className="flex items-center gap-2 mb-2">
        <Rating value={chef.rating} readonly size="sm" />
        <span className="text-sm text-gray-600">({chef.totalReviews})</span>
      </div>

      {distance !== undefined && (
        <p className="text-sm text-gray-600 mb-2">📍 {distance.toFixed(1)} miles away</p>
      )}

      <div className="flex flex-wrap gap-1 mb-3">
        {chef.categories.slice(0, 3).map((category) => (
          <Badge key={category} variant="default" size="sm">
            {category}
          </Badge>
        ))}
      </div>

      <p className="text-sm text-gray-600">{chef.activeSubscribers} active subscribers</p>
    </Card>
  )
}

