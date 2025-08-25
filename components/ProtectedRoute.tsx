"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabaseSession } from "@/lib/supabase/useSupabaseSession"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session } = useSupabaseSession()
  const router = useRouter()

  useEffect(() => {
    if (session === null) {
      // No session, redirect to login
      router.replace("/login")
    }
  }, [session, router])

  // While session is being checked, show nothing or a loader
  if (session === null) {
    return <p className="text-center mt-10">Redirecting to login...</p>
  }

  // If session exists, render the protected content
  return <>{children}</>
}
