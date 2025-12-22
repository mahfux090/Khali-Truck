"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"

const TRUCK_TYPES = [
  "Covered Van",
  "Open Truck",
  "Flatbed",
  "Container Truck",
  "Refrigerated Truck",
  "Tanker",
  "Pickup",
  "Other",
]

export default function TripSearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
    truckType: searchParams.get("truckType") || "Any type",
    minCapacity: searchParams.get("minCapacity") || "",
    date: searchParams.get("date") || "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (filters.from) params.set("from", filters.from)
    if (filters.to) params.set("to", filters.to)
    if (filters.truckType && filters.truckType !== "Any type") params.set("truckType", filters.truckType)
    if (filters.minCapacity) params.set("minCapacity", filters.minCapacity)
    if (filters.date) params.set("date", filters.date)

    router.push(`/find-trucks?${params.toString()}`)
  }

  const handleClear = () => {
    setFilters({
      from: "",
      to: "",
      truckType: "Any type",
      minCapacity: "",
      date: "",
    })
    router.push("/find-trucks")
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Search Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="from">From Location</Label>
          <Input
            id="from"
            placeholder="e.g., Dhaka"
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="to">To Location</Label>
          <Input
            id="to"
            placeholder="e.g., Chittagong"
            value={filters.to}
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="truckType">Truck Type</Label>
          <Select value={filters.truckType} onValueChange={(value) => setFilters({ ...filters, truckType: value })}>
            <SelectTrigger id="truckType">
              <SelectValue placeholder="Any type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any type">Any type</SelectItem>
              {TRUCK_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="minCapacity">Min. Capacity (Tons)</Label>
          <Input
            id="minCapacity"
            type="number"
            step="0.1"
            placeholder="e.g., 5"
            value={filters.minCapacity}
            onChange={(e) => setFilters({ ...filters, minCapacity: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Available From</Label>
          <Input
            id="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSearch} className="flex-1">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
          {hasActiveFilters && (
            <Button onClick={handleClear} variant="outline" size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
