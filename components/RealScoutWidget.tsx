'use client'

import { useLayoutEffect, useRef, type FC } from 'react'
import {
  REALSCOUT_OFFICE_AGENT_ID,
  REALSCOUT_OFFICE_DEFAULT_LISTING_STATUS,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MAX,
  REALSCOUT_OFFICE_DEFAULT_PRICE_MIN,
  REALSCOUT_OFFICE_DEFAULT_SORT_ORDER,
  REALSCOUT_OFFICE_PROPERTY_TYPES,
} from '@/config/realscout-office-bands'
import { mountRealScoutOfficeListings } from '@/lib/realscout-mount-office-listings'
import { useRealScoutOfficeListingsReady } from '@/lib/realscout-ready'

/**
 * Office listings (`realscout-office-listings`). Script + global styles: root layout.
 * Defaults: PRICE_LOW, For Sale, SFR, $500K–$950K.
 */
interface RealScoutWidgetProps {
  agentEncodedId?: string
  sortOrder?: string
  listingStatus?: string
  propertyTypes?: string
  priceMin?: string
  priceMax?: string
  className?: string
}

const RealScoutWidget: FC<RealScoutWidgetProps> = ({
  agentEncodedId = REALSCOUT_OFFICE_AGENT_ID,
  sortOrder = REALSCOUT_OFFICE_DEFAULT_SORT_ORDER,
  listingStatus = REALSCOUT_OFFICE_DEFAULT_LISTING_STATUS,
  propertyTypes = REALSCOUT_OFFICE_PROPERTY_TYPES,
  priceMin = REALSCOUT_OFFICE_DEFAULT_PRICE_MIN,
  priceMax = REALSCOUT_OFFICE_DEFAULT_PRICE_MAX,
  className = '',
}) => {
  const ready = useRealScoutOfficeListingsReady()
  const hostContainerRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = hostContainerRef.current
    if (!container) return

    if (!ready) {
      container.innerHTML = ''
      return
    }

    mountRealScoutOfficeListings(container, {
      agentEncodedId,
      sortOrder,
      listingStatus,
      propertyTypes,
      priceMin,
      priceMax,
    })

    return () => {
      container.innerHTML = ''
    }
  }, [ready, agentEncodedId, sortOrder, listingStatus, propertyTypes, priceMin, priceMax])

  return (
    <div className={`realScout-widget-container ${className}`}>
      {!ready ? (
        <div className="flex flex-col gap-3 p-4 animate-pulse" aria-busy="true" aria-label="Loading listings">
          <div className="h-8 w-3/4 rounded-lg bg-brand-mint" />
          <div className="h-24 rounded-lg bg-brand-surface" />
          <div className="h-24 rounded-lg bg-brand-surface" />
          <div className="h-24 rounded-lg bg-brand-surface" />
          <p className="text-center text-sm font-medium text-brand-plum">Loading MLS listings…</p>
        </div>
      ) : null}
      <div ref={hostContainerRef} className="min-h-[180px]" />
    </div>
  )
}

export default RealScoutWidget
