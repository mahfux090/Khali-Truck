import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TruckIcon,
  Plus,
  MapPin,
  Calendar,
  Weight,
  DollarSign,
  Package,
  Phone,
} from "lucide-react"
import Link from "next/link"
import type { Profile } from "@/lib/types"
import BookingActionButtons from "./booking-action-buttons"
import TripActionButtons from "./trip-action-buttons"

interface TruckOwnerDashboardProps {
  userId: string
  profile: Profile
}

export default async function TruckOwnerDashboard({
  userId,
  profile,
}: TruckOwnerDashboardProps) {
  const supabase = await createClient()

  const { data: trips } = await supabase
    .from("trips")
    .select("*")
    .eq("truck_owner_id", userId)
    .order("created_at", { ascending: false })

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      *,
      trips!inner (
        truck_owner_id,
        from_location,
        to_location,
        truck_type
      ),
      profiles:shipper_id (
        full_name,
        phone_number,
        company_name
      )
    `,
    )
    .eq("trips.truck_owner_id", userId)
    .order("created_at", { ascending: false })

  const availableTrips = trips?.filter((t) => t.status === "available") || []
  const pendingBookings =
    bookings?.filter((b) => b.status === "pending") || []

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">
            Welcome back, {profile.full_name}!
          </h2>
          <p className="mt-1 text-black/60">
            Manage your trucks and bookings
          </p>
        </div>

        <Link href="/post-trip">
          <Button
            size="lg"
            className="gap-2 bg-black text-white hover:bg-black/90"
          >
            <Plus className="h-5 w-5" />
            Post a Trip
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Total Trips
            </CardTitle>
            <TruckIcon className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {trips?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Available
            </CardTitle>
            <Calendar className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {availableTrips.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Pending Bookings
            </CardTitle>
            <Package className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {pendingBookings.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Bookings */}
      {pendingBookings.length > 0 && (
        <Card className="border-black/10">
          <CardHeader>
            <CardTitle className="text-black">
              Pending Bookings
            </CardTitle>
            <CardDescription className="text-black/60">
              Review and respond to booking requests
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {pendingBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-lg border border-black/10 p-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-black/60" />
                      <span className="font-semibold text-black">
                        {booking.trips?.from_location} →{" "}
                        {booking.trips?.to_location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-black/60">
                      <span>
                        Weight: {booking.cargo_weight_tons} tons
                      </span>
                      <span>
                        Pickup:{" "}
                        {new Date(
                          booking.pickup_date,
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-black/60">Shipper:</span>
                      <span className="font-medium text-black">
                        {booking.profiles?.company_name ||
                          booking.profiles?.full_name}
                      </span>

                      {booking.profiles?.phone_number && (
                        <>
                          <span className="text-black/40">•</span>
                          <a
                            href={`tel:${booking.profiles.phone_number}`}
                            className="flex items-center gap-1 text-black hover:text-orange-600"
                          >
                            <Phone className="h-3 w-3" />
                            {booking.profiles.phone_number}
                          </a>
                        </>
                      )}
                    </div>

                    {booking.notes && (
                      <p className="text-sm text-black/60">
                        <span className="font-medium text-black">
                          Notes:
                        </span>{" "}
                        {booking.notes}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-orange-500 text-white">
                        {booking.status}
                      </Badge>
                      <div className="flex items-center gap-1 text-lg font-bold text-black">
                        <DollarSign className="h-4 w-4" />৳
                        {booking.total_price}
                      </div>
                    </div>
                    <BookingActionButtons bookingId={booking.id} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trips */}
      <Card className="border-black/10">
        <CardHeader>
          <CardTitle className="text-black">
            Your Posted Trips
          </CardTitle>
          <CardDescription className="text-black/60">
            Manage your available trucks and routes
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!trips || trips.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <TruckIcon className="mb-4 h-16 w-16 text-black/40" />
              <h3 className="mb-2 text-lg font-semibold text-black">
                No trips posted yet
              </h3>
              <p className="mb-4 text-black/60">
                Start by posting your first available truck
              </p>
              <Link href="/post-trip">
                <Button className="bg-black text-white hover:bg-black/90">
                  <Plus className="mr-2 h-4 w-4" />
                  Post a Trip
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {trips.map((trip) => (
                <div
                  key={trip.id}
                  className="flex flex-col gap-4 rounded-lg border border-black/10 p-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-black/60" />
                      <span className="font-semibold text-black">
                        {trip.from_location} → {trip.to_location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-black/60">
                      <span className="flex items-center gap-1">
                        <TruckIcon className="h-3 w-3" />
                        {trip.truck_type}
                      </span>
                      <span className="flex items-center gap-1">
                        <Weight className="h-3 w-3" />
                        {trip.capacity_tons} tons
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(
                          trip.available_date,
                        ).toLocaleDateString()}
                      </span>
                      {trip.contact_phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {trip.contact_phone}
                        </span>
                      )}
                    </div>

                    {trip.description && (
                      <p className="text-sm text-black/60">
                        {trip.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-black/10 pt-4">
                    <div className="flex items-center gap-4">
                      <Badge
                        className={
                          trip.status === "available"
                            ? "bg-black text-white"
                            : "bg-orange-500 text-white"
                        }
                      >
                        {trip.status}
                      </Badge>
                      <div className="text-sm font-semibold text-black">
                        ৳{trip.price_per_ton}/ton
                      </div>
                    </div>

                    <TripActionButtons
                      tripId={trip.id}
                      status={trip.status}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
