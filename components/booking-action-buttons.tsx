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

export default function BookingActionButtons({ bookingId }: BookingActionButtonsProps) {
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
      <div className="flex gap-2">
        <Button size="sm" variant="default" onClick={() => setShowAcceptDialog(true)} disabled={isLoading}>
          <Check className="mr-1 h-4 w-4" />
          Accept
        </Button>
        <Button size="sm" variant="destructive" onClick={() => setShowRejectDialog(true)} disabled={isLoading}>
          <X className="mr-1 h-4 w-4" />
          Reject
        </Button>
      </div>

      <AlertDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Accept Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will confirm the booking and mark your trip as booked. The shipper will be notified.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept}>Accept Booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Booking?</AlertDialogTitle>
            <AlertDialogDescription>
              This will cancel the booking request. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleReject}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Reject Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
