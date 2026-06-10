# NeighborEats - Complete Product Requirements Document

## Executive Summary

NeighborEats is a hyper-local, community-first peer-to-peer marketplace connecting neighborhood chefs with customers and vetted drivers. Unlike UberEats/DoorDash, NeighborEats emphasizes local support, transparency, and fair economics—chefs keep 80-85% of meal revenue, drivers earn $4-5 per delivery, and customers pay less while supporting their community.

**Business Model:** Subscription + à la carte meal ordering, with live chef streaming for authenticity and trust.

**Target Market:** Delaware/Philadelphia region expanding nationally; chefs (home-based & commercial), health-conscious customers, fitness enthusiasts, busy professionals.

---

## 1. PRODUCT OVERVIEW

### 1.1 Core Features

**For Chefs:**
- Create profile with kitchen location, categories, meal items
- Offer subscriptions (3, 5, 7, 10, 12 meals/week with custom pricing)
- List à la carte meals/smoothies/baked goods
- Go LIVE on Agora during meal prep (for authenticity)
- Manage orders (accepting, marking ready, tracking prep time)
- View earnings dashboard (subscriptions, à la carte, bonuses)
- Communicate with customers via in-app messaging
- Track ratings and customer feedback

**For Customers:**
- Search chefs by geofencing radius (0.5-15 miles)
- Filter by dietary preferences (vegan, keto, gluten-free, etc.)
- Browse all 10 categories (meals, juices, baked goods, specialty diets, ethnic cuisines, wellness, beverages, prepared components, catering, meal plans)
- Subscribe to chef's weekly meals (save 15-25% vs à la carte)
- Order à la carte (single meals, smoothies, snacks anytime)
- Watch chef LIVE stream while cooking (builds trust)
- Choose fulfillment: local pickup at hub OR delivery
- Rate chef and driver after each order
- View order history and subscription management

**For Drivers:**
- Accept delivery orders from chefs
- View delivery location, customer address, delivery instructions
- Real-time GPS navigation to chef → customer
- Track earnings per delivery ($4-5 per order)
- View performance metrics (on-time %, rating, total earnings)
- Rate customer professionalism
- Weekly direct deposit payouts via Stripe

**For Admin (You):**
- Dashboard with KPIs (orders, revenue, active chefs/drivers/customers)
- Chef management (list, details, ratings, suspend, payouts)
- Driver management (list, details, performance, earnings)
- Customer management (list, orders, subscriptions, churn tracking)
- Order management (real-time status, fulfillment tracking)
- Subscription analytics (churn, retention, tier breakdown)
- Payment & payout tracking (your commission, chef payouts, driver payouts)
- Business analytics (trends, revenue, top performers)
- Disputes & refund management
- Compliance monitoring (background checks, ratings, suspensions)
- Real-time activity feed and delivery map view

---

## 2. TECHNOLOGY STACK

### 2.1 Frontend

**Mobile-First Strategy:**
- **React** (for web PWA version at neighboreats.co)
- **React Native or Flutter** (later for iOS/Android native apps)
- **Next.js** (PWA, server-side rendering, API routes)
- **TailwindCSS** (styling)
- **Chart.js or Recharts** (analytics dashboards)
- **Mapbox or Google Maps** (delivery tracking map view)
- **Geolocation API** (GPS for radius search)

### 2.2 Backend

- **Supabase** (PostgreSQL database, real-time subscriptions, authentication)
- **Next.js API Routes** (backend endpoints)
- **Serverless Functions** (optional for webhooks)

### 2.3 Third-Party Services

- **Stripe** (payments, Stripe Connect for chef/driver payouts)
- **Stripe Connect** (mandatory for all chefs & drivers to receive payouts)
- **SendGrid** (transactional emails, notifications)
- **Agora** (WebRTC live streaming, video SDK)
- **Checkr** (background checks via API, webhook integration)
- **Google Maps API** (optional Phase 2: visual delivery tracking, directions)

### 2.4 Hosting

- **Netlify** (PWA/web hosting, auto-deploys from GitHub)
- **Supabase** (managed database)
- **Vercel** (optional alternative for Next.js hosting)

---

## 3. USER ROLES & PERMISSIONS

### 3.1 Chef Role

**Account Requirements:**
- ✅ Background check via Checkr (chef pays $10-15)
- ✅ Stripe Connect account (for payouts)
- ✅ Kitchen address verification
- ✅ Profile photo and bio

**Capabilities (When Active):**
- Create menu items in all 10 categories
- Set subscription tiers (3-12 meals/week with custom pricing)
- Set à la carte prices
- Go LIVE stream via Agora during cooking
- Accept/reject orders
- Mark orders as ready (notify customer)
- Communicate with customers
- View earnings (real-time dashboard)
- View customer ratings/feedback
- Update profile and menu anytime
- Pause account (temporary)

**Restrictions (Until Verified):**
- ❌ Cannot create menu items until background check + Stripe complete
- ❌ Cannot go LIVE stream
- ❌ Cannot accept orders
- ✅ Can view app, browse other chefs, update profile

### 3.2 Customer Role

**Account Requirements:**
- Email address
- Phone number
- Delivery address (for orders)

**Capabilities:**
- Search chefs by radius + dietary filters
- View chef profiles, ratings, menus
- Watch LIVE chef streams
- Subscribe to chef's meals
- Order à la carte anytime
- Choose pickup or delivery fulfillment
- Rate chef and driver
- Manage subscriptions (pause, upgrade, downgrade, cancel)
- View order history
- Message chef with special requests

**Restrictions:**
- Cannot rate without completing an order
- Cannot message chef before order placed

### 3.3 Driver Role

**Account Requirements:**
- ✅ Background check via Checkr (driver pays $10-15, includes driving record)
- ✅ Stripe Connect account (for payouts)
- ✅ Valid driver's license
- ✅ Vehicle insurance
- ✅ Profile photo

