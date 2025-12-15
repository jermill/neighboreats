-- Add Stripe customer ID to users table
ALTER TABLE public.users
ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR;

-- Add Stripe verified flag to chefs table
ALTER TABLE public.chefs
ADD COLUMN IF NOT EXISTS stripe_verified BOOLEAN DEFAULT FALSE;

-- Add Stripe verified flag to drivers table
ALTER TABLE public.drivers
ADD COLUMN IF NOT EXISTS stripe_verified BOOLEAN DEFAULT FALSE;

-- Create index for faster Stripe account lookups
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer_id ON public.users(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_chefs_stripe_account_id ON public.chefs(stripe_account_id);
CREATE INDEX IF NOT EXISTS idx_drivers_stripe_account_id ON public.drivers(stripe_account_id);

-- Add comment to document the fields
COMMENT ON COLUMN public.users.stripe_customer_id IS 'Stripe customer ID for payment processing';
COMMENT ON COLUMN public.chefs.stripe_verified IS 'Whether the chef''s Stripe Connect account is verified and can receive payouts';
COMMENT ON COLUMN public.drivers.stripe_verified IS 'Whether the driver''s Stripe Connect account is verified and can receive payouts';
