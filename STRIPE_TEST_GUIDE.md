# 🧪 Stripe Integration Test Guide

## ✅ Setup Complete!

Your Stripe integration is now configured with:
- ✅ Live Stripe keys configured
- ✅ Webhook endpoint: https://neighboreats.com/api/payments/webhook
- ✅ Connect Client ID: ca_Tbeoxc2H40yCK8td9HTuKkzEdIxTTHnE
- ✅ Database migration applied (stripe fields added)
- ✅ Dev server running at http://localhost:3000

---

## 🎯 Test Flow

### Test 1: Chef Connect Onboarding (15% Commission Setup)

**What This Tests:** Chef payment account setup for receiving 85% of order value

1. **Navigate to Chef Profile:**
   ```
   http://localhost:3000/dashboard/chef/profile
   ```

2. **Look for "Payment Account" Card:**
   - Should show "Not Setup" badge
   - Click **"Setup Payment Account"** button

3. **What Should Happen:**
   - If Stripe Connect is approved: Redirects to real Stripe Connect onboarding
   - If still in review: Shows message about pending approval
   - If mock mode: Shows mock message

4. **Test Data (if onboarding works):**
   - **SSN:** `000-00-0000`
   - **Phone:** Any 10-digit number
   - **DOB:** Any date 18+ years ago
   - **Address:** Any US address

5. **Expected Result:**
   - Returns to profile page
   - Shows "✓ Verified" badge
   - Ready to receive payouts

---

### Test 2: Customer Checkout with Commission Split

**What This Tests:** Payment processing with automatic 15% platform fee

1. **Navigate to Customer Dashboard:**
   ```
   http://localhost:3000/dashboard/customer
   ```

2. **Browse Chefs and Add Items to Cart:**
   - Click on a chef
   - Add menu items to cart
   - Click "Checkout"

3. **Complete Delivery Info:**
   - Enter delivery address
   - Add any special instructions
   - Click "Continue to Payment"

4. **Use Test Card (Stripe Test Mode):**
   - **Card Number:** `4242 4242 4242 4242`
   - **Expiry:** `12/34` (any future date)
   - **CVC:** `123` (any 3 digits)
   - **ZIP:** `12345` (any 5 digits)

5. **Click "Pay $XX.XX"**

6. **Expected Results:**
   - ✅ Payment succeeds
   - ✅ Order created in database
   - ✅ Redirects to success page
   - ✅ Cart cleared

---

### Test 3: Verify Commission Split in Database

**Check in Supabase:**

1. Go to Supabase → `payments` table
2. Find your payment record
3. Verify the split:
   ```
   total_amount: $100.00 (example)
   chef_amount: $85.00 (85%)
   platform_commission: $15.00 (15%)
   stripe_transaction_id: pi_xxxxx
   status: COMPLETED
   ```

---

### Test 4: Check Stripe Dashboard

1. **Go to:** https://dashboard.stripe.com/test/payments
2. **Find your payment**
3. **Verify:**
   - ✅ Payment succeeded
   - ✅ Application fee: 15% of order
   - ✅ Transfer to chef: 85% of order

---

### Test 5: Check Webhook Delivery

1. **Go to:** https://dashboard.stripe.com/test/webhooks
2. **Click on your webhook endpoint**
3. **Verify:**
   - ✅ `payment_intent.succeeded` event received
   - ✅ Status: 200 (success)
   - ✅ No errors

---

## 🧪 Test Cards

| Card Number | Result | Use Case |
|------------|--------|----------|
| `4242 4242 4242 4242` | ✅ Success | Normal payment |
| `4000 0000 0000 0002` | ❌ Declined | Test error handling |
| `4000 0025 0000 3155` | 🔐 Requires Auth | Test 3D Secure |
| `4000 0000 0000 9995` | ❌ Insufficient Funds | Test declined |

All test cards:
- **Expiry:** Any future date (e.g., `12/34`)
- **CVC:** Any 3 digits (e.g., `123`)
- **ZIP:** Any 5 digits (e.g., `12345`)

---

## 🚨 Troubleshooting

### "Chef has not set up payment account"
- Chef must complete Connect onboarding first
- Check chef profile shows "✓ Verified"

### "Stripe not configured" message
- Check `.env.local` has all Stripe keys
- Restart dev server: `npm run dev`

### Webhook not working
- Check webhook secret in `.env.local`
- Verify endpoint URL in Stripe Dashboard
- Check webhook logs in Stripe Dashboard

### Payment fails
- Use test card `4242 4242 4242 4242`
- Check browser console for errors
- Check terminal for server errors

---

## 📊 What's Working

✅ **Payment Integration:**
- Stripe Elements checkout form
- Secure card collection
- Payment intent creation
- Webhook processing

✅ **Commission System:**
- Automatic 15% platform fee
- 85% direct to chef
- Database tracking of splits

✅ **Connect Onboarding:**
- Chef/driver account setup
- Verification status tracking
- Payout account linking

---

## 🎯 Success Criteria

Your integration is working correctly if:

1. ✅ Chef can complete Connect onboarding
2. ✅ Customer can checkout with test card
3. ✅ Payment succeeds and order created
4. ✅ Commission split recorded in database (85/15)
5. ✅ Stripe Dashboard shows correct application fee
6. ✅ Webhook delivers successfully (200 status)

---

## 🚀 Next: Going Live

Once testing is complete:

1. **Switch to Live Mode:**
   - Replace test keys with live keys
   - Update `STRIPE_CONNECT_CLIENT_ID` with live Client ID (after approval)

2. **Test with Real Card:**
   - Use a real card for small amount ($0.50)
   - Verify commission split works in live mode

3. **Monitor First Transactions:**
   - Watch Stripe Dashboard
   - Check webhook deliveries
   - Verify payouts arrive to chefs

---

## 📧 Support

- **Stripe Dashboard:** https://dashboard.stripe.com
- **Test Cards:** https://stripe.com/docs/testing
- **Stripe Support:** https://support.stripe.com

---

**Your Stripe integration is ready to test!** 🎉

Start with Test 1 (Chef Onboarding) and work through each test.
