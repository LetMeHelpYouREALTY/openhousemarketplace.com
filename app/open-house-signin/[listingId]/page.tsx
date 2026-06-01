import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import { GBP } from '@/config/gbp'

const LISTING_PREFIX = 'oh-signin:listing:'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ listingId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { listingId } = await params
  return {
    title: 'Schedule a Tour | Open House | Dr. Jan Duffy',
    description: 'Schedule a private tour with Dr. Jan Duffy at this Summerlin open house. Book online—no form required.',
    robots: { index: false, follow: true },
    alternates: { canonical: `${BASE_URL}/open-house-signin/${listingId}` },
    openGraph: {
      title: 'Schedule a Tour | Open House | Dr. Jan Duffy',
      description: 'Schedule a private tour with Dr. Jan Duffy. Summerlin real estate.',
      url: `${BASE_URL}/open-house-signin/${listingId}`,
      images: [DEFAULT_OG_IMAGE_PATHS[0]],
    },
  }
}

export default async function OpenHouseSignInPage({ params }: Props) {
  const { listingId } = await params
  let listingAddress: string | undefined
  if (process.env.KV_REST_API_URL) {
    try {
      const { kv } = await import('@vercel/kv')
      const meta = await kv.get<{ listingAddress?: string }>(`${LISTING_PREFIX}${listingId}`)
      listingAddress = meta?.listingAddress
    } catch {
      listingAddress = undefined
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {listingAddress ? listingAddress : 'Open House'}
          </h1>
          <p className="text-gray-600 mt-1">
            Schedule a private tour with Dr. Jan Duffy—pick a time below.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Dr. Jan Duffy · Berkshire Hathaway HomeServices Nevada Properties
          </p>
          <p className="text-sm text-gray-600 mt-3">
            <a href={`mailto:${GBP.email}`} className="text-blue-600 hover:underline font-medium">
              {GBP.email}
            </a>
            {' · '}
            <a href={`tel:${GBP.phoneE164}`} className="text-blue-600 hover:underline">
              {GBP.phone}
            </a>
          </p>
          <CalendlyPopupLink className="inline-block mt-4 bg-[#0069ff] hover:bg-[#0052cc] text-white px-6 py-3 rounded-xl font-semibold transition-colors">
            Schedule a private showing
          </CalendlyPopupLink>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <CalendlyInlineWidget
            minWidth={320}
            height={700}
            className="rounded-lg overflow-hidden w-full"
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Visiting an open house today? Ask the listing agent for the visitor log at the door, or book a follow-up
          tour above.
        </p>
      </main>
    </div>
  )
}
