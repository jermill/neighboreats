import { Order } from '@/types'
import Badge from './Badge'
import Button from './Button'
import Card from './Card'

interface OrderCardProps {
  order: Order
  userRole?: 'customer' | 'chef' | 'driver'
  onViewDetails?: () => void
  onAccept?: () => void
  onReject?: () => void
  onMarkReady?: () => void
  onRate?: () => void
}

export default function OrderCard({ order, userRole, onViewDetails, onAccept, onReject, onMarkReady, onRate }: OrderCardProps) {
  const statusColors: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
    pending: 'warning',
    accepted: 'info',
    preparing: 'info',
    ready: 'success',
    out_for_delivery: 'info',
    delivered: 'success',
    cancelled: 'default'
  }

  const statusLabels: Record<string, string> = {
    pending: 'Pending',
    accepted: 'Accepted',
    preparing: 'Preparing',
    ready: 'Ready for Pickup',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled'
  }

  return (
    <Card>
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="text-sm text-gray-600">Order #{order.id.slice(0, 8)}</p>
          <p className="text-xs text-gray-500">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <Badge variant={statusColors[order.status]}>{statusLabels[order.status]}</Badge>
      </div>

      <div className="mb-3">
        {userRole === 'customer' && (
          <p className="font-semibold">Chef: {order.chef.name}</p>
        )}
        <p className="text-sm text-gray-700">
          {order.items.length} item{order.items.length > 1 ? 's' : ''}
        </p>
        {order.items.slice(0, 2).map((item) => (
          <p key={item.menuItem.id} className="text-sm text-gray-600">
            {item.quantity}x {item.menuItem.name}
          </p>
        ))}
        {order.items.length > 2 && (
          <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
        )}
      </div>

      <div className="border-t pt-3 mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">Subtotal</span>
          <span>${(order.totalPrice - order.deliveryFee).toFixed(2)}</span>
        </div>
        {order.deliveryFee > 0 && (
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Delivery</span>
            <span>${order.deliveryFee.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-teal-600">${order.totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        {userRole === 'chef' && order.status === 'pending' && (
          <>
            <Button size="sm" onClick={onAccept} className="flex-1">Accept</Button>
            <Button variant="outline" size="sm" onClick={onReject} className="flex-1">Reject</Button>
          </>
        )}
        {userRole === 'chef' && order.status === 'preparing' && (
          <Button size="sm" onClick={onMarkReady} className="w-full">Mark Ready</Button>
        )}
        {userRole === 'customer' && order.status === 'delivered' && !order.chefRating && (
          <Button size="sm" onClick={onRate} className="w-full">Rate Order</Button>
        )}
        {onViewDetails && (
          <Button variant="outline" size="sm" onClick={onViewDetails} className="w-full">
            View Details
          </Button>
        )}
      </div>
    </Card>
  )
}

