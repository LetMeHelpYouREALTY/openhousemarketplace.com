'use client'

import ExternalLink from '@/components/ExternalLink'
import {
  getGoogleMapsDirectionsUrlToOffice,
  getGoogleMapsSummerlinSearchUrl,
} from '@/config/gbp'
import { getGoogleMyMapsEmbedUrl, type GoogleMapEmbedScope } from '@/lib/google-my-maps'

type GoogleMyMapsEmbedProps = {
  /** Accessible name for the embedded map frame */
  title?: string
  className?: string
  /** service-area = Summerlin context (default); office = 760 Windover Ct pin */
  mapScope?: GoogleMapEmbedScope
}

/**
 * Responsive Google Maps iframe (maps.google.com output=embed).
 * Replaces broken legacy My Maps `mid=` embed that returned 404.
 */
export default function GoogleMyMapsEmbed({
  title = 'Summerlin and Las Vegas area map — Open House Market Place',
  className = '',
  mapScope = 'service-area',
}: GoogleMyMapsEmbedProps) {
  const src = getGoogleMyMapsEmbedUrl(mapScope)
  const openInMapsUrl =
    mapScope === 'office' ? getGoogleMapsDirectionsUrlToOffice() : getGoogleMapsSummerlinSearchUrl()

  return (
    <div className={className}>
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-brand-mint bg-brand-surface shadow-sm`}
      >
        <div className="relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[400px] md:min-h-[480px]">
          <iframe
            src={src}
            className="absolute inset-0 h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
          />
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-gray-600">
        <ExternalLink
          href={openInMapsUrl}
          className="font-semibold text-brand-teal hover:text-brand-plum"
          ariaLabel="Open this map in Google Maps full screen"
          showIcon={false}
        >
          Open full screen in Google Maps
        </ExternalLink>
        {' · '}
        <ExternalLink
          href={getGoogleMapsDirectionsUrlToOffice()}
          className="font-semibold text-brand-teal hover:text-brand-plum"
          ariaLabel="Get directions to the office"
          showIcon={false}
        >
          Directions to office
        </ExternalLink>
      </p>
    </div>
  )
}
