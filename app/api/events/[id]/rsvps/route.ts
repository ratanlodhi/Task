import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const rsvps = await prisma.rSVP.findMany({
      where: { eventId: params.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(rsvps)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch RSVPs' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    // Create RSVP
    const rsvp = await prisma.rSVP.create({
      data: {
        name: body.name,
        email: body.email,
        message: body.message,
        eventId: params.id,
      }
    })

    return NextResponse.json(rsvp, { status: 201 })
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'You have already RSVP\'d to this event' }, { status: 409 })
    }
    return NextResponse.json({ error: 'Failed to create RSVP' }, { status: 500 })
  }
}