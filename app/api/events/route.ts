import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const user = await requireAuth()
    
    const events = await prisma.event.findMany({
      where: user.role === 'ADMIN' ? {} : { createdBy: user.id },
      include: {
        creator: {
          select: { name: true, email: true }
        },
        _count: {
          select: { rsvps: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching events:', error)
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

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        dateTime: new Date(body.dateTime),
        createdBy: user.id,
      },
      include: {
        creator: {
          select: { name: true, email: true }
        },
        _count: {
          select: { rsvps: true }
        }
      }
    })

    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error('Error creating event:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return NextResponse.json(
      { 
        error: 'Failed to create event',
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined
      }, 
      { status: 500 }
    )
  }
}
