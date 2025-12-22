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
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <TruckIcon className="mb-4 h-16 w-16 text-muted-foreground" />
          <h3 className="mb-2 text-lg font-semibold">No trucks registered</h3>
          <p className="text-sm text-muted-foreground">Add your first truck to start posting trips</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {trucks.map((truck) => (
        <Card key={truck.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl">{truck.truck_name}</CardTitle>
                <p className="text-sm text-muted-foreground">{truck.registration_number}</p>
              </div>
              <Badge variant={truck.status === "active" ? "default" : "secondary"}>{truck.status}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">{truck.truck_type}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span>{truck.model}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Weight className="h-4 w-4 text-muted-foreground" />
                <span>{truck.capacity_tons} tons capacity</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Year: {truck.manufacture_year}</span>
              </div>
            </div>

            {(truck.insurance_valid_until || truck.fitness_valid_until) && (
              <div className="space-y-1 border-t pt-4">
                {truck.insurance_valid_until && (
                  <p className="text-xs text-muted-foreground">
                    Insurance: {new Date(truck.insurance_valid_until).toLocaleDateString()}
                  </p>
                )}
                {truck.fitness_valid_until && (
                  <p className="text-xs text-muted-foreground">
                    Fitness: {new Date(truck.fitness_valid_until).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}

            <Button variant="outline" className="w-full bg-transparent" size="sm">
              Edit Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
