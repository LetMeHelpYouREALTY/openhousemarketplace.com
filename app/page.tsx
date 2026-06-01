import { Metadata } from "next"
import { BASE_URL } from '@/lib/metadata-utils'
import { HOME_PAGE_FAQS, SEO_HOME_DESCRIPTION, SEO_HOME_TITLE } from '@/config/seo'
import {
  OG_IMAGE_DEFAULT_ALT,
  OG_IMAGE_DEFAULT_HEIGHT,
  OG_IMAGE_DEFAULT_PATH,
  OG_IMAGE_DEFAULT_WIDTH,
} from '@/config/og'

import SummerlinOpenHouseWebsite from "components/SummerlinOpenHouseWebsite"
import StructuredData from "@/components/StructuredData"
import GoogleMyMapsSection from "@/components/GoogleMyMapsSection"
import PageIndexingEnhancement from "@/components/PageIndexingEnhancement"

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: SEO_HOME_TITLE,
  description: SEO_HOME_DESCRIPTION,
  keywords: "Summerlin West open houses, open houses Summerlin Nevada, weekend home tours Red Rock, new construction Summerlin West, luxury homes Summerlin open house, Summerlin real estate showings",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: `${BASE_URL}/`,
  },
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: `${BASE_URL}/`,
    title: SEO_HOME_TITLE,
    description: SEO_HOME_DESCRIPTION,
    images: [
      {
        url: `${BASE_URL}${OG_IMAGE_DEFAULT_PATH}`,
        width: OG_IMAGE_DEFAULT_WIDTH,
        height: OG_IMAGE_DEFAULT_HEIGHT,
        alt: OG_IMAGE_DEFAULT_ALT,
      },
    ],
  },
}

export default function HomePage() {
  return (
    <main id="main">
      <StructuredData
        type="Organization"
        data={{
          url: `${BASE_URL}`,
        }}
      />
      <StructuredData type="FAQPage" data={{ faqs: [...HOME_PAGE_FAQS] }} />
      <SummerlinOpenHouseWebsite />
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <GoogleMyMapsSection
            heading="Map: Summerlin Las Vegas open houses & neighborhoods"
            description="Pan and zoom to explore Summerlin West, corridors, and points of interest where we list and tour homes. Open full screen from the map controls."
            id="home-area-map-heading"
            deferEmbed
          />
        </div>
      </div>
      <PageIndexingEnhancement path="/" />
    </main>
  )
}
