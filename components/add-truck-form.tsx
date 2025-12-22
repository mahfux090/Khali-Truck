"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddTruckFormProps {
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

export default function AddTruckForm({ userId }: AddTruckFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    truckName: "",
    registrationNumber: "",
    truckType: "",
    model: "",
    manufactureYear: "",
    capacityTons: "",
    insuranceValidUntil: "",
    fitnessValidUntil: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error: insertError } = await supabase.from("trucks").insert({
        owner_id: userId,
        truck_name: formData.truckName,
        registration_number: formData.registrationNumber,
        truck_type: formData.truckType,
        model: formData.model,
        manufacture_year: Number.parseInt(formData.manufactureYear),
        capacity_tons: Number.parseFloat(formData.capacityTons),
        insurance_valid_until: formData.insuranceValidUntil || null,
        fitness_valid_until: formData.fitnessValidUntil || null,
        status: "active",
      })

      if (insertError) throw insertError

      router.push("/trucks")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add truck")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const currentYear = new Date().getFullYear()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Truck Information</CardTitle>
        <CardDescription>Enter the details of your truck</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="truckName">Truck Name *</Label>
            <Input
              id="truckName"
              placeholder="e.g., My Truck 1"
              required
              value={formData.truckName}
              onChange={(e) => handleChange("truckName", e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number *</Label>
              <Input
                id="registrationNumber"
                placeholder="e.g., DHAKA-GA-11-1234"
                required
                value={formData.registrationNumber}
                onChange={(e) => handleChange("registrationNumber", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="truckType">Truck Type *</Label>
              <Select value={formData.truckType} onValueChange={(value) => handleChange("truckType", value)} required>
                <SelectTrigger id="truckType">
                  <SelectValue placeholder="Select type" />
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
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="model">Model *</Label>
              <Input
                id="model"
                placeholder="e.g., TATA LPT 1618"
                required
                value={formData.model}
                onChange={(e) => handleChange("model", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufactureYear">Manufacture Year *</Label>
              <Input
                id="manufactureYear"
                type="number"
                min="1990"
                max={currentYear}
                placeholder={currentYear.toString()}
                required
                value={formData.manufactureYear}
                onChange={(e) => handleChange("manufactureYear", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacityTons">Capacity (Tons) *</Label>
            <Input
              id="capacityTons"
              type="number"
              step="0.1"
              min="0.1"
              placeholder="e.g., 10"
              required
              value={formData.capacityTons}
              onChange={(e) => handleChange("capacityTons", e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="insuranceValidUntil">Insurance Valid Until</Label>
              <Input
                id="insuranceValidUntil"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.insuranceValidUntil}
                onChange={(e) => handleChange("insuranceValidUntil", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fitnessValidUntil">Fitness Valid Until</Label>
              <Input
                id="fitnessValidUntil"
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={formData.fitnessValidUntil}
                onChange={(e) => handleChange("fitnessValidUntil", e.target.value)}
              />
            </div>
          </div>

          {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}

          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
            {isLoading ? "Adding Truck..." : "Add Truck"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
