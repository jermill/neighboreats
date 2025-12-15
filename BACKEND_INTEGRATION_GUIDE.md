# Backend Integration Guide

## Overview

This guide covers setting up the NeighborEats backend integration, including Supabase, Stripe, and third-party services.

## Prerequisites

- Node.js 18+ installed
- Docker Desktop (for local Supabase)
- Git
- Supabase CLI (`npm install -g supabase`)
- Stripe CLI (optional, for webhook testing)

## 1. Supabase Setup

### Local Development

1. **Install Supabase CLI** (if not already installed):
   ```bash
   npm install -g supabase
   ```

2. **Start Docker Desktop**
   - Ensure Docker is running before starting Supabase

3. **Start Supabase locally**:
   ```bash
   supabase start
   ```
   
   This will start:
   - Postgres database
   - API server (PostgREST)
   - Auth server (GoTrue)
   - Storage server
   - Realtime server
   - Studio at http://127.0.0.1:54323

4. **Check status**:
   ```bash
   supabase status
   ```

### Remote Project Setup

Your project is already linked to:
- **Project ID**: `icntzxgwrnidzpxdplbm`
- **Region**: us-east-2
- **Dashboard**: https://supabase.com/dashboard/project/icntzxgwrnidzpxdplbm

### Get API Keys

1. Visit: https://supabase.com/dashboard/project/icntzxgwrnidzpxdplbm/settings/api
2. Copy these values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

### Push Database Schema

```bash
# Push your local migrations to the remote database
supabase db push

# Or reset local database to match remote
supabase db pull
```

### Generate TypeScript Types

```bash
# Generate types from your database schema
supabase gen types typescript --linked > src/types/database.ts
```

## 2. Stripe Setup

### Get API Keys

1. Visit: https://dashboard.stripe.com/apikeys
2. Get your keys:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

### Stripe Connect Setup

For chef/driver payouts, you need Stripe Connect:

1. Visit: https://dashboard.stripe.com/settings/applications
2. Create a Connect application
3. Copy the **Client ID** → `STRIPE_CONNECT_CLIENT_ID`

### Webhook Setup (Production)

1. Go to: https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://yourdomain.com/api/payments/webhook`
3. Select events to listen for:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `account.updated`
   - `transfer.paid`
4. Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`

### Local Webhook Testing

Install Stripe CLI:
```bash
# macOS
brew install stripe/stripe-cli/stripe

# Windows/Linux - download from https://stripe.com/docs/stripe-cli
```

Login and forward webhooks:
```bash
# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/payments/webhook

# This will output a webhook secret - add it to .env.local
```

## 3. Checkr Setup (Background Checks)

1. Sign up at: https://dashboard.checkr.com/
2. Get your API key from: https://dashboard.checkr.com/account/api_keys
3. Add to `.env.local`:
   ```
   CHECKR_API_KEY=your_checkr_api_key_here
   ```

**Note**: Without this key, background checks will use mock data.

## 4. Agora Setup (Live Streaming)

1. Sign up at: https://console.agora.io/
2. Create a new project
3. Get your credentials:
   - **App ID** → `AGORA_APP_ID`
   - **App Certificate** → `AGORA_APP_CERTIFICATE`

To enable the certificate:
1. Go to your project settings
2. Enable "App Certificate"
3. Copy the certificate

**Note**: Without these credentials, live streaming will use mock data.

## 5. SendGrid Setup (Email Notifications)

1. Sign up at: https://app.sendgrid.com/
2. Create an API key: https://app.sendgrid.com/settings/api_keys
3. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=SG.your_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   ```

4. **Set up email templates** (optional):
   - Go to: https://app.sendgrid.com/dynamic_templates
   - Create templates for:
     - Welcome email
     - Order confirmation
     - Order ready notification
     - Payout confirmation
     - Rating request
   - Update template IDs in `src/app/api/integrations/sendgrid/route.ts`

**Note**: Without this key, emails will be logged to console only.

## 6. Environment Variables

Create a `.env.local` file in your project root:

```bash
# Copy the example file
cp env.example .env.local
```

Then fill in all the values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://icntzxgwrnidzpxdplbm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:[password]@db.icntzxgwrnidzpxdplbm.supabase.co:5432/postgres

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_CONNECT_CLIENT_ID=ca_xxx

# Checkr
CHECKR_API_KEY=xxx

# Agora
AGORA_APP_ID=xxx
AGORA_APP_CERTIFICATE=xxx

# SendGrid
SENDGRID_API_KEY=SG.xxx
SENDGRID_FROM_EMAIL=noreply@neighboreats.com

# App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 7. Development Workflow

### Starting the App

```bash
# Terminal 1: Start Supabase (if using local)
supabase start

# Terminal 2: Start Stripe webhook forwarding (optional)
stripe listen --forward-to localhost:3000/api/payments/webhook

# Terminal 3: Start Next.js dev server
npm run dev
```