**Capabilities (When Active):**
- View available delivery orders nearby (within 5 miles)
- Accept delivery orders
- View order details (what, where, delivery address)
- Real-time GPS navigation
- Confirm pickup at chef's location
- Confirm delivery at customer's location
- View earnings (per delivery, weekly total)
- Rate customer professionalism
- Weekly payouts via Stripe

**Restrictions (Until Verified):**
- ❌ Cannot accept orders until background check + Stripe complete
- ✅ Can view app, browse available orders

### 3.4 Admin Role (You)

**Capabilities:**
- Full access to all data
- View all chefs, drivers, customers, orders
- Suspend/reactivate accounts
- Issue refunds
- Manage disputes
- View all payments, payouts, commission tracking
- Generate reports and analytics
- Monitor real-time activity
- Configure platform settings

**Restrictions:**
- Cannot manually change chef/driver earnings (only via disputes)
- Cannot process payouts (Stripe handles automatically)

---

## 4. USER FLOWS

### 4.1 Chef Onboarding

```
1. Sign up (name, email, phone, address)
2. Fill profile (kitchen location, categories, bio, photo)
3. Order background check via Checkr
   - Redirected to Checkr flow
   - Chef enters SSN, DOB, address
   - Chef pays $10-15
   - Status: PENDING (24-48 hours)
4. Connect Stripe account
   - Redirected to Stripe Connect
   - Chef enters bank account, tax ID
   - Stripe verifies (2-5 business days)
5. Dashboard (can view app, cannot list meals yet)
   - Message: "Pending verification"
   - Can update profile
6. Background check returns
   - If APPROVED → Status updates
   - If DENIED → Explanation + appeal option
7. Stripe connects
   - Chef receives "Ready to go live" email
8. ACTIVATED
   - Can create menu items
   - Can go LIVE
   - Can accept orders
```

### 4.2 Customer Ordering (Subscription)

```
1. Open app, enable location
2. Set radius (1-3 miles), dietary filters, price range
3. See nearby chefs with ratings
4. Click chef → view profile + menu
5. Option: Watch LIVE stream (optional)
6. Choose subscription tier (e.g., "5-Day Reset" - $95/month)
7. Select preferred meals from chef's menu
8. Choose fulfillment (pickup hub or delivery +$2)
9. Checkout → Stripe payment
10. Confirmation email
11. Auto-renews weekly (can pause/skip anytime)
12. Pickup Mon-Fri or delivery scheduled
13. Rate chef after eating
```

### 4.3 Customer Ordering (À La Carte)

```
1. Open app, 5:35 PM, at gym
2. Enable location → system detects gym address
3. Set radius (1 mile), category (Juices & Smoothies)
4. See Chef Maria (0.8 miles) - Protein Smoothie $12
5. Click order → add to cart
6. Choose: Pickup or Delivery +$4
7. Checkout → Stripe payment
8. Real-time notification: "Chef Maria making your smoothie"
9. Driver accepts, picks up
10. Real-time tracking: Driver location
11. Arrives 5:55 PM - HOT & FRESH
12. Rate chef & driver
```

### 4.4 Driver Onboarding

```
1. Sign up (name, email, phone, address)
2. Enter driver's license, vehicle info
3. Order background check via Checkr
   - Includes driving record check
   - Driver pays $10-15
   - Status: PENDING (24-48 hours)
4. Connect Stripe account
   - Driver enters bank account, tax ID
   - Status: PENDING (2-5 days)
5. Dashboard (can view app, cannot accept deliveries yet)
6. Background + Stripe complete → ACTIVATED
7. See available delivery orders in 5-mile radius
8. Accept order → navigate to chef
9. Pickup meal at chef's location
10. Navigate to customer
11. Delivery confirmation
12. Get paid $4 delivery fee
13. Weekly direct deposit payout on Fridays
```

---

## 5. CATEGORIES

### 5.1 All Categories Available at Launch

**1. MEALS**
- Breakfast (omelets, pancakes, bowls, burritos)
- Lunch (salads, sandwiches, pasta, rice bowls, soups)
- Dinner (pasta, proteins, sides, ethnic cuisines, comfort food)
- Meal prep/batch (5-day boxes, portion-controlled, macro-optimized)

**2. JUICES & SMOOTHIES**
- Cold pressed juices (green, citrus, detox, wellness shots)
- Smoothies (protein, green, recovery, weight loss, kids)
- Specialty drinks (kombucha, cold brew, tea, energy drinks)

**3. BAKED GOODS & SNACKS**
- Pastries (croissants, pain au chocolat, muffins, scones)
- Cookies, brownies, bars, bread, donuts, cakes
- Snacks (energy bars, granola, fruit prep, veggie packs, popcorn)

**4. SPECIALTY DIETS**
- Keto/Low-carb (meals, snacks, desserts)
- Vegan/Vegetarian (plant-based, protein, desserts)
- Gluten-free (meals, baked goods, snacks)
- Paleo/Whole30 (compliant meals, snacks)
- Allergenic-free (nut-free, dairy-free, soy-free, multi-allergen)

**5. ETHNIC CUISINES**
- Italian (pasta, risotto, meats, cheeses, pastries, gelato)
- Asian (Chinese, Thai, Vietnamese, sushi, ramen)
- Mexican (burritos, tacos, enchiladas, tamales, churros)
- Mediterranean (Greek bowls, hummus, grilled meats, baklava)
- Indian (curries, breads, rice dishes, sweets)
- Latin/Caribbean (empanadas, arepas, rice & beans)
- Middle Eastern (kebabs, shawarma, hummus, falafel, baklava)

**6. HEALTHY/WELLNESS**
- Fitness-focused (high-protein, pre/post-workout, macro-tracked)
- Weight loss (low-calorie, balanced macros, portion-controlled)
- Wellness/healing (anti-inflammatory, gut-health, immune-boosting, detox)
- Diabetic-friendly (low-glycemic, sugar-free, nutrient-dense)

