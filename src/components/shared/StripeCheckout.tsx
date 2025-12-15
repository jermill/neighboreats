'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button from './Button'
import toast from 'react-hot-toast'

interface StripeCheckoutProps {
  onSuccess: () => void
  onError: (error: string) => void
  amount: number
}

export default function StripeCheckout({ onSuccess, onError, amount }: StripeCheckoutProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/dashboard/customer/orders`,
        },
        redirect: 'if_required'
      })

      if (error) {
        onError(error.message || 'Payment failed')
        toast.error(error.message || 'Payment failed')
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess()
        toast.success('Payment successful!')
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      onError(err.message || 'Payment processing failed')
      toast.error('Payment processing failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button 
        type="submit" 
        className="w-full"
        disabled={!stripe || processing}
        loading={processing}
      >
        {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </form>
  )
}
