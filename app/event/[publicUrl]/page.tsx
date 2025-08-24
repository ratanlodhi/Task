import { notFound } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RSVPForm } from '@/components/public/rsvp-form'
import { Calendar, MapPin, Users, User } from 'lucide-react'
import { format } from 'date-fns'
import { Metadata } from 'next'

interface Event {
  id: string
  title: string
  description: string | null
  location: string | null
  dateTime: string
  publicUrl: string
  creator: {
    name: string | null
  }
  _count: {
    rsvps: number
  }
}

interface PageProps {
  params: {
    publicUrl: string
  }
}

async function getEvent(publicUrl: string): Promise<Event | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/events/public/${publicUrl}`,
      { 
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        }
      }
    )
    
    if (!response.ok) {
      return null
    }
    
    return response.json()
  } catch (error) {
    console.error('Error fetching event:', error)
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = await getEvent(params.publicUrl)

  if (!event) {
    return {
      title: 'Event Not Found - EventEase',
    }
  }

  return {
    title: `${event.title} - EventEase`,
    description: event.description || `Join us for ${event.title}`,
  }
}

export default async function PublicEventPage({ params }: PageProps) {
  const event = await getEvent(params.publicUrl)

  if (!event) {
    notFound()
  }

  const isPastEvent = new Date(event.dateTime) < new Date()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Event Details */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Badge variant={isPastEvent ? 'secondary' : 'default'} className="text-sm">
                  {isPastEvent ? 'Past Event' : 'Upcoming Event'}
                </Badge>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                {event.title}
              </CardTitle>
              {event.description && (
                <CardDescription className="text-lg max-w-2xl mx-auto">
                  {event.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Event Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(event.dateTime), 'PPP p')}
                    </p>
                  </div>
                </div>

                {event.location && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">
                        {event.location}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-medium">Attendees</p>
                    <p className="text-sm text-muted-foreground">
                      {event._count.rsvps} people have RSVP'd
                    </p>
                  </div>
                </div>

                {event.creator.name && (
                  <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">Organized by</p>
                      <p className="text-sm text-muted-foreground">
                        {event.creator.name}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* RSVP Form */}
          {!isPastEvent && (
            <div className="mb-8">
              <RSVPForm eventId={event.id} />
            </div>
          )}

          {isPastEvent && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-lg text-muted-foreground">
                  This event has already taken place.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}