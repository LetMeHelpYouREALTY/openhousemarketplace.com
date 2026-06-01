/**
 * Price bands for `realscout-office-listings` widgets ($500K–$950K).
 * Script loads once in root layout; each widget filters by price-min / price-max.
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
export const REALSCOUT_OFFICE_PROPERTY_TYPES = ',SFR,MF,TC,OTHER'

/** Single `realscout-office-listings` embed (layout + page widgets). */
export const REALSCOUT_OFFICE_DEFAULT_PRICE_MIN = '500000'
export const REALSCOUT_OFFICE_DEFAULT_PRICE_MAX = '950000'
