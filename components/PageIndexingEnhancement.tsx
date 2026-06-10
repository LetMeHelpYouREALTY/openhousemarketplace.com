import Link from 'next/link'
import FAQSection from '@/components/FAQSection'
import JsonLd from '@/components/JsonLd'
import { getIndexingPageContent } from '@/config/indexing-pages'
import { BASE_URL } from '@/lib/metadata-utils'
import { buildSpeakableWebPageJsonLd } from '@/lib/json-ld'

type PageIndexingEnhancementProps = {
  /** Canonical path, e.g. `/book-tour` */
  path: string
  /** Skip FAQ block when the page already renders FAQSection (e.g. /about, /contact) */
  linksOnly?: boolean
  className?: string
}

export default function PageIndexingEnhancement({
  path,
  linksOnly = false,
  className = '',
}: PageIndexingEnhancementProps) {
  const content = getIndexingPageContent(path)
  if (!content) return null

  const pageUrl = `${BASE_URL}${path}`
  const speakable = buildSpeakableWebPageJsonLd({
    url: pageUrl,
    name: content.speakableSummary.slice(0, 120),
    description: content.speakableSummary,
    cssSelectors: ['.indexing-speakable-summary', '.indexing-related-links'],
  })

  return (
    <>
      <JsonLd data={speakable} />
      <section
        className={`border-t border-gray-200 bg-gray-50 py-10 ${className}`}
        aria-labelledby={`indexing-enhance-${path.replace(/\//g, '-')}`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h2
            id={`indexing-enhance-${path.replace(/\//g, '-')}`}
            className="text-2xl font-bold text-gray-900 mb-3"
          >
            Quick answers
          </h2>
          <p className="indexing-speakable-summary text-gray-700 leading-relaxed mb-8 text-lg">
            {content.speakableSummary}
          </p>

          <nav
            className="indexing-related-links mb-10"
            aria-label="Related pages"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Explore next</h3>
            <ul className="flex flex-wrap gap-2">
              {content.relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block rounded-full border border-brand-mint bg-white px-4 py-2 text-sm font-medium text-brand-plum hover:bg-brand-mint/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {!linksOnly && content.faqs.length > 0 ? (
        <FAQSection faqs={[...content.faqs]} title="Frequently asked questions" />
      ) : null}
    </>
  )
}
