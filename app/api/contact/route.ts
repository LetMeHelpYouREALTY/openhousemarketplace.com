import { NextResponse } from 'next/server'
import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'
import { GBP } from '@/config/gbp'

/** Public contact forms are disabled; scheduling uses Calendly only. */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Contact forms are not available. Schedule online or email us directly.',
      scheduleUrl: CALENDLY_OPEN_HOUSE_TOUR_URL,
      email: GBP.email,
    },
    { status: 410 }
  )
}
