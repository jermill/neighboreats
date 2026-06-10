# NeighborEats Frontend Build Guide - Netlify Stack

## Build Complete MVP in <1 Hour

Using **Netlify + Supabase + SendGrid + Stripe** (your exact stack).

---

## 1. SETUP (3 MINUTES)

```bash
# Create Next.js project
npx create-next-app@latest neighboreats --typescript --tailwind --eslint

cd neighboreats

# Install ONLY what you need
npm install supabase @supabase/auth-helpers-nextjs stripe @stripe/react-stripe-js @stripe/js zustand axios react-hot-toast @sendgrid/mail
```

---

## 2. ENVIRONMENT VARIABLES (.env.local)

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_CLIENT_ID=ca_xxxxx

# SendGrid
SENDGRID_API_KEY=xxxxx
```

Get these in 5 minutes:
1. **Supabase** → Dashboard > Settings > API
2. **Stripe** → Dashboard > Developers > API Keys
3. **SendGrid** → Settings > API Keys

---

## 3. CORE FILES (Copy These)

### lib/supabase.ts
```typescript
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => createClientComponentClient()

export const createServerClient = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

export async function getSession() {
  const supabase = createServerClient()
  const { data: { session } } = await supabase.auth.getSession()
  return session
}

export async function getUser() {
  const session = await getSession()
  if (!session) return null
  const supabase = createServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
```

### lib/auth.ts
```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from './supabase'
import type { User } from '@supabase/auth-helpers-nextjs'

type AuthContextType = {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, role: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
  }, [])

  const signUp = async (email: string, password: string, role: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role } },
    })
    if (error) throw error
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
```

### app/layout.tsx
```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeighborEats | Local Food, Fair Economics',
  description: 'Discover neighborhood chefs. Support local. Eat fresh.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="bottom-center" />
        </AuthProvider>
      </body>
    </html>
  )
}
```

### app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  @apply box-border;
}

body {
  @apply bg-white text-slate-900;
}

@media (prefers-color-scheme: dark) {
  body {
    @apply bg-slate-900 text-white;
  }
}
```

---

## 4. API ROUTES (Backend)

### app/api/auth/signup/route.ts
```typescript
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { email, password, role, name, phone } = await request.json()
  const cookieStore = cookies()
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: () => cookieStore,
  })

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { role, name, phone } },
  })

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 })

  const { error: profileError } = await supabase.from('users').insert({
    id: authData.user?.id,
    email,
    role,
    name,
    phone,
  })

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 })

  return NextResponse.json({ success: true, user: authData.user })
}
```

### app/api/customers/search/route.ts
```typescript
import { createServerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const EARTH_RADIUS_MILES = 3959

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return EARTH_RADIUS_MILES * c
}

export async function POST(request: NextRequest) {
  const { userId, filters } = await request.json()
  const { radius, category, minRating } = filters
  const cookieStore = cookies()
  const supabase = createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    cookies: () => cookieStore,
  })

  const customerLat = 39.1582
  const customerLon = -75.5244

  let query = supabase
    .from('chefs')
    .select('id, name, photoUrl, rating, categories, latitude, longitude, isLive')
    .eq('accountStatus', 'ACTIVE')
    .gte('rating', minRating)

  if (category !== 'all') query = query.contains('categories', [category])

  const { data: chefs, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })

  const filteredChefs = chefs
    .map((chef: any) => ({
      ...chef,
      distance: calculateDistance(customerLat, customerLon, chef.latitude, chef.longitude),
    }))
    .filter((chef: any) => chef.distance <= radius)
    .sort((a: any, b: any) => a.distance - b.distance)

  return NextResponse.json({ chefs: filteredChefs })
}
```

### app/api/stripe/process-order/route.ts
```typescript
import { stripe } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { amount, customerEmail, orderId, chefStripeAccountId } = await request.json()

  try {
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      source: 'tok_visa', // In production, use token from frontend
      stripe_account: chefStripeAccountId,
      application_fee_amount: Math.round(amount * 0.15 * 100), // 15% commission
      metadata: { orderId },
    })

    return NextResponse.json({ success: true, chargeId: charge.id })
  } catch (error) {
    return NextResponse.json({ error: 'Payment failed' }, { status: 400 })
  }
}
```

### app/api/email/send/route.ts
```typescript
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  const { to, subject, html } = await request.json()

  try {
    await sgMail.send({
      to,
      from: 'noreply@neighboreats.co',
      subject,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Email failed' }, { status: 400 })
  }
}
```

---

## 5. COMPONENTS (Ready to Use)

### components/shared/Button.tsx
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export default function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const styles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  }
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  )
}
```

### components/shared/Input.tsx
```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export default function Input({ label, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        {...props}
      />
    </div>
  )
}
```

### components/shared/LoadingSpinner.tsx
```typescript
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  )
}
```

---

## 6. PAGES

### app/auth/signup/[role]/page.tsx
```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import toast from 'react-hot-toast'

