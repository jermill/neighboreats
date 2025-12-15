# Stripe Payment Integration Setup

This guide covers setting up Stripe payments with commission splits for NeighborEats.

## Overview

NeighborEats uses **Stripe Connect** to enable:
- **15% platform commission** on all orders
- Direct payouts to chefs (85% of order value)
- Secure card payments via Stripe Elements
- Automatic payout splitting

## Prerequisites

1. A Stripe account (create at [stripe.com](https://stripe.com))
2. Stripe CLI (optional, for testing webhooks locally)

## Step 1: Get Your Stripe API Keys

### Get Publishable and Secret Keys

1. Go to [Stripe Dashboard → API Keys](https://dashboard.stripe.com/apikeys)
2. Copy your keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)

### Get Stripe Connect Client ID

1. Go to [Stripe Dashboard → Connect Settings](https://dashboard.stripe.com/settings/applications)
2. Click "Get started with Connect"
3. Fill in your platform details
4. Copy the **Client ID** (starts with `ca_`)

### Setup Webhook Endpoint

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL:
   - **Development:** Use Stripe CLI (see below)
   - **Production:** `https://yourdomain.com/api/payments/webhook`
4. Select these events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `account.updated`
   - `transfer.paid`
5. Copy the **Webhook signing secret** (starts with `whsec_`)

## Step 2: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Stripe Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
STRIPE_CONNECT_CLIENT_ID=ca_your_client_id_here
```

**Important:** Never commit `.env.local` to git! It contains secret keys.

## Step 3: Run Database Migration

The Stripe integration requires additional database fields. Run the migration:

```bash
# If using Supabase CLI
supabase db push

# Or apply the migration manually in Supabase Dashboard
# Go to SQL Editor and run the contents of:
# supabase/migrations/20251214120000_add_stripe_fields.sql
```

This adds:
- `stripe_customer_id` to `users` table
- `stripe_verified` flag to `chefs` and `drivers` tables

## Step 4: Test Locally with Stripe CLI (Optional)

The Stripe CLI lets you test webhooks on localhost.

### Install Stripe CLI

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows
scoop install stripe

# Linux - download from https://stripe.com/docs/stripe-cli
```

### Login and Forward Webhooks

```bash
# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/payments/webhook

# This will output a webhook signing secret like: whsec_...
# Use this as your STRIPE_WEBHOOK_SECRET for local testing
```

Keep this terminal running while developing.

### Trigger Test Events

```bash
# Trigger a successful payment
stripe trigger payment_intent.succeeded

# Trigger a failed payment
stripe trigger payment_intent.payment_failed
```

## Step 5: Test the Integration

### 1. Start Your Development Server

```bash
npm run dev
```

### 2. Setup Chef/Driver Payment Accounts

1. Login as a chef or driver
2. Go to Profile page
3. Click "Setup Payment Account"
4. Complete the Stripe Connect onboarding

**Test Mode:** Use these test details:
- **SSN:** `000-00-0000`
- **Phone:** Any 10-digit number
- **DOB:** Any date (18+ years old)
- **Address:** Any US address

### 3. Test Customer Checkout

1. Login as a customer
2. Add items to cart from a chef with verified payment account
3. Go to checkout
4. Use Stripe test cards:
   - **Success:** `4242 4242 4242 4242`
   - **Decline:** `4000 0000 0000 0002`
   - **Requires Auth:** `4000 0025 0000 3155`
   - **Expiry:** Any future date (e.g., `12/34`)
   - **CVC:** Any 3 digits (e.g., `123`)
   - **ZIP:** Any 5 digits (e.g., `12345`)

### 4. Verify Commission Split

After a successful payment, check:
1. **Supabase Database** → `payments` table:
   - `total_amount`: Full order total
   - `chef_amount`: 85% of total
   - `platform_commission`: 15% of total
2. **Stripe Dashboard** → Payments:
   - Application fee should show 15%
   - Transfer to chef should show 85%

## How Commission Splits Work

### Payment Flow

```
Customer pays $100
  ↓
Stripe charges customer $100
  ↓
Platform keeps $15 (15% commission)
  ↓
Chef receives $85 (85% payout)
  ↓
Driver receives separate payment for delivery
```

### Implementation Details

The commission split happens automatically via Stripe Connect:

1. **Create Payment Intent** (`/api/payments/create-payment-intent`):
   ```javascript
   const platformFee = Math.round(amount * 0.15)  // 15%
   
   stripe.paymentIntents.create({
     amount: 10000,                     // $100.00
     application_fee_amount: 1500,      // $15.00 (platform)
     transfer_data: {
       destination: chefStripeAccountId  // $85.00 goes to chef
     }
   })
   ```

2. **Webhook Records Payment** (`/api/payments/webhook`):
   - Stores commission breakdown in `payments` table
   - Updates order status to paid
   - Triggers payout to chef (1-2 business days)

## Production Deployment

### 1. Switch to Live Keys

1. Get live keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Replace `pk_test_` and `sk_test_` with `pk_live_` and `sk_live_`
3. Update webhook endpoint to production URL

### 2. Update Webhook Endpoint

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Add production endpoint: `https://yourdomain.com/api/payments/webhook`
3. Copy the new webhook secret
4. Update `STRIPE_WEBHOOK_SECRET` in production env vars

### 3. Enable Live Mode in Stripe Connect

1. Go to [Connect Settings](https://dashboard.stripe.com/settings/connect)
2. Complete the Connect onboarding requirements:
   - Business information
   - Bank account for receiving commissions
   - Identity verification

### 4. Test in Production

Run the same tests as development with real payment methods.

## Monitoring & Troubleshooting

### View Logs

```bash
# Stripe CLI logs
stripe logs tail

# Application logs
# Check your hosting platform's logs (Vercel, Netlify, etc.)
```

### Common Issues

**❌ "Stripe not configured" error**
- Make sure `STRIPE_SECRET_KEY` is set in `.env.local`
- Restart your development server after adding env vars

**❌ Webhook signature verification failed**
- Use Stripe CLI webhook secret for local testing
- For production, use the webhook secret from Stripe Dashboard
- Make sure the webhook endpoint URL is correct

**❌ Chef can't receive payments**
- Chef must complete Stripe Connect onboarding first
- Check `chefs.stripe_verified` is `true` in database
- Verify account status in [Stripe Dashboard → Connect](https://dashboard.stripe.com/connect/accounts)

**❌ Platform fee not appearing**
- Check `application_fee_amount` is set in payment intent
- Verify commission calculation: `Math.round(amount * 0.15)`
- Review payment details in Stripe Dashboard

### Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Connect Guide:** https://stripe.com/docs/connect
- **Test Cards:** https://stripe.com/docs/testing
- **Stripe Support:** https://support.stripe.com

## Security Best Practices

1. **Never expose secret keys:**
   - Only use `NEXT_PUBLIC_` prefix for publishable key
   - Keep secret keys in server-side environment only

2. **Always verify webhooks:**
   - Use `stripe.webhooks.constructEvent()` to verify signatures
   - Reject requests with invalid signatures

3. **Use HTTPS in production:**
   - Stripe requires HTTPS for webhooks
   - SSL certificate must be valid

4. **Implement rate limiting:**
   - Protect payment endpoints from abuse
   - Use Stripe's built-in fraud detection

## Summary

After setup, you have:
- ✅ Secure card payments via Stripe Elements
- ✅ Automatic 15% commission collection
- ✅ Direct 85% payouts to chefs
- ✅ Connect onboarding for chefs/drivers
- ✅ Commission breakdown in earnings dashboard
- ✅ Webhook handling for payment events

**Questions?** Check the [Stripe Documentation](https://stripe.com/docs) or [contact support](https://support.stripe.com).
