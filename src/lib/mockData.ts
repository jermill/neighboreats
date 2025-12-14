import { Chef, MenuItem, Order, Subscription, Driver, Delivery, Review, SubscriptionTier } from '@/types'

// Mock Chefs
export const mockChefs: Chef[] = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    email: 'maria@example.com',
    phone: '(302) 555-0101',
    role: 'chef',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Authentic Mexican cuisine from Oaxaca. Specializing in traditional moles and fresh tortillas.',
    rating: 4.9,
    totalReviews: 127,
    categories: ['Mexican', 'Vegan', 'Gluten-Free'],
    kitchenAddress: '123 Market St, Wilmington, DE 19801',
    latitude: 39.7459,
    longitude: -75.5466,
    isLive: true,
    deliveryRadius: 5,
    activeSubscribers: 24
  },
  {
    id: '2',
    name: 'James Chen',
    email: 'james@example.com',
    phone: '(302) 555-0102',
    role: 'chef',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Asian fusion with a modern twist. Fresh ingredients, bold flavors.',
    rating: 4.8,
    totalReviews: 93,
    categories: ['Asian', 'Healthy', 'Keto'],
    kitchenAddress: '456 Oak Ave, Wilmington, DE 19802',
    latitude: 39.7391,
    longitude: -75.5398,
    isLive: false,
    deliveryRadius: 7,
    activeSubscribers: 18
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '(302) 555-0103',
    role: 'chef',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Farm-to-table American comfort food. Everything made from scratch with love.',
    rating: 4.7,
    totalReviews: 156,
    categories: ['American', 'Comfort Food', 'Baked Goods'],
    kitchenAddress: '789 Pine St, Wilmington, DE 19803',
    latitude: 39.7512,
    longitude: -75.5512,
    isLive: true,
    deliveryRadius: 3,
    activeSubscribers: 31
  },
  {
    id: '4',
    name: 'Raj Patel',
    email: 'raj@example.com',
    phone: '(302) 555-0104',
    role: 'chef',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Traditional Indian curries and tandoori specialties. Vegetarian-friendly.',
    rating: 4.9,
    totalReviews: 201,
    categories: ['Indian', 'Vegan', 'Vegetarian'],
    kitchenAddress: '321 Elm St, Wilmington, DE 19804',
    latitude: 39.7423,
    longitude: -75.5589,
    isLive: false,
    deliveryRadius: 10,
    activeSubscribers: 42
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    phone: '(302) 555-0105',
    role: 'chef',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    bio: 'Health-conscious meal prep. Macro-balanced plates for fitness goals.',
    rating: 4.8,
    totalReviews: 78,
    categories: ['Healthy', 'Fitness', 'Meal Prep'],
    kitchenAddress: '654 Maple Dr, Wilmington, DE 19805',
    latitude: 39.7501,
    longitude: -75.5421,
    isLive: false,
    deliveryRadius: 5,
    activeSubscribers: 67
  }
]

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  // Maria's Menu
  {
    id: '101',
    chefId: '1',
    name: 'Chicken Mole Enchiladas',
    description: 'Tender chicken wrapped in corn tortillas, smothered in rich mole sauce',
    price: 18.50,
    category: 'Meals',
    dietaryTags: ['Gluten-Free'],
    photoUrl: 'https://images.unsplash.com/photo-1599974579688-8dbdd335ecf2?w=400',
    isAvailable: true
  },
  {
    id: '102',
    chefId: '1',
    name: 'Vegan Tacos (3pc)',
    description: 'Black bean and roasted vegetable tacos with avocado crema',
    price: 12.00,
    category: 'Meals',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    photoUrl: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400',
    isAvailable: true
  },
  {
    id: '103',
    chefId: '1',
    name: 'Fresh Agua Fresca',
    description: 'Watermelon and lime refreshing drink',
    price: 5.00,
    category: 'Beverages',
    dietaryTags: ['Vegan'],
    photoUrl: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=400',
    isAvailable: true
  },

  // James's Menu
  {
    id: '201',
    chefId: '2',
    name: 'Korean BBQ Bowl',
    description: 'Marinated beef, kimchi, rice, and pickled vegetables',
    price: 22.00,
    category: 'Meals',
    dietaryTags: ['Keto-Friendly'],
    photoUrl: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400',
    isAvailable: true
  },
  {
    id: '202',
    chefId: '2',
    name: 'Poke Bowl',
    description: 'Fresh tuna, edamame, avocado, and sesame dressing',
    price: 19.50,
    category: 'Meals',
    dietaryTags: ['Healthy', 'Gluten-Free'],
    photoUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    isAvailable: true
  },
  {
    id: '203',
    chefId: '2',
    name: 'Green Detox Smoothie',
    description: 'Spinach, kale, mango, and coconut water',
    price: 11.00,
    category: 'Juices & Smoothies',
    dietaryTags: ['Vegan', 'Healthy'],
    photoUrl: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=400',
    isAvailable: true
  },

  // Sarah's Menu
  {
    id: '301',
    chefId: '3',
    name: 'Classic Mac & Cheese',
    description: 'Creamy three-cheese macaroni with breadcrumb topping',
    price: 14.00,
    category: 'Meals',
    dietaryTags: ['Comfort Food'],
    photoUrl: 'https://images.unsplash.com/photo-1580867968223-7c9c4f29a1dc?w=400',
    isAvailable: true
  },
  {
    id: '302',
    chefId: '3',
    name: 'Chocolate Chip Cookies (6pc)',
    description: 'Homemade cookies with dark chocolate chunks',
    price: 8.00,
    category: 'Baked Goods',
    dietaryTags: [],
    photoUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400',
    isAvailable: true
  },

  // Raj's Menu
  {
    id: '401',
    chefId: '4',
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato curry with naan bread',
    price: 20.00,
    category: 'Meals',
    dietaryTags: [],
    photoUrl: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400',
    isAvailable: true
  },
  {
    id: '402',
    chefId: '4',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese in spiced tomato gravy',
    price: 18.00,
    category: 'Meals',
    dietaryTags: ['Vegetarian'],
    photoUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
    isAvailable: true
  },

  // Emma's Menu
  {
    id: '501',
    chefId: '5',
    name: 'Grilled Chicken & Quinoa',
    description: 'Herb-marinated chicken breast with quinoa and roasted vegetables. 450 cal, 45g protein',
    price: 16.50,
    category: 'Meals',
    dietaryTags: ['Healthy', 'Keto-Friendly', 'Meal Prep'],
    photoUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400',
    isAvailable: true
  },
  {
    id: '502',
    chefId: '5',
    name: 'Protein Power Smoothie',
    description: 'Banana, peanut butter, protein powder, oat milk. 350 cal, 30g protein',
    price: 12.00,
    category: 'Juices & Smoothies',
    dietaryTags: ['Healthy', 'Fitness'],
    photoUrl: 'https://images.unsplash.com/photo-1622988988394-41f69acd0b48?w=400',
    isAvailable: true
  }
]

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-001',
    customerId: 'customer-1',
    chefId: '1',
    chef: mockChefs[0],
    items: [
      {
        menuItem: mockMenuItems[0],
        quantity: 2,
        chef: mockChefs[0]
      }
    ],
    totalPrice: 41.00,
    deliveryFee: 4.00,
    status: 'delivered',
    fulfillmentType: 'delivery',
    deliveryAddress: '111 Customer St, Wilmington, DE',
    createdAt: new Date('2025-12-10T12:30:00'),
    chefRating: 5
  },
  {
    id: 'order-002',
    customerId: 'customer-1',
    chefId: '2',
    chef: mockChefs[1],
    items: [
      {
        menuItem: mockMenuItems[3],
        quantity: 1,
        chef: mockChefs[1]
      }
    ],
    totalPrice: 22.00,
    deliveryFee: 0,
    status: 'preparing',
    fulfillmentType: 'pickup',
    createdAt: new Date('2025-12-13T18:00:00')
  }
]

