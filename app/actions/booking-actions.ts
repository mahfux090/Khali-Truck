"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function acceptBooking(bookingId: string) {
  const supabase = await createClient()

  try {
    // Update booking status to confirmed
    const { error: bookingError } = await supabase.from("bookings").update({ status: "confirmed" }).eq("id", bookingId)

    if (bookingError) throw bookingError

    // Get the trip_id from the booking
    const { data: booking } = await supabase.from("bookings").select("trip_id").eq("id", bookingId).single()

    if (booking) {
      // Update trip status to booked
      await supabase.from("trips").update({ status: "booked" }).eq("id", booking.trip_id)
    }

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error accepting booking:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to accept booking" }
  }
}

export async function rejectBooking(bookingId: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("bookings").update({ status: "cancelled" }).eq("id", bookingId)

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error rejecting booking:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to reject booking" }
  }
}

export async function deleteTrip(tripId: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("trips").delete().eq("id", tripId)

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error deleting trip:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to delete trip" }
  }
}

export async function cancelTrip(tripId: string) {
  const supabase = await createClient()

  try {
    const { error } = await supabase.from("trips").update({ status: "cancelled" }).eq("id", tripId)

    if (error) throw error

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("[v0] Error cancelling trip:", error)
    return { success: false, error: error instanceof Error ? error.message : "Failed to cancel trip" }
  }
}
