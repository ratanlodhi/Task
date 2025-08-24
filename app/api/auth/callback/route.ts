import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)

    if (session?.user) {
      // Create or update user in our database
      await prisma.user.upsert({
        where: { id: session.user.id },
        update: {
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
        },
        create: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email!.split('@')[0],
          role: 'EVENT_OWNER',
        },
      })
    }
  }

  return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
}