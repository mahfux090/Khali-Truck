"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Calendar,
  Truck,
  Weight,
  DollarSign,
  Phone,
} from "lucide-react"
import BookTripDialog from "@/components/book-trip-dialog"
import type { Trip } from "@/lib/types"

interface TripWithProfile extends Trip {
  profiles: {
    full_name: string
    phone_number: string
    company_name: string | null
  } | null
}

interface TripListProps {
  trips: TripWithProfile[]
  userId?: string
}

export default function TripList({ trips, userId }: TripListProps) {
  const [selectedTrip, setSelectedTrip] =
    useState<TripWithProfile | null>(null)

  if (trips.length === 0) {
    return (
      <Card className="border-black/10">
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center py-12 text-center">
          <Truck className="mb-4 h-16 w-16 text-black/40" />
          <h3 className="mb-2 text-xl font-semibold text-black">
            No trucks found
          </h3>
          <p className="text-black/60">
            Try adjusting your search filters to find available trucks
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="text-sm text-black/60">
          Found {trips.length} available{" "}
          {trips.length === 1 ? "truck" : "trucks"}
        </div>

        {trips.map((trip) => (
          <Card
            key={trip.id}
            className="overflow-hidden border-black/10 transition-shadow hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-xl text-black">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    {trip.from_location} → {trip.to_location}
                  </CardTitle>
                  <CardDescription className="mt-1 text-black/60">
                    {trip.profiles?.company_name ||
                      trip.profiles?.full_name}
                  </CardDescription>
                </div>

                <Badge className="shrink-0 bg-black text-white">
                  {trip.truck_type}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-black/60" />
                  <span className="text-black/60">Available:</span>
                  <span className="font-medium text-black">
                    {new Date(
                      trip.available_date,
                    ).toLocaleDateString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Weight className="h-4 w-4 text-black/60" />
                  <span className="text-black/60">Capacity:</span>
                  <span className="font-medium text-black">
                    {trip.capacity_tons} tons
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-black/60" />
                  <span className="text-black/60">Price:</span>
                  <span className="font-medium text-black">
                    ৳{trip.price_per_ton}/ton
                  </span>
                </div>

                {(trip.contact_phone ||
                  trip.profiles?.phone_number) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-black/60" />
                    <a
                      href={`tel:${
                        trip.contact_phone ||
                        trip.profiles?.phone_number
                      }`}
                      className="font-medium text-black hover:text-orange-600"
                    >
                      {trip.contact_phone ||
                        trip.profiles?.phone_number}
                    </a>
                  </div>
                )}
              </div>

              {trip.description && (
                <div className="rounded-md border border-black/10 bg-orange-50 p-3 text-sm">
                  <p className="text-black/70">
                    {trip.description}
                  </p>
                </div>
              )}

              {userId ? (
                <Button
                  onClick={() => setSelectedTrip(trip)}
                  size="lg"
                  className="w-full bg-black text-white hover:bg-black/90"
                >
                  Book This Truck
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-black text-white hover:bg-black/90"
                >
                  <a href="/auth/login">Login to Book</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTrip && userId && (
        <BookTripDialog
          trip={selectedTrip}
          userId={userId}
          onClose={() => setSelectedTrip(null)}
        />
      )}
    </>
  )
}
