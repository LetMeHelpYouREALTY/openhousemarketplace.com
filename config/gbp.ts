/**
 * Google Business Profile (GBP) – single source of truth for this site.
 * The website supports the GBP; NAP, hours, and description must match the profile.
 * Profile: https://share.google/Jgb4vGEoabNywBkJW (or set NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL).
 *
 * GBP snapshot (keep in sync when the profile changes):
 * - Name: Open House Market Place | Category: Real estate agent
 * - Phone: (702) 200-3422 | Chat/SMS: sms:+17022003422
 * - Website (GBP field): use **https://www.openhousemarketplace.com/** (canonical). If the profile still shows apex, update it in Google so it matches this site’s indexed URL.
 * - Address: 760 Windover Ct, Las Vegas, NV 89138
 * - Hours: daily 9:00 AM–5:00 PM. If Wednesday shows 5:00 AM in GBP, fix to 5:00 PM in Google Business Profile.
 * - Special: Apr 5, 2026 (Easter) — Closed
 * - Service area: add in GBP when defined; meanwhile site uses GBP_SERVICE_AREA for visible + schema
 */

import { getSiteUrl } from '@/lib/site'

/** Canonical public site URL (same as GBP “Website” when the profile uses www). */
export const GBP_WEBSITE_FIELD_URL = `${getSiteUrl()}/`

/** Official Facebook Page (business profile). */
export const FACEBOOK_PAGE_URL = 'https://www.facebook.com/OpenHouseMarketPlace' as const

/** GBP share link documented on the profile (override with NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL in Vercel). */
export const GBP_PROFILE_SHARE_URL = 'https://share.google/Jgb4vGEoabNywBkJW' as const

/** Resolved GBP URL for maps, reviews, and schema `sameAs`. */
export function getGoogleBusinessProfileUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL
  if (typeof fromEnv === 'string' && fromEnv.trim().length > 0) {
    return fromEnv.trim()
  }
  return GBP_PROFILE_SHARE_URL
}

/** GBP + official social profiles for JSON-LD `sameAs`. */
export function getBusinessSameAsUrls(): string[] {
  return [getGoogleBusinessProfileUrl(), FACEBOOK_PAGE_URL]
}

/** Optional aggregateRating from env (set when synced from GBP; omit from schema when unset). */
export function getGbpAggregateRating():
  | { ratingValue: string; reviewCount: string }
  | undefined {
  const ratingValue = process.env.NEXT_PUBLIC_GBP_RATING?.trim()
  const reviewCount = process.env.NEXT_PUBLIC_GBP_REVIEW_COUNT?.trim()
  if (!ratingValue || !reviewCount) return undefined
  return { ratingValue, reviewCount }
}

/** Geocode for 760 Windover Ct (office pin; matches NAP). */
export const OFFICE_GEO = { lat: 36.19100705245607, lng: -115.36619992711324 } as const

/**
 * Hyperlocal service area — visible copy + schema. Mirror GBP → “Service area” when you configure it there.
 */
export const GBP_SERVICE_AREA = {
  label:
    'Summerlin West and Summerlin; Las Vegas zip codes 89135, 89138, and 89144; greater Las Vegas Valley including Henderson and North Las Vegas.',
  zipCodes: ['89135', '89138', '89144'] as const,
} as const

export const GBP = {
  /** Business name (exact match to GBP) */
  name: 'Open House Market Place',
  /** Category on GBP */
  category: 'Real estate agent',
  /** Full address (exact match to GBP) */
  address: {
    street: '760 Windover Ct',
    locality: 'Las Vegas',
    region: 'NV',
    postalCode: '89138',
    country: 'US',
  },
  /** Main phone (exact match to GBP) */
  phone: '(702) 200-3422',
  /** E.164 for tel: and schema */
  phoneE164: '+17022003422',
  /** SMS/Chat from GBP */
  sms: 'sms:+17022003422',
  email: 'DrJanSells@OpenHouseMarketplace.com',
  /** Public site URL for schema (use getSiteUrl() = canonical, typically https://www.openhousemarketplace.com) */
  website: `${getSiteUrl()}/`,
  /**
   * Business hours from GBP: 9:00 AM–5:00 PM every day (Sun–Sat).
   * If Wednesday incorrectly shows 5:00 AM in GBP, correct it in Google to 5:00 PM.
   */
  hours: {
    /** Schema.org openingHours string (compact) */
    schemaCompact: 'Mo-Su 09:00-17:00',
    /** For StructuredData openingHours array */
    schemaArray: ['Mo-Su 09:00-17:00'],
    /** openingHoursSpecification (all days 9–5) */
    specification: [
      { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '09:00', closes: '17:00' },
    ],
  },
  /**
   * Dates the business is fully closed (from GBP special hours). Remove past dates periodically.
   * Reflected in JSON-LD specialOpeningHoursSpecification.
   */
  specialHoursClosed: [{ date: '2026-04-05', label: 'Easter' }] as const,
  /** GBP description (for schema description / about) — add in GBP when ready; site uses this for schema meanwhile */
  description:
    'Open House Market Place is a full-service real estate brokerage committed to helping clients navigate the dynamic Las Vegas housing market. Specializing in residential properties, they offer expert guidance for those looking to buy, sell, or invest. Their experienced agents provide personalized service, leveraging deep local knowledge and market insights to ensure successful transactions. Located in the heart of Las Vegas, Open House Market Place is dedicated to making every real estate journey smooth and rewarding.',
} as const

