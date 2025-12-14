# Supabase Setup Guide

## Local Development Setup ✅
Supabase has been initialized in your project with the following configuration:
- **Project ID**: neighboreats
- **API Port**: 54321
- **DB Port**: 54322
- **Studio Port**: 54323

## Creating a Remote Supabase Project

### Option 1: Via Dashboard (Recommended)
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project details:
   - **Name**: neighboreats
   - **Database Password**: (create a strong password)
   - **Region**: (choose closest to your users)
4. Click "Create new project"
5. Once created, link it to your local project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

### Option 2: Via CLI with Access Token
1. Get your access token from [https://supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens)
2. Login with token:
   ```bash
   supabase login --token YOUR_ACCESS_TOKEN
   ```
3. Create the project:
   ```bash
   supabase projects create neighboreats
   ```
4. Link the project:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

## Prerequisites for Local Development

**Docker Desktop** is required for local development. 
- Download: [https://docs.docker.com/desktop](https://docs.docker.com/desktop)
- Make sure Docker Desktop is running before starting Supabase

## Starting Local Development

Once Docker Desktop is running, start the local Supabase environment:
```bash
supabase start
```

This will start:
- Postgres database
- API server (PostgREST)
- Auth server (GoTrue)
- Storage server
- Realtime server
- Studio (web interface at http://127.0.0.1:54323)

To stop the local environment:
```bash
supabase stop
```

## Environment Variables

After creating your remote project, create a `.env.local` file with:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

You can find these values in your Supabase dashboard under Project Settings > API.

## Database Migrations

Create a new migration:
```bash
supabase migration new migration_name
```

Apply migrations:
```bash
supabase db push
```

## Useful Commands

- `supabase status` - Check running services
- `supabase db reset` - Reset local database
- `supabase db diff` - Create migration from schema changes
- `supabase functions new function_name` - Create edge function

