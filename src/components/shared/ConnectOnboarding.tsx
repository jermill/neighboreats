'use client'

import { useState, useEffect } from 'react'
import Button from './Button'
import Card from './Card'
import Badge from './Badge'
import toast from 'react-hot-toast'

interface ConnectOnboardingProps {
  userRole: 'chef' | 'driver'
}

interface ConnectStatus {
  accountId: string | null
  verified: boolean
  payoutsEnabled: boolean
  chargesEnabled: boolean
  detailsSubmitted?: boolean
  requirementsNeeded?: string[]
  mock?: boolean
}

export default function ConnectOnboarding({ userRole }: ConnectOnboardingProps) {
  const [status, setStatus] = useState<ConnectStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [onboarding, setOnboarding] = useState(false)

  useEffect(() => {
    fetchStatus()
  }, [])

  const fetchStatus = async () => {
    try {
      const response = await fetch('/api/payments/connect-account')
      if (response.ok) {
        const data = await response.json()
        setStatus(data)
      }
    } catch (error) {
      console.error('Error fetching Connect status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleStartOnboarding = async () => {
    setOnboarding(true)
    try {
      const response = await fetch('/api/payments/connect-account', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          returnUrl: `${window.location.origin}/dashboard/${userRole}/profile?onboarding=success`,
          refreshUrl: `${window.location.origin}/dashboard/${userRole}/profile?onboarding=refresh`
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.mock) {
          toast.error(data.message || 'Stripe not configured yet')
        } else {
          // Redirect to Stripe Connect onboarding
          window.location.href = data.accountLink
        }
      } else {
        toast.error('Failed to start onboarding')
      }
    } catch (error) {
      console.error('Onboarding error:', error)
      toast.error('Failed to start onboarding')
    } finally {
      setOnboarding(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </Card>
    )
  }

  return (
    <Card>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Payment Account</h3>
          {status?.verified ? (
            <Badge variant="success">✓ Verified</Badge>
          ) : status?.accountId ? (
            <Badge variant="warning">Pending</Badge>
          ) : (
            <Badge variant="default">Not Setup</Badge>
          )}
        </div>

        {status?.mock && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-sm text-yellow-800">
              ⚠️ Stripe is not configured. Contact support to enable payments.
            </p>
          </div>
        )}

        {status?.verified ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">✓</div>
              <div>
                <p className="font-medium text-green-900">Account Verified</p>
                <p className="text-sm text-green-700 mt-1">
                  Your payment account is active and ready to receive {userRole === 'chef' ? 'earnings' : 'payouts'}.
                </p>
                {status.accountId && (
                  <p className="text-xs text-green-600 mt-2 font-mono">
                    Account ID: {status.accountId.slice(0, 20)}...
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : status?.accountId ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">⏳</div>
              <div>
                <p className="font-medium text-blue-900">Verification Pending</p>
                <p className="text-sm text-blue-700 mt-1">
                  Your account is being reviewed. This usually takes 1-2 business days.
                </p>
                {status.requirementsNeeded && status.requirementsNeeded.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-blue-900">Additional information needed:</p>
                    <ul className="text-sm text-blue-700 mt-1 list-disc list-inside">
                      {status.requirementsNeeded.map((req, idx) => (
                        <li key={idx}>{req.replace(/_/g, ' ')}</li>
                      ))}
                    </ul>
                    <Button 
                      onClick={handleStartOnboarding}
                      disabled={onboarding}
                      className="mt-3"
                      size="sm"
                    >
                      Complete Setup
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="text-2xl mr-3">💳</div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Setup Payment Account</p>
                <p className="text-sm text-gray-600 mt-1">
                  Connect your bank account to receive {userRole === 'chef' ? 'earnings from orders and subscriptions' : 'delivery payouts'}.
                </p>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>✓ Secure bank connection via Stripe</li>
                  <li>✓ Fast payouts (1-2 business days)</li>
                  <li>✓ Track earnings in real-time</li>
                </ul>
                <Button 
                  onClick={handleStartOnboarding}
                  disabled={onboarding}
                  loading={onboarding}
                  className="mt-4"
                >
                  {onboarding ? 'Starting...' : 'Setup Payment Account'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
