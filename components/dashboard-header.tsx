"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Truck, User, LogOut } from "lucide-react"
import Link from "next/link"
import type { Profile } from "@/lib/types"

interface DashboardHeaderProps {
  profile: Profile
  userEmail: string
}

export default function DashboardHeader({
  profile,
  userEmail,
}: DashboardHeaderProps) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <Truck className="h-8 w-8 text-black" />
          <h1 className="text-xl font-bold text-black">Khali Truck</h1>
        </Link>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="gap-2 border border-black/20 bg-white text-black hover:bg-black/5"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {profile.full_name}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-56 border-black/10"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium text-black">
                    {profile.full_name}
                  </p>
                  <p className="text-xs text-black/60">
                    {userEmail}
                  </p>
                  <p className="text-xs capitalize text-black/60">
                    {profile.user_type.replace("_", " ")}
                  </p>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="cursor-pointer text-black hover:bg-orange-50 focus:bg-orange-50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                {isLoggingOut ? "Logging out..." : "Logout"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