**7. BEVERAGES**
- Coffee (cold brew, iced, specialty drinks, syrups)
- Tea (iced, herbal, bubble tea, matcha lattes)
- Wellness beverages (golden milk, turmeric lattes, adaptogens, electrolytes)
- Alcohol-free (kombucha, ginger ale, infused waters, natural sodas)

**8. PREPARED/SEMI-PREPARED**
- Proteins (grilled chicken, beef, fish, pork, plant-based, rotisserie)
- Sides (rice, quinoa, vegetables, potatoes, beans)
- Sauces/dressings (marinara, pesto, alfredo, Asian, salad dressings)

**9. CATERING PACKAGES**
- Office catering (lunch for groups, breakfast platters, coffee service)
- Event catering (parties, gatherings, family meals, custom menus)

**10. MEAL PLANS**
- Weight loss programs (4-week, calorie-controlled)
- Fitness plans (muscle-building, cut/bulk cycles)
- Wellness plans (7-day detox, 14-day gut reset, seasonal cleanses)

---

## 6. PRICING MODEL

### 6.1 À La Carte Pricing

**Customer Pays:**
```
Meals:          $18-28
Smoothies:      $11-13
Juices:         $9-12
Baked goods:    $5-8
Delivery:       $4-5 (flat, optional)

Total range:    $18-33 per order (with delivery)
```

**Payment Split (Per $20 Meal + $4 Delivery):**
```
Customer pays:           $24
Stripe fee (2.9%+$0.30): $1.01
Net available:           $22.99

Chef receives:           80% of $20 = $16.00
Driver receives:         100% of $4 = $4.00
NeighborEats receives:   15% of $24 = $3.60

Total distributed:       $23.60 (Stripe keeps ~$0.40)
```

### 6.2 Subscription Pricing

**Subscription Tiers (Customer Price):**
```
3 meals/week:   $54/month   (Chef: 80% = $43.20/mo)
5 meals/week:   $95/month   (Chef: 80% = $76.00/mo)
7 meals/week:   $129/month  (Chef: 81% = $104.49/mo)
10 meals/week:  $169/month  (Chef: 82% = $138.58/mo)
12 meals/week:  $199/month  (Chef: 83% = $165.17/mo)
Chef's Choice (5 curated):  $89/month  (Chef: 85% = $75.65/mo)
```

**Why Higher Payouts for Subscriptions:**
- Chef gets guaranteed recurring customers (reduces marketing effort)
- Higher payout incentivizes subscription promotion
- Customer gets 15-25% discount vs à la carte
- Chef can plan meal prep in bulk (more efficient)

### 6.3 Commission Structure

```
À La Carte Meals:
  - Chef commission: 80% of meal price (not delivery)
  - NeighborEats commission: 15% of meal + delivery total
  - Stripe processing: 2.9% + $0.30
  
Delivery Fee (separate from meal):
  - Driver commission: 100% of delivery fee ($4-5)
  - NeighborEats commission: $0 (not on delivery)
  - Stripe processing: 2.9% + $0.30

Subscriptions:
  - Chef commission: 80-85% (varies by tier)
  - NeighborEats commission: 12-15%
  - Stripe processing: Lower on recurring (~2%)
```

### 6.4 Driver Incentives & Tiers

**Tier System (Performance-Based):**
```
Bronze (0-50 deliveries):
  - $4.00 per delivery
  
Silver (50-200 deliveries, 4.7★ rating):
  - $4.25 per delivery
  - Weekly bonuses available
  
Gold (200+ deliveries, 4.8★ rating):
  - $4.50 per delivery
  - Early access to high-value orders
  
Platinum (500+ deliveries, 4.9★ rating):
  - $5.00 per delivery
  - Preferred driver status
  - Marketing feature + badge
```

**Weekly Bonuses:**
```
On-time bonus:     Hit 95%+ on-time = +$0.50/delivery that week
Perfect week:      Zero late deliveries = +$25 bonus
Monthly excellence: Avg 4.8★+ rating = +$100 bonus
```

### 6.5 Chef Bonuses (Growth Incentives)

```
10-20 subscribers:   +1% payout (e.g., 81% instead of 80%)
20-50 subscribers:   +2% payout (e.g., 82%)
50+ subscribers:     +3% payout (e.g., 83%)
100+ subscribers:    Platinum status, +3% payout + marketing feature
```

---

## 7. GEOFENCING & RADIUS SEARCH

### 7.1 How Geofencing Works

**User Location Detection:**
```
1. User opens app
2. App requests location permission (iOS/Android)
3. Gets GPS coordinates (latitude, longitude)
4. Example: 39.1582° N, 75.5244° W (Wilmington, DE)

Chef Location Database:
1. Every chef has kitchen address stored in Supabase
2. Address converted to GPS coordinates
3. Chef Maria's kitchen = 39.1591° N, 75.5268° W

Distance Calculation:
1. Haversine formula calculates great-circle distance
2. Result: 0.8 miles from Chef Maria

Radius Filter:
1. User selects radius: 1 mile, 2 miles, 3 miles, 5 miles
2. App shows only chefs within selected radius
3. Sorted by distance → rating
```

### 7.2 Radius Options

```
User can select:
- 0.5 miles (walkable, ultra-local)
- 1 mile (neighborhood)
- 2 miles (expanded neighborhood)
- 3 miles (local area)
- 5 miles (larger area)
- 10 miles (regional)
- 15+ miles (cross-region)
```

### 7.3 Custom Location

```
User can also:
- Search from work address
- Search from gym address
- Search from custom address
- Save frequent locations
```

### 7.4 Chef Delivery Radius

