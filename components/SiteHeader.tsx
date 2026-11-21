'use client'

import Link from 'next/link'
import { Menu, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { GBP } from '@/config/gbp'

const navigation = [
  { href: '/tour/mls', label: 'Find a home' },
  { href: '/luxury-homes', label: 'Luxury homes' },
  { href: '/neighborhoods', label: 'Neighborhoods' },
  { href: '/about', label: 'About Jan' },
]

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-stone/80 bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex min-h-11 items-center gap-3" aria-label="Dr. Jan Duffy luxury real estate home">
          <span className="flex size-10 items-center justify-center bg-forest font-serif text-2xl text-cream" aria-hidden="true">J</span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg tracking-wide text-ink sm:text-xl">DR. JAN DUFFY</span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-olive">Luxury real estate · Las Vegas</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="inline-flex min-h-11 items-center text-xs font-medium uppercase tracking-[0.12em] text-ink/80 transition-colors hover:text-olive">
              {item.label}
            </Link>
          ))}
          <a href={`tel:${GBP.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 border-l border-stone pl-6 text-xs font-semibold tracking-wide text-forest hover:text-olive">
            <Phone className="size-4" aria-hidden="true" /> {GBP.phone}
          </a>
          <Link href="/book-tour" className="inline-flex min-h-11 items-center justify-center bg-forest px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-olive">
            Private tour
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          className="inline-flex size-11 items-center justify-center text-forest hover:bg-stone/60 lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {mobileOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
        </button>
      </div>

      {mobileOpen && (
        <nav id="mobile-navigation" className="border-t border-stone bg-cream px-4 pb-5 pt-2 lg:hidden" aria-label="Mobile navigation">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center border-b border-stone/70 text-sm text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href="/book-tour" onClick={() => setMobileOpen(false)} className="inline-flex min-h-12 items-center justify-center bg-forest px-3 text-xs font-semibold uppercase tracking-wide text-white">
              Private tour
            </Link>
            <a href={`tel:${GBP.phoneE164}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-stone px-3 text-xs font-semibold text-forest">
              <Phone className="size-4" aria-hidden="true" /> Call Jan
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
