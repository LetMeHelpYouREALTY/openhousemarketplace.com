import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'
import StructuredData from '@/components/StructuredData'
import PageIndexingEnhancement from '@/components/PageIndexingEnhancement'

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

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-gray-500 mb-6">
            <ol className="flex flex-wrap gap-x-2 gap-y-1">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-gray-700 font-medium" aria-current="page">
                Schedule a private showing
              </li>
            </ol>
          </nav>

          <header className="mb-8 text-center">
            <h1 className="page-title-speakable text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Schedule a private showing
            </h1>
            <p className="speakable-summary text-lg text-gray-600 max-w-xl mx-auto">
              Book a private showing with Dr. Jan Duffy in Summerlin West. Choose a date and time below—no signup required—or call (702) 200-3422.
            </p>
          </header>

          <section className="mb-8 prose prose-gray max-w-none text-gray-700">
            <h2 className="text-xl font-semibold text-gray-900">Private tours in Summerlin and Las Vegas</h2>
            <p>
              A private showing lets you tour a specific listing on your schedule—ideal when you cannot attend a weekend open house or want a second visit. Dr. Jan Duffy (Berkshire Hathaway HomeServices Nevada Properties) coordinates access with listing agents across Summerlin villages, new construction, and luxury communities.
            </p>
            <p>
              Before your tour, share your budget, preferred zip codes (89135, 89138, 89144), and must-haves. You can also browse{' '}
              <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link>
              {' '}or{' '}
              <Link href="/tour/mls" className="text-blue-600 font-semibold hover:underline">MLS listings</Link>
              {' '}to build a shortlist.
            </p>
          </section>

          <section aria-label="Schedule a private showing" className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
            <CalendlyInlineWidget
              minWidth={320}
              height={700}
              className="rounded-lg overflow-hidden w-full"
            />
          </section>

          <p className="mt-6 text-center text-sm text-gray-500">
            Prefer to call? <a href="tel:+17022003422" className="text-blue-600 hover:underline">(702) 200-3422</a>
            {' · '}
            <Link href="/schedule-consultation" className="text-blue-600 hover:underline">Schedule a free consultation</Link>
            {' · '}
            <Link href="/review-us" className="text-blue-600 hover:underline">Review us on Google</Link>
          </p>
        </div>
      </main>
      <PageIndexingEnhancement path="/book-tour" />
    </>
  )
}
