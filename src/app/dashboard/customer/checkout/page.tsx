'use client'

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import DashboardLayout from '@/components/shared/DashboardLayout'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import Textarea from '@/components/shared/Textarea'
import Card from '@/components/shared/Card'
import Modal from '@/components/shared/Modal'
import StripeCheckout from '@/components/shared/StripeCheckout'
import { ordersApi, paymentsApi } from '@/lib/api-client'
import toast from 'react-hot-toast'

// Initialize Stripe
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null

export default function CheckoutPage() {
  const router = useRouter()
  const { currentUser, cart, getCartTotal, clearCart } = useStore()
  const [showSuccess, setShowSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [step, setStep] = useState<'delivery' | 'payment'>('delivery')
  const [form, setForm] = useState({
    address: '',
    city: '',
    state: 'DE',
    zip: '',
    specialInstructions: ''
  })

  const subtotal = getCartTotal()
  const deliveryFee = 4.00
  const platformFee = Math.round((subtotal + deliveryFee) * 0.15 * 100) / 100
  const total = subtotal + deliveryFee

  // Redirect if cart is empty (useEffect to avoid SSR issues)
  useEffect(() => {
    if (cart.length === 0) {
      router.push('/dashboard/customer/cart')
    }
  }, [cart.length, router])

  const handleDeliverySubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setSubmitting(true)
    
    try {
      // Get chef ID from first cart item (all items should be from same chef)
      const chefId = cart[0].chef.id
      const deliveryAddress = `${form.address}, ${form.city}, ${form.state} ${form.zip}`
      
      // Create order
      const { orderId: newOrderId } = await ordersApi.create({
        chefId,
        items: cart.map(item => ({
          menuItemId: item.menuItem.id,
          quantity: item.quantity
        })),
        fulfillmentType: 'delivery',
        deliveryAddress,
        specialInstructions: form.specialInstructions
      })

      setOrderId(newOrderId)

      // Create payment intent
      const paymentResponse = await paymentsApi.createPaymentIntent({
        amount: Math.round(total * 100), // Convert to cents
        orderId: newOrderId,
        chefId
      })

      // Check if mock payment
      if (paymentResponse.mock) {
        toast.success('Order placed successfully (mock payment)')
        setShowSuccess(true)
        clearCart()
      } else {
        // Real Stripe payment - proceed to payment step
        setClientSecret(paymentResponse.clientSecret)
        setStep('payment')
      }
    } catch (error: any) {
      console.error('Checkout error:', error)
      toast.error(error.message || 'Failed to create order')
    } finally {
      setSubmitting(false)
    }
  }

  const handlePaymentSuccess = () => {
    setShowSuccess(true)
    clearCart()
  }

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error)
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          {step === 'payment' && (
            <Button
              variant="secondary"
              onClick={() => setStep('delivery')}
            >
              ← Back to Delivery
            </Button>
          )}
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4">
          <div className={`flex items-center ${step === 'delivery' ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'delivery' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
              1
            </div>
            <span className="ml-2 font-medium">Delivery</span>
          </div>
          <div className="w-16 h-1 bg-gray-200">
            <div className={`h-full ${step === 'payment' ? 'bg-teal-600' : 'bg-gray-200'}`} />
          </div>
          <div className={`flex items-center ${step === 'payment' ? 'text-teal-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-teal-600 text-white' : 'bg-gray-200'}`}>
              2
            </div>
            <span className="ml-2 font-medium">Payment</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 'delivery' ? (
              <form onSubmit={handleDeliverySubmit}>
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
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={submitting}
                    loading={submitting}
                  >
                    {submitting ? 'Creating Order...' : 'Continue to Payment'}
                  </Button>
                </Card>
              </form>
            ) : (
              <Card>
                <h2 className="text-xl font-bold mb-4">Payment Method</h2>
                {clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeCheckout
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                ) : (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading payment form...</p>
                  </div>
                )}
              </Card>
            )}
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
                <div className="flex justify-between text-xs text-gray-500 border-t pt-2">
                  <span>Platform Fee (15%)</span>
                  <span>${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-teal-600">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-800">
                  🔒 Secure payment powered by Stripe
                </p>
              </div>
            </Card>
          </div>
        </div>
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