**Chef can limit delivery:**
```
Chef sets: "I deliver up to 2 miles from my kitchen"

If customer is 4 miles away:
- Result: "Delivery not available"
- Options: Customer picks up at hub or tries different chef
```

---

## 8. LIVE STREAMING (Agora Integration)

### 8.1 Chef Goes LIVE

**Process:**
```
1. Chef opens app during meal prep
2. Taps "Go LIVE" button
3. Selects camera (phone, webcam)
4. Agora WebRTC stream starts
5. Chef's stream visible to customers within radius
6. "LIVE NOW" badge appears next to chef profile
7. Chef continues cooking, customers watch in real-time
8. Comments/questions in-app (optional)
9. Chef finishes → stream ends
10. Video saved for replay/proof (optional)
```

### 8.2 Customer Views LIVE

**Discovery:**
```
Search results show:
- Chef Maria (0.8 miles) - LIVE NOW badge
- Click → watch live stream
- See chef cooking in real-time
- Chat/ask questions (optional)
- Buy meal directly from stream (add to cart)
```

**Trust Factor:**
```
Customer sees:
✓ Real chef, real kitchen
✓ Fresh ingredients, hygiene
✓ Actual cooking process (not pre-made)
✓ Quality validation (no hidden prep)
→ Builds trust → increases conversion & ratings
```

### 8.3 Agora Setup

**Tech Implementation:**
```
Service: Agora (WebRTC platform)
Cost: $0.0099 per minute (very cheap)
Features:
  - HD video streaming
  - Real-time comments
  - Works on mobile + web
  - Scalable infrastructure
  
Integration:
  - Chef SDK: Agora SDK for streaming
  - Viewer SDK: React SDK for watching
  - Webhook: Save stream metadata to Supabase
```

**API Integration:**
```javascript
// Chef initiates stream
const rtcEngine = new AgoraRtcEngine();
await rtcEngine.initialize({
  appId: AGORA_APP_ID,
  logConfig: { file: { filePath: './agorasdk.log' } },
});

rtcEngine.joinChannel({
  token: token,
  channelId: chefId, // Use chef ID as channel
  uid: 0,
  options: {
    clientRoleType: ClientRoleType.Broadcaster,
  },
});

// Customer watches stream
const rtc = new AgoraRTC.Client({
  mode: 'rtc',
  codec: 'h264',
});

await rtc.join(AGORA_APP_ID, chefId, token, userId);
rtc.on('user-published', async (user, mediaType) => {
  await rtc.subscribe(user, mediaType);
  if (mediaType === 'video') {
    user.videoTrack.play('video-container');
  }
});
```

---

## 9. BACKGROUND CHECKS (Checkr Integration)

### 9.1 Mandatory for All Chefs & Drivers

**Process:**
```
1. User signs up (chef or driver)
2. Creates profile (personal info)
3. Directed to order background check via Checkr
4. User enters: SSN, DOB, address
5. User pays: ~$10-15 (charged to their card, NOT to you)
6. Checkr submits to consumer reporting agency
7. 24-48 hours: Checkr returns results

For Chefs:
  - Criminal history check
  - Identity verification
  
For Drivers:
  - Criminal history check
  - Driving record check
  - Identity verification
```

**Result States:**
```
APPROVED:
  - User gets activated
  - Email: "Background check cleared!"
  - Can now fully use platform

DENIED:
  - User informed of reason
  - Appeal option available
  - Cannot use platform until resolved
```

### 9.2 Checkr API Integration

**Backend Implementation:**
```javascript
// 1. Chef initiates background check
POST /api/chefs/initiate-background-check
{
  firstName, lastName, ssn, dob, email, phone, zipcode
}

// 2. Backend calls Checkr API
const checkrResponse = await fetch('https://api.checkr.com/v1/candidates', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${CHECKR_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: firstName,
    last_name: lastName,
    email: email,
    ssn: ssn,
    dob: dob,
    phone: phone,
    zipcode: zipcode
  })
});

const checkrCandidate = await checkrResponse.json();
const checkrCandidateId = checkrCandidate.id;

// 3. Create report (starts background check)
const reportResponse = await fetch('https://api.checkr.com/v1/reports', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${CHECKR_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    candidate_id: checkrCandidateId,
    package: 'starter_basic' // Criminal history
  })
});

const report = await reportResponse.json();

// 4. Store in Supabase
await supabase.from('chefs').update({
  checkr_candidate_id: checkrCandidateId,
  checkr_report_id: report.id,
  background_check_status: 'PENDING',
  background_check_initiated_at: new Date()
}).eq('id', chefId);

// 5. Checkr sends webhook when complete
POST /webhooks/checkr
{
  "type": "report.completed",
  "data": {
    "id": "report_id",
    "candidate_id": "candidate_id",
    "status": "clear" // or "consider", "suspended"
  }
}

// 6. Update chef status
await supabase.from('chefs').update({
  background_check_status: status === 'clear' ? 'APPROVED' : 'DENIED',
  background_check_completed_at: new Date()
}).eq('checkr_candidate_id', checkrCandidateId);

// 7. Send email notification
await sendEmail({
  to: chef.email,
  subject: 'Background Check Approved!',
  body: 'You can now start listing meals...'
});
```

### 9.3 Account Status Until Complete

**Chef/Driver CANNOT do:**
```
✗ List meals/accept orders
✗ Go LIVE stream
✗ View earnings
✗ Access order details
✗ Process payments
```

**Chef/Driver CAN do:**
```
✓ View app
✓ Browse menus/orders
✓ Update profile
✓ Monitor verification status
```

---

## 10. STRIPE INTEGRATION

### 10.1 Chef & Driver Must Use Stripe Connect

**Mandatory Requirements:**
```
All chefs must:
1. Connect Stripe account (via Stripe Connect)
2. Provide bank account
3. Verify tax ID
4. Complete Stripe onboarding (2-5 business days)

All drivers must:
1. Connect Stripe account
2. Provide bank account
3. Verify tax info
4. Complete onboarding (2-5 business days)
```

