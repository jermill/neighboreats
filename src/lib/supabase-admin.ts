import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Service-role client for server-side contexts with no user session
// (Stripe webhooks, scheduled jobs). Bypasses RLS — never import in client code.
export const createAdminClient = () =>
  createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
