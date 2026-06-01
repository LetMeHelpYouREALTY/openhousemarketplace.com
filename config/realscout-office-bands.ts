/**
 * RealScout `realscout-office-listings` defaults ($500K–$950K).
 * Script loads once in root layout; filters use price-min / price-max on the custom element.
 */
export type RealScoutOfficeBand = {
  id: string
  priceMin: string
  priceMax: string
  label: string
}

/** Human-readable range shown in marketing copy (matches widget filters). */
export const REALSCOUT_OFFICE_PRICE_RANGE_LABEL = '$500K–$950K' as const

export const REALSCOUT_OFFICE_LISTINGS_BANDS: readonly RealScoutOfficeBand[] = [
  { id: '500-600', priceMin: '500000', priceMax: '600000', label: '$500K – $600K' },
  { id: '600-700', priceMin: '600000', priceMax: '700000', label: '$600K – $700K' },
  { id: '700-800', priceMin: '700000', priceMax: '800000', label: '$700K – $800K' },
  { id: '800-900', priceMin: '800000', priceMax: '900000', label: '$800K – $900K' },
  { id: '900-950', priceMin: '900000', priceMax: '950000', label: '$900K – $950K' },
] as const

export const REALSCOUT_OFFICE_AGENT_ID = 'QWdlbnQtMjI1MDUw'

/** Single-family only — avoids leading-comma split bug and cheap land/OTHER types. */
export const REALSCOUT_OFFICE_PROPERTY_TYPES = 'SFR'

export const REALSCOUT_OFFICE_DEFAULT_SORT_ORDER = 'PRICE_LOW' as const
export const REALSCOUT_OFFICE_DEFAULT_LISTING_STATUS = 'For Sale' as const

export const REALSCOUT_OFFICE_DEFAULT_PRICE_MIN = '500000'
export const REALSCOUT_OFFICE_DEFAULT_PRICE_MAX = '950000'
