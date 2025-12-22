"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Truck, Weight, DollarSign, Phone } from "lucide-react"
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
  const [selectedTrip, setSelectedTrip] = useState<TripWithProfile | null>(null)

  if (trips.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[400px] flex-col items-center justify-center py-12 text-center">
          <Truck className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-xl font-semibold">No trucks found</h3>
          <p className="text-muted-foreground">Try adjusting your search filters to find available trucks</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Found {trips.length} available {trips.length === 1 ? "truck" : "trucks"}
        </div>

        {trips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden transition-shadow hover:shadow-md">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <MapPin className="h-5 w-5 text-primary" />
                    {trip.from_location} → {trip.to_location}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {trip.profiles?.company_name || trip.profiles?.full_name}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {trip.truck_type}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Available:</span>
                  <span className="font-medium">{new Date(trip.available_date).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <Weight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Capacity:</span>
                  <span className="font-medium">{trip.capacity_tons} tons</span>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Price:</span>
                  <span className="font-medium">৳{trip.price_per_ton}/ton</span>
                </div>

                {(trip.contact_phone || trip.profiles?.phone_number) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={`tel:${trip.contact_phone || trip.profiles?.phone_number}`}
                      className="font-medium hover:text-primary"
                    >
                      {trip.contact_phone || trip.profiles?.phone_number}
                    </a>
                  </div>
                )}
              </div>

              {trip.description && (
                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="text-muted-foreground">{trip.description}</p>
                </div>
              )}

              {userId ? (
                <Button onClick={() => setSelectedTrip(trip)} className="w-full" size="lg">
                  Book This Truck
                </Button>
              ) : (
                <Button asChild className="w-full" size="lg">
                  <a href="/auth/login">Login to Book</a>
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedTrip && userId && (
        <BookTripDialog trip={selectedTrip} userId={userId} onClose={() => setSelectedTrip(null)} />
      )}
    </>
  )
}
