'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Calendar, Search, X } from 'lucide-react'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'

/** Fixed bottom bar on mobile — Calendly + MLS (hidden on md+ where header CTAs suffice). */
export default function StickyMobileCta() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem('ohmp-sticky-cta-dismissed') === '1') {
        setDismissed(true)
      }
    } catch {
      /* ignore */
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    try {
      sessionStorage.setItem('ohmp-sticky-cta-dismissed', '1')
    } catch {
      /* ignore */
    }
  }

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden border-t border-brand-mint bg-white/95 backdrop-blur-md shadow-[0_-8px_30px_rgba(74,56,97,0.15)] pb-[env(safe-area-inset-bottom)]"
      role="region"
      aria-label="Quick actions"
    >
      <div className="flex items-center gap-2 px-3 py-2.5">
        <CalendlyPopupLink className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-teal px-3 py-2.5 text-sm font-bold text-white shadow-md">
          <Calendar className="h-5 w-5 shrink-0" aria-hidden />
          Book showing
        </CalendlyPopupLink>
        <Link
          href="/tour/mls"
          className="flex flex-1 min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-brand-teal bg-white px-3 py-2.5 text-sm font-bold text-brand-plum"
        >
          <Search className="h-5 w-5 shrink-0" aria-hidden />
          MLS search
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-brand-stone hover:bg-brand-surface"
          aria-label="Dismiss quick actions bar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
