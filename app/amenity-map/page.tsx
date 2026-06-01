import { Metadata } from "next"
import { BASE_URL } from "@/lib/metadata-utils"

import Link from "next/link"
import AmenityMap from "@/components/AmenityMap"
import ExternalLink from "@/components/ExternalLink"
import GoogleMyMapsSection from "@/components/GoogleMyMapsSection"
import StructuredData from "@/components/StructuredData"
import { GBP, getGoogleMapsDirectionsUrlToOffice } from "@/config/gbp"

const BUSINESS = {
  name: GBP.name,
  phone: GBP.phone,
  phoneLink: `tel:${GBP.phoneE164}`,
  address: `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`,
  directionsUrl: getGoogleMapsDirectionsUrlToOffice(),
  reviewsUrl:
    (process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL ||
      "https://www.google.com/maps/place/?q=Open+House+Market+Place+Las+Vegas+NV") +
    (process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL ? "" : "&action=reviews"),
}

export const metadata: Metadata = {
  title: "Amenity Map | Nearby Restaurants, Parks, Parking & More | Summerlin",
  description:
    "Explore nearby amenities in Summerlin and Las Vegas: restaurants, parks, parking, cafes, grocery stores, gyms, pharmacies, and more. Interactive map powered by Google Maps.",
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
    images: ["/images/og/og-image.jpg"],
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
                <Link href="/" className="transition-colors hover:text-blue-600">
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
              Use the map below to find nearby places in Summerlin and Las Vegas. Select types such as restaurants,
              parks, parking, cafes, grocery stores, gas stations, gyms, and pharmacies. Click a marker for the place
              name. Powered by Google Maps Platform.
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

          <div className="mt-8 rounded-lg border border-blue-100 bg-blue-50 p-4">
            <p className="text-sm text-gray-700">
              <strong>Tip:</strong> This map shows places near Summerlin. Use the filters above to switch between
              restaurants, parks, cafes, grocery, gyms, and more. Click a marker for the place name.
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <h2 className="mb-2 text-lg font-semibold text-gray-900">{BUSINESS.name}</h2>
            <p className="mb-2 text-sm text-gray-700">{BUSINESS.address}</p>
            <p className="mb-3 text-sm">
              <a href={BUSINESS.phoneLink} className="font-medium text-blue-600 hover:underline">
                {BUSINESS.phone}
              </a>
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BUSINESS.phoneLink}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
              >
                Call
              </a>
              <ExternalLink
                href={BUSINESS.directionsUrl}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
                showIcon={false}
              >
                Directions
              </ExternalLink>
              <ExternalLink
                href={BUSINESS.reviewsUrl}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:underline"
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
