'use client'

import { useState } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Button from '@/components/shared/Button'
import Card from '@/components/shared/Card'
import EmptyState from '@/components/shared/EmptyState'
import toast from 'react-hot-toast'

export default function CartPage() {
  const router = useRouter()
  const { currentUser, cart, updateQuantity, removeFromCart, clearCart, getCartTotal } = useStore()
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('delivery')

  const subtotal = getCartTotal()
  const deliveryFee = fulfillmentType === 'delivery' ? 4.00 : 0
  const total = subtotal + deliveryFee

  if (cart.length === 0) {
    return (
      <DashboardLayout userRole="customer" userName={currentUser?.name}>
        <EmptyState
          icon="🛒"
          title="Your cart is empty"
          description="Start browsing chefs and add some delicious meals to your cart"
          action={{
            label: 'Find Chefs',
            onClick: () => router.push('/dashboard/customer/search')
          }}
        />
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Button variant="outline" size="sm" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.menuItem.id}>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={item.menuItem.photoUrl}
                      alt={item.menuItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{item.menuItem.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">By {item.chef.name}</p>
                    <p className="text-teal-600 font-bold">${item.menuItem.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.menuItem.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      ✕
                    </button>

                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-3 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                        className="px-3 py-1 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              {/* Fulfillment Type */}
              <div className="mb-4">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Fulfillment</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFulfillmentType('pickup')}
                    className={`py-2 px-4 rounded-lg font-medium transition ${
                      fulfillmentType === 'pickup'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🏪 Pickup
                  </button>
                  <button
                    onClick={() => setFulfillmentType('delivery')}
                    className={`py-2 px-4 rounded-lg font-medium transition ${
                      fulfillmentType === 'delivery'
                        ? 'bg-teal-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🚗 Delivery
                  </button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-teal-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                onClick={() => router.push('/dashboard/customer/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