**Why Stripe Connect:**
```
✓ Chef/driver money goes DIRECTLY to their bank
✓ You never hold their funds (liability reduced)
✓ Stripe handles all payment processing
✓ 1099-K auto-issued for taxes
✓ Compliant with financial regulations
✓ Clear audit trail
```

### 10.2 Payment Flow

**Customer Orders $20 meal + $4 delivery:**

```
1. Customer pays $24 via Stripe
2. Stripe processes: 2.9% + $0.30 = $1.01 fee
3. Net available: $22.99

4. Distributions (automatic, weekly on Fridays):
   - Chef Stripe account: $16 (80% of meal)
   - Driver Stripe account: $4 (100% of delivery)
   - Your Stripe account: $3.60 (15% commission)
   
5. Chef receives in bank: $16 (Mon-Tues via direct deposit)
6. Driver receives in bank: $4 (Mon-Tues via direct deposit)
7. You receive in bank: $3.60 (Mon-Tues via direct deposit)
```

### 10.3 Stripe Connect API

**Backend Implementation:**
```javascript
// 1. Redirect chef to Stripe Connect onboarding
GET /api/stripe/connect-redirect
const stripeConnectUrl = `https://connect.stripe.com/oauth/authorize?client_id=${STRIPE_CLIENT_ID}&state=${chefId}&redirect_uri=${REDIRECT_URI}`;

// 2. Chef completes Stripe, returns with code
GET /api/stripe/connect-callback?code=${code}&state=${chefId}
const stripeAccountId = await exchangeCodeForStripeAccount(code);

// Store in database
await supabase.from('chefs').update({
  stripe_account_id: stripeAccountId,
  stripe_status: 'CONNECTED'
}).eq('id', chefId);

// 3. When processing payment
POST /api/payment/process-order
const charge = await stripe.charges.create({
  amount: 2000, // $20 meal
  currency: 'usd',
  source: token, // Customer's card token from Stripe
  stripe_account: chef.stripe_account_id, // Chef's connected account
  application_fee_amount: 360, // $3.60 commission (15%)
  description: `Meal order #${orderId}`
});

// Result:
// - Customer charged $20
// - Stripe fee taken (2.9% + $0.30)
// - Chef account credited ~$16
// - Your account credited $3.60
// - Weekly payout on Friday

// 4. Driver payment (separate)
const deliveryCharge = await stripe.charges.create({
  amount: 400, // $4 delivery
  currency: 'usd',
  source: token,
  stripe_account: driver.stripe_account_id,
  application_fee_amount: 0, // You don't take commission on delivery
  description: `Delivery #${orderId}`
});

// Result:
// - Customer charged $4
// - Stripe fee taken (2.9% + $0.30)
// - Driver account credited $4
// - Your account doesn't get cut
// - Weekly payout on Friday
```

### 10.4 Your Payout

**How you get paid:**
```
Option 1: Manual transfers
- You view your Stripe dashboard
- See accumulated commission ($3,600/month example)
- Request manual transfer to your bank
- Stripe processes within 1-2 business days

Option 2: Automatic transfers (Stripe settings)
- Configure automatic daily/weekly transfers
- Stripe auto-moves balance to your bank
- Schedule: Daily, weekly, or custom

You see all commission in:
- Stripe dashboard (real-time)
- Admin portal (aggregated)
- Detailed reports by chef, category, order type
```

---

## 11. PAYMENT FLOW SUMMARY

### 11.1 For Subscriptions

**Monthly Subscription ($95 for 5-Day Reset):**

```
Customer pays (recurring):  $95/month
Stripe fee (2%):            ~$1.90
Net available:              $93.10

Chef receives (80%):        $76.00
NeighborEats (15%):         $14.25
Stripe/Other:               $2.85

Chef annual per subscriber: $912
Your annual per subscriber: $171
```

### 11.2 For À La Carte

**Single Order ($20 meal + $4 delivery):**

```
Customer pays:              $24
Stripe fee (2.9%+$0.30):    $1.01
Net available:              $22.99

Chef (80% of $20):          $16.00
Driver (100% of $4):        $4.00
NeighborEats (15%):         $3.60
Difference:                 -$0.61 (Stripe keeps)

Your revenue: $3.60 per order
```

---

## 12. RATINGS & QUALITY CONTROL

### 12.1 Chef Ratings

**What Customers Rate:**
```
1-5 stars based on:
- Food quality (taste, freshness, temperature)
- Portion size (accurate, appropriate)
- Accuracy (matches description, special requests)
- Packaging (professional, secure)
- Special instructions honored
```

**Rating Minimum to Stay Active:**
```
✓ 4.5★ or higher: Active
⚠️ 4.0-4.4★: Warning email, improvement plan
✗ Below 4.0★: Account suspended (7-day cure period)
```

**Chef Dashboard Shows:**
```
- Current rating (e.g., 4.87★)
- Rating trend (this week, this month, all-time)
- Customer feedback themes
- Low-rating orders (why? what went wrong?)
- Reviews (customer quotes)
```

### 12.2 Driver Ratings

**What Customers Rate:**
```
1-5 stars based on:
- On-time delivery (arrived within estimated window)
- Professionalism (courteous, clean vehicle, appearance)
- Condition on arrival (food hot, fresh, undamaged)
- Communication (responsive, problem-solving)
- Vehicle condition (clean, professional)
```

**Metrics Tracked:**
```
- Star rating (1-5)
- On-time delivery % (e.g., 98%)
- Completion rate (% of accepted orders completed)
- Professionalism score
- Customer feedback

