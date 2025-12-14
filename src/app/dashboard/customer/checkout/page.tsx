'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Card from '@/components/shared/Card'
import Modal from '@/components/shared/Modal'
import toast from 'react-hot-toast'

export default function CheckoutPage() {
  const router = useRouter()
  const { currentUser, cart, getCartTotal, clearCart } = useStore()
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState({
    address: '',
    city: '',
    state: 'DE',
    zip: '',
    specialInstructions: ''
  })

  const subtotal = getCartTotal()
  const deliveryFee = 4.00
  const total = subtotal + deliveryFee

  // Redirect if cart is empty (useEffect to avoid SSR issues)
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/dashboard/customer/cart')
    }
  }, [cart.length, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock order placement
    setTimeout(() => {
      setShowSuccess(true)
      clearCart()
    }, 1000)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push('/dashboard/customer/orders')
  }

  // Show loading if cart is empty
  if (cart.length === 0) {
    return null
  }

  return (
    <DashboardLayout userRole="customer" userName={currentUser?.name}>
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Delivery Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
              <div className="space-y-4">
                <Input
                  label="Street Address"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="123 Main St"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Wilmington"
                    required
                  />
                  <Input
                    label="State"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    placeholder="DE"
                    required
                  />
                </div>
                <Input
                  label="ZIP Code"
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                  placeholder="19801"
                  required
                />
                <Textarea
                  label="Special Instructions"
                  value={form.specialInstructions}
                  onChange={(e) => setForm({ ...form, specialInstructions: e.target.value })}
                  placeholder="e.g., Ring doorbell, leave at door, etc."
                />
              </div>
            </Card>

            <Card>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-4">
                <Input
                  label="Card Number"
                  placeholder="4242 4242 4242 4242"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    placeholder="MM/YY"
                    required
                  />
                  <Input
                    label="CVV"
                    placeholder="123"
                    required
                  />
                </div>
                <Input
                  label="Cardholder Name"
                  placeholder="John Doe"
                  required
                />
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.menuItem.id} className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {item.quantity}x {item.menuItem.name}
                    </span>
                    <span className="font-medium">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-teal-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button type="submit" className="w-full mt-6">
                Place Order - ${total.toFixed(2)}
              </Button>
            </Card>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={handleSuccessClose}
        title="Order Placed Successfully!"
      >
        <div className="text-center py-6">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Thank you for your order!
          </h3>
          <p className="text-gray-600 mb-6">
            Your order has been placed and the chef has been notified.
            You'll receive updates on your order status.
          </p>
          <Button onClick={handleSuccessClose} className="w-full">
            View My Orders
          </Button>
        </div>
      </Modal>
    </DashboardLayout>
  )
}

