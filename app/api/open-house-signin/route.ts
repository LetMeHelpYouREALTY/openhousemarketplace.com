import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { kv } from '@vercel/kv'
import type { OpenHouseSignIn } from '@/lib/open-house-signin-schema'
import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'
import { GBP } from '@/config/gbp'

const SUBMISSIONS_PREFIX = 'oh-signin:submissions:'
const SUBMISSION_PREFIX = 'oh-signin:submission:'
const ADMIN_COOKIE = 'oh-admin-auth'
const ADMIN_COOKIE_SALT = 'oh-admin-signin'

function getAdminCookieValue(): string | null {
  const password = process.env.OPEN_HOUSE_ADMIN_PASSWORD
  if (!password) return null
  return crypto.createHash('sha256').update(password + ADMIN_COOKIE_SALT).digest('hex')
}

function isAdminAuthenticated(request: NextRequest): boolean {
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value
  const expected = getAdminCookieValue()
  return !!expected && cookie === expected
}

/** Public sign-in forms are disabled; QR pages use Calendly only. */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Online sign-in forms are not available. Schedule a tour with Calendly or ask the agent at the open house.',
      scheduleUrl: CALENDLY_OPEN_HOUSE_TOUR_URL,
      email: GBP.email,
    },
    { status: 410 }
  )
}

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const listingId = request.nextUrl.searchParams.get('listingId')?.trim()
  if (!listingId) {
    return NextResponse.json({ ok: true })
  }
  try {
    const ids = (await kv.lrange<string>(`${SUBMISSIONS_PREFIX}${listingId}`, 0, -1)) ?? []
    const submissions: OpenHouseSignIn[] = []
    for (const id of ids) {
      const record = await kv.get<OpenHouseSignIn>(`${SUBMISSION_PREFIX}${id}`)
      if (record) submissions.push(record)
    }
    return NextResponse.json({ submissions })
  } catch (err) {
    console.error('KV list error:', err)
    return NextResponse.json(
      { error: 'Failed to load submissions' },
      { status: 503 }
    )
  }
}
