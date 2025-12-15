# NeighborEats API Contracts

## Overview

This document provides a quick reference for all API endpoints, their request/response formats, and authentication requirements.

All API routes are implemented in `src/app/api/` and use the API client helpers in `src/lib/api-client.ts`.

## Authentication

Most endpoints require authentication via Supabase session cookies. Role-based access control (RBAC) is enforced:
- **Customer**: Access to orders, subscriptions, profile
- **Chef**: Access to menu items, orders, earnings, profile
- **Driver**: Access to deliveries, earnings, profile

## Orders API

### GET /api/orders
Get all orders for the current user (filtered by role).

**Auth**: Required (customer, chef, driver)

**Query Parameters**:
```typescript
{
  status?: 'pending' | 'accepted' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled'
}
```

**Response**:
```typescript
{
  orders: Order[]
}
```

### POST /api/orders
Create a new order.

**Auth**: Required (customer)

**Request Body**:
```typescript
{
  chefId: string
  items: Array<{ menuItemId: string, quantity: number }>
  fulfillmentType: 'pickup' | 'delivery'
  deliveryAddress?: string
  specialInstructions?: string
}
```

**Response**:
```typescript
{
  orderId: string
  order: Order
}
```

### GET /api/orders/[id]
Get a specific order by ID.

**Auth**: Required (customer, chef, driver - must be related to order)

**Response**:
```typescript
{
  order: Order
}
```

### PATCH /api/orders/[id]
Update order status or ratings.

**Auth**: Required (customer, chef, driver - must be related to order)

**Request Body**:
```typescript
{
  status?: string
  chefRating?: number
  driverRating?: number
}
```

**Response**:
```typescript
{
  order: Order
}
```

## Menu API

### GET /api/menu
Get menu items with optional filters.

**Auth**: Optional (public endpoint)

**Query Parameters**:
```typescript
{
  chefId?: string
  category?: string
  available?: boolean
}
```

**Response**:
```typescript
{
  menuItems: MenuItem[]
}
```

### POST /api/menu
Create a new menu item.

**Auth**: Required (chef)

**Request Body**:
```typescript
{
  name: string
  description: string
  price: number
  category: string
  dietaryTags?: string[]
  photoUrl?: string
  isAvailable?: boolean
}
```

**Response**:
```typescript
{
  menuItem: MenuItem
}
```

### GET /api/menu/[id]
Get a specific menu item.

**Auth**: Optional

**Response**:
```typescript
{
  menuItem: MenuItem
}
```

### PATCH /api/menu/[id]
Update a menu item.

**Auth**: Required (chef - owner only)

**Request Body**:
```typescript
{
  name?: string
  description?: string
  price?: number
  category?: string
  dietaryTags?: string[]
  photoUrl?: string
  isAvailable?: boolean
}
```

**Response**:
```typescript
{
  menuItem: MenuItem
}
```

### DELETE /api/menu/[id]
Delete a menu item.

**Auth**: Required (chef - owner only)

**Response**:
```typescript
{
  success: boolean
}
```

## Subscriptions API

### GET /api/subscriptions
Get subscriptions for the current user.

**Auth**: Required (customer, chef)

**Query Parameters**:
```typescript
{
  status?: 'active' | 'paused' | 'cancelled'
}
```

**Response**:
```typescript
{
  subscriptions: Subscription[]
}
```

### POST /api/subscriptions
Create a new subscription.

**Auth**: Required (customer)

**Request Body**:
```typescript
{
  tierId: string
  chefId: string
}
```

**Response**:
```typescript
{
  subscription: Subscription
}
```

### PATCH /api/subscriptions/[id]
Update subscription status.

**Auth**: Required (customer - owner only)

**Request Body**:
```typescript
{
  status: 'active' | 'paused' | 'cancelled'
}
```

**Response**:
```typescript
{
  subscription: Subscription
}
```

### DELETE /api/subscriptions/[id]
Cancel a subscription (soft delete).

**Auth**: Required (customer - owner only)

**Response**:
```typescript
{
  success: boolean
}
```

## Subscription Tiers API

### GET /api/subscription-tiers
Get subscription tiers, optionally filtered by chef.

**Auth**: Optional

**Query Parameters**:
```typescript
{
  chefId?: string
}
```

**Response**:
```typescript
{
  tiers: SubscriptionTier[]
}
```

### POST /api/subscription-tiers
Create a new subscription tier.

**Auth**: Required (chef)

**Request Body**:
```typescript
{
  name: string
  mealsPerWeek: number
  monthlyPrice: number
  description: string
}
```

**Response**:
```typescript
{
  tier: SubscriptionTier
}
```

## Profiles API

### GET /api/profiles
Get the current user's profile with role-specific data.

**Auth**: Required

**Response**:
```typescript
{
  profile: User & (ChefData | DriverData)
}
```

### PATCH /api/profiles
Update the current user's profile.

**Auth**: Required

