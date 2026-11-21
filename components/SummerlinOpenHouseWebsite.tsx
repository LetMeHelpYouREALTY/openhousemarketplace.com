'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, MapPin, Phone } from 'lucide-react'
import OptimizedImage from './OptimizedImage'
import RealScoutSearchCard from './RealScoutSearchCard'
import { GBP } from '@/config/gbp'
import { HOME_PAGE_FAQS } from '@/config/seo'

const neighborhoods = [
  {
    name: 'The Ridges',
    description: 'Private, design-forward living beneath the Red Rock mountains.',
    href: '/neighborhoods/the-ridges',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&h=700&fit=crop',
    imageAlt: 'Contemporary desert home with clean architectural lines',
    note: 'GUARD-GATED LIVING',
  },
  {
    name: 'Red Rock Country Club',
    description: 'A distinctive setting shaped by golf, views, and resort amenities.',
    href: '/neighborhoods/red-rock-country-club',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&h=700&fit=crop',
    imageAlt: 'Elegant home opening to a landscaped outdoor living area',
    note: 'GOLF & COUNTRY CLUB',
  },
  {
    name: 'Summerlin Centre',
    description: 'Walkable conveniences and a lively sense of neighborhood.',
    href: '/neighborhoods/summerlin-centre',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1000&h=700&fit=crop',
    imageAlt: 'Warm modern interior with natural materials and large windows',
    note: 'CONNECTED & CONVENIENT',
  },
]

