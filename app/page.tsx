import { Metadata } from "next"
import { BASE_URL } from '@/lib/metadata-utils'
import { HOME_PAGE_FAQS, SEO_HOME_DESCRIPTION, SEO_HOME_TITLE, SEO_PRIMARY_KEYWORD, SEO_TARGET_KEYWORD } from '@/config/seo'

import SummerlinOpenHouseWebsite from "components/SummerlinOpenHouseWebsite"
import StructuredData from "@/components/StructuredData"
import GoogleMyMapsSection from "@/components/GoogleMyMapsSection"

export const revalidate = 3600 // ISR: revalidate every hour

export const metadata: Metadata = {
  title: SEO_HOME_TITLE,
  description: SEO_HOME_DESCRIPTION,
  keywords: [SEO_TARGET_KEYWORD, SEO_PRIMARY_KEYWORD, 'Summerlin open house', 'Las Vegas open house tours', 'luxury homes Summerlin'],
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
        width: 1200,
        height: 630,
        url: `${BASE_URL}/images/luxury-summerlin-hero.png`,
        alt: 'Luxury home in Summerlin with Red Rock Canyon views',
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
      <div className="border-t border-stone bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-12">
          <GoogleMyMapsSection
            heading="Map: Summerlin Las Vegas open houses & neighborhoods"
            description="Pan and zoom to explore Summerlin West, corridors, and points of interest where we list and tour homes. Open full screen from the map controls."
            id="home-area-map-heading"
            deferEmbed
          />
        </div>
      </div>
    </main>
  )
}
