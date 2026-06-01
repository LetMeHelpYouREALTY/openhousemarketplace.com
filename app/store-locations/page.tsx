import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import { GBP } from '@/config/gbp'
import { storeLocations } from '@/data/storeLocations'
import StoreLocationsMap from '@/components/StoreLocationsMap'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import GoogleMyMapsSection from '@/components/GoogleMyMapsSection'
import StructuredData from '@/components/StructuredData'
import MarketingHero from '@/components/conversion/MarketingHero'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'

export const metadata: Metadata = {
  title: 'Office Location & Map | Summerlin Open Houses | Dr. Jan Duffy',
  description:
    'Visit Open House Market Place in Summerlin West. See our office on the map, get directions, call (702) 200-3422, and view hours before your open house tour.',
  keywords:
    'Summerlin real estate office, open house tours Las Vegas, office location map, Dr. Jan Duffy, 760 Windover Ct, 89138',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: `${BASE_URL}/store-locations`,
  },
  openGraph: {
    title: 'Office Location & Map | Summerlin Open Houses',
    description:
      'Find our Summerlin office on the map. Directions, phone, and hours for open house tours with Dr. Jan Duffy.',
    url: `${BASE_URL}/store-locations`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
}

export default function StoreLocationsPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Office Location & Map | Open House Market Place | Dr. Jan Duffy',
          description:
            'Map and contact details for our Summerlin West office. Plan your visit for open house tours and private showings.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'Office & map', url: `${BASE_URL}/store-locations` },
          ],
        }}
      />

      <MarketingHero
        title="Visit our Summerlin office"
        description={`${GBP.name} is your hub for open houses and private showings in Summerlin West and Las Vegas. Use the map for directions, call ${GBP.phone}, or book a tour below.`}
        showCtas={false}
      />

      <main className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-brand-teal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium" aria-current="page">
                Office &amp; map
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <p className="text-lg text-gray-600 max-w-3xl">
              Use the map and office details below to plan your visit. Get driving directions, confirm
              business hours, and reach Dr. Jan Duffy before your next open house or private showing in
              Summerlin and the Las Vegas valley.
            </p>
            <div className="mt-6">
              <PrimaryCtaButtons
                calendlyLabel="Book an open house tour"
                mlsLabel="Browse open houses"
              />
            </div>
          </header>

          <div className="mb-10 md:mb-12">
            <GoogleMyMapsSection
              heading="Open houses & neighborhoods we serve"
              description="See Summerlin West, our service area, and how open house tours fit across the Las Vegas valley."
              id="stores-my-maps-heading"
            />
          </div>

          <section aria-label="Office location map and contact details">
            <StoreLocationsMap locations={storeLocations} />
          </section>

          <section
            className="mt-12 py-12 bg-gray-50 rounded-xl border border-gray-200"
            aria-labelledby="schedule-visit-heading"
          >
            <h2 id="schedule-visit-heading" className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
              Schedule your open house tour
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Pick a time with Dr. Jan Duffy for a private showing or open house walk-through at a home
              you love in Summerlin.
            </p>
            <div className="max-w-2xl mx-auto">
              <CalendlyInlineWidget
                url="https://calendly.com/drjanduffy/open-house-tour"
                minWidth={320}
                height={700}
                className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm"
              />
            </div>
          </section>

          <div className="mt-8 p-4 bg-brand-mint/40 rounded-lg border border-brand-mint">
            <p className="text-sm text-gray-700">
              <strong>Planning your trip?</strong>{' '}
              <Link href="/directions" className="text-brand-teal font-medium hover:underline">
                Get turn-by-turn directions
              </Link>
              , explore{' '}
              <Link href="/open-houses" className="text-brand-teal font-medium hover:underline">
                this week&apos;s open houses
              </Link>
              , or{' '}
              <Link href="/contact" className="text-brand-teal font-medium hover:underline">
                contact us
              </Link>{' '}
              with questions about listings in 89135, 89138, and 89144.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
