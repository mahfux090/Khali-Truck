"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { acceptBooking, rejectBooking } from "@/app/actions/booking-actions"
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

interface BookingActionButtonsProps {
  bookingId: string
}

export default function BookingActionButtons({
  bookingId,
}: BookingActionButtonsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showAcceptDialog, setShowAcceptDialog] = useState(false)
  const [showRejectDialog, setShowRejectDialog] = useState(false)

  const handleAccept = async () => {
    setIsLoading(true)
    await acceptBooking(bookingId)
    setIsLoading(false)
    setShowAcceptDialog(false)
  }

  const handleReject = async () => {
    setIsLoading(true)
    await rejectBooking(bookingId)
    setIsLoading(false)
    setShowRejectDialog(false)
  }

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          size="sm"
          disabled={isLoading}
          onClick={() => setShowAcceptDialog(true)}
          className="bg-black text-white hover:bg-black/90"
        >
          <Check className="mr-1 h-4 w-4" />
          Accept
        </Button>

        <Button
          size="sm"
          disabled={isLoading}
          onClick={() => setShowRejectDialog(true)}
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <X className="mr-1 h-4 w-4" />
          Reject
        </Button>
      </div>

      {/* Accept Dialog */}
      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent className="border-black/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">
              Accept Booking?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black/60">
              This will confirm the booking and mark your trip as booked. The shipper will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-black/20 text-black hover:bg-black/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleAccept}
              className="bg-black text-white hover:bg-black/90"
            >
              Accept Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent className="border-black/10">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-black">
              Reject Booking?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-black/60">
              This will cancel the booking request. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border border-black/20 text-black hover:bg-black/5">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              Reject Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
