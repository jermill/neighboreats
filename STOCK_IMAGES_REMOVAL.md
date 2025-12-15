# Stock Images & Mock Data Auto-Removal Implementation

## Overview
The application now automatically removes stock images and mock chef data once real chefs are onboarded and approved in the database.

## What Was Changed

### 1. New API Endpoints Created

#### `/api/chefs` (GET)
- Fetches all ACTIVE chefs with APPROVED background checks from the database
- Returns empty array if no real chefs exist
- Supports optional filtering by location (latitude, longitude, radius)
- Only returns approved chefs that are ready to accept orders

#### `/api/chefs/[id]` (GET)  
- Fetches individual chef details by ID
- Includes chef profile, menu items, and reviews
- Only returns ACTIVE/APPROVED chefs

### 2. Pages Updated to Use Real Data

All chef browsing and profile pages now:
1. Fetch real data from the database via API
2. Automatically fall back to mock data if no real chefs exist
3. Show real chef data when available (no more stock images!)

**Updated Pages:**
- `/explore` - Public chef browsing page
- `/explore/chef/[id]` - Public chef profile page
- `/dashboard/customer` - Customer dashboard with live chefs
- `/dashboard/customer/search` - Customer chef search page
- `/dashboard/customer/chef/[id]` - Customer chef profile page

### 3. Mock Data Documentation

Added clear documentation to `src/lib/mockData.ts` explaining:
- Mock data is for development/demo purposes only
- It's used as fallback when no real chefs exist
- Stock images will NOT be shown once real chefs are onboarded

## How It Works

### Before Real Chefs Are Onboarded:
```
User visits app → API returns empty array → Fallback to mock data → Stock images shown
```

### After Real Chefs Are Onboarded:
```
User visits app → API returns real chefs → Real data displayed → No stock images!
```

## Testing the Implementation

### To see real data (instead of mock data):
1. Create chef accounts in your database
2. Set their `account_status` to `'ACTIVE'`
3. Set their `background_check_status` to `'APPROVED'`
4. Add profile information (name, photo, bio, location, etc.)

### Example SQL to approve a test chef:
```sql
-- Update chef status
UPDATE chefs 
SET account_status = 'ACTIVE', 
    background_check_status = 'APPROVED'
WHERE id = 'your-chef-id';

-- Add chef profile data
UPDATE users 
SET name = 'Real Chef Name',
    photo_url = 'https://real-photo-url.com/photo.jpg'
WHERE id = 'your-chef-id';

UPDATE chefs 
SET bio = 'Real chef bio',
    kitchen_address = '123 Real St',
    latitude = 39.7459,
    longitude = -75.5466,
    categories = ARRAY['Mexican', 'Vegetarian']
WHERE id = 'your-chef-id';
```

## Benefits

✅ **Automatic Transition**: No code changes needed when onboarding real chefs  
✅ **Graceful Fallback**: Mock data shown during development or if API fails  
✅ **Production Ready**: Real chef data displayed automatically once approved  
✅ **No Manual Removal**: Stock images disappear when real data exists  
✅ **SEO Friendly**: Real content shown to search engines once available  

## Key Points

- **No action required** from you once chefs are approved in the database
- The app intelligently switches between mock and real data
- Stock images (Maria Rodriguez, Emma Wilson, Sarah Johnson) will **automatically disappear** once you have 1+ approved chefs
- All existing functionality continues to work during the transition
- The mock data serves as a backup/fallback for development and error scenarios

## Files Modified

1. **New Files:**
   - `src/app/api/chefs/route.ts` - List all chefs API
   - `src/app/api/chefs/[id]/route.ts` - Individual chef API
   - `STOCK_IMAGES_REMOVAL.md` - This documentation

2. **Updated Files:**
   - `src/app/explore/page.tsx` - Public explore page
   - `src/app/explore/chef/[id]/page.tsx` - Public chef profile
   - `src/app/dashboard/customer/page.tsx` - Customer dashboard
   - `src/app/dashboard/customer/search/page.tsx` - Chef search
   - `src/app/dashboard/customer/chef/[id]/page.tsx` - Chef profile in dashboard
   - `src/lib/mockData.ts` - Added documentation

## Next Steps

When you're ready to test with real chefs:
1. Sign up test chef accounts through the app
2. Manually approve them in the database (or implement approval workflow)
3. Visit any chef browsing page - you'll see real chefs instead of mock data!

The transition is seamless and automatic. 🎉
