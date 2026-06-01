/**
 * Mount `realscout-office-listings` with price-min / price-max applied before connect.
 * Uses innerHTML so the parser sets attributes before upgrade; re-applies price attrs after insert.
 */
import {
  REALSCOUT_OFFICE_AGENT_ID,
  REALSCOUT_OFFICE_DEFAULT_LISTING_STATUS,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MAX,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MIN,
  REALSCOUT_OFFICE_DEFAULT_PROPERTY_TYPES,
  REALSCOUT_OFFICE_DEFAULT_SORT_ORDER,
} from '@/config/realscout-office-bands'

const TAG = 'realscout-office-listings'

export type RealScoutOfficeListingsMountOptions = {
  priceMin: string
  priceMax: string
  agentEncodedId?: string
  sortOrder?: string
  listingStatus?: string
  /** Omit or empty to let the API return all residential types in the price band. */
  propertyTypes?: string
}

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
}

export function buildRealScoutOfficeListingsMarkup(
  options: RealScoutOfficeListingsMountOptions
): string {
  const agentEncodedId = options.agentEncodedId ?? REALSCOUT_OFFICE_AGENT_ID
  const sortOrder = options.sortOrder ?? REALSCOUT_OFFICE_DEFAULT_SORT_ORDER
  const listingStatus = options.listingStatus ?? REALSCOUT_OFFICE_DEFAULT_LISTING_STATUS
  const propertyTypes = options.propertyTypes ?? REALSCOUT_OFFICE_DEFAULT_PROPERTY_TYPES
  const priceMin = options.priceMin ?? REALSCOUT_OFFICE_DEFAULT_PRICE_MIN
  const priceMax = options.priceMax ?? REALSCOUT_OFFICE_DEFAULT_PRICE_MAX

  const attrs = [
    `agent-encoded-id="${escapeAttr(agentEncodedId)}"`,
    `sort-order="${escapeAttr(sortOrder)}"`,
    `listing-status="${escapeAttr(listingStatus)}"`,
    `price-min="${escapeAttr(priceMin)}"`,
    `price-max="${escapeAttr(priceMax)}"`,
  ]

  if (propertyTypes.trim().length > 0) {
    attrs.push(`property-types="${escapeAttr(propertyTypes)}"`)
  }

  return `<${TAG} ${attrs.join(' ')}></${TAG}>`
}

/** Mount into container; returns the custom element (or null). */
export function mountRealScoutOfficeListings(
  container: HTMLElement,
  options: RealScoutOfficeListingsMountOptions
): HTMLElement | null {
  container.innerHTML = buildRealScoutOfficeListingsMarkup(options)
  const el = container.querySelector(TAG)
  if (!el) return null

  const priceMin = options.priceMin ?? REALSCOUT_OFFICE_DEFAULT_PRICE_MIN
  const priceMax = options.priceMax ?? REALSCOUT_OFFICE_DEFAULT_PRICE_MAX
  el.setAttribute('price-min', priceMin)
  el.setAttribute('price-max', priceMax)

  el.setAttribute('data-rs-price-min', priceMin)
  el.setAttribute('data-rs-price-max', priceMax)

  return el
}

/** @deprecated Prefer mountRealScoutOfficeListings — kept for tests/callers that append manually. */
export function createRealScoutOfficeListingsElement(
  options: RealScoutOfficeListingsMountOptions
): HTMLElement {
  const host = document.createElement('div')
  const el = mountRealScoutOfficeListings(host, options)
  if (!el) {
    throw new Error('Failed to create realscout-office-listings element')
  }
  return el
}
