"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"
import { Loader2, CheckCircle } from "lucide-react"

export function SupportForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createBrowserClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      const { error } = await supabase.from("support_tickets").insert({
        user_id: user?.id || null,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message,
        status: "open",
      })

      if (error) throw error

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error("Error submitting support ticket:", error)
      alert("Failed to submit support request. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <CheckCircle className="mb-4 h-16 w-16 text-orange-500" />
        <h3 className="mb-2 text-xl font-semibold text-black">
          Request Submitted!
        </h3>
        <p className="text-black/60">
          Thank you for contacting us. We&apos;ll get back to you within
          24–48 hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name & Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-black">
            Name <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="name"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="Your full name"
            className="border-black/20 focus:border-black focus:ring-black"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-black">
            Email <span className="text-orange-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="your@email.com"
            className="border-black/20 focus:border-black focus:ring-black"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-black">
          Phone (Optional)
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) =>
            setFormData({ ...formData, phone: e.target.value })
          }
          placeholder="+880 1XXX-XXXXXX"
          className="border-black/20 focus:border-black focus:ring-black"
        />
      </div>

      {/* Subject */}
      <div className="space-y-2">
        <Label htmlFor="subject" className="text-black">
          Subject <span className="text-orange-500">*</span>
        </Label>
        <Input
          id="subject"
          required
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          placeholder="Brief description of your issue"
          className="border-black/20 focus:border-black focus:ring-black"
        />
      </div>

      {/* Message */}
      <div className="space-y-2">
        <Label htmlFor="message" className="text-black">
          Message <span className="text-orange-500">*</span>
        </Label>
        <Textarea
          id="message"
          required
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          placeholder="Please describe your issue or complaint in detail..."
          className="border-black/20 focus:border-black focus:ring-black"
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white hover:bg-black/90"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Request"
        )}
      </Button>
    </form>
  )
}
