import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import StructuredData from '@/components/StructuredData'
import ExternalLink from '@/components/ExternalLink'
import RealScoutSearchCard from '@/components/RealScoutSearchCard'
import PageIndexingEnhancement from '@/components/PageIndexingEnhancement'
import MarketingHero from '@/components/conversion/MarketingHero'
import RealScoutWidgetFrame from '@/components/conversion/RealScoutWidgetFrame'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { REALSCOUT_OFFICE_PRICE_RANGE_LABEL } from '@/config/realscout-office-bands'
import { brandCardClass } from '@/lib/brand-classes'

const REALSCOUT_SEARCH_URL =
  'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA=='

export const revalidate = 86400

export const metadata: Metadata = {
  title: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy',
  description:
    'Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas\' premier master-planned community.',
  robots: { index: true, follow: true },
  alternates: { canonical: `${BASE_URL}/tour/mls` },
  openGraph: {
    title: 'MLS Property Search | Summerlin Real Estate',
    description: 'Search the full MLS database of homes for sale in Summerlin.',
    url: `${BASE_URL}/tour/mls`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
}

export default function TourMLSPage() {
  return (
    <>
      <StructuredData type="Organization" data={{ url: `${BASE_URL}` }} />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'MLS Property Search', url: `${BASE_URL}/tour/mls` },
          ],
        }}
      />
      <MarketingHero
        title="MLS property search — Summerlin & Las Vegas"
        description="Search every listing Dr. Jan Duffy can show you. Save homes, get alerts, then book a private showing in one click."
        showCtas={false}
      />
      <div className="min-h-screen bg-brand-surface/40 py-10 sm:py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <PrimaryCtaButtons />
          </div>

          <div className="mb-8">
            <RealScoutWidgetFrame
              id="mls-advanced-search"
              stepLabel="Search"
              title="Find your perfect home"
              description={`Search Summerlin MLS listings. Office grid below is filtered to ${REALSCOUT_OFFICE_PRICE_RANGE_LABEL}.`}
            >
              <RealScoutSearchCard />
            </RealScoutWidgetFrame>
          </div>

          <div className={`${brandCardClass} mb-8 text-center`}>
            <p className="text-gray-600 mb-4">
              Office MLS grid ({REALSCOUT_OFFICE_PRICE_RANGE_LABEL}) loads on every page —{' '}
              <a href="#office-listings-bands" className="font-semibold text-brand-teal hover:text-brand-plum">
                jump to live listings
              </a>
              .
            </p>
          </div>

          <div className={`${brandCardClass} mb-8 text-center`}>
            <p className="text-gray-600 mb-4">
              Want the full-screen experience? Open Dr. Jan Duffy&apos;s shared search — or see{' '}
              <Link href="/open-houses" className="font-semibold text-brand-teal hover:text-brand-plum">
                this weekend&apos;s open houses
              </Link>
              .
            </p>
            <ExternalLink
              href={REALSCOUT_SEARCH_URL}
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl bg-brand-teal px-8 py-3 font-bold text-white hover:bg-brand-plum"
              showIcon={false}
            >
              Open full MLS search in new tab
            </ExternalLink>
          </div>

          <section className={brandCardClass}>
            <h2 className="text-xl font-bold text-brand-plum mb-3">How it works</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Search and save homes in RealScout (free account).</li>
              <li>Get instant alerts for new listings and price changes.</li>
              <li>Book a private showing with Dr. Jan Duffy via Calendly.</li>
            </ol>
          </section>
        </div>
      </div>
      <PageIndexingEnhancement path="/tour/mls" />
    </>
  )
}