Minimum rating: 4.5★ to stay active
```

**Driver Dashboard Shows:**
```
- Current rating (e.g., 4.87★)
- On-time percentage (e.g., 97%)
- Total deliveries (e.g., 247)
- Weekly earnings
- Tier status (Bronze, Silver, Gold, Platinum)
- Bonus opportunities
```

---

## 13. ADMIN PORTAL

### 13.1 Dashboard (KPIs)

**Real-Time Overview:**
```
Today's Metrics:
- Total Orders: 247
- Total Revenue: $4,920 (your 15% = $738)
- Active Chefs: 34
- Active Drivers: 28
- Active Customers: 1,204
- Avg Order Value: $19.88
- Avg Chef Rating: 4.86★
- Avg Driver Rating: 4.87★

Trending:
- Top Chef: Maria (487 orders this week)
- Top Driver: Alex (89 deliveries, 4.98★)
- Most Popular Category: Meals
- Churn Rate: 2.3%
```

### 13.2 Chefs Management

**Chef List:**
```
View all chefs with:
- Name, location, categories
- Active subscriptions count
- Monthly revenue (to them)
- Your commission
- Average rating
- Background check status
- Account status
- Compliance alerts
- Actions: Suspend, Message, View Details
```

**Chef Details:**
```
- Full profile info
- Kitchen location, categories
- Subscriber list + payment history
- Orders this month
- Customer reviews & ratings
- Background check expiration
- Payout history
- Live stream history
- Disputes
- Actions: Message, Adjust commission, Suspend
```

### 13.3 Drivers Management

**Driver List:**
```
- Name, phone, vehicle
- Total deliveries
- Average rating
- This week earnings
- Account status
- Background check status
- Last delivery date
- Actions: Suspend, Message, View Details
```

**Driver Details:**
```
- Personal info, license, insurance
- Delivery history (map view)
- Rating breakdown
- Earnings history
- Customer reviews
- Complaints
- Background check status
- Actions: Suspend, Adjust earnings, Message
```

### 13.4 Orders Management

**Real-Time Order Feed:**
```
- Order ID, timestamp, status
- Customer, chef, driver
- Items ordered, total price
- Fulfillment type (pickup/delivery)
- Payment status
- Order status (Preparing, Ready, Out for Delivery, Completed, Cancelled)
- Filter by: Date, chef, driver, status, payment
```

**Order Details:**
```
- Full order info
- Customer address
- Chef details, prep time
- Driver details, delivery route
- Timestamps (ordered, ready, delivered)
- Ratings from customer & driver
- Disputes/complaints
- Actions: Refund, Investigate, Message
```

### 13.5 Subscriptions Management

**Active Subscriptions:**
```
- Subscription ID, customer, chef
- Tier (3, 5, 7, 10, 12 meals/week)
- Monthly price, your commission
- Start date, renewal date
- Status (Active, Paused, Cancelled)
- Fulfillment method

Churn Analytics:
- Churn rate
- Reasons for churn
- Retention by chef
- Avg subscription lifetime
- Revenue impact
```

### 13.6 Payments & Payouts

**Your Commission Tracking:**
```
This week: $847.23
This month: $3,248.91
YTD: $28,492.18
Breakdown by: Chef, Category, Order Type
Revenue trend graph
```

**Chef Payouts:**
```
- Weekly payout schedule
- Pending payouts (to be paid Friday)
- Completed payouts history
- Failed payments
- Commission breakdown
- Actions: Manual payout, Refund, Suspend
```

**Driver Payouts:**
```
- Weekly driver earnings
- Payouts processed
- Failed payments
- Bonus payouts
- Actions: Manual payout
```

### 13.7 Analytics & Reporting

**Business Metrics:**
```
- Orders (daily/weekly/monthly trends)
- Revenue (total, by category, by chef)
- Customer acquisition & retention
- Churn rate
- Average order value
- Peak hours/days
- Geographic heat map
```

**Chef Performance:**
```
- Top chefs by orders, revenue, rating
- Category performance
- Subscription adoption rate
- Chef growth trends
- Retention
```

**Driver Performance:**
```
- Top drivers by deliveries, rating
- On-time delivery rate
- Earnings distribution
- Utilization rate
- Retention
```

**Customer Insights:**
```
- Repeat customer rate
- Avg customer LTV
- Preferred chefs & categories
- Peak order times
- Geographic distribution
- Subscription vs à la carte ratio
```

**Export Options:**
```
- Export as CSV, PDF
- Schedule automated reports
- Custom date ranges
```

### 13.8 Disputes & Support

**Dispute Management:**
```
- Open disputes list
- Issue type (food quality, late delivery, missing items, payment)
- Status (Open, In Review, Resolved)
- Resolution (refund, apology, both)
- Parties involved
- Actions: Approve refund, Message, Close
```

**Refund Processing:**
```
- Refund requests from customers
- Approval workflow
- Refund status (pending, processed, failed)
- Track refund to customer's payment method
```

### 13.9 Compliance Management

**Background Check Status:**
```
- All chefs/drivers with check status
- Expiration dates
- Overdue checks (alert)
- Failed checks
- Actions: Request renewal, Suspend if overdue
```

**Account Management:**
```
- Active accounts
- Suspended accounts (reason, duration)
- Paused accounts
- Deactivated accounts
- Reactivation workflow
```

**Compliance Alerts:**
```
- Low ratings (below 4.5★)
- Expired background checks
- Multiple complaints
- Payment failures
- Unusual activity
- Auto-suspension rules
```

### 13.10 Settings

**Platform Config:**
```
- Commission rates
- Delivery fees
- Subscription tiers & pricing
- Minimum ratings threshold
- Payout schedule
- Geofencing defaults
```

**Email Templates:**
```
- Welcome emails
- Order confirmation
- Delivery notifications
- Payout summaries
- Suspension notices
- Custom branding
```

**User Management:**
```
- Add admin users
- Set permissions
- Activity log (who did what, when)
```

### 13.11 Real-Time Monitoring

**Live Activity Feed:**
```
- New orders (as they come in)
- New chefs signing up
- New drivers signing up
- Chefs going LIVE
- Deliveries in progress
- Refunds processed
- Suspensions/issues
- Notifications for high-priority items
```

**Map View:**
```
- Visual map of active deliveries
- Chef locations
- Driver locations
- Heat map of order density
- Radius visualization
```

---

## 14. COMPLIANCE & REGULATIONS

### 14.1 Food Safety

**NeighborEats is NOT responsible for:**
- ❌ Food safety (chef responsibility)
- ❌ Food licensing (chef responsibility)
- ❌ Kitchen inspections (chef responsibility)

**NeighborEats IS responsible for:**
- ✅ Ensuring chef acknowledges food safety regulations
- ✅ Providing resources/guidance on compliance
- ✅ Suspending non-compliant chefs
- ✅ Monitoring customer complaints about food quality

**Chef Agreement Includes:**
```
"Chef certifies they comply with all local/state food safety regulations.
Chef is responsible for obtaining necessary licenses/permits.
NeighborEats is not liable for food-related issues.
NeighborEats can suspend chef for safety violations."
```

### 14.2 Independent Contractor Status

**All Chefs & Drivers are 1099 Independent Contractors:**

```
Chef Controls:
✓ When they work
✓ What they cook
✓ Prices they charge
✓ Which orders to accept
✓ Hours/availability