export default function SummerlinOpenHouseWebsite() {
  return (
    <div className="overflow-hidden bg-cream text-ink">
      <section className="relative isolate flex min-h-[660px] items-end bg-forest sm:min-h-[720px] lg:min-h-[780px]" aria-labelledby="home-hero-title">
        <Image
          src="/images/luxury-summerlin-hero.png"
          alt="Contemporary luxury home in Summerlin with Red Rock Canyon in the distance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:px-12 lg:pb-24">
          <div className="max-w-3xl text-white">
            <p className="mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.24em] text-white/85 sm:text-sm">
              <MapPin className="size-4 text-brass" aria-hidden="true" />
              Summerlin open houses · Las Vegas, Nevada
            </p>
            <h1 id="home-hero-title" className="max-w-3xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Find your place in the extraordinary.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
              Discover Summerlin open houses and exceptional homes across the Las Vegas Valley—with thoughtful guidance from a local advisor.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/tour/mls"
                className="inline-flex min-h-12 items-center justify-center gap-2 bg-cream px-6 py-3 text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore homes <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                href="/book-tour"
                className="inline-flex min-h-12 items-center justify-center border border-white/70 px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Arrange a private tour
              </Link>
            </div>
            <p className="mt-8 text-xs tracking-wide text-white/75">
              Dr. Jan Duffy <span className="px-2 text-brass">/</span> Berkshire Hathaway HomeServices Nevada Properties
            </p>
          </div>
        </div>
        <div className="absolute bottom-8 right-8 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/75 lg:flex">
          <span className="h-px w-12 bg-white/60" />
          A local perspective, personally delivered
        </div>
      </section>

      <section className="border-b border-stone bg-paper" aria-label="Professional credentials">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-12">
          <div className="border-b border-stone pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
            <p className="font-serif text-2xl text-forest">30+ years</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">Open house experience</p>
          </div>
          <div className="border-b border-stone pb-5 sm:border-b-0 sm:border-r sm:px-6 sm:pb-0">
            <p className="font-serif text-2xl text-forest">Summerlin to Henderson</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">A deeply local point of view</p>
          </div>
          <div className="sm:pl-6">
            <p className="font-serif text-2xl text-forest">Nevada licensed</p>
            <p className="mt-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">S.0197614.LLC</p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="neighborhoods-title">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mb-9 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">A sense of place</p>
              <h2 id="neighborhoods-title" className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
                Find the neighborhood that feels like you.
              </h2>
            </div>
            <Link href="/neighborhoods" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest hover:text-olive">
              Discover Summerlin <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {neighborhoods.map((neighborhood, index) => (
              <article key={neighborhood.href} className="group bg-paper">
                <Link href={neighborhood.href} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest">
                  <div className="relative aspect-[4/3] overflow-hidden bg-stone">
                    <OptimizedImage
                      src={neighborhood.image}
                      alt={neighborhood.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={index === 0}
                    />
                  </div>
                  <div className="px-5 pb-6 pt-5 sm:px-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-olive">{neighborhood.note}</p>
                    <h3 className="mt-2 font-serif text-2xl text-ink">{neighborhood.name}</h3>
                    <p className="mt-2 min-h-12 text-sm leading-6 text-muted-foreground">{neighborhood.description}</p>
                    <span className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest">
                      Explore neighborhood <ArrowUpRight className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="find-a-home" className="bg-paper py-16 sm:py-24" aria-labelledby="search-title">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">The right home, thoughtfully found</p>
            <h2 id="search-title" className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Begin with what matters to you.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground">
              Explore current listings and open houses, then work with a local advisor to narrow the search around your priorities.
            </p>
            <Link href="/open-houses" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-forest hover:text-olive">
              See upcoming open houses <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="border border-stone bg-white p-5 sm:p-8">
            <h3 className="mb-5 font-serif text-2xl text-ink">Search Las Vegas homes</h3>
            <RealScoutSearchCard />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24" aria-labelledby="advisor-title">
        <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-8 md:grid-cols-[0.72fr_1.28fr] md:items-center md:gap-16 lg:px-12">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden bg-stone md:max-w-none">
            <Image
              src="/images/team/dr-jan-duffy.jpg"
              alt="Dr. Jan Duffy, Las Vegas real estate advisor"
              fill
              sizes="(max-width: 768px) 90vw, 35vw"
              className="object-cover"
            />
          </div>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">A more personal approach</p>
            <h2 id="advisor-title" className="mt-3 font-serif text-4xl leading-tight tracking-tight text-ink sm:text-5xl">
              Local knowledge. A relationship that lasts.
            </h2>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Buying or selling a home is personal. Dr. Jan Duffy brings more than three decades of open-house experience, a research-minded approach, and a deep understanding of Summerlin and the Las Vegas Valley to every conversation.
            </p>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              Every move begins with listening—then a clear plan shaped around your timing, goals, and the details that make a place feel like home.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/about" className="inline-flex min-h-12 items-center justify-center gap-2 bg-forest px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-olive">
                Meet Dr. Jan <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <a href={`tel:${GBP.phoneE164}`} className="inline-flex min-h-12 items-center justify-center gap-2 border border-stone px-6 py-3 text-sm font-semibold text-forest transition-colors hover:border-forest">
                <Phone className="size-4" aria-hidden="true" /> {GBP.phone}
              </a>
            </div>
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              Berkshire Hathaway HomeServices Nevada Properties · Nevada License {"S.0197614.LLC"}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-stone bg-paper py-16 sm:py-20" aria-labelledby="faq-title">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">A few useful details</p>
          <h2 id="faq-title" className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Before you make your move.</h2>
          <dl className="mt-8 divide-y divide-stone">
            {HOME_PAGE_FAQS.map((faq) => (
              <div key={faq.question} className="py-5">
                <dt className="font-medium text-ink">{faq.question}</dt>
                <dd className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-forest px-5 py-16 text-center text-white sm:px-8 sm:py-20" aria-labelledby="private-tour-title">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">Your next chapter starts here</p>
          <h2 id="private-tour-title" className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
            A considered move begins with a conversation.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75">
            Tell us what you are looking for. We will help you make a thoughtful plan for your home in Las Vegas.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/book-tour" className="inline-flex min-h-12 items-center justify-center gap-2 bg-cream px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white">
              Arrange a private tour <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/contact" className="inline-flex min-h-12 items-center justify-center border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
