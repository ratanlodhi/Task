import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Users, 
  Share2, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle 
} from 'lucide-react'

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Event Creation',
      description: 'Create beautiful events with all the details your attendees need to know.',
    },
    {
      icon: Users,
      title: 'RSVP Management',
      description: 'Track attendees and manage RSVPs with automated confirmations.',
    },
    {
      icon: Share2,
      title: 'Public Event Pages',
      description: 'Generate shareable public URLs for each event with custom branding.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Get detailed analytics on event performance and attendee engagement.',
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Secure access control with Admin, Staff, and Event Owner roles.',
    },
    {
      icon: Zap,
      title: 'Export & Integration',
      description: 'Export attendee lists to CSV and integrate with your favorite tools.',
    },
  ]

  const benefits = [
    'Free to get started',
    'Unlimited events',
    'Real-time RSVP tracking',
    'Mobile-responsive design',
    'Secure data handling',
    'Professional event pages',
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-background to-muted/30">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge variant="outline" className="mb-4">
            ✨ The complete event management solution
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Organize Amazing Events
            <br />
            <span className="text-primary">Effortlessly</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            EventEase helps you create, manage, and track events with powerful RSVP management, 
            beautiful public event pages, and comprehensive analytics. Perfect for businesses, 
            organizations, and personal events.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="/login">Sign In</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to manage events
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From creation to completion, EventEase provides all the tools you need 
              to organize successful events and engage your attendees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to create your first event?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of event organizers who trust EventEase to manage their events.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link href="/register">
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-8">
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}