export type GBPConfig = typeof GBP

/** Google Maps directions to the office address (encoded). */
export function getGoogleMapsDirectionsUrlToOffice(): string {
  return getGoogleMapsDirectionsUrlFromOrigin('', getOfficeAddressQuery(), 'driving')
}

export type GoogleMapsTravelMode = 'driving' | 'walking' | 'bicycling' | 'transit'

/**
 * Turn-by-turn directions in Google Maps (no JavaScript API key).
 * Empty origin opens Maps with destination only.
 */
export function getGoogleMapsDirectionsUrlFromOrigin(
  origin: string,
  destination: string = getOfficeAddressQuery(),
  travelMode: GoogleMapsTravelMode = 'driving'
): string {
  const params = new URLSearchParams({ api: '1', destination })
  const trimmedOrigin = origin.trim()
  if (trimmedOrigin) params.set('origin', trimmedOrigin)
  if (travelMode !== 'driving') params.set('travelmode', travelMode)
  return `https://www.google.com/maps/dir/?${params.toString()}`
}

/** Search nearby places in Google Maps (no Places API). */
export function getGoogleMapsNearbySearchUrl(placeQuery: string, near = getOfficeAddressQuery()): string {
  const q = `${placeQuery} near ${near}`
  return `https://www.google.com/maps/search/${encodeURIComponent(q)}`
}

/** Full formatted office address for map queries (NAP). */
export function getOfficeAddressQuery(): string {
  return `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`
}

/** Default center for service-area / neighborhood map embeds (office pin). */
export const SERVICE_AREA_MAP_CENTER = OFFICE_GEO

/** Zoom for Summerlin-wide context on area maps. */
export const SERVICE_AREA_MAP_ZOOM = 11

/** Open the service area in Google Maps (new tab). */
export function getGoogleMapsSummerlinSearchUrl(): string {
  return 'https://www.google.com/maps/search/Summerlin,+Las+Vegas,+NV+89138'
}

/**
 * iframe embed for the office (no Maps JavaScript API key required).
 */
export function getGoogleMapsOfficeEmbedUrl(): string {
  const q = encodeURIComponent(getOfficeAddressQuery())
  return `https://maps.google.com/maps?q=${q}&hl=en&z=15&output=embed`
}

/** iframe embed centered on coordinates (no API key). */
export function getGoogleMapsEmbedUrlForCoords(lat: number, lng: number, zoom = 14): string {
  return `https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=${zoom}&output=embed`
}

/** Summerlin / service-area map for site-wide “area overview” sections. */
export function getGoogleMapsServiceAreaEmbedUrl(): string {
  return getGoogleMapsEmbedUrlForCoords(
    SERVICE_AREA_MAP_CENTER.lat,
    SERVICE_AREA_MAP_CENTER.lng,
    SERVICE_AREA_MAP_ZOOM
  )
}

/**
 * JSON-LD `areaServed` list for LocalBusiness / RealEstateAgent (aligns with site footer + zip routes).
 */
export function getAreaServedJsonLd(): Record<string, unknown>[] {
  return [
    {
      '@type': 'City',
      name: 'Las Vegas',
      containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' },
    },
    { '@type': 'AdministrativeArea', name: 'Summerlin' },
    { '@type': 'AdministrativeArea', name: 'Summerlin West' },
    { '@type': 'City', name: 'Henderson', containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' } },
    { '@type': 'City', name: 'North Las Vegas', containedInPlace: { '@type': 'State', name: 'Nevada', addressCountry: 'US' } },
  ]
}