NeighborEats Controls:
✓ Platform rules (commission rate, minimum rating)
✓ Background check requirement
✓ Verification standards
✓ Suspension/removal for violations

Chef Responsibilities:
✓ Self-employment taxes
✓ Kitchen rental (if needed)
✓ Food safety compliance
✓ Health insurance
✓ Liability insurance (if required)

NeighborEats Does NOT:
✗ Provide benefits
✗ Set work hours
✗ Withhold taxes
✗ Provide equipment
```

**1099 Reporting:**
```
- Stripe auto-issues 1099-K forms (annual)
- Chef receives copy for taxes
- You receive copy for audit
- No W2 involvement
```

### 14.3 Payment Processing & Stripe

**You Are NOT a Money Transmitter:**
```
✓ Stripe handles all payment processing
✓ Customer money goes to Stripe, not to you
✓ Stripe distributes to chef/driver/you
✓ You're a platform, not a financial institution
✓ Compliant with financial regulations
```

**Customer Payment Protection:**
```
✓ Stripe handles disputes/chargebacks
✓ Customer protected by Stripe's terms
✓ You're protected from payment liability
✓ Clear 1099-K audit trail
```

---

## 15. SECURITY & PRIVACY

### 15.1 Authentication

```
- Email/password signup (Supabase Auth)
- Password requirements (minimum 8 chars, uppercase, number)
- Option: Social login (Google, Apple)
- 2FA optional (SMS or authenticator app)
```

### 15.2 Data Protection

```
- All data encrypted in transit (HTTPS)
- All passwords hashed (bcrypt)
- PII encrypted at rest
- Regular security audits
- No storing full credit card numbers (Stripe handles)
```

### 15.3 Privacy

```
- Privacy policy required
- GDPR compliant (if serving EU customers)
- Users can export their data
- Users can delete their account
- No selling customer data to third parties
```

### 15.4 Admin Security

```
- Admin login requires strong password + 2FA
- IP whitelisting (optional)
- Activity logging (all admin actions logged)
- Role-based access control (some admins view-only)
- Audit trail (who changed what, when)
```

---

## 16. MVPMILESTONE (What Launches First)

### 16.1 MVP Scope (Weeks 1-6)

**Chef Features:**
- ✅ Sign up, create profile, upload photo
- ✅ Order background check (Checkr integration)
- ✅ Connect Stripe account
- ✅ Create menu items (in all 10 categories)
- ✅ Set à la carte prices
- ✅ Create subscription tiers (3, 5, 7, 10, 12 meals/week)
- ✅ Go LIVE stream (Agora integration)
- ✅ Manage orders (accept, mark ready)
- ✅ View earnings dashboard
- ✅ View customer ratings

**Customer Features:**
- ✅ Sign up, create profile
- ✅ Search chefs by radius + filters (geofencing)
- ✅ Browse chef profiles, menus
- ✅ Watch LIVE chef streams
- ✅ Subscribe to chef's meals
- ✅ Order à la carte anytime
- ✅ Checkout via Stripe
- ✅ Choose fulfillment (pickup hub or delivery)
- ✅ Rate chef & driver
- ✅ View order history

**Driver Features:**
- ✅ Sign up, create profile, upload license
- ✅ Order background check (Checkr)
- ✅ Connect Stripe account
- ✅ View available deliveries (within 5 miles)
- ✅ Accept delivery orders
- ✅ Navigate to chef → customer
- ✅ Confirm pickup & delivery
- ✅ View earnings

**Admin Features:**
- ✅ Dashboard (basic KPIs)
- ✅ Chef list & details
- ✅ Driver list & details
- ✅ Orders log (real-time)
- ✅ Payment/payout tracking
- ✅ Suspend accounts
- ✅ Process refunds
- ✅ View analytics (basic)

**Not in MVP:**
- ❌ Google Maps integration (visual delivery tracking)
- ❌ Advanced analytics (trends, forecasting)
- ❌ Catering platform
- ❌ Meal plan programs
- ❌ Multi-admin support (just you)
- ❌ Native iOS/Android apps (web/PWA only)

### 16.2 MVP Timeline

```
Week 1: Setup & Auth
- Supabase database schema
- Next.js project setup
- Stripe & Checkr integration
- Authentication (email/password)

Week 2: Chef Features
- Chef signup & profile
- Menu item creation
- Subscription tier creation
- Integration with Stripe & Checkr

Week 3: Customer Features
- Customer signup & search (geofencing)
- Browse chefs & menus
- Subscribe & checkout
- À la carte ordering

