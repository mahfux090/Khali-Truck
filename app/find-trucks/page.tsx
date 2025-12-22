import { createClient } from "@/lib/supabase/server"
import TripSearchFilters from "@/components/trip-search-filters"
import TripList from "@/components/trip-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface SearchParams {
  from?: string
  to?: string
  truckType?: string
  minCapacity?: string
  date?: string
}

export default async function FindTrucksPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const supabase = await createClient()
  const params = await searchParams

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Build query based on filters
  let query = supabase
    .from("trips")
    .select(
      `
      *,
      profiles:truck_owner_id (
        full_name,
        phone_number,
        company_name
      )
    `,
    )
    .eq("status", "available")
    .order("created_at", { ascending: false })

  if (params.from) {
    query = query.ilike("from_location", `%${params.from}%`)
  }
  if (params.to) {
    query = query.ilike("to_location", `%${params.to}%`)
  }
  if (params.truckType) {
    query = query.eq("truck_type", params.truckType)
  }
  if (params.minCapacity) {
    query = query.gte("capacity_tons", Number.parseFloat(params.minCapacity))
  }
  if (params.date) {
    query = query.gte("available_date", params.date)
  }

  const { data: trips, error } = await query

  if (error) {
    console.error("[v0] Error fetching trips:", error)
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <Link href={user ? "/dashboard" : "/"}>
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {user ? "Back to Dashboard" : "Back to Home"}
          </Button>
        </Link>

        <div className="mb-6">
          <h1 className="text-3xl font-bold">Find Available Trucks</h1>
          <p className="mt-2 text-muted-foreground">Search and filter trucks based on your requirements</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside>
            <TripSearchFilters />
          </aside>

          <main>
            <TripList trips={trips || []} userId={user?.id} />
          </main>
        </div>
      </div>
    </div>
  )
}
