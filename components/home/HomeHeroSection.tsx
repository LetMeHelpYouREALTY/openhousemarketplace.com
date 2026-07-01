import Image from 'next/image'
import Link from 'next/link'
import { Home, Star, Award } from 'lucide-react'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import RealScoutSearchCard from '@/components/RealScoutSearchCard'
import RealScoutWidgetFrame from '@/components/conversion/RealScoutWidgetFrame'
import { GBP } from '@/config/gbp'
import { brandHeroGradientClass } from '@/lib/brand-classes'
import { SEO_PRIMARY_KEYWORD } from '@/config/seo'

/** Server-rendered homepage hero — keeps LCP (headline + avatar) out of the client bundle. */
export default function HomeHeroSection() {
  return (
    <section className={`${brandHeroGradientClass} py-10 sm:py-12 lg:py-16 rounded-b-3xl`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-left">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 shrink-0 mr-4 ring-2 ring-white/30">
                <Image
                  src="/images/team/dr-jan-duffy-128.webp"
                  alt="Dr. Jan Duffy, real estate agent serving Summerlin West and Las Vegas"
                  width={64}
                  height={64}
                  sizes="64px"
                  className="w-full h-full object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div>
                <p className="text-brand-mint text-sm font-medium">DR. JAN DUFFY</p>
                <p className="text-white text-lg font-semibold">Your Local Research-Driven Expert</p>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {SEO_PRIMARY_KEYWORD}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-white/90 mb-4">
              Your local research-driven expert for Summerlin West &amp; Las Vegas—Dr. Jan Duffy, {GBP.name}
            </p>
            <p className="text-base sm:text-xl mb-4 text-white">
              Get instant access to this weekend&apos;s premium open houses with personalized alerts and market insights.
            </p>
            <p className="text-base mb-8 text-white">
              <Link href="/open-houses" className="text-white font-semibold underline hover:no-underline">
                Browse all Summerlin Las Vegas open houses
              </Link>{' '}
              this weekend.
            </p>

            <div className="flex flex-wrap items-center gap-6 mb-8">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-2 shrink-0" aria-hidden />
                <span className="text-sm">Deep local knowledge: Summerlin West &amp; Las Vegas Valley</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-yellow-400 mr-2 shrink-0" aria-hidden />
                <span className="text-sm">Nevada license S.0197614.LLC · Berkshire Hathaway HomeServices Nevada Properties</span>
              </div>
            </div>

            <PrimaryCtaButtons layout="stack" className="!max-w-none !mx-0" calendlyLabel="Book a private showing" mlsLabel="Search MLS listings" />
          </div>

          <RealScoutWidgetFrame
            id="home-hero-search"
            stepLabel="Start here"
            title="Find your perfect Summerlin home"
            description="Use the MLS search below — save homes, get alerts, then book a tour with Dr. Jan Duffy."
          >
            <RealScoutSearchCard />
          </RealScoutWidgetFrame>
        </div>
      </div>
    </section>
  )
}
