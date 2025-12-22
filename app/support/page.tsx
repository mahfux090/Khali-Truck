import { SupportForm } from "@/components/support-form"
import { MessageSquare, Mail, Phone } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="mb-2 text-3xl font-bold">Support & Complaints</h1>
            <p className="text-muted-foreground">
              We're here to help. Submit your complaint or support request and we'll get back to you soon.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6 lg:col-span-1">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-4 text-lg font-semibold">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@khalitruck.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">+880 1XXX-XXXXXX</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border bg-card p-6">
                <h3 className="mb-2 text-sm font-semibold">Response Time</h3>
                <p className="text-sm text-muted-foreground">
                  We typically respond within 24-48 hours during business days.
                </p>
              </div>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-2">
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-6 text-lg font-semibold">Submit a Request</h2>
                <SupportForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
