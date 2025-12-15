# 🚀 Quick Start: Stripe Payments

Get NeighborEats payment integration running in 5 minutes!

## ⚡ TL;DR

```bash
# 1. Add Stripe keys to .env.local (see below)
# 2. Run migration
supabase db push
# 3. Start dev server
npm run dev
# 4. Test checkout with card: 4242 4242 4242 4242
```

## Step 1: Get Stripe Keys (2 minutes)

### A. Create/Login to Stripe Account
Visit [stripe.com](https://stripe.com) and create an account (or login)

### B. Get Your Keys

#### API Keys (Required)
1. Go to: [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
2. Copy both keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

#### Connect Client ID (Required)
1. Go to: [dashboard.stripe.com/settings/applications](https://dashboard.stripe.com/settings/applications)
2. Click "Get started with Connect" if needed
3. Copy the **Client ID** (starts with `ca_`)

#### Webhook Secret (For Local Testing)
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login and forward webhooks
stripe login
stripe listen --forward-to localhost:3000/api/payments/webhook

# Copy the webhook signing secret it outputs (starts with whsec_)
```

## Step 2: Configure Environment (1 minute)

Create `.env.local` in your project root:

```env
# Supabase (if not already set)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe Keys (paste your keys here)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_CONNECT_CLIENT_ID=ca_your_client_id
```

## Step 3: Run Database Migration (30 seconds)

```bash
# Apply Stripe fields migration
supabase db push
```

This adds:
- `stripe_customer_id` to users
- `stripe_verified` to chefs/drivers

## Step 4: Test the Integration (2 minutes)

### Start Development Server
```bash
npm run dev
```

Keep the Stripe CLI webhook forwarding running in another terminal:
```bash
stripe listen --forward-to localhost:3000/api/payments/webhook
```

### Test Chef Setup
1. Navigate to: `http://localhost:3000/dashboard/chef/profile`
2. Click "Setup Payment Account"
3. Fill in test information:
   - **SSN:** `000-00-0000`
   - **Phone:** `555-555-5555`
   - **DOB:** Any date 18+ years ago
   - **Address:** Any US address
4. Click "Submit"
5. You should see "✓ Verified" status

### Test Customer Checkout
1. Navigate to: `http://localhost:3000/dashboard/customer`
2. Browse chefs and add items to cart
3. Go to checkout
4. Enter delivery address
5. Click "Continue to Payment"
6. Use test card:
   - **Card:** `4242 4242 4242 4242`
   - **Expiry:** `12/34` (any future date)
   - **CVC:** `123` (any 3 digits)
   - **ZIP:** `12345` (any 5 digits)
7. Click "Pay"
8. Success! 🎉

### Verify Commission Split
Check your Stripe CLI webhook terminal - you should see:
```
payment_intent.succeeded
```

Check Stripe Dashboard → [Payments](https://dashboard.stripe.com/test/payments):
- **Application fee:** 15% of order
- **Transfer:** 85% to chef

Check Supabase → `payments` table:
- `total_amount`: Full order value
- `chef_amount`: 85% of total
- `platform_commission`: 15% of total

## ✅ You're Done!

The payment system is now fully functional with:
- ✅ 15% automatic commission collection
- ✅ 85% direct payout to chefs
- ✅ Secure Stripe Elements checkout
- ✅ Connect onboarding for sellers
- ✅ Webhook handling for payments

## 🧪 More Test Cards

| Card Number | Result | Use Case |
|------------|--------|----------|
| `4242 4242 4242 4242` | ✅ Success | Normal payment |
| `4000 0000 0000 0002` | ❌ Declined | Test error handling |
| `4000 0025 0000 3155` | 🔐 Requires Auth | Test 3D Secure |
| `4000 0000 0000 9995` | ❌ Insufficient Funds | Test declined |

All cards:
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

## 📚 Full Documentation

- **Detailed Setup:** `STRIPE_SETUP.md`
- **Implementation Details:** `STRIPE_IMPLEMENTATION_SUMMARY.md`
- **API Contracts:** `API_CONTRACTS.md`

## 🆘 Troubleshooting

### "Stripe not configured" in checkout
- ✅ Check `.env.local` has all Stripe keys
- ✅ Restart dev server: `npm run dev`
- ✅ Clear browser cache

### Webhook not working
- ✅ Run: `stripe listen --forward-to localhost:3000/api/payments/webhook`
- ✅ Use the webhook secret it outputs
- ✅ Keep terminal running during testing

### Chef can't receive payments
- ✅ Chef must complete Connect onboarding first
- ✅ Check "Payment Account" shows "✓ Verified"
- ✅ Try re-doing onboarding if stuck

### Payment fails
- ✅ Use test card: `4242 4242 4242 4242`
- ✅ Check Stripe CLI terminal for errors
- ✅ Check browser console for errors
- ✅ Verify chef has completed onboarding

## 🚀 Going to Production

When ready to accept real payments:

1. **Switch to Live Keys:**
   - Get live keys from [dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - Replace `pk_test_` with `pk_live_`
   - Replace `sk_test_` with `sk_live_`

2. **Update Webhook:**
   - Add production endpoint in Stripe Dashboard
   - Use production webhook secret

3. **Complete Business Verification:**
   - Go to [Connect Settings](https://dashboard.stripe.com/settings/connect)
   - Complete business information
   - Verify identity

4. **Test Small Amount:**
   - Process a real payment ($0.50)
   - Verify commission split works
   - Check payout arrives to bank account

## 💬 Support

- **Stripe Docs:** https://stripe.com/docs
- **Test Cards:** https://stripe.com/docs/testing
- **Stripe Support:** https://support.stripe.com

---

**Questions?** Review the full setup guide in `STRIPE_SETUP.md`

**Ready to go live?** See `STRIPE_IMPLEMENTATION_SUMMARY.md` production checklist
