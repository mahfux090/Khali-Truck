-- Add contact_phone column to trips table
ALTER TABLE public.trips 
ADD COLUMN IF NOT EXISTS contact_phone TEXT;

-- Update RLS policy to allow viewing contact info for available trips
DROP POLICY IF EXISTS "Anyone can view available trips" ON public.trips;

CREATE POLICY "Anyone can view available trips"
  ON public.trips FOR SELECT
  USING (true);
