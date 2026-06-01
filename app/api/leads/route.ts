import { NextRequest, NextResponse } from 'next/server'
import followupBossService from '@/lib/followupboss-service'
import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'
import { GBP } from '@/config/gbp'

/** Lead capture forms are disabled; use Calendly for scheduling. */
export async function POST() {
  return NextResponse.json(
    {
      error: 'Lead forms are not available. Schedule online with Calendly.',
      scheduleUrl: CALENDLY_OPEN_HOUSE_TOUR_URL,
      email: GBP.email,
    },
    { status: 410 }
  )
}

interface InteractionData {
  email: string
  propertyId: string
  interactionType: 'view' | 'save' | 'schedule' | 'register'
}

function isValidInteractionData(obj: unknown): obj is InteractionData {
  return (
    !!obj &&
    typeof obj === 'object' &&
    typeof (obj as InteractionData).email === 'string' &&
    typeof (obj as InteractionData).propertyId === 'string' &&
    typeof (obj as InteractionData).interactionType === 'string' &&
    ['view', 'save', 'schedule', 'register'].includes((obj as InteractionData).interactionType)
  )
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json()

    if (!isValidInteractionData(data)) {
      return NextResponse.json({ error: 'Invalid interaction data format' }, { status: 400 })
    }

    const { email, propertyId, interactionType } = data

    await followupBossService.trackPropertyInteraction({
      propertyId,
      type: interactionType,
      timestamp: new Date().toISOString(),
      leadEmail: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking interaction:', error)
    return NextResponse.json({ error: 'Failed to track interaction' }, { status: 500 })
  }
}
