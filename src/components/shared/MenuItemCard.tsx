import { MenuItem as MenuItemType } from '@/types'
import Badge from './Badge'
import Button from './Button'
import Card from './Card'

interface MenuItemProps {
  item: MenuItemType
  onAddToCart?: () => void
  onEdit?: () => void
  onDelete?: () => void
  showActions?: boolean
}

export default function MenuItem({ item, onAddToCart, onEdit, onDelete, showActions = false }: MenuItemProps) {
  return (
    <Card className="flex flex-col h-full">
      <div className="aspect-video rounded-lg overflow-hidden mb-3 bg-gray-200">
        <img
          src={item.photoUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h4 className="font-bold text-gray-900 mb-1">{item.name}</h4>
      <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-1">{item.description}</p>

      <div className="flex flex-wrap gap-1 mb-3">
        {item.dietaryTags.map((tag) => (
          <Badge key={tag} variant="info" size="sm">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-teal-600">${item.price.toFixed(2)}</span>
        {!item.isAvailable && <Badge variant="warning" size="sm">Unavailable</Badge>}
      </div>

      {showActions ? (
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            Delete
          </Button>
        </div>
      ) : (
        onAddToCart && item.isAvailable && (
          <Button size="sm" onClick={onAddToCart} className="w-full mt-3">
            Add to Cart
          </Button>
        )
      )}
    </Card>
  )
}


