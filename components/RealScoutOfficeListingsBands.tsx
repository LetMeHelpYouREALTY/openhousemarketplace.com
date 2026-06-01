'use client'

import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import RealScoutWidget from '@/components/RealScoutWidget'
import RealScoutWidgetFrame from '@/components/conversion/RealScoutWidgetFrame'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { brandLinkClass, brandSectionSurfaceClass } from '@/lib/brand-classes'

/**
 * Site-wide office MLS grid — high-visibility conversion block above footer.
 */
export default function RealScoutOfficeListingsBands() {
  return (
    <section
      id="office-listings-bands"
      className={`scroll-mt-24 ${brandSectionSurfaceClass} py-12 sm:py-16`}
      aria-labelledby="realscout-office-bands-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-teal">
            Live MLS · Updated continuously
          </p>
          <h2
            id="realscout-office-bands-heading"
            className="text-2xl font-bold text-brand-plum sm:text-3xl lg:text-4xl"
          >
            Search Summerlin homes for sale
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600 text-base sm:text-lg">
            Tap a listing to view photos and details, save favorites, and request showings. Dr. Jan Duffy&apos;s
            office inventory ($400K–$900K) is sorted below — use filters on the{' '}
            <Link href="/tour/mls" className={brandLinkClass}>
              full MLS search page
            </Link>
            .
          </p>
          <div className="mt-6">
            <PrimaryCtaButtons layout="row" calendlyLabel="Schedule a showing" mlsLabel="Open advanced MLS search" />
          </div>
        </div>

        <RealScoutWidgetFrame
          id="office-listings-widget"
          stepLabel="Step 2 — Browse listings"
          title="Office MLS listings"
          description="Scroll the grid, open any home, then book a private tour with one click."
        >
          <RealScoutWidget className="min-h-[280px]" />
        </RealScoutWidgetFrame>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-gray-500">
          <Home className="h-4 w-4 text-brand-teal" aria-hidden />
          Listings powered by RealScout ·{' '}
          <Search className="h-4 w-4 text-brand-teal" aria-hidden />
          Prefer map search?{' '}
          <Link href="/open-houses" className="font-semibold text-brand-teal hover:text-brand-plum">
            Weekend open houses
          </Link>
        </p>
      </div>
    </section>
  )
}
