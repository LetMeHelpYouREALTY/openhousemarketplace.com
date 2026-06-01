import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import { GBP, getGoogleBusinessProfileUrl, getGoogleMapsDirectionsUrlToOffice } from '@/config/gbp'
import AmenityMap from '@/components/AmenityMap'
import ExternalLink from '@/components/ExternalLink'
import GoogleMyMapsSection from '@/components/GoogleMyMapsSection'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  title: 'Amenity Map | Nearby Restaurants, Parks, Parking & More | Summerlin',
  description:
    'Explore nearby amenities in Summerlin and Las Vegas: restaurants, parks, parking, cafes, grocery stores, gyms, pharmacies, and more near open house neighborhoods.',
  keywords: 'Summerlin amenities, nearby restaurants Summerlin, parks Las Vegas, parking Summerlin, cafes grocery gym pharmacy map',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/amenity-map`,
  },
  openGraph: {
    title: 'Amenity Map | Nearby Places in Summerlin',
    description: 'Find restaurants, parks, parking, cafes, and more near Summerlin and Las Vegas.',
    url: `${BASE_URL}/amenity-map`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
}

export default function AmenityMapPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Amenity Map | Nearby Restaurants, Parks & More | Summerlin',
          description: 'Interactive map of nearby amenities in Summerlin: restaurants, parks, parking, cafes, grocery, gyms, pharmacies.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'Amenity Map', url: `${BASE_URL}/amenity-map` },
          ],
        }}
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
                Amenity Map
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore Nearby Amenities
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl">
              Use the map below to find nearby places in Summerlin and Las Vegas. Select types such as
              restaurants, parks, parking, cafes, grocery stores, gas stations, gyms, and pharmacies.
              Click a marker for details. Handy when you are touring open houses and want dining, parks, or errands nearby.
            </p>
          </header>

          <div className="mb-10 md:mb-12">
            <GoogleMyMapsSection
              heading="Area overview map"
              description="Our curated Google map shows Summerlin and Las Vegas context. Use the interactive filters below for nearby restaurants, parks, parking, and more."
              id="amenity-my-maps-heading"
            />
          </div>

          <section aria-label="Interactive amenity map">
            <AmenityMap />
          </section>

          <div className="mt-8 p-4 bg-brand-mint/40 rounded-lg border border-brand-mint">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> This map shows places near Summerlin. Use the filters above to
              switch between restaurants, parks, cafes, grocery, gyms, and more. Click a marker for
              the place name.
            </p>
          </div>

          <div className="mt-8 p-4 rounded-lg border border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{GBP.name}</h2>
            <p className="text-sm text-gray-700 mb-2">
              {GBP.address.street}, {GBP.address.locality}, {GBP.address.region}{' '}
              {GBP.address.postalCode}
            </p>
            <p className="text-sm mb-3">
              <a href={`tel:${GBP.phoneE164}`} className="text-brand-teal font-medium hover:underline">
                {GBP.phone}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${GBP.phoneE164}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:underline"
              >
                Call
              </a>
              <ExternalLink
                href={getGoogleMapsDirectionsUrlToOffice()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:underline"
                showIcon={false}
              >
                Directions
              </ExternalLink>
              <ExternalLink
                href={getGoogleBusinessProfileUrl()}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:underline"
                showIcon={false}
              >
                View Google Reviews
              </ExternalLink>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
