import { Metadata } from 'next'
import { BASE_URL, DEFAULT_OG_IMAGE_PATHS } from '@/lib/metadata-utils'

import Link from 'next/link'
import OpenHouseGuideJsonLd from '@/components/OpenHouseGuideJsonLd'
import FAQAccordion from '@/components/FAQAccordion'
import { OPEN_HOUSE_GUIDE_FAQS, OPEN_HOUSE_GUIDE_HOWTO } from '@/config/seo'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import CalendlyInlineWidget from '@/components/CalendlyInlineWidget'

export const metadata: Metadata = {
  title: 'Open House Guide 2026 | What Buyers Need to Know | Summerlin Las Vegas',
  description:
    'NAR rules shape how open houses work in 2026. Learn what forms to expect, your rights as a buyer, and how to get the most from Summerlin open houses with Dr. Jan Duffy.',
  robots: { index: true, follow: true },
  alternates: {
    canonical: `${BASE_URL}/open-house-guide`,
  },
  openGraph: {
    title: 'Open House Guide 2026 | What Buyers Need to Know | Summerlin Las Vegas',
    description:
      'NAR rules shape how open houses work in 2026. Learn what forms to expect, your rights as a buyer, and how to get the most from Summerlin open houses with Dr. Jan Duffy.',
    url: `${BASE_URL}/open-house-guide`,
    images: [DEFAULT_OG_IMAGE_PATHS[0]],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function OpenHouseGuidePage() {
  return (
    <>
      <OpenHouseGuideJsonLd />
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="page-title-speakable text-4xl md:text-5xl font-bold mb-4">
              What to Expect at a Summerlin Open House in 2026
            </h1>
            <p className="speakable-summary text-xl text-white mb-8">
              New NAR-related rules mean more transparency and better protection for buyers at Summerlin Las Vegas open houses in 2026.
            </p>
            <Link
              href="/open-houses"
              className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              View This Weekend&apos;s Open Houses
            </Link>
          </div>
        </section>

        {/* HowTo — visible steps matching HowTo JSON-LD (AEO) */}
        <section className="py-12 px-4 bg-white border-b border-gray-200" aria-labelledby="open-house-howto-heading">
          <div className="max-w-4xl mx-auto">
            <h2 id="open-house-howto-heading" className="text-3xl font-bold text-gray-900 mb-4">
              {OPEN_HOUSE_GUIDE_HOWTO.name}
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">{OPEN_HOUSE_GUIDE_HOWTO.description}</p>
            <ol className="list-decimal pl-6 space-y-4 text-gray-700">
              {OPEN_HOUSE_GUIDE_HOWTO.steps.map((step) => (
                <li key={step.name}>
                  <strong className="text-gray-900">{step.name}.</strong> {step.text}
                  {'url' in step && step.url ? (
                    <>
                      {' '}
                      <Link href={step.url} className="text-blue-600 font-semibold hover:underline">
                        Learn more
                      </Link>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* What Changed */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Changed</h2>
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6 text-gray-700 leading-relaxed">
              <p>
                After the August 2024 NAR settlement, several rules changed how open houses and buyer
                representation work. Here&apos;s what you need to know in plain language.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Buyer broker compensation is no longer displayed on the MLS.</strong> You
                  won&apos;t see it on listing sites; it&apos;s negotiated between you and your
                  agent.
                </li>
                <li>
                  <strong>Agents must present disclosure forms at open houses.</strong> You may be
                  asked to acknowledge who represents whom before or during the visit.
                </li>
              </ul>
              <p className="font-semibold text-gray-900">Three types of forms you may encounter:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>
                  <strong>Open House Visitor Non-Agency Disclosure</strong> — Acknowledges that the
                  listing agent at the open house represents the seller, not you.
                </li>
                <li>
                  <strong>Limited Property Representation Agreement</strong> — Allows the agent to
                  share property details with you for a limited period (e.g. up to 30 days) without
                  a full exclusive buyer relationship.
                </li>
                <li>
                  <strong>Full Exclusive Buyer Representation Agreement</strong> — A formal
                  agent-buyer relationship where that agent represents you in the transaction.
                </li>
              </ol>
              <p className="rounded-lg bg-blue-50 border border-blue-200 p-4 font-medium text-gray-900">
                <strong>Important:</strong> Open houses remain <strong>exempt</strong> from the
                requirement to sign a buyer agreement before viewing. You do not have to commit to
                an agent just to walk through an open house. That&apos;s a key advantage of
                attending open houses instead of private showings.
              </p>
            </div>
          </div>
        </section>

        {/* What This Means for You */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What This Means for You</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                You can still freely attend <Link href="/open-houses" className="text-blue-600 font-semibold hover:underline">Summerlin open houses</Link>. You&apos;ll
                typically be asked to sign in (digital or paper) for security and follow-up. The
                agent at the open house represents the seller, not you.
              </p>
              <p>
                Having your own buyer&apos;s agent gives you dedicated representation, negotiation
                help, and access to off-market opportunities. Dr. Jan Duffy can serve as your
                exclusive buyer&apos;s agent while you explore homes in{' '}
                <Link href="/neighborhoods" className="text-blue-600 font-semibold hover:underline">Summerlin neighborhoods</Link> like The Ridges and Red Rock Country Club.
              </p>
              <p>
                Questions? <Link href="/contact" className="text-blue-600 font-semibold hover:underline">Contact Dr. Jan Duffy</Link> for a no-pressure conversation about how
                the new rules affect your home search.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="bg-gray-50 py-12">
          <FAQAccordion faqs={[...OPEN_HOUSE_GUIDE_FAQS]} title="Frequently Asked Questions" />
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Get your free guide & schedule a consultation
            </h2>
            <p className="text-gray-600 text-center mb-8 max-w-xl mx-auto">
              Schedule a free consultation with Dr. Jan Duffy and we&apos;ll send you the Open House Touring Guide. Choose a time below—no form required.
            </p>
            <CalendlyPopupLink className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto mb-8 bg-[#0069ff] hover:bg-[#0052cc] text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors">
              Schedule a private showing
            </CalendlyPopupLink>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <CalendlyInlineWidget
                minWidth={320}
                height={700}
                className="rounded-lg overflow-hidden w-full"
              />
            </div>
          </div>
        </section>

        <p className="text-center text-sm text-gray-500 py-8">
          Enjoyed our guide? <Link href="/review-us" className="text-blue-600 hover:underline font-medium">Leave a review on Google</Link>
        </p>
      </div>
    </>
  )
}
