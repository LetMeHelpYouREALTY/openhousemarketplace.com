import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import ExternalLink from '@/components/ExternalLink'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import GoogleMyMapsSection from '@/components/GoogleMyMapsSection'
import MarketingHero from '@/components/conversion/MarketingHero'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { CALENDLY_OPEN_HOUSE_TOUR_URL } from '@/lib/calendly'
import { brandCardClass } from '@/lib/brand-classes'

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'Summerlin Neighborhoods | Communities & Areas | Dr. Jan Duffy Real Estate',
  description: 'Explore Summerlin neighborhoods: The Ridges, Red Rock Country Club, Summerlin Centre, Sun City Summerlin, The Trails, Willows, Mesa Ridge, Siena, Regency. Find homes and community info.',
  keywords: 'Summerlin neighborhoods, Summerlin communities, The Ridges, Red Rock Country Club, Summerlin Centre, Sun City Summerlin, Summerlin West real estate',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/neighborhoods`,
  },
  openGraph: {
    title: 'Summerlin Neighborhoods | Communities & Areas',
    description: 'Explore Summerlin neighborhoods and find your perfect community. Homes, schools, amenities, and local expertise.',
    url: `${BASE_URL}/neighborhoods`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
}

const neighborhoods: { slug: string; name: string; shortDescription: string }[] = [
  { slug: 'the-ridges', name: 'The Ridges', shortDescription: 'Luxury homes with mountain and valley views' },
  { slug: 'red-rock-country-club', name: 'Red Rock Country Club', shortDescription: 'Golf course and resort-style living' },
  { slug: 'summerlin-centre', name: 'Summerlin Centre', shortDescription: 'Central Summerlin with Downtown Summerlin' },
  { slug: 'sun-city-summerlin', name: 'Sun City Summerlin', shortDescription: 'Active adult 55+ community' },
  { slug: 'the-trails', name: 'The Trails', shortDescription: 'Family-friendly with parks and trails' },
  { slug: 'willows', name: 'Willows', shortDescription: 'Established community with mature landscaping' },
  { slug: 'mesa-ridge', name: 'Mesa Ridge', shortDescription: 'Newer homes and community amenities' },
  { slug: 'siena', name: 'Siena', shortDescription: 'Tuscan-inspired community with resort amenities' },
  { slug: 'regency', name: 'Regency', shortDescription: 'Convenient location and family-oriented living' },
]

export default function NeighborhoodsIndexPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Summerlin Neighborhoods | Communities & Areas',
          description: 'Explore Summerlin neighborhoods and find your perfect community. Homes, schools, amenities, and local expertise.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'Neighborhoods', url: `${BASE_URL}/neighborhoods` },
          ],
        }}
      />
      <StructuredData
        type="ItemList"
        data={{
          name: 'Summerlin West Neighborhoods',
          description: 'List of Summerlin West neighborhoods and communities with homes for sale.',
          items: neighborhoods.map((n) => ({ name: n.name, url: `/neighborhoods/${n.slug}` })),
        }}
      />
      <MarketingHero
        title="Summerlin neighborhoods"
        description="Explore communities across Summerlin West — then search MLS listings or book a private showing with Dr. Jan Duffy."
        showCtas={false}
      />
      <div className="min-h-screen bg-brand-surface/40">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-10">
            <PrimaryCtaButtons />
          </div>
          <div className={`mb-10 ${brandCardClass}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Office</h2>
            <p className="text-gray-700 mb-4">
              Search all Summerlin listings with Dr. Jan Duffy&apos;s home search. Get alerts for new listings, price drops, and open houses.
            </p>
            <div className="flex flex-wrap gap-3">
              <ExternalLink
                href="https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=="
                className="inline-block bg-brand-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-plum transition-colors"
                showIcon={false}
              >
                Search Listings
              </ExternalLink>
              <Link
                href="/open-houses"
                className="inline-block bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Summerlin open houses this weekend
              </Link>
            </div>
          </div>

          <div className="mb-10 md:mb-12">
            <GoogleMyMapsSection
              heading="Explore neighborhoods on the map"
              description="Pan and zoom across Summerlin West and the Las Vegas valley. Open the map full screen for directions, then browse individual communities below."
              id="neighborhoods-discovery-map-heading"
              mapScope="service-area"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Neighborhoods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.map((n) => (
              <Link
                key={n.slug}
                href={`/neighborhoods/${n.slug}`}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{n.name}</h3>
                <p className="text-gray-600">{n.shortDescription}</p>
                <span className="inline-block mt-3 text-brand-teal font-medium">
                  View homes in {n.name} →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-white border border-gray-200 p-8 shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why work with a Summerlin expert?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dr. Jan Duffy knows every Summerlin neighborhood—schools, HOAs, builders, and market trends. Get personalized guidance to find the right community and home for you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-brand-teal text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-plum transition-colors"
            >
              Contact Dr. Jan Duffy
            </Link>
            <p className="text-sm text-gray-600 mt-4">
              See <Link href="/sitemap" className="text-brand-teal hover:text-brand-plum font-medium">sitemap</Link> for all pages.
            </p>
          </div>

          {/* Schedule a tour - Calendly inline widget */}
          <section className="mt-12 py-12 border-t border-gray-200" aria-labelledby="schedule-tour-neighborhoods-heading">
            <h2 id="schedule-tour-neighborhoods-heading" className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Schedule a neighborhood or open house tour
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Book a time with Dr. Jan Duffy to tour Summerlin neighborhoods or open houses. Choose a slot below.
            </p>
            <div className="max-w-2xl mx-auto">
              <CalendlyInlineWidget
                url={CALENDLY_OPEN_HOUSE_TOUR_URL}
                minWidth={320}
                height={700}
                className="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
              />
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
