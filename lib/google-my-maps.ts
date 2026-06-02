import { getSiteMapEmbedUrl, type SiteMapEmbedScope } from '@/lib/site-map-embed'

/**
 * Legacy custom My Maps ID (returns 404 — do not use as default).
 * Set NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL only when you have a valid embed URL from Google.
 */
export const LEGACY_GOOGLE_MY_MAPS_EMBED_URL =
  'https://www.google.com/maps/d/embed?mid=1b94nsahE3WHPXPCBciaB2wU0BPEsMhc&hl=en&ehbc=2E312F'

export type GoogleMapEmbedScope = SiteMapEmbedScope

/**
 * Site map iframe URL (OpenStreetMap by default; optional Google Embed API or custom URL).
 */
export function getGoogleMyMapsEmbedUrl(scope: GoogleMapEmbedScope = 'service-area'): string {
  return getSiteMapEmbedUrl(scope)
}

/** @deprecated Use getGoogleMyMapsEmbedUrl */
export const DEFAULT_GOOGLE_MY_MAPS_EMBED_URL = getSiteMapEmbedUrl('service-area')
