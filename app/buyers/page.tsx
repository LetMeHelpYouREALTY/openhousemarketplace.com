import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGES } from '@/lib/metadata-utils'

import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import BuyerToolsSection from '@/components/BuyerToolsSection'
import PageIndexingEnhancement from '@/components/PageIndexingEnhancement'
import GoogleMyMapsSection from '@/components/GoogleMyMapsSection'
import { Search } from 'lucide-react'

export const revalidate = 86400 // ISR: revalidate daily

export const metadata: Metadata = {
  title: 'Buyer Tools | Mortgage Calculator & Schools | Dr. Jan Duffy Real Estate',
  description:
    'Smart buyer tools for Summerlin West: mortgage calculator, top-rated schools, and schedule viewings. Make confident decisions with Dr. Jan Duffy\'s buyer toolkit, then search listings.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${BASE_URL}/buyers` },
  openGraph: {
    title: 'Buyer Tools | Dr. Jan Duffy Real Estate',
    description: 'Mortgage calculator, schools, and buyer resources for Summerlin West.',
    url: `${BASE_URL}/buyers`,
    images: [...DEFAULT_OG_IMAGES],
  },
}

export default function BuyersPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Buyer Tools | Mortgage Calculator & Schools | Dr. Jan Duffy Real Estate',
          description: 'Smart buyer tools for Summerlin West: mortgage calculator, top-rated schools, and schedule viewings.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'Buyer Tools', url: `${BASE_URL}/buyers` },
          ],
        }}
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyer Tools</h1>
            <p className="text-lg text-gray-600">
              Mortgage calculator, schools, and resources to help you buy in Summerlin West
            </p>
          </div>

          <div className="mb-10 md:mb-12 rounded-xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
            <GoogleMyMapsSection
              heading="Explore neighborhoods before you buy"
              description="Pan and zoom across Summerlin on the map below. For commute times, see directions; for community guides, see all neighborhoods."
              id="buyers-neighborhood-discovery-heading"
              mapScope="service-area"
            />
            <p className="mt-4 text-sm text-gray-600">
              <Link href="/directions" className="text-brand-teal font-medium hover:underline">
                Directions &amp; commute explorer
              </Link>
              {' · '}
              <Link href="/neighborhoods" className="text-brand-teal font-medium hover:underline">
                All Summerlin neighborhoods
              </Link>
            </p>
          </div>

          <BuyerToolsSection searchListingsHref="/tour/mls" />
          <section className="mt-12 text-center bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Ready to find your home?</h2>
            <p className="text-gray-600 mb-6 max-w-xl mx-auto">
              Search live Summerlin West listings, save favorites, and get alerts for new homes and open houses with Dr. Jan Duffy&apos;s home search.
            </p>
            <Link
              href="/tour/mls"
              className="inline-flex items-center gap-2 bg-brand-teal hover:bg-brand-plum text-white px-8 py-3 rounded-lg font-bold text-lg transition-colors"
            >
              <Search className="h-5 w-5" aria-hidden />
              Search Listings
            </Link>
          </section>
        </div>
      </div>
      <PageIndexingEnhancement path="/buyers" />
    </>
  )
}
