import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import ShipperDashboard from "@/components/shipper-dashboard"
import TruckOwnerDashboard from "@/components/truck-owner-dashboard"
import DashboardHeader from "@/components/dashboard-header"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-muted">
      <DashboardHeader profile={profile} userEmail={user.email || ""} />

      <main className="container mx-auto px-4 py-8">
        {profile.user_type === "shipper" ? (
          <ShipperDashboard userId={user.id} profile={profile} />
        ) : (
          <TruckOwnerDashboard userId={user.id} profile={profile} />
        )}
      </main>
    </div>
  )
}
