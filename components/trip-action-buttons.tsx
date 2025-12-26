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

export default function TripActionButtons({
  tripId,
  status,
}: TripActionButtonsProps) {
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

  // Do not show actions for booked/completed trips
  if (status === "booked" || status === "completed") {
    return null
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-2">
        {status === "available" && (
          <Button
            size="sm"
            disabled={isLoading}
            onClick={() => setShowCancelDialog(true)}
            className="border border-black/20 bg-white text-black hover:bg-orange-50"
          >
            <XCircle className="mr-1 h-4 w-4" />
            Cancel
          </Button>
        )}

        <Button
          size="sm"
          disabled={isLoading}
          onClick={() => setShowDeleteDialog(true)}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <Trash2 className="mr-1 h-4 w-4" />
          Delete
        </Button>
      </div>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="border-black/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">
              Delete Trip?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black/60">
              This will permanently delete this trip posting. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border border-black/20 text-black hover:bg-black/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Delete Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Cancel Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="border-black/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">
              Cancel Trip?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black/60">
              This will mark the trip as cancelled. You can delete it later
              if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="border border-black/20 text-black hover:bg-black/5">
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancel}
              className="bg-black text-white hover:bg-black/90"
            >
              Cancel Trip
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
