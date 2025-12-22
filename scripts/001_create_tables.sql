-- Create profiles table with user type
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  phone_number TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  user_type TEXT NOT NULL CHECK (user_type IN ('shipper', 'truck_owner')),
  company_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create trips table for truck owners to post available trips
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  truck_owner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  from_location TEXT NOT NULL,
  to_location TEXT NOT NULL,
  truck_type TEXT NOT NULL,
  capacity_tons DECIMAL NOT NULL,
  available_date DATE NOT NULL,
  price_per_ton DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'completed', 'cancelled')),
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create bookings table for shippers to book trips
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id UUID NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  shipper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  cargo_weight_tons DECIMAL NOT NULL,
  total_price DECIMAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  pickup_date DATE NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for trips
CREATE POLICY "Anyone can view available trips"
  ON public.trips FOR SELECT
  USING (true);

CREATE POLICY "Truck owners can insert their own trips"
  ON public.trips FOR INSERT
  WITH CHECK (auth.uid() = truck_owner_id);

CREATE POLICY "Truck owners can update their own trips"
  ON public.trips FOR UPDATE
  USING (auth.uid() = truck_owner_id);

CREATE POLICY "Truck owners can delete their own trips"
  ON public.trips FOR DELETE
  USING (auth.uid() = truck_owner_id);

-- RLS Policies for bookings
CREATE POLICY "Users can view their own bookings"
  ON public.bookings FOR SELECT
  USING (auth.uid() = shipper_id OR auth.uid() IN (
    SELECT truck_owner_id FROM public.trips WHERE id = trip_id
  ));

CREATE POLICY "Shippers can create bookings"
  ON public.bookings FOR INSERT
  WITH CHECK (auth.uid() = shipper_id);

CREATE POLICY "Users can update their own bookings"
  ON public.bookings FOR UPDATE
  USING (auth.uid() = shipper_id OR auth.uid() IN (
    SELECT truck_owner_id FROM public.trips WHERE id = trip_id
  ));

-- Create indexes for better query performance
CREATE INDEX idx_trips_status ON public.trips(status);
CREATE INDEX idx_trips_available_date ON public.trips(available_date);
CREATE INDEX idx_trips_from_location ON public.trips(from_location);
CREATE INDEX idx_trips_to_location ON public.trips(to_location);
CREATE INDEX idx_bookings_trip_id ON public.bookings(trip_id);
CREATE INDEX idx_bookings_shipper_id ON public.bookings(shipper_id);
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
