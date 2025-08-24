'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { EventCard } from '@/components/dashboard/event-card'
import { CreateEventDialog } from '@/components/dashboard/create-event-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Plus, Calendar, Users, TrendingUp } from 'lucide-react'
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

interface User {
  id: string
  email: string
  name: string | null
  role: 'ADMIN' | 'STAFF' | 'EVENT_OWNER'
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [events, setEvents] = useState<EventWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    loadUserAndEvents()
  }, [])

  const loadUserAndEvents = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        window.location.href = '/login'
        return
      }

      // Get user profile
      const userResponse = await fetch('/api/users/profile')
      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData)
      }

      // Load events
      await loadEvents()
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const loadEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (!response.ok) {
        throw new Error('Failed to load events')
      }
      const eventsData = await response.json()
      setEvents(eventsData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleEditEvent = (event: EventWithDetails) => {
    // TODO: Implement edit functionality
    console.log('Edit event:', event)
  }

  const handleDeleteEvent = async (event: EventWithDetails) => {
    if (!confirm(`Are you sure you want to delete "${event.title}"?`)) return

    try {
      const response = await fetch(`/api/events/${event.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete event')
      }

      await loadEvents()
    } catch (error: any) {
      setError(error.message)
    }
  }

  const handleExportRSVPs = async (event: EventWithDetails) => {
    try {
      const response = await fetch(`/api/events/${event.id}/rsvps/export`)
      if (!response.ok) {
        throw new Error('Failed to export RSVPs')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = `${event.title}-rsvps.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error: any) {
      setError(error.message)
    }
  }

  const stats = {
    totalEvents: events.length,
    totalRSVPs: events.reduce((sum, event) => sum + event._count.rsvps, 0),
    upcomingEvents: events.filter(event => new Date(event.dateTime) > new Date()).length,
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back, {user?.name}! Manage your events and track RSVPs.
          </p>
        </div>
        <Button 
          onClick={() => setCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <p className="text-xs text-muted-foreground">
              {stats.upcomingEvents} upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total RSVPs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRSVPs}</div>
            <p className="text-xs text-muted-foreground">
              Across all events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg RSVPs/Event</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalEvents > 0 ? Math.round(stats.totalRSVPs / stats.totalEvents) : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Per event
            </p>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Events List */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Events</h2>
        {events.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No events yet</h3>
              <p className="text-muted-foreground mb-4">
                Get started by creating your first event.
              </p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Event
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
                onExportRSVPs={handleExportRSVPs}
              />
            ))}
          </div>
        )}
      </div>

      <CreateEventDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onEventCreated={loadEvents}
      />
    </div>
  )
}