### Making Database Changes

```bash
# Create a new migration
supabase migration new migration_name

# Edit the migration file in supabase/migrations/

# Apply the migration
supabase db push

# Generate updated types
supabase gen types typescript --linked > src/types/database.ts
```

### Testing Payments

1. Use Stripe test cards: https://stripe.com/docs/testing
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
   - 3D Secure: `4000 0027 6000 3184`

2. Test Connect onboarding with test accounts

### Useful Commands

```bash
# Supabase
supabase status              # Check running services
supabase stop                # Stop local Supabase
supabase db reset            # Reset local database
supabase db diff             # Create migration from schema changes

# Stripe
stripe listen                # Listen for webhooks
stripe trigger payment_intent.succeeded  # Trigger test events
stripe logs tail             # View API logs

# Next.js
npm run dev                  # Start dev server
npm run build                # Build for production
npm run start                # Start production server
npm run lint                 # Run linter
```

## 8. API Routes Reference

All API routes are documented with contracts in their files:

### Orders
- `GET /api/orders` - Get all orders (filtered by user role)
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order by ID
- `PATCH /api/orders/[id]` - Update order status/ratings

### Menu Items
- `GET /api/menu` - Get menu items (with filters)
- `POST /api/menu` - Create menu item (chef only)
- `GET /api/menu/[id]` - Get menu item by ID
- `PATCH /api/menu/[id]` - Update menu item (chef only)
- `DELETE /api/menu/[id]` - Delete menu item (chef only)

### Subscriptions
- `GET /api/subscriptions` - Get subscriptions
- `POST /api/subscriptions` - Create subscription
- `PATCH /api/subscriptions/[id]` - Update subscription status
- `DELETE /api/subscriptions/[id]` - Cancel subscription

### Subscription Tiers
- `GET /api/subscription-tiers` - Get tiers (by chef)
- `POST /api/subscription-tiers` - Create tier (chef only)

### Profiles
- `GET /api/profiles` - Get current user profile
- `PATCH /api/profiles` - Update profile

### Payments
- `POST /api/payments/create-payment-intent` - Create payment
- `POST /api/payments/webhook` - Handle Stripe webhooks
- `GET /api/payments/connect-account` - Get Connect account status
- `POST /api/payments/connect-account` - Create Connect onboarding link

### Integrations
- `POST /api/integrations/checkr` - Submit background check
- `GET /api/integrations/checkr` - Get background check status
- `POST /api/integrations/agora?action=start` - Start live stream
- `POST /api/integrations/agora?action=end` - End live stream
- `GET /api/integrations/agora/token` - Get viewer token
- `POST /api/integrations/sendgrid/send` - Send email

## 9. Frontend Integration

Use the API client helpers in `src/lib/api-client.ts`:

```typescript
import { ordersApi, menuApi, subscriptionsApi } from '@/lib/api-client'

// Create an order
const { orderId, order } = await ordersApi.create({
  chefId: '123',
  items: [{ menuItemId: 'abc', quantity: 2 }],
  fulfillmentType: 'delivery',
  deliveryAddress: '123 Main St'
})

// Get menu items
const { menuItems } = await menuApi.getAll({ chefId: '123' })

// Update subscription
await subscriptionsApi.updateStatus('sub_123', 'paused')
```

## 10. Troubleshooting

### Supabase Connection Issues
- Ensure Docker is running
- Check `supabase status` output
- Verify `.env.local` has correct keys
- Try `supabase stop` and `supabase start`

### Stripe Webhook Issues
- Verify webhook secret matches Stripe CLI output
- Check webhook endpoint in Stripe dashboard
- View webhook logs in Stripe dashboard

### Build Errors
- Run `npm install` to ensure dependencies are installed
- Check that all env vars are set
- Clear `.next` folder and rebuild

### Database Migration Issues
- Run `supabase db reset` to start fresh locally
- Check migration files for SQL errors
- Ensure you're connected to the right project

## 11. Production Deployment

### Netlify Setup

1. Connect your GitHub repo to Netlify
2. Add all environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Environment Variables for Production

Update these in Netlify:
- All Supabase keys (from remote project)
- All Stripe keys (use production keys, not test keys)
- All third-party service keys (production credentials)
- Set `NODE_ENV=production`
- Set `NEXT_PUBLIC_APP_URL` to your domain

### Post-Deployment

1. Update Stripe webhook URLs to production domain
2. Test all payment flows with live keys
3. Verify email deliverability
4. Test background check integration
5. Monitor Supabase logs for errors

## Need Help?

- **Supabase**: https://supabase.com/docs
- **Stripe**: https://stripe.com/docs
- **Checkr**: https://docs.checkr.com/
- **Agora**: https://docs.agora.io/
- **SendGrid**: https://docs.sendgrid.com/
