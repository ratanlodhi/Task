'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, MapPin, Users, ExternalLink, Edit, Trash2, Download } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import { Event } from '@prisma/client'

interface EventWithDetails extends Event {
  creator: {
    name: string | null
    email: string
  }
  _count: {
    rsvps: number
  }
}

interface EventCardProps {
  event: EventWithDetails
  onEdit?: (event: EventWithDetails) => void
  onDelete?: (event: EventWithDetails) => void
  onExportRSVPs?: (event: EventWithDetails) => void
  showActions?: boolean
}

export function EventCard({ 
  event, 
  onEdit, 
  onDelete, 
  onExportRSVPs,
  showActions = true 
}: EventCardProps) {
  const publicUrl = `${process.env.NEXT_PUBLIC_APP_URL}/event/${event.publicUrl}`
  const isPastEvent = new Date(event.dateTime) < new Date()

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold line-clamp-2">
              {event.title}
            </CardTitle>
            <CardDescription className="mt-2 line-clamp-3">
              {event.description}
            </CardDescription>
          </div>
          <div className="ml-4 flex flex-col gap-2">
            <Badge variant={isPastEvent ? 'secondary' : 'default'}>
              {isPastEvent ? 'Past' : 'Upcoming'}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {event._count.rsvps}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{format(new Date(event.dateTime), 'PPP p')}</span>
        </div>

        {event.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        )}

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-1">Public Event URL</p>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-background px-2 py-1 rounded flex-1 truncate">
              {publicUrl}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(publicUrl, '_blank')}
            >
              <ExternalLink className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>

      {showActions && (
        <CardFooter className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit?.(event)}
            className="flex items-center gap-2"
          >
            <Edit className="h-3 w-3" />
            Edit
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExportRSVPs?.(event)}
            className="flex items-center gap-2"
            disabled={event._count.rsvps === 0}
          >
            <Download className="h-3 w-3" />
            Export ({event._count.rsvps})
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete?.(event)}
            className="flex items-center gap-2 text-destructive hover:text-destructive-foreground hover:bg-destructive ml-auto"
          >
            <Trash2 className="h-3 w-3" />
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}