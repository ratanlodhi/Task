import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { publicUrl: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: { 
        publicUrl: params.publicUrl,
        isActive: true 
      },
      include: {
        creator: {
          select: { name: true }
        },
        _count: {
          select: { rsvps: true }
        }
      }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 })
  }
}