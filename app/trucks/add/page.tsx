import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import AddTruckForm from "@/components/add-truck-form"

export default async function AddTruckPage() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.user_type !== "truck_owner") {
    redirect("/dashboard")
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Add New Truck</h1>
        <p className="text-muted-foreground">Register a new truck to your fleet</p>
      </div>

      <AddTruckForm userId={user.id} />
    </div>
  )
}
