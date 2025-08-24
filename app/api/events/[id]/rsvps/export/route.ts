import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'
import Papa from 'papaparse'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await requireAuth()

    // Check if user owns the event or is admin
    const event = await prisma.event.findUnique({
      where: { id: params.id }
    })

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    if (event.createdBy !== user.id && user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const rsvps = await prisma.rSVP.findMany({
      where: { eventId: params.id },
      select: {
        name: true,
        email: true,
        message: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' }
    })

    const csv = Papa.unparse(rsvps.map(rsvp => ({
      Name: rsvp.name,
      Email: rsvp.email,
      Message: rsvp.message || '',
      'RSVP Date': rsvp.createdAt.toISOString(),
    })))

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${event.title}-rsvps.csv"`,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to export RSVPs' }, { status: 500 })
  }
}