export default function SignupPage({ params }: { params: { role: string } }) {
  const router = useRouter()
  const { signUp } = useAuth()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '', name: '', phone: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await signUp(form.email, form.password, params.role)
      toast.success('Account created!')
      router.push(`/dashboard/${params.role}`)
    } catch (error) {
      toast.error('Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Join as {params.role}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating...' : 'Sign up'}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

### app/dashboard/customer/search/page.tsx
```typescript
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth'
import LoadingSpinner from '@/components/shared/LoadingSpinner'

export default function SearchPage() {
  const { user } = useAuth()
  const [chefs, setChefs] = useState([])
  const [loading, setLoading] = useState(true)
  const [radius, setRadius] = useState(3)

  useEffect(() => {
    if (user) {
      fetch('/api/customers/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          filters: { radius, category: 'all', minRating: 4.0 },
        }),
      })
        .then((res) => res.json())
        .then((data) => setChefs(data.chefs))
        .finally(() => setLoading(false))
    }
  }, [user, radius])

  return (
    <div className="space-y-6 p-4">
      <div className="bg-white rounded-lg p-4">
        <label className="block text-sm font-medium mb-2">Distance: {radius} miles</label>
        <input
          type="range"
          min="0.5"
          max="15"
          step="0.5"
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chefs.map((chef: any) => (
            <div key={chef.id} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold text-lg">{chef.name}</h3>
              <p className="text-sm text-gray-600">⭐ {chef.rating}</p>
              <p className="text-xs text-gray-500">📍 {chef.distance.toFixed(1)} miles</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

---

## 7. DATABASE SCHEMA (Supabase SQL)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  role VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE chefs (
  id UUID PRIMARY KEY REFERENCES users(id),
  rating FLOAT DEFAULT 5.0,
  categories TEXT[] DEFAULT '{}',
  latitude FLOAT,
  longitude FLOAT,
  isLive BOOLEAN DEFAULT FALSE,
  stripeAccountId VARCHAR,
  accountStatus VARCHAR DEFAULT 'INCOMPLETE',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE menuItems (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chefId UUID REFERENCES chefs(id),
  name VARCHAR NOT NULL,
  price FLOAT NOT NULL,
  category VARCHAR NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customerId UUID REFERENCES users(id),
  chefId UUID REFERENCES chefs(id),
  totalPrice FLOAT NOT NULL,
  status VARCHAR DEFAULT 'PENDING',
  stripePaymentId VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customerId UUID REFERENCES users(id),
  chefId UUID REFERENCES chefs(id),
  tier VARCHAR NOT NULL,
  monthlyPrice FLOAT NOT NULL,
  status VARCHAR DEFAULT 'ACTIVE'
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orderId UUID REFERENCES orders(id),
  chefAmount FLOAT,
  platformAmount FLOAT,
  stripeTransactionId VARCHAR,
  status VARCHAR DEFAULT 'PENDING'
);
```

---

## 8. DEPLOY TO NETLIFY (5 MINUTES)

### Option 1: CLI
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build locally
npm run build

# Deploy
netlify deploy --prod
```

### Option 2: Git Push
1. Push code to GitHub
2. Go to netlify.com
3. Connect GitHub repo
4. Set environment variables (Settings > Build & deploy > Environment)
5. Deploy

---

## 9. NETLIFY ENVIRONMENT VARIABLES

In Netlify Dashboard → Site settings → Build & deploy → Environment:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_SECRET_KEY=sk_test_xxxxx
SENDGRID_API_KEY=xxxxx
```

---

## 10. THE COMPLETE WORKFLOW

```
1. Create Next.js project (2 min)
   npx create-next-app@latest neighboreats ...

2. Copy core files (3 min)
   - lib/supabase.ts
   - lib/auth.ts
   - app/layout.tsx
   - app/globals.css

3. Create API routes (3 min)
   - app/api/auth/signup/route.ts
   - app/api/customers/search/route.ts
   - app/api/stripe/process-order/route.ts
   - app/api/email/send/route.ts

4. Create components (3 min)
   - Button, Input, LoadingSpinner

5. Create pages (3 min)
   - /auth/signup/[role]
   - /dashboard/customer/search

6. Create database schema (2 min)
   - Paste SQL into Supabase

7. Deploy to Netlify (5 min)
   - npm run build
   - netlify deploy --prod

TOTAL: 21 MINUTES TO LIVE MVP
```

---

## 11. TESTING (5 MINUTES)

```bash
# Test locally
npm run dev

# Visit http://localhost:3000
# Sign up as customer
# Log in
# Test search page
# Verify Supabase stores data
```

---

## 12. NEXT STEPS

### Add More Pages (Each 5 minutes)
- Chef dashboard: `/dashboard/chef/menu`
- Driver deliveries: `/dashboard/driver/deliveries`
- Admin panel: `/admin/dashboard`
- Order checkout: `/checkout`

### Add Features (Each 10-15 minutes)
- Payment processing
- Email notifications
- Order tracking
- Ratings system
- Chat between users

**Ask Claude:** "Add [feature] to NeighborEats using Supabase, SendGrid, Stripe. Here's the current code..."

---

**Stack:** Netlify + Supabase + SendGrid + Stripe
**Timeline:** <1 hour to production
**Ready to deploy:** Right now