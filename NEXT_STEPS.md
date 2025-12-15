# Next Steps - Frontend to Backend Wiring

## Current State

✅ **UI Layer**: All pages built with mock data  
✅ **API Layer**: All endpoints implemented and tested  
✅ **Documentation**: Complete setup guides  
🚧 **Integration**: Need to connect frontend to backend APIs

## Immediate Task: Wire Frontend to APIs

### Estimated Time: 2-3 hours

### 1. Customer Dashboard Pages (45 mins)

#### Orders Page (`src/app/dashboard/customer/orders/page.tsx`)
```typescript
// Replace mock data imports
import { ordersApi } from '@/lib/api-client'
import { OrderCardSkeleton } from '@/components/shared/SkeletonLoader'

// Add loading state
const [loading, setLoading] = useState(true)
const [orders, setOrders] = useState([])

// Fetch data on mount
useEffect(() => {
  const fetchOrders = async () => {
    try {
      const { orders } = await ordersApi.getAll({ status: activeStatus })
      setOrders(orders)
    } catch (error) {
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }
  fetchOrders()
}, [activeStatus])

// Show loading state
if (loading) return <OrderCardSkeleton count={3} />
```

#### Search Page (`src/app/dashboard/customer/search/page.tsx`)
```typescript
import { menuApi } from '@/lib/api-client'
import { ChefCardSkeleton } from '@/components/shared/SkeletonLoader'

// Fetch chefs with filters
const fetchChefs = async () => {
  const { menuItems } = await menuApi.getAll({ 
    category: selectedCategory,
    available: true 
  })
  // Group by chef
}
```

#### Cart/Checkout (`src/app/dashboard/customer/checkout/page.tsx`)
```typescript
import { ordersApi, paymentsApi } from '@/lib/api-client'

// On checkout submit
const handleCheckout = async () => {
  try {
    // Create order
    const { orderId, order } = await ordersApi.create({
      chefId: cartChef.id,
      items: cart.map(item => ({
        menuItemId: item.menuItem.id,
        quantity: item.quantity
      })),
      fulfillmentType,
      deliveryAddress,
      specialInstructions
    })
    
    // Create payment intent
    const { clientSecret } = await paymentsApi.createPaymentIntent({
      amount: totalPrice * 100, // Convert to cents
      orderId,
      chefId: cartChef.id
    })
    
    // Show success
    toast.success('Order placed!')
    router.push('/dashboard/customer/orders')
  } catch (error) {
    toast.error('Failed to place order')
  }
}
```

### 2. Chef Dashboard Pages (45 mins)

#### Menu Management (`src/app/dashboard/chef/menu/page.tsx`)
```typescript
import { menuApi } from '@/lib/api-client'
import { MenuItemCardSkeleton } from '@/components/shared/SkeletonLoader'

// Fetch menu items
useEffect(() => {
  const fetchMenu = async () => {
    const { menuItems } = await menuApi.getAll({ 
      chefId: currentUser.id 
    })
    setMenuItems(menuItems)
  }
  fetchMenu()
}, [])

// Create menu item
const handleCreate = async (data) => {
  const { menuItem } = await menuApi.create(data)
  setMenuItems([...menuItems, menuItem])
  toast.success('Menu item created!')
}

// Update menu item
const handleUpdate = async (id, data) => {
  const { menuItem } = await menuApi.update(id, data)
  setMenuItems(menuItems.map(m => m.id === id ? menuItem : m))
}

// Delete menu item
const handleDelete = async (id) => {
  await menuApi.delete(id)
  setMenuItems(menuItems.filter(m => m.id !== id))
}
```

#### Orders Management (`src/app/dashboard/chef/orders/page.tsx`)
```typescript
import { ordersApi } from '@/lib/api-client'

// Accept order
const handleAccept = async (orderId) => {
  await ordersApi.updateStatus(orderId, 'accepted')
  toast.success('Order accepted!')
  refreshOrders()
}

// Mark as ready
const handleMarkReady = async (orderId) => {
  await ordersApi.updateStatus(orderId, 'ready')
  toast.success('Order marked as ready!')
  refreshOrders()
}
```

#### Live Streaming (`src/app/dashboard/chef/live/page.tsx`)
```typescript
import { integrationsApi } from '@/lib/api-client'

// Start stream
const handleGoLive = async () => {
  const { channelName, token, appId } = await integrationsApi.agora.startStream()
  setStreamData({ channelName, token, appId })
  setIsStreaming(true)
}

// End stream
const handleEndStream = async () => {
  await integrationsApi.agora.endStream(streamId)
  setIsStreaming(false)
}
```

### 3. Driver Dashboard Pages (30 mins)

#### Deliveries (`src/app/dashboard/driver/deliveries/page.tsx`)
```typescript
import { ordersApi } from '@/lib/api-client'

// Fetch available deliveries
const fetchDeliveries = async () => {
  const { orders } = await ordersApi.getAll({ 
    status: 'ready' 
  })
  setDeliveries(orders)
}

// Accept delivery
const handleAccept = async (orderId) => {
  await ordersApi.updateStatus(orderId, 'out_for_delivery')
  router.push('/dashboard/driver/active')
}
```

