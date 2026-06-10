'use client'

import React, { useEffect, useState } from 'react'
import { Search } from 'lucide-react'
import ExternalLink from '@/components/ExternalLink'
import { REALSCOUT_OFFICE_PRICE_RANGE_LABEL } from '@/config/realscout-office-bands'
import { brandAccentBadgeClass } from '@/lib/brand-classes'

export default function RealScoutSearchCard() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)

  useEffect(() => {
    const checkWidget = setInterval(() => {
      if (typeof window !== 'undefined' && window.customElements?.get('realscout-advanced-search')) {
        setIsWidgetLoaded(true)
        clearInterval(checkWidget)
      }
    }, 100)

    const timeout = setTimeout(() => clearInterval(checkWidget), 5000)
    return () => {
      clearInterval(checkWidget)
      clearTimeout(timeout)
    }
  }, [])

  return (
    <div>
      <p className={`${brandAccentBadgeClass} mb-4`}>
        <Search className="h-4 w-4 text-brand-teal" aria-hidden />
        MLS search — start here ({REALSCOUT_OFFICE_PRICE_RANGE_LABEL})
      </p>
      <div className="realscout-search-container conversion-pulse-ring rounded-xl p-1">
        {!isWidgetLoaded && (
          <div className="animate-pulse rounded-lg bg-brand-surface p-4" aria-busy="true" aria-label="Loading MLS search">
            <div className="mb-3 h-12 rounded-lg bg-brand-mint/60" />
            <div className="mb-3 h-12 rounded-lg bg-brand-mint/40" />
            <div className="h-12 rounded-lg bg-brand-teal/30" />
            <p className="mt-3 text-center text-sm font-medium text-brand-plum">Loading search…</p>
          </div>
        )}
        {/* @ts-expect-error - Web component is defined at runtime */}
        <realscout-advanced-search
          agent-encoded-id="QWdlbnQtMjI1MDUw"
          class={isWidgetLoaded ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.35s ease-in-out' } as React.CSSProperties}
        />
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 border-t border-brand-mint pt-5">
        <div className="rounded-lg bg-brand-mint/40 py-3 text-center">
          <div className="text-lg font-bold text-brand-plum sm:text-2xl">6+</div>
          <div className="text-xs font-medium text-gray-600">Open houses</div>
        </div>
        <div className="rounded-lg bg-brand-mint/40 py-3 text-center">
          <div className="text-lg font-bold text-brand-plum sm:text-2xl">Fast</div>
          <div className="text-xs font-medium text-gray-600">MLS alerts</div>
        </div>
        <div className="rounded-lg bg-brand-mint/40 py-3 text-center">
          <div className="text-lg font-bold text-brand-plum sm:text-2xl">Free</div>
          <div className="text-xs font-medium text-gray-600">Save searches</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <ExternalLink
          href="https://drjanduffy.realscout.com"
          className="inline-flex min-h-[44px] items-center justify-center text-sm font-bold text-brand-teal hover:text-brand-plum"
          showIcon={false}
        >
          More filters on RealScout →
        </ExternalLink>
      </div>
    </div>
  )
}
