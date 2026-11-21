import Link from 'next/link'
import { ArrowUpRight, MapPin, Phone } from 'lucide-react'
import { GBP, GBP_SERVICE_AREA, getGoogleMapsDirectionsUrlToOffice } from '@/config/gbp'
import { SITE_NAME } from '@/config/site'

const neighborhoodLinks = [
  { href: '/neighborhoods/the-ridges', label: 'The Ridges' },
  { href: '/neighborhoods/red-rock-country-club', label: 'Red Rock Country Club' },
  { href: '/neighborhoods/summerlin-centre', label: 'Summerlin Centre' },
  { href: '/neighborhoods/sun-city-summerlin', label: 'Sun City Summerlin' },
]

const resourceLinks = [
  { href: '/open-houses', label: 'Open houses' },
  { href: '/luxury-homes', label: 'Luxury homes' },
  { href: '/market-report', label: 'Market report' },
  { href: '/buyers', label: 'Buyer resources' },
]

export default function Footer() {
  return (
    <footer className="bg-[#202923] text-white/75" role="contentinfo">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_0.8fr_1.15fr] lg:gap-12 lg:px-12 lg:py-16">
        <div>
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 text-white" aria-label="Dr. Jan Duffy home">
            <span className="flex size-10 items-center justify-center bg-white/10 font-serif text-2xl" aria-hidden="true">J</span>
            <span className="font-serif text-xl tracking-wide">DR. JAN DUFFY</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6 text-white/65">
            A thoughtful real estate experience, grounded in local knowledge of Summerlin and Las Vegas.
          </p>
          <p className="mt-4 text-xs leading-5 text-white/55">{SITE_NAME} · Berkshire Hathaway HomeServices Nevada Properties</p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Explore</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {neighborhoodLinks.map((item) => <li key={item.href}><Link className="transition-colors hover:text-white" href={item.href}>{item.label}</Link></li>)}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Resources</h2>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm">
            {resourceLinks.map((item) => <li key={item.href}><Link className="transition-colors hover:text-white" href={item.href}>{item.label}</Link></li>)}
            <li><Link className="transition-colors hover:text-white" href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">A conversation, at your pace</h2>
          <a href={`tel:${GBP.phoneE164}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-medium text-white hover:text-white/75">
            <Phone className="size-4" aria-hidden="true" /> {GBP.phone}
          </a>
          <p className="mt-2 flex gap-2 text-sm leading-6 text-white/65">
            <MapPin className="mt-1 size-4 shrink-0" aria-hidden="true" />
            <span>{GBP.address.street}, {GBP.address.locality}, {GBP.address.region} {GBP.address.postalCode}<br />{GBP_SERVICE_AREA.label}</span>
          </p>
          <Link href="/book-tour" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/35 underline-offset-4 hover:decoration-white">
            Arrange a private tour <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <a href={getGoogleMapsDirectionsUrlToOffice()} target="_blank" rel="noreferrer" className="mt-2 inline-flex min-h-11 items-center text-sm text-white/65 underline decoration-white/25 underline-offset-4 hover:text-white hover:decoration-white">Get directions</a>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs text-white/55 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© {new Date().getFullYear()} {SITE_NAME}. Nevada License S.0197614.LLC.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Legal and utility links">
            <Link href="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link href="/terms-of-service" className="hover:text-white">Terms</Link>
            <Link href="/disclaimer" className="hover:text-white">Disclaimer</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
