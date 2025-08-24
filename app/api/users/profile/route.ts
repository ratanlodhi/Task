import { NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()
    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user profile:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unauthorized'
    return NextResponse.json(
      { 
        error: 'Unauthorized',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 
      { status: 401 }
    )
  }
}