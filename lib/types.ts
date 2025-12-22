export type UserType = "shipper" | "truck_owner"

export interface Profile {
  id: string
  phone_number: string
  full_name: string
  user_type: UserType
  company_name?: string
  address?: string
  city?: string
  license_number?: string
  years_of_experience?: number
  profile_image_url?: string
  created_at: string
  updated_at: string
}

export interface Truck {
  id: string
  owner_id: string
  truck_name: string
  registration_number: string
  truck_type: string
  model: string
  manufacture_year: number
  capacity_tons: number
  insurance_valid_until?: string
  fitness_valid_until?: string
  truck_image_url?: string
  status: "active" | "inactive" | "maintenance"
  created_at: string
  updated_at: string
}

export interface Trip {
  id: string
  truck_owner_id: string
  from_location: string
  to_location: string
  truck_type: string
  capacity_tons: number
  available_date: string
  price_per_ton: number
  status: "available" | "booked" | "completed" | "cancelled"
  contact_phone?: string
  description?: string
  truck_id?: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  trip_id: string
  shipper_id: string
  cargo_weight_tons: number
  total_price: number
  status: "pending" | "confirmed" | "completed" | "cancelled"
  pickup_date: string
  notes?: string
  created_at: string
  updated_at: string
}
