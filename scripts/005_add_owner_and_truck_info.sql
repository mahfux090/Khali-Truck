-- Add more fields to profiles table for owner information
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS address TEXT,
ADD COLUMN IF NOT EXISTS city TEXT,
ADD COLUMN IF NOT EXISTS license_number TEXT,
ADD COLUMN IF NOT EXISTS years_of_experience INTEGER,
ADD COLUMN IF NOT EXISTS profile_image_url TEXT;

-- Create trucks table for detailed truck information
CREATE TABLE IF NOT EXISTS public.trucks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  truck_name TEXT NOT NULL,
  registration_number TEXT NOT NULL UNIQUE,
  truck_type TEXT NOT NULL,
  model TEXT NOT NULL,
  manufacture_year INTEGER NOT NULL,
  capacity_tons DECIMAL NOT NULL,
  insurance_valid_until DATE,
  fitness_valid_until DATE,
  truck_image_url TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add truck_id to trips table to link trips with specific trucks
ALTER TABLE public.trips
ADD COLUMN IF NOT EXISTS truck_id UUID REFERENCES public.trucks(id) ON DELETE SET NULL;

-- Enable RLS for trucks table
ALTER TABLE public.trucks ENABLE ROW LEVEL SECURITY;

-- RLS Policies for trucks
CREATE POLICY "Anyone can view active trucks"
  ON public.trucks FOR SELECT
  USING (status = 'active');

CREATE POLICY "Truck owners can insert their own trucks"
  ON public.trucks FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Truck owners can update their own trucks"
  ON public.trucks FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Truck owners can delete their own trucks"
  ON public.trucks FOR DELETE
  USING (auth.uid() = owner_id);

-- Create indexes
CREATE INDEX idx_trucks_owner_id ON public.trucks(owner_id);
CREATE INDEX idx_trucks_status ON public.trucks(status);
CREATE INDEX idx_trips_truck_id ON public.trips(truck_id);
