import { createClient } from './supabase/server'
import { prisma } from './prisma'
import { UserRole } from '@prisma/client'

export async function getCurrentUser() {
  const supabase = createClient()
  const { data: { user: authUser } } = await supabase.auth.getUser()
  
  if (!authUser) return null

  const user = await prisma.user.findUnique({
    where: { id: authUser.id }
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error('Unauthorized')
  return user
}

export async function requireRole(allowedRoles: UserRole[]) {
  const user = await requireAuth()
  if (!allowedRoles.includes(user.role)) {
    throw new Error('Insufficient permissions')
  }
  return user
}