### 4. Profile Pages (All Roles) (20 mins)

```typescript
import { profileApi } from '@/lib/api-client'

// Load profile
useEffect(() => {
  const fetchProfile = async () => {
    const { profile } = await profileApi.get()
    setFormData(profile)
  }
  fetchProfile()
}, [])

// Save profile
const handleSave = async () => {
  await profileApi.update(formData)
  toast.success('Profile updated!')
}
```

### 5. Add Skeleton Loaders (20 mins)

Import and use throughout:
```typescript
import { 
  ChefCardSkeleton, 
  MenuItemCardSkeleton,
  OrderCardSkeleton,
  StatCardSkeleton 
} from '@/components/shared/SkeletonLoader'

// In render
if (loading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChefCardSkeleton count={6} />
    </div>
  )
}
```

## Testing Checklist

After wiring, test these flows:

### Customer Flow
- [ ] Browse chefs
- [ ] View chef profile and menu
- [ ] Add items to cart
- [ ] Complete checkout
- [ ] View order history
- [ ] Subscribe to chef
- [ ] Rate completed order
- [ ] Update profile

### Chef Flow
- [ ] Add/edit/delete menu items
- [ ] View incoming orders
- [ ] Accept/reject orders
- [ ] Mark orders as ready
- [ ] View earnings
- [ ] Manage subscription tiers
- [ ] Go live (mock)
- [ ] Update profile

### Driver Flow
- [ ] View available deliveries
- [ ] Accept delivery
- [ ] Update delivery status
- [ ] Complete delivery
- [ ] View earnings
- [ ] Update profile

## Common Patterns

### 1. Data Fetching with Loading
```typescript
const [loading, setLoading] = useState(true)
const [data, setData] = useState([])
const [error, setError] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true)
      const result = await api.getData()
      setData(result)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load data')
    } finally {
      setLoading(false)
    }
  }
  fetchData()
}, [dependencies])

if (loading) return <SkeletonLoader />
if (error) return <EmptyState message={error} />
```

### 2. Form Submission
```typescript
const [submitting, setSubmitting] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setSubmitting(true)
  try {
    await api.submitData(formData)
    toast.success('Success!')
    router.push('/success-page')
  } catch (error) {
    toast.error(error.message)
  } finally {
    setSubmitting(false)
  }
}
```

### 3. Optimistic Updates
```typescript
const handleUpdate = async (id, newData) => {
  // Optimistically update UI
  setItems(items.map(item => 
    item.id === id ? { ...item, ...newData } : item
  ))
  
  try {
    await api.update(id, newData)
  } catch (error) {
    // Revert on error
    setItems(originalItems)
    toast.error('Update failed')
  }
}
```

## Environment Setup

Before testing with real APIs:

1. **Copy environment file**:
   ```bash
   cp env.example .env.local
   ```

2. **Get Supabase keys** (required):
   - Visit: https://supabase.com/dashboard/project/icntzxgwrnidzpxdplbm/settings/api
   - Copy `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Start Supabase locally** (or use remote):
   ```bash
   supabase start
   ```

4. **Optional: Add Stripe keys** (for payment testing):
   - Visit: https://dashboard.stripe.com/apikeys
   - Copy test keys to `.env.local`

5. **Start dev server**:
   ```bash
   npm run dev
   ```

## Files to Modify

### High Priority (Core Flows)
1. `src/app/dashboard/customer/orders/page.tsx`
2. `src/app/dashboard/customer/search/page.tsx`
3. `src/app/dashboard/customer/checkout/page.tsx`
4. `src/app/dashboard/chef/menu/page.tsx`
5. `src/app/dashboard/chef/orders/page.tsx`
6. `src/app/dashboard/driver/deliveries/page.tsx`
7. `src/app/dashboard/driver/active/page.tsx`

### Medium Priority (Extended Features)
8. `src/app/dashboard/customer/subscriptions/page.tsx`
9. `src/app/dashboard/chef/subscriptions/page.tsx`
10. `src/app/dashboard/chef/live/page.tsx`
11. All profile pages (3 files)

### Low Priority (Already Mostly Static)
12. Dashboard home pages (stats can stay mock initially)
13. Earnings pages (can calculate from orders)

## After Wiring

Once frontend is connected:

1. **Test locally** with mock data (works immediately)
2. **Add Supabase keys** to test real database
3. **Add Stripe keys** to test payments
4. **Deploy to Netlify** (all env vars configured)
5. **Share with team** for feedback

## Success Criteria

- [ ] All pages load data from APIs (not mock files)
- [ ] Loading states show while fetching
- [ ] Errors display toast notifications
- [ ] Forms submit to backend
- [ ] Data persists after refresh
- [ ] User can complete full workflows
- [ ] Build passes (`npm run build`)
- [ ] No console errors in browser

## Estimated Timeline

- **Customer pages**: 45 minutes
- **Chef pages**: 45 minutes
- **Driver pages**: 30 minutes
- **Profile pages**: 20 minutes
- **Loading states**: 20 minutes
- **Testing & fixes**: 30 minutes

**Total**: 2.5 - 3 hours

---

**Status**: Ready to implement  
**Blocked by**: None (all APIs ready)  
**Next**: Start with customer dashboard
