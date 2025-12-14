-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR UNIQUE NOT NULL,
  role VARCHAR NOT NULL CHECK (role IN ('customer', 'chef', 'driver', 'admin')),
  name VARCHAR NOT NULL,
  phone VARCHAR,
  photo_url VARCHAR,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chefs table
CREATE TABLE public.chefs (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  rating FLOAT DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  categories TEXT[] DEFAULT '{}',
  latitude FLOAT,
  longitude FLOAT,
  is_live BOOLEAN DEFAULT FALSE,
  stripe_account_id VARCHAR,
  account_status VARCHAR DEFAULT 'INCOMPLETE' CHECK (account_status IN ('INCOMPLETE', 'PENDING', 'ACTIVE', 'SUSPENDED')),
  background_check_status VARCHAR DEFAULT 'NOT_STARTED' CHECK (background_check_status IN ('NOT_STARTED', 'PENDING', 'APPROVED', 'DENIED')),
  checkr_candidate_id VARCHAR,
  checkr_report_id VARCHAR,
  background_check_initiated_at TIMESTAMPTZ,
  background_check_completed_at TIMESTAMPTZ,
  kitchen_address TEXT,
  bio TEXT,
  delivery_radius_miles FLOAT DEFAULT 5.0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create drivers table
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  rating FLOAT DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  stripe_account_id VARCHAR,
  account_status VARCHAR DEFAULT 'INCOMPLETE' CHECK (account_status IN ('INCOMPLETE', 'PENDING', 'ACTIVE', 'SUSPENDED')),
  background_check_status VARCHAR DEFAULT 'NOT_STARTED' CHECK (background_check_status IN ('NOT_STARTED', 'PENDING', 'APPROVED', 'DENIED')),
  checkr_candidate_id VARCHAR,
  checkr_report_id VARCHAR,
  background_check_initiated_at TIMESTAMPTZ,
  background_check_completed_at TIMESTAMPTZ,
  drivers_license VARCHAR,
  vehicle_info TEXT,
  total_deliveries INT DEFAULT 0,
  on_time_percentage FLOAT DEFAULT 100.0,
  tier VARCHAR DEFAULT 'BRONZE' CHECK (tier IN ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create menu_items table
CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID REFERENCES public.chefs(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  description TEXT,
  price FLOAT NOT NULL CHECK (price >= 0),
  category VARCHAR NOT NULL,
  dietary_tags TEXT[] DEFAULT '{}',
  photo_url VARCHAR,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscription_tiers table
CREATE TABLE public.subscription_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID REFERENCES public.chefs(id) ON DELETE CASCADE,
  name VARCHAR NOT NULL,
  meals_per_week INT NOT NULL CHECK (meals_per_week > 0),
  monthly_price FLOAT NOT NULL CHECK (monthly_price >= 0),
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  chef_id UUID REFERENCES public.chefs(id) ON DELETE CASCADE,
  tier_id UUID REFERENCES public.subscription_tiers(id),
  status VARCHAR DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'PAUSED', 'CANCELLED')),
  stripe_subscription_id VARCHAR,
  monthly_price FLOAT NOT NULL,
  next_billing_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  cancelled_at TIMESTAMPTZ
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES public.users(id),
  chef_id UUID REFERENCES public.chefs(id),
  driver_id UUID REFERENCES public.drivers(id),
  order_type VARCHAR NOT NULL CHECK (order_type IN ('A_LA_CARTE', 'SUBSCRIPTION')),
  subscription_id UUID REFERENCES public.subscriptions(id),
  total_price FLOAT NOT NULL CHECK (total_price >= 0),
  meal_price FLOAT NOT NULL CHECK (meal_price >= 0),
  delivery_fee FLOAT DEFAULT 0 CHECK (delivery_fee >= 0),
  status VARCHAR DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'ACCEPTED', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED')),
  fulfillment_type VARCHAR NOT NULL CHECK (fulfillment_type IN ('PICKUP', 'DELIVERY')),
  delivery_address TEXT,
  special_instructions TEXT,
  stripe_payment_id VARCHAR,
  chef_rating INT CHECK (chef_rating >= 1 AND chef_rating <= 5),
  driver_rating INT CHECK (driver_rating >= 1 AND driver_rating <= 5),
  chef_review TEXT,
  driver_review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  accepted_at TIMESTAMPTZ,
  ready_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES public.menu_items(id),
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_time FLOAT NOT NULL CHECK (price_at_time >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id),
  subscription_id UUID REFERENCES public.subscriptions(id),
  payment_type VARCHAR NOT NULL CHECK (payment_type IN ('ORDER', 'SUBSCRIPTION')),
  total_amount FLOAT NOT NULL CHECK (total_amount >= 0),
  chef_amount FLOAT NOT NULL CHECK (chef_amount >= 0),
  driver_amount FLOAT DEFAULT 0 CHECK (driver_amount >= 0),
  platform_commission FLOAT NOT NULL CHECK (platform_commission >= 0),
  stripe_transaction_id VARCHAR,
  status VARCHAR DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Create live_streams table
CREATE TABLE public.live_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chef_id UUID REFERENCES public.chefs(id) ON DELETE CASCADE,
  agora_channel_id VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'ENDED')),
  viewer_count INT DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ
);

-- Create notifications table
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  type VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  related_order_id UUID REFERENCES public.orders(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_chefs_latitude_longitude ON public.chefs(latitude, longitude);
CREATE INDEX idx_chefs_account_status ON public.chefs(account_status);
CREATE INDEX idx_chefs_is_live ON public.chefs(is_live);
CREATE INDEX idx_menu_items_chef_id ON public.menu_items(chef_id);
CREATE INDEX idx_menu_items_category ON public.menu_items(category);
CREATE INDEX idx_orders_customer_id ON public.orders(customer_id);
CREATE INDEX idx_orders_chef_id ON public.orders(chef_id);
CREATE INDEX idx_orders_driver_id ON public.orders(driver_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX idx_subscriptions_customer_id ON public.subscriptions(customer_id);
CREATE INDEX idx_subscriptions_chef_id ON public.subscriptions(chef_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_is_read ON public.notifications(is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view their own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for chefs table
CREATE POLICY "Anyone can view active chefs"
  ON public.chefs FOR SELECT
  USING (account_status = 'ACTIVE' OR auth.uid() = id);

CREATE POLICY "Chefs can update their own profile"
  ON public.chefs FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for menu_items table
CREATE POLICY "Anyone can view available menu items"
  ON public.menu_items FOR SELECT
  USING (is_available = TRUE OR chef_id IN (
    SELECT id FROM public.chefs WHERE id = auth.uid()
  ));

CREATE POLICY "Chefs can manage their own menu items"
  ON public.menu_items FOR ALL
  USING (chef_id = auth.uid());

-- RLS Policies for orders table
CREATE POLICY "Users can view their own orders"
  ON public.orders FOR SELECT
  USING (
    customer_id = auth.uid() OR 
    chef_id = auth.uid() OR 
    driver_id = auth.uid()
  );

-- RLS Policies for notifications table
CREATE POLICY "Users can view their own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

