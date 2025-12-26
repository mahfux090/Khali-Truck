"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Trip } from "@/lib/types"

interface BookTripDialogProps {
  trip: Trip
  userId: string
  onClose: () => void
}

export default function BookTripDialog({
  trip,
  userId,
  onClose,
}: BookTripDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    cargoWeight: "",
    pickupDate: trip.available_date,
    notes: "",
  })

  const calculateTotal = () => {
    const weight = Number.parseFloat(formData.cargoWeight) || 0
    return (weight * trip.price_per_ton).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const cargoWeight = Number.parseFloat(formData.cargoWeight)

      if (cargoWeight > trip.capacity_tons) {
        throw new Error(
          `Cargo weight cannot exceed truck capacity of ${trip.capacity_tons} tons`
        )
      }

      const { error: insertError } = await supabase.from("bookings").insert({
        trip_id: trip.id,
        shipper_id: userId,
        cargo_weight_tons: cargoWeight,
        total_price: Number.parseFloat(calculateTotal()),
        pickup_date: formData.pickupDate,
        notes: formData.notes || null,
        status: "pending",
      })

      if (insertError) throw insertError

      router.push("/dashboard")
      router.refresh()
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book trip")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md border-black/10">
        <DialogHeader>
          <DialogTitle className="text-black">
            Book This Truck
          </DialogTitle>
          <DialogDescription className="text-black/60">
            {trip.from_location} → {trip.to_location}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Cargo Weight */}
          <div className="space-y-2">
            <Label htmlFor="cargoWeight" className="text-black">
              Cargo Weight (Tons) *
            </Label>
            <Input
              id="cargoWeight"
              type="number"
              step="0.1"
              min="0.1"
              max={trip.capacity_tons}
              placeholder="e.g., 5"
              required
              value={formData.cargoWeight}
              onChange={(e) =>
                setFormData({ ...formData, cargoWeight: e.target.value })
              }
              className="border-black/20 focus:border-black focus:ring-black"
            />
            <p className="text-xs text-black/60">
              Max capacity: {trip.capacity_tons} tons
            </p>
          </div>

          {/* Pickup Date */}
          <div className="space-y-2">
            <Label htmlFor="pickupDate" className="text-black">
              Pickup Date *
            </Label>
            <Input
              id="pickupDate"
              type="date"
              required
              min={trip.available_date}
              value={formData.pickupDate}
              onChange={(e) =>
                setFormData({ ...formData, pickupDate: e.target.value })
              }
              className="border-black/20 focus:border-black focus:ring-black"
            />
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-black">
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              placeholder="Any special requirements or instructions..."
              rows={3}
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              className="border-black/20 focus:border-black focus:ring-black"
            />
          </div>

          {/* Price Summary */}
          {formData.cargoWeight && (
            <div className="rounded-md border border-black/10 bg-orange-50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-black/70">Price per ton:</span>
                <span className="font-medium text-black">
                  ৳{trip.price_per_ton}
                </span>
              </div>
              <div className="mt-2 flex justify-between border-t border-black/10 pt-2">
                <span className="font-semibold text-black">
                  Total Price:
                </span>
                <span className="text-lg font-bold text-black">
                  ৳{calculateTotal()}
                </span>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-md border border-orange-300 bg-orange-50 p-3 text-sm text-orange-700">
              {error}
            </div>
          )}

          {/* Actions */}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="border border-black/20 bg-white text-black hover:bg-black/5"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-black text-white hover:bg-black/90"
            >
              {isLoading ? "Booking..." : "Confirm Booking"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
