import { create } from 'zustand'
import { CartItem, User } from '@/types'

interface AppState {
  // User
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (menuItemId: string) => void
  updateQuantity: (menuItemId: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartItemCount: () => number

  // Filters
  searchRadius: number
  setSearchRadius: (radius: number) => void
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  selectedDietaryTags: string[]
  setSelectedDietaryTags: (tags: string[]) => void
  minRating: number
  setMinRating: (rating: number) => void
}

export const useStore = create<AppState>((set, get) => ({
  // User
  currentUser: {
    id: 'customer-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '(302) 555-0100',
    role: 'customer',
    photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
  },
  setCurrentUser: (user) => set({ currentUser: user }),

  // Cart
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cart.find((i) => i.menuItem.id === item.menuItem.id)
      if (existingItem) {
        return {
          cart: state.cart.map((i) =>
            i.menuItem.id === item.menuItem.id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        }
      }
      return { cart: [...state.cart, item] }
    }),
  removeFromCart: (menuItemId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.menuItem.id !== menuItemId),
    })),
  updateQuantity: (menuItemId, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      ),
    })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => {
    const state = get()
    return state.cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0)
  },
  getCartItemCount: () => {
    const state = get()
    return state.cart.reduce((count, item) => count + item.quantity, 0)
  },

  // Filters
  searchRadius: 5,
  setSearchRadius: (radius) => set({ searchRadius: radius }),
  selectedCategories: [],
  setSelectedCategories: (categories) => set({ selectedCategories: categories }),
  selectedDietaryTags: [],
  setSelectedDietaryTags: (tags) => set({ selectedDietaryTags: tags }),
  minRating: 0,
  setMinRating: (rating) => set({ minRating: rating }),
}))

