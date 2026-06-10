import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import StructuredData from '@/components/StructuredData'
import PageIndexingEnhancement from '@/components/PageIndexingEnhancement'
import MarketingHero from '@/components/conversion/MarketingHero'
import { brandCardClass } from '@/lib/brand-classes'

export const metadata: Metadata = {
  title: 'Schedule a private showing | Dr. Jan Duffy | Summerlin Real Estate',
  description: 'Schedule a private showing with Dr. Jan Duffy. Book a time that works for you—tour Summerlin homes, get a market analysis, or discuss your real estate goals.',
  keywords: 'schedule private showing, private home tour Summerlin, book showing, Dr. Jan Duffy appointment, Summerlin real estate tour',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: `${BASE_URL}/book-tour`,
  },
  openGraph: {
    title: 'Schedule a private showing | Dr. Jan Duffy',
    description: 'Book a private showing. Choose a time below.',
    url: `${BASE_URL}/book-tour`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
}

export default function BookTourPage() {
  return (
    <>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Schedule a private showing | Dr. Jan Duffy',
          description: 'Schedule a private showing or real estate consultation with Dr. Jan Duffy. Book a time that works for you.',
        }}
      />
      <StructuredData
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', url: `${BASE_URL}/` },
            { name: 'Schedule a private showing', url: `${BASE_URL}/book-tour` },
          ],
        }}
      />

      <MarketingHero
        title="Schedule a private showing"
        description="Pick a time that works for you — tour Summerlin homes with Dr. Jan Duffy. No signup required."
        showCtas={false}
      />
      <main className="min-h-screen bg-brand-surface/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-brand-teal transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium" aria-current="page">
                Schedule a private showing
              </li>
            </ol>
          </nav>

          <section className="mb-8 prose prose-gray max-w-none text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">Private tours in Summerlin and Las Vegas</h2>
            <p>
              A private showing lets you tour a specific listing on your schedule—ideal when you cannot attend a weekend open house or want a second visit. Dr. Jan Duffy (Berkshire Hathaway HomeServices Nevada Properties) coordinates access with listing agents across Summerlin villages, new construction, and luxury communities.
            </p>
            <p>
              Before your tour, share your budget, preferred zip codes (89135, 89138, 89144), and must-haves. You can also browse{' '}
              <Link href="/open-houses" className="text-brand-teal font-semibold hover:underline">Summerlin open houses</Link>
              {' '}or{' '}
              <Link href="/tour/mls" className="text-brand-teal font-semibold hover:underline">MLS listings</Link>
              {' '}to build a shortlist.
            </p>
          </section>

          <section aria-label="Schedule a private showing" className={`${brandCardClass} border-2 border-brand-teal/30`}>
            <h2 className="text-xl font-bold text-brand-plum mb-4 text-center">Choose your showing time</h2>
            <CalendlyInlineWidget
              minWidth={320}
              height={700}
              className="rounded-lg overflow-hidden w-full"
            />
          </section>

          <p className="mt-6 text-center text-sm text-gray-500">
            Prefer to call? <a href="tel:+17022003422" className="text-brand-teal hover:underline">(702) 200-3422</a>
            {' · '}
            <Link href="/schedule-consultation" className="text-brand-teal hover:underline">Schedule a free consultation</Link>
            {' · '}
            <Link href="/review-us" className="text-brand-teal hover:underline">Review us on Google</Link>
          </p>
        </div>
      </main>
      <PageIndexingEnhancement path="/book-tour" />
    </>
  )
}
