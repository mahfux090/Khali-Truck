import { createServerClient } from "@/lib/supabase/server"
import { StatsDisplay } from "@/components/stats-display"

export async function StatsSection() {
  const supabase = await createServerClient()

  const [
    { count: totalUsers },
    { count: totalTrips },
    { count: activeTrips },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("trips").select("*", { count: "exact", head: true }),
    supabase
      .from("trips")
      .select("*", { count: "exact", head: true })
      .eq("status", "available"),
  ])

  const stats = [
    {
      label: "Total Users",
      value: totalUsers || 0,
      icon: "Users",
    },
    {
      label: "Total Trips",
      value: totalTrips || 0,
      icon: "Truck",
    },
    {
      label: "Active Trips",
      value: activeTrips || 0,
      icon: "TrendingUp",
    },
  ]

  return <StatsDisplay stats={stats} />
}
