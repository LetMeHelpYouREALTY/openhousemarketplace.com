import type { ReactNode } from 'react'
import { brandHeroGradientClass } from '@/lib/brand-classes'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'

type MarketingHeroProps = {
  title: string
  description: string
  children?: ReactNode
  showCtas?: boolean
}

/** Top-of-page hero for marketing routes — drives Calendly + MLS clicks. */
export default function MarketingHero({
  title,
  description,
  children,
  showCtas = true,
}: MarketingHeroProps) {
  return (
    <section className={`${brandHeroGradientClass} py-12 sm:py-16`}>
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">{description}</p>
        {showCtas ? (
          <div className="mt-8">
            <PrimaryCtaButtons />
          </div>
        ) : null}
        {children}
      </div>
    </section>
  )
}
