# Guest User Flow Diagram

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Landing Page (/)                             │
│                                                                      │
│  • Hero with "Find Local Chefs" button → /explore                  │
│  • Featured dishes with "Order Now" → /explore                      │
│  • "Become a Chef" → /auth/signup/chef                             │
│  • "Become a Driver" → /auth/signup/driver                         │
│  • "Log In" link → /auth/login                                     │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                    Click "Find Local Chefs"
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      Browse Chefs (/explore)                         │
│                                                                      │
│  🟨 Guest Banner: "Sign up for free to place orders!"              │
│                                                                      │
│  Navigation:                                                         │
│    • Logo → / (home)                                                │
│    • Become a Chef → /auth/signup/chef                             │
│    • Become a Driver → /auth/signup/driver                         │
│    • Log In → /auth/login                                          │
│    • Sign Up → /auth/signup/customer                               │
│                                                                      │
│  Filters & Search:                                                  │
│    • Radius slider (0.5-15 miles)                                  │
│    • Category buttons (Mexican, Asian, etc.)                       │
│    • Dietary filters (Vegan, Gluten-Free, etc.)                   │
│    • Sort by: Distance or Rating                                   │
│                                                                      │
│  Chef Cards Grid:                                                   │
│    • Chef photo, name, rating                                      │
│    • Cuisine categories                                            │
│    • Distance from user                                            │
│    • LIVE badge if streaming                                       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
                       Click on any chef
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                  Chef Profile (/explore/chef/[id])                   │
│                                                                      │
│  🟨 Guest Banner: "Sign up for free to order from this chef!"      │
│                                                                      │
│  Navigation: Same as /explore page                                  │
│                                                                      │
│  Chef Header:                                                       │
│    • Cover photo & profile picture                                 │
│    • Name, rating, reviews count                                   │
│    • Distance, subscriber count                                    │
│    • Bio & cuisine categories                                      │
│    • LIVE badge if streaming                                       │
│                                                                      │
│  Tabs:                                                              │
│    ┌─────────────────────────────────────────────────┐            │
│    │ MENU TAB                                        │            │
│    │  • Menu item cards with photos                  │            │
│    │  • Name, description, price                     │            │
│    │  • Dietary tags                                 │            │
│    │  • "Add to Cart" button → 🚫 Signup Modal      │            │
│    └─────────────────────────────────────────────────┘            │
│                                                                      │
│    ┌─────────────────────────────────────────────────┐            │
│    │ SUBSCRIPTIONS TAB                               │            │
│    │  • Meal plan cards                              │            │
│    │  • Price, description, savings                  │            │
│    │  • "Subscribe Now" → 🚫 Signup Modal           │            │
│    └─────────────────────────────────────────────────┘            │
│                                                                      │
│    ┌─────────────────────────────────────────────────┐            │
│    │ REVIEWS TAB                                     │            │
│    │  • Customer reviews (public, no login needed)   │            │
│    │  • Name, rating, date, comment                  │            │
│    └─────────────────────────────────────────────────┘            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                              ↓
        User clicks: Add to Cart / Order / Watch LIVE / Subscribe
                              ↓
┌─────────────────────────────────────────────────────────────────────┐
│                         Signup Modal                                 │
│                                                                      │
│  📝 "Sign Up to Order"                                              │
│                                                                      │
│  Create a free account to:                                          │
│   ✓ Order from local chefs                                         │
│   ✓ Track your orders                                              │
│   ✓ Save your favorites                                            │
│                                                                      │
│  ┌────────────────────────────┐  ┌────────────────────────────┐  │
│  │   Sign Up Free             │  │   Log In                   │  │
│  │   → /auth/signup/customer  │  │   → /auth/login            │  │
│  └────────────────────────────┘  └────────────────────────────┘  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Points

### ✅ Guest Can Do:
- Browse all chefs
- View complete menus with prices
- See chef profiles, ratings, and reviews
- Filter by cuisine, diet, distance
- Read customer reviews
- See subscription options and pricing
- Watch chefs who are LIVE (after signup prompt)

### 🚫 Guest Cannot Do:
- Add items to cart
- Place orders
- Subscribe to meal plans
- Leave reviews
- Save favorites
- Track deliveries

### 🎯 Conversion Points:
1. **Banner** - Persistent on all guest pages
2. **Add to Cart** - Most common action → Modal
3. **Order/Subscribe** - Purchase intent → Modal
4. **Watch LIVE** - High engagement → Modal
5. **Navigation** - Signup button always visible in header

### 🎨 Design Elements:
- **Guest Banner**: Amber/yellow background with friendly messaging
- **Modal**: Clean, benefit-focused with dual CTAs
- **Navigation**: Consistent across all guest pages
- **Branding**: NeighborEats teal accent color throughout

## Routes Summary

### Public (No Auth Required):
- `/` - Landing page
- `/explore` - Browse chefs
- `/explore/chef/[id]` - Chef profile

### Authenticated:
- `/auth/login` - Login page
- `/auth/signup/customer` - Customer signup
- `/auth/signup/chef` - Chef signup
- `/auth/signup/driver` - Driver signup
- `/dashboard/customer/*` - Customer dashboard (requires auth)
- `/dashboard/chef/*` - Chef dashboard (requires auth)
- `/dashboard/driver/*` - Driver dashboard (requires auth)

## URL Structure

```
Public Access:
https://neighboreats.com/
https://neighboreats.com/explore
https://neighboreats.com/explore/chef/1
https://neighboreats.com/explore/chef/2

After Login (Customer):
https://neighboreats.com/dashboard/customer
https://neighboreats.com/dashboard/customer/search
https://neighboreats.com/dashboard/customer/chef/1
https://neighboreats.com/dashboard/customer/cart
https://neighboreats.com/dashboard/customer/orders
```

This creates a clear separation between public browsing and authenticated user experiences.
