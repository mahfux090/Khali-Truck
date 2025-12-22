import { redirect } from "next/navigation"
import { createServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import TruckList from "@/components/truck-list"

export default async function TrucksPage() {
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

  // Get user's trucks
  const { data: trucks } = await supabase
    .from("trucks")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Trucks</h1>
          <p className="text-muted-foreground">Manage your truck fleet</p>
        </div>
        <Link href="/trucks/add">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Add Truck
          </Button>
        </Link>
      </div>

      <TruckList trucks={trucks || []} />
    </div>
  )
}
