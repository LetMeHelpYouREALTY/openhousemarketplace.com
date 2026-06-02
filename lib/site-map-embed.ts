import {
  getOfficeAddressQuery,
  OFFICE_GEO,
  SERVICE_AREA_MAP_CENTER,
  SERVICE_AREA_MAP_ZOOM,
} from '@/config/gbp'

/** Broken legacy My Maps ID — never use as default. */
const LEGACY_MY_MAPS_MID = 'mid=1b94nsahE3WHPXPCBciaB2wU0BPEsMhc'

export type SiteMapEmbedScope = 'service-area' | 'office'

/**
 * OpenStreetMap iframe (no API key, no Google billing dialog).
 * Marker at office NAP; wider bbox for service-area context.
 */
export function getOpenStreetMapEmbedUrl(scope: SiteMapEmbedScope = 'service-area'): string {
  const lat = OFFICE_GEO.lat
  const lng = OFFICE_GEO.lng
  const pad = scope === 'office' ? 0.012 : 0.07
  const bbox = `${lng - pad},${lat - pad},${lng + pad},${lat + pad}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
}

/** Google Maps Embed API (requires Maps Embed API enabled + referrer restrictions). */
export function getGoogleMapsEmbedApiPlaceUrl(
  query: string,
  apiKey: string,
  zoom: number
): string {
  const params = new URLSearchParams({
    key: apiKey,
    q: query,
    zoom: String(zoom),
  })
  return `https://www.google.com/maps/embed/v1/place?${params.toString()}`
}

/**
 * iframe src for site maps. Defaults to OpenStreetMap because
 * `maps.google.com/...&output=embed` returns 404 and shows Google's error overlay.
 */
export function getSiteMapEmbedUrl(scope: SiteMapEmbedScope = 'service-area'): string {
  const custom = process.env.NEXT_PUBLIC_GOOGLE_MY_MAPS_EMBED_URL?.trim()
  if (custom && !custom.includes(LEGACY_MY_MAPS_MID)) {
    return custom
  }

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim()
  if (apiKey && process.env.NEXT_PUBLIC_GOOGLE_MAPS_USE_EMBED_API === 'true') {
    const q =
      scope === 'office'
        ? getOfficeAddressQuery()
        : 'Summerlin West, Las Vegas, NV 89138'
    const zoom = scope === 'office' ? 15 : SERVICE_AREA_MAP_ZOOM
    return getGoogleMapsEmbedApiPlaceUrl(q, apiKey, zoom)
  }

  return getOpenStreetMapEmbedUrl(scope)
}

/** @deprecated Use getSiteMapEmbedUrl */
export function getGoogleMapsOfficeEmbedUrl(): string {
  return getSiteMapEmbedUrl('office')
}

/** @deprecated Use getSiteMapEmbedUrl */
export function getGoogleMapsEmbedUrlForCoords(lat: number, lng: number, zoom = 14): string {
  void lat
  void lng
  void zoom
  return getSiteMapEmbedUrl('service-area')
}

/** @deprecated Use getSiteMapEmbedUrl */
export function getGoogleMapsServiceAreaEmbedUrl(): string {
  void SERVICE_AREA_MAP_CENTER
  return getSiteMapEmbedUrl('service-area')
}
