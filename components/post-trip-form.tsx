"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface PostTripFormProps {
  userId: string
}

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

export default function PostTripForm({ userId }: PostTripFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    fromLocation: "",
    toLocation: "",
    truckType: "",
    capacityTons: "",
    availableDate: "",
    pricePerTon: "",
    contactPhone: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("trips").insert({
        truck_owner_id: userId,
        from_location: formData.fromLocation,
        to_location: formData.toLocation,
        truck_type: formData.truckType,
        capacity_tons: Number.parseFloat(formData.capacityTons),
        available_date: formData.availableDate,
        price_per_ton: Number.parseFloat(formData.pricePerTon),
        contact_phone: formData.contactPhone,
        description: formData.description || null,
        status: "available",
      })

      if (insertError) throw insertError

      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to post trip")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="border-black/10">
      <CardHeader>
        <CardTitle className="text-black">Trip Details</CardTitle>
        <CardDescription className="text-black/60">
          Fill in the details about your available truck and route
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* From / To */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fromLocation" className="text-black">
                From Location *
              </Label>
              <Input
                id="fromLocation"
                placeholder="e.g., Dhaka"
                required
                value={formData.fromLocation}
                onChange={(e) =>
                  handleChange("fromLocation", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="toLocation" className="text-black">
                To Location *
              </Label>
              <Input
                id="toLocation"
                placeholder="e.g., Chittagong"
                required
                value={formData.toLocation}
                onChange={(e) =>
                  handleChange("toLocation", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>
          </div>

          {/* Truck Type */}
          <div className="space-y-2">
            <Label htmlFor="truckType" className="text-black">
              Truck Type *
            </Label>
            <Select
              value={formData.truckType}
              onValueChange={(value) =>
                handleChange("truckType", value)
              }
              required
            >
              <SelectTrigger className="border-black/20 focus:border-black focus:ring-black">
                <SelectValue placeholder="Select truck type" />
              </SelectTrigger>
              <SelectContent>
                {TRUCK_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Capacity / Price */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="capacityTons" className="text-black">
                Capacity (Tons) *
              </Label>
              <Input
                id="capacityTons"
                type="number"
                step="0.1"
                min="0.1"
                placeholder="e.g., 10"
                required
                value={formData.capacityTons}
                onChange={(e) =>
                  handleChange("capacityTons", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pricePerTon" className="text-black">
                Price per Ton (BDT) *
              </Label>
              <Input
                id="pricePerTon"
                type="number"
                step="0.01"
                min="0"
                placeholder="e.g., 5000"
                required
                value={formData.pricePerTon}
                onChange={(e) =>
                  handleChange("pricePerTon", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>
          </div>

          {/* Date / Phone */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="availableDate" className="text-black">
                Available Date *
              </Label>
              <Input
                id="availableDate"
                type="date"
                required
                min={new Date().toISOString().split("T")[0]}
                value={formData.availableDate}
                onChange={(e) =>
                  handleChange("availableDate", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone" className="text-black">
                Contact Phone *
              </Label>
              <Input
                id="contactPhone"
                type="tel"
                placeholder="e.g., 01712345678"
                required
                value={formData.contactPhone}
                onChange={(e) =>
                  handleChange("contactPhone", e.target.value)
                }
                className="border-black/20 focus:border-black focus:ring-black"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-black">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Any additional information about the truck or route..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                handleChange("description", e.target.value)
              }
              className="border-black/20 focus:border-black focus:ring-black"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-md border border-orange-300 bg-orange-50 p-3 text-sm text-orange-700">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={isLoading}
            className="w-full bg-black text-white hover:bg-black/90"
          >
            {isLoading ? "Posting Trip..." : "Post Trip"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
