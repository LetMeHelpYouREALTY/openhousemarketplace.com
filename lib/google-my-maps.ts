import {
  getGoogleMapsOfficeEmbedUrl,
  getGoogleMapsServiceAreaEmbedUrl,
} from '@/config/gbp'

/**
 * Legacy custom My Maps ID (returns 404 — do not use as default).
 * Set NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL only when you have a valid embed URL from Google My Maps.
 */
export const LEGACY_GOOGLE_MY_MAPS_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1b94nsahE3WHPXPCBciaB2wU0BPEsMhc&hl=en&ehbc=2E312F'

export type GoogleMapEmbedScope = 'service-area' | 'office'

/**
 * Area map iframe URL. Defaults to Summerlin service-area view (office-centered, zoom 11).
 * Override with NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL for a custom My Maps or Maps embed URL.
 */
export function getGoogleMyMapsEmbedUrl(scope: GoogleMapEmbedScope = 'service-area'): string {
  const raw = process.env.NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL
  if (typeof raw === 'string' && raw.trim() !== '') {
    const url = raw.trim()
    if (!url.includes('/maps/d/embed?mid=1b94nsahE3WHPXPCBciaB2wU0BPEsMhc')) {
      return url
    }
  }
  return scope === 'office' ? getGoogleMapsOfficeEmbedUrl() : getGoogleMapsServiceAreaEmbedUrl()
}

/** @deprecated Use getGoogleMyMapsEmbedUrl — kept for imports */
export const DEFAULT_GOOGLE_MY_MAPS_EMBED_URL = getGoogleMapsServiceAreaEmbedUrl()
