export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'customer' | 'chef' | 'driver' | 'admin'
  photoUrl?: string
}

export interface Chef extends User {
  bio?: string
  rating: number
  totalReviews: number
  categories: string[]
  kitchenAddress: string
  latitude: number
  longitude: number
  isLive: boolean
  deliveryRadius: number
  activeSubscribers: number
}

export interface MenuItem {
  id: string
  chefId: string
  name: string
  description: string
  price: number
  category: string
  dietaryTags: string[]
  photoUrl: string
  isAvailable: boolean
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  chef: Chef
}

export interface Order {
  id: string
  customerId: string
  chefId: string
  chef: Chef
  items: CartItem[]
  totalPrice: number
  deliveryFee: number
  status: 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
  fulfillmentType: 'pickup' | 'delivery'
  deliveryAddress?: string
  specialInstructions?: string
  createdAt: Date
  chefRating?: number
  driverRating?: number
}

export interface SubscriptionTier {
  id: string
  chefId: string
  name: string
  mealsPerWeek: number
  monthlyPrice: number
  description: string
}

export interface Subscription {
  id: string
  customerId: string
  chef: Chef
  tier: SubscriptionTier
  status: 'active' | 'paused' | 'cancelled'
  nextBillingDate: Date
}

export interface Driver extends User {
  rating: number
  totalDeliveries: number
  onTimePercentage: number
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  vehicle: string
}

export interface Delivery {
  id: string
  orderId: string
  chefName: string
  chefAddress: string
  customerAddress: string
  distance: number
  deliveryFee: number
  status: 'available' | 'accepted' | 'heading_to_chef' | 'picked_up' | 'heading_to_customer' | 'delivered'
}

export interface Review {
  id: string
  customerId: string
  customerName: string
  chefId: string
  rating: number
  comment: string
  createdAt: Date
}


