/**
 * API Client
 * 
 * Frontend helpers for calling backend API routes
 * All functions return promises with typed responses
 */

// Orders API
export const ordersApi = {
  getAll: async (params?: { status?: string }) => {
    const query = params?.status ? `?status=${params.status}` : ''
    const res = await fetch(`/api/orders${query}`)
    if (!res.ok) throw new Error('Failed to fetch orders')
    return res.json()
  },

  getById: async (id: string) => {
    const res = await fetch(`/api/orders/${id}`)
    if (!res.ok) throw new Error('Failed to fetch order')
    return res.json()
  },

  create: async (data: {
    chefId: string
    items: Array<{ menuItemId: string; quantity: number }>
    fulfillmentType: 'pickup' | 'delivery'
    deliveryAddress?: string
    specialInstructions?: string
  }) => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create order')
    }
    return res.json()
  },

  updateStatus: async (id: string, status: string) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!res.ok) throw new Error('Failed to update order')
    return res.json()
  },

  rate: async (id: string, rating: { chefRating?: number; driverRating?: number }) => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(rating)
    })
    if (!res.ok) throw new Error('Failed to rate order')
    return res.json()
  }
}

// Menu API
export const menuApi = {
  getAll: async (params?: { chefId?: string; category?: string; available?: boolean }) => {
    const query = new URLSearchParams()
    if (params?.chefId) query.append('chefId', params.chefId)
    if (params?.category) query.append('category', params.category)
    if (params?.available !== undefined) query.append('available', String(params.available))
    
    const res = await fetch(`/api/menu?${query.toString()}`)
    if (!res.ok) throw new Error('Failed to fetch menu items')
    return res.json()
  },

  getById: async (id: string) => {
    const res = await fetch(`/api/menu/${id}`)
    if (!res.ok) throw new Error('Failed to fetch menu item')
    return res.json()
  },

  create: async (data: {
    name: string
    description: string
    price: number
    category: string
    dietaryTags?: string[]
    photoUrl?: string
    isAvailable?: boolean
  }) => {
    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create menu item')
    }
    return res.json()
  },

  update: async (id: string, data: Partial<{
    name: string
    description: string
    price: number
    category: string
    dietaryTags: string[]
    photoUrl: string
    isAvailable: boolean
  }>) => {
    const res = await fetch(`/api/menu/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to update menu item')
    return res.json()
  },

  delete: async (id: string) => {
    const res = await fetch(`/api/menu/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete menu item')
    return res.json()
  }
}

// Subscriptions API
export const subscriptionsApi = {
  getAll: async (params?: { status?: string }) => {
    const query = params?.status ? `?status=${params.status}` : ''
    const res = await fetch(`/api/subscriptions${query}`)
    if (!res.ok) throw new Error('Failed to fetch subscriptions')
    return res.json()
  },

  create: async (data: { tierId: string; chefId: string }) => {
    const res = await fetch('/api/subscriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create subscription')
    }
    return res.json()
  },

  updateStatus: async (id: string, status: 'active' | 'paused' | 'cancelled') => {
    const res = await fetch(`/api/subscriptions/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
    if (!res.ok) throw new Error('Failed to update subscription')
    return res.json()
  },

  cancel: async (id: string) => {
    const res = await fetch(`/api/subscriptions/${id}`, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to cancel subscription')
    return res.json()
  }
}

// Subscription Tiers API
export const subscriptionTiersApi = {
  getAll: async (chefId?: string) => {
    const query = chefId ? `?chefId=${chefId}` : ''
    const res = await fetch(`/api/subscription-tiers${query}`)
    if (!res.ok) throw new Error('Failed to fetch subscription tiers')
    return res.json()
  },

  create: async (data: {
    name: string
    mealsPerWeek: number
    monthlyPrice: number
    description: string
  }) => {
    const res = await fetch('/api/subscription-tiers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const error = await res.json()
      throw new Error(error.error || 'Failed to create subscription tier')
    }
    return res.json()
  }
}

// Profile API
export const profileApi = {
  get: async () => {
    const res = await fetch('/api/profiles')
    if (!res.ok) throw new Error('Failed to fetch profile')
    return res.json()
  },

  update: async (data: Record<string, any>) => {
    const res = await fetch('/api/profiles', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to update profile')
    return res.json()
  }
}

// Payment API
export const paymentsApi = {
  createPaymentIntent: async (data: {
    amount: number
    orderId: string
    chefId: string
    driverId?: string
  }) => {
    const res = await fetch('/api/payments/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create payment intent')
    return res.json()
  },

  getConnectAccount: async () => {
    const res = await fetch('/api/payments/connect-account')
    if (!res.ok) throw new Error('Failed to fetch Connect account')
    return res.json()
  },

  createConnectAccountLink: async (data: {
    returnUrl: string
    refreshUrl: string
  }) => {
    const res = await fetch('/api/payments/connect-account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!res.ok) throw new Error('Failed to create Connect account link')
    return res.json()
  }
}

// Integrations API
export const integrationsApi = {
  // Checkr
  checkr: {
    submit: async (data: {
      firstName: string
      lastName: string
      dateOfBirth: string
      ssn: string
      licenseNumber?: string
    }) => {
      const res = await fetch('/api/integrations/checkr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to submit background check')
      return res.json()
    },

    getStatus: async () => {
      const res = await fetch('/api/integrations/checkr')
      if (!res.ok) throw new Error('Failed to fetch background check status')
      return res.json()
    }
  },

  // Agora
  agora: {
    startStream: async () => {
      const res = await fetch('/api/integrations/agora?action=start', {
        method: 'POST'
      })
      if (!res.ok) throw new Error('Failed to start stream')
      return res.json()
    },

    endStream: async (streamId: string) => {
      const res = await fetch('/api/integrations/agora?action=end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ streamId })
      })
      if (!res.ok) throw new Error('Failed to end stream')
      return res.json()
    },

    getViewerToken: async (channelName: string) => {
      const res = await fetch(`/api/integrations/agora/token?channelName=${channelName}`)
      if (!res.ok) throw new Error('Failed to get viewer token')
      return res.json()
    }
  },

  // SendGrid
  sendgrid: {
    sendEmail: async (data: {
      to: string
      template: string
      data: Record<string, any>
    }) => {
      const res = await fetch('/api/integrations/sendgrid/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      if (!res.ok) throw new Error('Failed to send email')
      return res.json()
    }
  }
}