**Request Body** (varies by role):
```typescript
{
  // Base user fields
  name?: string
  email?: string
  phone?: string
  photoUrl?: string
  
  // Chef-specific
  bio?: string
  kitchenAddress?: string
  latitude?: number
  longitude?: number
  deliveryRadius?: number
  categories?: string[]
  
  // Driver-specific
  vehicle?: string
  vehicleModel?: string
  vehicleColor?: string
  vehiclePlate?: string
}
```

**Response**:
```typescript
{
  profile: User
}
```

## Payments API

### POST /api/payments/create-payment-intent
Create a Stripe payment intent for an order.

**Auth**: Required (customer)

**Request Body**:
```typescript
{
  amount: number        // In cents
  orderId: string
  chefId: string
  driverId?: string
}
```

**Response**:
```typescript
{
  clientSecret: string
  paymentIntentId: string
  mock?: boolean
}
```

### POST /api/payments/webhook
Handle Stripe webhook events (called by Stripe, not frontend).

**Auth**: Stripe signature verification

**Events Handled**:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`
- `account.updated`
- `transfer.paid`

### GET /api/payments/connect-account
Get Stripe Connect account status.

**Auth**: Required (chef, driver)

**Response**:
```typescript
{
  accountId: string | null
  verified: boolean
  payoutsEnabled: boolean
  mock?: boolean
}
```

### POST /api/payments/connect-account
Create Stripe Connect onboarding link.

**Auth**: Required (chef, driver)

**Request Body**:
```typescript
{
  returnUrl: string
  refreshUrl: string
}
```

**Response**:
```typescript
{
  accountLink: string
  mock?: boolean
}
```

## Integrations API

### Checkr (Background Checks)

#### POST /api/integrations/checkr
Submit background check request.

**Auth**: Required (chef, driver)

**Request Body**:
```typescript
{
  firstName: string
  lastName: string
  dateOfBirth: string
  ssn: string
  licenseNumber?: string  // Required for drivers
}
```

**Response**:
```typescript
{
  candidateId: string
  reportId: string
  status: 'pending' | 'clear' | 'consider'
  mock?: boolean
}
```

#### GET /api/integrations/checkr
Get background check status.

**Auth**: Required (chef, driver)

**Response**:
```typescript
{
  status: 'pending' | 'clear' | 'consider' | 'not_started'
  reportId?: string
  mock?: boolean
}
```

### Agora (Live Streaming)

#### POST /api/integrations/agora?action=start
Start a live stream.

**Auth**: Required (chef)

**Response**:
```typescript
{
  channelName: string
  token: string
  uid: string
  appId: string
  streamId?: string
  mock?: boolean
}
```

#### POST /api/integrations/agora?action=end
End a live stream.

**Auth**: Required (chef)

**Request Body**:
```typescript
{
  streamId: string
}
```

**Response**:
```typescript
{
  success: boolean
}
```

#### GET /api/integrations/agora/token
Get viewer token for joining a stream.

**Auth**: Required (customer)

**Query Parameters**:
```typescript
{
  channelName: string
}
```

**Response**:
```typescript
{
  token: string
  uid: string
  appId: string
  mock?: boolean
}
```

### SendGrid (Email Notifications)

#### POST /api/integrations/sendgrid/send
Send an email (typically called server-side).

**Auth**: Server-side only (not exposed to frontend)

**Request Body**:
```typescript
{
  to: string
  template: 'welcome' | 'order_confirmation' | 'order_ready' | 'payout' | 'rating_request'
  data: Record<string, any>  // Template variables
}
```

**Response**:
```typescript
{
  success: boolean
  messageId?: string
  mock?: boolean
}
```

## Error Responses

All endpoints return consistent error responses:

```typescript
{
  error: string              // Human-readable error message
  details?: string          // Additional error details
}
```

**HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Internal Server Error

## Frontend Usage

Use the API client helpers for type-safe API calls:

```typescript
import { ordersApi, menuApi, subscriptionsApi } from '@/lib/api-client'

// Example: Create an order
try {
  const { orderId, order } = await ordersApi.create({
    chefId: '123',
    items: [{ menuItemId: 'abc', quantity: 2 }],
    fulfillmentType: 'delivery',
    deliveryAddress: '123 Main St'
  })
  console.log('Order created:', orderId)
} catch (error) {
  console.error('Failed to create order:', error)
}

// Example: Get menu items
const { menuItems } = await menuApi.getAll({ 
  chefId: '123',
  available: true 
})

// Example: Update subscription
await subscriptionsApi.updateStatus('sub_123', 'paused')
```

## Mock Fallbacks

When third-party services are not configured (missing API keys), the endpoints return mock data with a `mock: true` flag. This allows development and testing without requiring all service integrations.

Services with mock fallbacks:
- Stripe payments (when `STRIPE_SECRET_KEY` is missing)
- Checkr background checks (when `CHECKR_API_KEY` is missing)
- Agora live streaming (when `AGORA_APP_ID` is missing)
- SendGrid emails (when `SENDGRID_API_KEY` is missing)