// Mock Subscription Tiers
export const mockSubscriptionTiers: SubscriptionTier[] = [
  {
    id: 'tier-1',
    chefId: '1',
    name: '5-Day Meal Plan',
    mealsPerWeek: 5,
    monthlyPrice: 95.00,
    description: 'Perfect for weekday lunches'
  },
  {
    id: 'tier-2',
    chefId: '5',
    name: 'Fitness 7-Day',
    mealsPerWeek: 7,
    monthlyPrice: 129.00,
    description: 'Complete week of macro-balanced meals'
  }
]

// Mock Subscriptions
export const mockSubscriptions: Subscription[] = [
  {
    id: 'sub-001',
    customerId: 'customer-1',
    chef: mockChefs[4],
    tier: mockSubscriptionTiers[1],
    status: 'active',
    nextBillingDate: new Date('2025-12-20')
  }
]

// Mock Drivers
export const mockDrivers: Driver[] = [
  {
    id: 'driver-1',
    name: 'Alex Martinez',
    email: 'alex@example.com',
    phone: '(302) 555-0201',
    role: 'driver',
    rating: 4.9,
    totalDeliveries: 247,
    onTimePercentage: 98,
    tier: 'gold',
    vehicle: '2020 Honda Civic'
  }
]

// Mock Deliveries
export const mockDeliveries: Delivery[] = [
  {
    id: 'del-001',
    orderId: 'order-003',
    chefName: 'Maria Rodriguez',
    chefAddress: '123 Market St, Wilmington, DE',
    customerAddress: '456 Oak Ave, Wilmington, DE',
    distance: 2.3,
    deliveryFee: 4.50,
    status: 'available'
  }
]

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: 'rev-001',
    customerId: 'customer-1',
    customerName: 'John Doe',
    chefId: '1',
    rating: 5,
    comment: 'Best mole sauce I\'ve ever had! Will definitely order again.',
    createdAt: new Date('2025-12-11')
  },
  {
    id: 'rev-002',
    customerId: 'customer-2',
    customerName: 'Jane Smith',
    chefId: '1',
    rating: 5,
    comment: 'Authentic flavors and generous portions. Highly recommend!',
    createdAt: new Date('2025-12-09')
  }
]

// Helper function to calculate distance (mock implementation)
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  // Simplified distance calculation
  const R = 3959 // Earth's radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

