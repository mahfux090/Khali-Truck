"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TruckIcon, Calendar, Weight, FileText } from "lucide-react"
import type { Truck } from "@/lib/types"

interface TruckListProps {
  trucks: Truck[]
}

export default function TruckList({ trucks }: TruckListProps) {
  if (trucks.length === 0) {
    return (
      <Card className="border-black/10">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <TruckIcon className="mb-4 h-16 w-16 text-black/40" />
          <h3 className="mb-2 text-lg font-semibold text-black">
            No trucks registered
          </h3>
          <p className="text-sm text-black/60">
            Add your first truck to start posting trips
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trucks.map((truck) => (
        <Card
          key={truck.id}
          className="border-black/10 transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-black">
                  {truck.truck_name}
                </CardTitle>
                <p className="text-sm text-black/60">
                  {truck.registration_number}
                </p>
              </div>

              <Badge
                className={
                  truck.status === "active"
                    ? "bg-black text-white"
                    : "bg-orange-500 text-white"
                }
              >
                {truck.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-black">
                <TruckIcon className="h-4 w-4 text-black/60" />
                <span className="font-medium">{truck.truck_type}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-black">
                <FileText className="h-4 w-4 text-black/60" />
                <span>{truck.model}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-black">
                <Weight className="h-4 w-4 text-black/60" />
                <span>{truck.capacity_tons} tons capacity</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-black">
                <Calendar className="h-4 w-4 text-black/60" />
                <span>Year: {truck.manufacture_year}</span>
              </div>
            </div>

            {(truck.insurance_valid_until ||
              truck.fitness_valid_until) && (
              <div className="space-y-1 border-t border-black/10 pt-4">
                {truck.insurance_valid_until && (
                  <p className="text-xs text-black/60">
                    Insurance:{" "}
                    {new Date(
                      truck.insurance_valid_until,
                    ).toLocaleDateString()}
                  </p>
                )}
                {truck.fitness_valid_until && (
                  <p className="text-xs text-black/60">
                    Fitness:{" "}
                    {new Date(
                      truck.fitness_valid_until,
                    ).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <Button
              size="sm"
              className="w-full border border-black/20 bg-white text-black hover:bg-black/5"
            >
              Edit Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
