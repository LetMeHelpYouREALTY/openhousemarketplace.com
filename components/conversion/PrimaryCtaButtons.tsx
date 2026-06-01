import Link from 'next/link'
import { Calendar, Search } from 'lucide-react'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import { BRAND_CTA_BUTTON_CLASS, BRAND_CTA_SECONDARY_CLASS } from '@/config/brand'

type PrimaryCtaButtonsProps = {
  layout?: 'row' | 'stack'
  className?: string
  /** Show secondary link to full MLS page */
  showMlsPageLink?: boolean
  calendlyLabel?: string
  mlsLabel?: string
}

export default function PrimaryCtaButtons({
  layout = 'row',
  className = '',
  showMlsPageLink = true,
  calendlyLabel = 'Book a private showing',
  mlsLabel = 'Search MLS listings',
}: PrimaryCtaButtonsProps) {
  const wrap =
    layout === 'stack'
      ? 'flex flex-col gap-3 w-full max-w-md mx-auto'
      : 'flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch sm:items-center'

  return (
    <div className={`${wrap} ${className}`}>
      <CalendlyPopupLink className={`${BRAND_CTA_BUTTON_CLASS} w-full sm:w-auto`}>
        <Calendar className="h-5 w-5 shrink-0" aria-hidden />
        {calendlyLabel}
      </CalendlyPopupLink>
      {showMlsPageLink ? (
        <Link href="/tour/mls" className={`${BRAND_CTA_SECONDARY_CLASS} w-full sm:w-auto`}>
          <Search className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
          {mlsLabel}
        </Link>
      ) : (
        <a
          href="#office-listings-bands"
          className={`${BRAND_CTA_SECONDARY_CLASS} w-full sm:w-auto`}
        >
          <Search className="h-5 w-5 shrink-0 text-brand-teal" aria-hidden />
          {mlsLabel}
        </a>
      )}
    </div>
  )
}
