-- Fix RLS gaps from initial schema:
-- 1. No INSERT policies existed anywhere (signup, checkout, and onboarding were blocked).
-- 2. order_items, payments, subscription_tiers, live_streams had RLS disabled entirely,
--    leaving them readable and writable with the anon key.
-- 3. drivers and subscriptions had RLS enabled but zero policies (all access blocked).
-- 4. Public chef browsing joins users for name/photo, which "view own profile" blocked.

-- ============ users ============
CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Active chef profiles are publicly viewable"
  ON public.users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.chefs c
    WHERE c.id = users.id AND c.account_status = 'ACTIVE'
  ));

CREATE POLICY "Order participants can view each other"
  ON public.users FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE (o.customer_id = users.id OR o.chef_id = users.id OR o.driver_id = users.id)
      AND (o.customer_id = auth.uid() OR o.chef_id = auth.uid() OR o.driver_id = auth.uid())
  ));

-- ============ chefs ============
CREATE POLICY "Chefs can insert their own profile"
  ON public.chefs FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============ drivers ============
CREATE POLICY "Drivers can view their own profile"
  ON public.drivers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Drivers can insert their own profile"
  ON public.drivers FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Drivers can update their own profile"
  ON public.drivers FOR UPDATE
  USING (auth.uid() = id);

-- ============ orders ============
CREATE POLICY "Customers can create their own orders"
  ON public.orders FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Participants can update orders"
  ON public.orders FOR UPDATE
  USING (
    customer_id = auth.uid()
    OR chef_id = auth.uid()
    OR driver_id = auth.uid()
    -- active drivers may claim a READY order that has no driver yet
    OR (
      driver_id IS NULL
      AND status = 'READY'
      AND EXISTS (
        SELECT 1 FROM public.drivers d
        WHERE d.id = auth.uid() AND d.account_status = 'ACTIVE'
      )
    )
  );

-- ============ order_items ============
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view order items"
  ON public.order_items FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id
      AND (o.customer_id = auth.uid() OR o.chef_id = auth.uid() OR o.driver_id = auth.uid())
  ));

CREATE POLICY "Customers can add items to their own orders"
  ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = order_items.order_id AND o.customer_id = auth.uid()
  ));

-- ============ payments ============
-- Writes happen only via the service-role client (Stripe webhook).
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Order participants can view payments"
  ON public.payments FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM public.orders o
    WHERE o.id = payments.order_id
      AND (o.customer_id = auth.uid() OR o.chef_id = auth.uid())
  ));

-- ============ subscriptions ============
CREATE POLICY "Parties can view their subscriptions"
  ON public.subscriptions FOR SELECT
  USING (customer_id = auth.uid() OR chef_id = auth.uid());

CREATE POLICY "Customers can create their own subscriptions"
  ON public.subscriptions FOR INSERT
  WITH CHECK (customer_id = auth.uid());

CREATE POLICY "Parties can update their subscriptions"
  ON public.subscriptions FOR UPDATE
  USING (customer_id = auth.uid() OR chef_id = auth.uid());

-- ============ subscription_tiers ============
ALTER TABLE public.subscription_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Subscription tiers are publicly viewable"
  ON public.subscription_tiers FOR SELECT
  USING (TRUE);

CREATE POLICY "Chefs can manage their own tiers"
  ON public.subscription_tiers FOR ALL
  USING (chef_id = auth.uid());

-- ============ live_streams ============
ALTER TABLE public.live_streams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Live streams are publicly viewable"
  ON public.live_streams FOR SELECT
  USING (TRUE);

CREATE POLICY "Chefs can manage their own streams"
  ON public.live_streams FOR ALL
  USING (chef_id = auth.uid());

-- ============ notifications ============
CREATE POLICY "Authenticated users can create notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Applied separately to live DB (2026-06-10): realtime + driver discovery
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;

CREATE POLICY "Active drivers can view claimable orders"
  ON public.orders FOR SELECT
  USING (
    driver_id IS NULL AND status = 'READY'
    AND EXISTS (
      SELECT 1 FROM public.drivers d
      WHERE d.id = auth.uid() AND d.account_status = 'ACTIVE'
    )
  );
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_status_check CHECK (status IN ('pending','accepted','preparing','ready','out_for_delivery','delivered','cancelled'));
ALTER TABLE public.orders ALTER COLUMN status SET DEFAULT 'pending';
DROP POLICY IF EXISTS "Participants can update orders" ON public.orders;
CREATE POLICY "Participants can update orders" ON public.orders FOR UPDATE USING (
  customer_id = auth.uid() OR chef_id = auth.uid() OR driver_id = auth.uid()
  OR (driver_id IS NULL AND status = 'ready' AND EXISTS (SELECT 1 FROM public.drivers d WHERE d.id = auth.uid() AND d.account_status = 'ACTIVE'))
);
DROP POLICY IF EXISTS "Active drivers can view claimable orders" ON public.orders;
CREATE POLICY "Active drivers can view claimable orders" ON public.orders FOR SELECT USING (
  driver_id IS NULL AND status = 'ready' AND EXISTS (SELECT 1 FROM public.drivers d WHERE d.id = auth.uid() AND d.account_status = 'ACTIVE')
);
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_order_type_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_order_type_check CHECK (order_type IN ('a_la_carte','subscription'));
ALTER TABLE public.orders ALTER COLUMN order_type SET DEFAULT 'a_la_carte';
ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_fulfillment_type_check;
ALTER TABLE public.orders ADD CONSTRAINT orders_fulfillment_type_check CHECK (fulfillment_type IN ('pickup','delivery'));
