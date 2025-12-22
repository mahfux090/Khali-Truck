"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, XCircle } from "lucide-react"
import { deleteTrip, cancelTrip } from "@/app/actions/booking-actions"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface TripActionButtonsProps {
  tripId: string
  status: string
}

export default function TripActionButtons({ tripId, status }: TripActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    await deleteTrip(tripId)
    setIsLoading(false)
    setShowDeleteDialog(false)
  }

  const handleCancel = async () => {
    setIsLoading(true)
    await cancelTrip(tripId)
    setIsLoading(false)
    setShowCancelDialog(false)
  }

  // Only show actions for available or cancelled trips
  if (status === "booked" || status === "completed") {
    return null
  }

  return (
    <>
      <div className="flex gap-2">
        {status === "available" && (
          <Button size="sm" variant="outline" onClick={() => setShowCancelDialog(true)} disabled={isLoading}>
            <XCircle className="mr-1 h-4 w-4" />
            Cancel
          </Button>
        )}
        <Button size="sm" variant="destructive" onClick={() => setShowDeleteDialog(true)} disabled={isLoading}>
          <Trash2 className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </div>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this trip posting. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Trip?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the trip as cancelled. You can delete it later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Go Back</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancel}>Cancel Trip</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
