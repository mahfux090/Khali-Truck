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
  Package,
  Search,
  Calendar,
  MapPin,
  TruckIcon,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import type { Profile } from "@/lib/types"

interface ShipperDashboardProps {
  userId: string
  profile: Profile
}

export default async function ShipperDashboard({
  userId,
  profile,
}: ShipperDashboardProps) {
  const supabase = await createClient()

  const { data: bookings } = await supabase
    .from("bookings")
    .select(
      `
      *,
      trips:trip_id (
        from_location,
        to_location,
        truck_type,
        profiles:truck_owner_id (
          full_name,
          phone_number,
          company_name
        )
      )
    `,
    )
    .eq("shipper_id", userId)
    .order("created_at", { ascending: false })

  const pendingBookings = bookings?.filter((b) => b.status === "pending") || []
  const confirmedBookings =
    bookings?.filter((b) => b.status === "confirmed") || []

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-black">
            Welcome back, {profile.full_name}!
          </h2>
          <p className="mt-1 text-black/60">
            Manage your shipments and find available trucks
          </p>
        </div>
        <Link href="/find-trucks">
          <Button
            size="lg"
            className="gap-2 bg-black text-white hover:bg-black/90"
          >
            <Search className="h-5 w-5" />
            Find Trucks
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Total Bookings
            </CardTitle>
            <Package className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {bookings?.length || 0}
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Pending
            </CardTitle>
            <Calendar className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {pendingBookings.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-black/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Confirmed
            </CardTitle>
            <TruckIcon className="h-4 w-4 text-black/60" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-black">
              {confirmedBookings.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings */}
      <Card className="border-black/10">
        <CardHeader>
          <CardTitle className="text-black">Your Bookings</CardTitle>
          <CardDescription className="text-black/60">
            Track and manage your shipment bookings
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!bookings || bookings.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="mb-4 h-16 w-16 text-black/40" />
              <h3 className="mb-2 text-lg font-semibold text-black">
                No bookings yet
              </h3>
              <p className="mb-4 text-black/60">
                Start by finding available trucks for your cargo
              </p>
              <Link href="/find-trucks">
                <Button className="bg-black text-white hover:bg-black/90">
                  <Search className="mr-2 h-4 w-4" />
                  Find Trucks
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex flex-col gap-4 rounded-lg border border-black/10 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-black/60" />
                      <span className="font-semibold text-black">
                        {booking.trips?.from_location} →{" "}
                        {booking.trips?.to_location}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-black/60">
                      <span>Truck: {booking.trips?.truck_type}</span>
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
                      <span className="text-black/60">Owner:</span>
                      <span className="font-medium text-black">
                        {booking.trips?.profiles?.company_name ||
                          booking.trips?.profiles?.full_name}
                      </span>
                      <span className="text-black/40">•</span>
                      <span className="text-black">
                        {booking.trips?.profiles?.phone_number}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                    <Badge
                      className={
                        booking.status === "confirmed"
                          ? "bg-black text-white"
                          : booking.status === "pending"
                            ? "bg-orange-500 text-white"
                            : "border border-black/20 text-black"
                      }
                    >
                      {booking.status}
                    </Badge>

                    <div className="flex items-center gap-1 text-lg font-bold text-black">
                      <DollarSign className="h-4 w-4" />৳{booking.total_price}
                    </div>
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