Week 4: Driver & Delivery
- Driver signup
- Order assignment & acceptance
- Real-time delivery tracking
- Confirmation flow

Week 5: Live Streaming & Agora
- Agora integration
- Chef LIVE stream
- Customer viewing
- Stream metadata tracking

Week 6: Admin & Polish
- Admin dashboard
- Rating system
- Analytics (basic)
- Bug fixes, testing, deployment
```

### 16.3 Post-MVP Enhancements (Phase 2)

```
- Google Maps integration (delivery map)
- Advanced analytics
- Catering orders
- Meal plan programs
- Multi-admin support
- Native iOS/Android apps
- AI recommendations
- Chef communities/forums
- Referral program
```

---

## 17. DEPLOYMENT & OPERATIONS

### 17.1 Hosting

```
Frontend (PWA):
- Netlify (auto-deploys from GitHub)
- Domain: neighboreats.co

Admin Portal:
- Netlify (same repo, /admin route)
- Domain: neighboreats.co/admin

Backend:
- Next.js API Routes (Netlify Functions)
- Supabase PostgreSQL

Database:
- Supabase (managed PostgreSQL)
- Real-time subscriptions enabled
- Automated backups
```

### 17.2 DevOps

```
GitHub:
- Version control
- CI/CD via Netlify
- Auto-deploy on push to main

Environment Variables:
- STRIPE_SECRET_KEY
- STRIPE_PUBLISH_KEY
- STRIPE_CLIENT_ID
- CHECKR_API_KEY
- AGORA_APP_ID
- SENDGRID_API_KEY
- SUPABASE_URL
- SUPABASE_ANON_KEY

Monitoring:
- Sentry (error tracking)
- Logrocket (user session replay)
- Datadog or similar (infrastructure)
```

### 17.3 Support & Operations

```
Initial:
- Email support (support@neighboreats.co)
- In-app help docs
- FAQ page

Later:
- Live chat
- Phone support
- Community forum
```

---

## 18. ROADMAP (High Level)

### Phase 1 (MVP - Weeks 1-6)
- Core platform launch
- Three-sided marketplace (chefs, customers, drivers)
- Subscriptions + à la carte ordering
- Live streaming, geofencing, ratings

### Phase 2 (Scaling - Months 2-3)
- Google Maps integration
- Advanced analytics & reporting
- Chef communities/forums
- Driver performance tiers with bonuses
- Multi-city expansion (Philly, Baltimore, DC)

### Phase 3 (Revenue Diversification - Months 3-6)
- Catering orders (B2B)
- Meal plan programs (4-week, 12-week)
- Affiliate partnerships
- Sponsored listings (chefs can pay for featured placement)
- Referral program

### Phase 4 (Platformization - Months 6-12)
- Native iOS/Android apps
- AI recommendations
- Chef API (for external integrations)
- Subscription analytics for chefs
- White-label options

---

## 19. SUCCESS METRICS

### 19.1 KPIs to Track

**User Acquisition:**
- New chefs per week
- New drivers per week
- New customers per week
- Verification completion rate (%)

**Engagement:**
- Weekly active chefs
- Weekly active drivers
- Weekly active customers
- Orders per week (total)

**Monetization:**
- Revenue per week
- Avg order value
- Subscription count
- Subscription retention rate (%)

**Quality:**
- Avg chef rating
- Avg driver rating
- Customer churn rate (%)
- Refund rate (%)

**Growth:**
- Week-over-week order growth (%)
- Week-over-week revenue growth (%)
- Chef retention rate (%)
- Driver retention rate (%)

---

## 20. RISKS & MITIGATION

### 20.1 Risks

```
Food Safety:
- Risk: Customer gets sick from meal
- Mitigation: Clear chef agreement, liability waiver, encourage reviews

Competition:
- Risk: UberEats/DoorDash copies local model
- Mitigation: Build community loyalty, executive fast, expand to other cities

Regulatory:
- Risk: Local food safety boards restrict home-based chefs
- Mitigation: Monitor regulations, adapt to local laws, educate chefs

Driver Supply:
- Risk: Not enough drivers, delivery times suffer
- Mitigation: Tier system & bonuses incentivize driver growth

Chef Churn:
- Risk: Chefs leave for other platforms
- Mitigation: Better economics (80% vs 30%), community features, support
```

### 20.2 Mitigation Strategies

```
1. Clear terms of service (chef food safety, driver conduct)
2. Liability insurance for platform
3. Regular communication with users
4. Monitor local regulations (Delaware, Pennsylvania, etc.)
5. Build community (events, forums, features)
6. Superior product (faster, easier, better UX)
7. Fair economics (chefs & drivers earn more)
8. Strong support (respond to issues fast)
```

---

## 21. GLOSSARY

```
Agora: WebRTC platform for live video streaming
Checkr: Background check service
Geofencing: Radius-based location filtering
Haversine formula: Great-circle distance calculation
PWA: Progressive Web App (web app that works offline)
Stripe Connect: Payment platform for connected accounts (chef/driver payouts)
1099: Independent contractor tax form
Supabase: Open-source Firebase alternative (PostgreSQL + auth + realtime)
API: Application Programming Interface
Webhook: Automated callback when event occurs (e.g., background check complete)
```

---

## 22. NEXT STEPS

1. **Set up repository** (GitHub, connect to Netlify)
2. **Create Supabase project** (PostgreSQL database)
3. **Connect Stripe account** (API keys, Stripe Connect)
4. **Configure Checkr** (API key, webhook endpoint)
5. **Set up Agora** (app ID, get SDK)
6. **Configure SendGrid** (API key for emails)
7. **Start building** (Week 1: Auth & Database)
8. **Deploy to Netlify** (Week 6: Launch MVP)

---

**Version:** 1.0
**Last Updated:** December 13, 2025
**Author:** NeighborEats Product Team
**Status:** Ready for Development