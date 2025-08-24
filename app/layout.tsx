import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { getCurrentUser } from '@/lib/auth'
import { UserRole } from '@prisma/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EventEase - Event Planning and Management Tool',
  description: 'Create, manage, and track events with powerful RSVP management, beautiful public pages, and comprehensive analytics.',
  keywords: 'event management, event planning, RSVP, event organization, event tracking',
}

// Define the User type based on the expected structure
interface User {
  name: string | null;
  id: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let user: User | null = null
  
  try {
    user = await getCurrentUser()
  } catch (error) {
    // User not authenticated or error occurred
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <Navbar user={user} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
