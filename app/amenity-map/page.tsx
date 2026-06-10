import { Metadata } from "next"
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from "@/lib/metadata-utils"

import Link from "next/link"
import { GBP, getGoogleBusinessProfileUrl, getGoogleMapsDirectionsUrlToOffice } from "@/config/gbp"
import AmenityMap from "@/components/AmenityMap"
import ExternalLink from "@/components/ExternalLink"
import GoogleMyMapsSection from "@/components/GoogleMyMapsSection"
import StructuredData from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Amenity Map | Nearby Restaurants, Parks, Parking & More | Summerlin",
  description:
    "Explore nearby amenities in Summerlin and Las Vegas: restaurants, parks, parking, cafes, grocery stores, gyms, pharmacies, and more near open house neighborhoods.",
  keywords:
    "Summerlin amenities, nearby restaurants Summerlin, parks Las Vegas, parking Summerlin, cafes grocery gym pharmacy map",
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
    title: "Amenity Map | Nearby Places in Summerlin",
    description: "Find restaurants, parks, parking, cafes, and more near Summerlin and Las Vegas.",
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
          name: "Amenity Map | Nearby Restaurants, Parks & More | Summerlin",
          description:
            "Interactive map of nearby amenities in Summerlin: restaurants, parks, parking, cafes, grocery, gyms, pharmacies.",
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: "Home", url: `${BASE_URL}/` },
            { name: "Amenity Map", url: `${BASE_URL}/amenity-map` },
          ],
        }}
      />

      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-brand-teal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="font-medium text-gray-700" aria-current="page">
                Amenity Map
              </li>
            </ol>
          </nav>

          <header className="mb-8">
            <h1 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">Explore Nearby Amenities</h1>
            <p className="max-w-2xl text-lg text-gray-600">
              Use the maps below to orient yourself in Summerlin and Las Vegas, then open nearby restaurants, parks,
              parking, cafes, grocery stores, gas stations, gyms, and pharmacies in Google Maps. Handy when you are
              touring open houses and want dining, parks, or errands nearby.
            </p>
          </header>

          <div className="mb-10 md:mb-12">
            <GoogleMyMapsSection
              heading="Area overview map"
              description="Our curated Google map shows Summerlin and Las Vegas context. Use the buttons below to open nearby places in Google Maps."
              id="amenity-my-maps-heading"
            />
          </div>

          <section aria-label="Nearby amenities map and links">
            <AmenityMap />
          </section>

          <div className="bg-brand-mint/40 border-brand-mint mt-8 rounded-lg border p-4">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> Pick a category above, then use the link to open results in Google Maps near our
              Summerlin office.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{GBP.name}</h2>
            <p className="mb-2 text-sm text-gray-700">
              {GBP.address.street}, {GBP.address.locality}, {GBP.address.region} {GBP.address.postalCode}
            </p>
            <p className="mb-3 text-sm">
              <a href={`tel:${GBP.phoneE164}`} className="text-brand-teal font-medium hover:underline">
                {GBP.phone}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${GBP.phoneE164}`}
                className="text-brand-teal inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              >
                Call
              </a>
              <ExternalLink
                href={getGoogleMapsDirectionsUrlToOffice()}
                className="text-brand-teal inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                showIcon={false}
              >
                Directions
              </ExternalLink>
              <ExternalLink
                href={getGoogleBusinessProfileUrl()}
                className="text-brand-teal inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
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
