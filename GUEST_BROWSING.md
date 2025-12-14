# Guest Browsing Feature

## Overview
Users can now explore and browse local chefs **without creating an account**. This reduces friction and allows potential customers to see what NeighborEats offers before committing to signup.

## What Changed

### 1. New Public Routes
Created two new public pages accessible without authentication:

- **`/explore`** - Main chef browsing page
  - Search and filter local chefs
  - Sort by distance or rating
  - Filter by cuisine categories and dietary preferences
  - Adjustable search radius (0.5-15 miles)
  - Guest banner with signup prompts

- **`/explore/chef/[id]`** - Public chef profile page
  - View chef details, ratings, and reviews
  - Browse full menu with photos and prices
  - See subscription plans
  - Guest prompts when attempting to order

### 2. Homepage Updates
Updated the main landing page (`/`):

- **"Find Local Chefs"** button now points to `/explore` (was `/auth/signup/customer`)
- All "Order Now" buttons on dish cards link to `/explore`
- Maintains clear CTAs for becoming a chef or driver

### 3. Footer Updates
Updated footer links:

- Changed "Find Chefs" link from dashboard route to public `/explore` route
- Added "Browse Chefs" as the first customer link

### 4. User Experience Flow

#### Guest Flow:
1. Visit homepage → Click "Find Local Chefs"
2. Browse chefs on `/explore` page (no account needed)
3. Click on any chef to view their profile at `/explore/chef/[id]`
4. See guest banner: "Sign up for free to order from this chef!"
5. When clicking "Add to Cart", "Order", or "Watch LIVE" → Modal appears
6. Modal explains benefits of signing up with clear CTAs:
   - "Sign Up Free" button → `/auth/signup/customer`
   - "Log In" button → `/auth/login`

#### Authenticated Flow:
- Users who are logged in still use `/dashboard/customer/search` and `/dashboard/customer/chef/[id]`
- Full functionality: adding to cart, ordering, subscriptions, etc.

### 5. Component Features

#### `/explore` Page Features:
- Clean navigation bar with login/signup buttons
- Search location indicator
- Guest mode banner (amber/yellow)
- Full filtering capabilities:
  - Search radius slider
  - Category buttons
  - Dietary preference filters
  - Sort by distance or rating
- Chef cards with photos, ratings, categories, and distance
- Responsive grid layout

#### `/explore/chef/[id]` Page Features:
- Professional chef profile with cover photo
- Chef stats: rating, reviews, distance, subscribers
- LIVE badge if chef is streaming
- Three tabs: Menu, Subscriptions, Reviews
- Interactive menu cards with photos and prices
- Sign-up modal when attempting to order
- Back to explore navigation

### 6. Benefits

**For Users:**
- ✅ No registration friction
- ✅ See actual menus and prices before signing up
- ✅ Read real reviews
- ✅ Understand the value proposition
- ✅ Make informed decision to join

**For Business:**
- ✅ Lower barrier to entry
- ✅ Showcase platform value
- ✅ Better conversion through informed users
- ✅ SEO-friendly public pages
- ✅ Shareable chef profile links

## Technical Implementation

### Files Created:
- `/src/app/explore/page.tsx` - Public chef search page
- `/src/app/explore/chef/[id]/page.tsx` - Public chef profile page

### Files Modified:
- `/src/app/page.tsx` - Updated homepage CTAs
- `/src/components/shared/Footer.tsx` - Updated footer links
- `/src/README.md` - Documented guest browsing feature

### Key Features:
- No authentication required
- Reuses existing components (ChefCard, MenuItemCard, Rating, etc.)
- Uses mock data from `/src/lib/mockData.ts`
- Modal prompts for signup/login when action requires authentication
- Responsive design matching existing app style

## How to Test

1. Start the dev server: `npm run dev`
2. Visit `http://localhost:3001`
3. Click "Find Local Chefs" button
4. Browse chefs without logging in
5. Click on a chef to view their profile
6. Try to add items to cart → signup modal appears
7. Navigate using "Become a Chef" and "Become a Driver" links in header

## Future Enhancements

Potential improvements:
- Add social sharing for chef profiles
- Show "guest preview" limited menu items
- Track guest browsing analytics
- Implement chef profile SEO metadata
- Add "favorite" prompts for guests (save to local storage)
- Create public "Popular Chefs" landing pages by city
- Add public search by cuisine or dietary needs

## Notes

- Guest pages have their own navigation (not using DashboardLayout)
- All guest pages display amber/yellow banners to encourage signup
- Authenticated users should continue using dashboard routes
- Modal component explains value of signing up with benefits list
- Design matches existing NeighborEats branding and color scheme
