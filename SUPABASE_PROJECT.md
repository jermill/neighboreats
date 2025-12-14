# NeighborEats Environment Configuration

## Remote Supabase Project (Production)
Your Supabase project has been created and linked!

- **Project Name**: neighboreats
- **Project Reference**: icntzxgwrnidzpxdplbm
- **Region**: us-east-2
- **Dashboard URL**: https://supabase.com/dashboard/project/icntzxgwrnidzpxdplbm

## Getting Your API Keys

To get your API credentials:
1. Visit: https://supabase.com/dashboard/project/icntzxgwrnidzpxdplbm/settings/api
2. Copy the following values:
   - **Project URL** → NEXT_PUBLIC_SUPABASE_URL
   - **anon public key** → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - **service_role secret** → SUPABASE_SERVICE_ROLE_KEY (keep this secret!)

## Create Your .env.local File

Create a `.env.local` file in your project root with:

```env
# Supabase Remote Project
NEXT_PUBLIC_SUPABASE_URL=https://icntzxgwrnidzpxdplbm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

Replace `your_anon_key_here` and `your_service_role_key_here` with the actual values from your dashboard.

## Quick Commands

- **View project info**: `supabase projects list`
- **Create migration**: `supabase migration new migration_name`
- **Push migrations**: `supabase db push`
- **View remote database**: `supabase db remote`
- **Generate TypeScript types**: `supabase gen types typescript --linked > types/supabase.ts`

## Next Steps

1. Get your API keys from the dashboard (link above)
2. Create `.env.local` with your credentials
3. Start building your database schema with migrations
4. Set up your frontend application (Next.js, React, etc.)

