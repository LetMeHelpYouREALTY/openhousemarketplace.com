import { Calendar, Search, Sparkles } from 'lucide-react'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { brandHeroGradientClass } from '@/lib/brand-classes'

type ScheduleTourBandProps = {
  headline?: string
  subline?: string
}

export default function ScheduleTourBand({
  headline = 'See homes in person — or search MLS now',
  subline =
    'Pick a time with Dr. Jan Duffy for a private Summerlin showing, or use the live MLS search below to save favorites and get alerts.',
}: ScheduleTourBandProps) {
  return (
    <section
      className={`${brandHeroGradientClass} py-12 sm:py-16`}
      aria-labelledby="schedule-tour-band-heading"
    >
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-brand-mint">
          <Sparkles className="h-4 w-4" aria-hidden />
          Free · No pressure · Summerlin expert
        </p>
        <h2 id="schedule-tour-band-heading" className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          {headline}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/90 sm:text-lg">{subline}</p>
        <div className="mt-8">
          <PrimaryCtaButtons layout="row" mlsLabel="Browse live MLS listings ↓" />
        </div>
        <p className="mt-6 text-sm text-brand-mint/90">
          <Calendar className="mr-1 inline h-4 w-4" aria-hidden />
          Typical slots: weekdays & weekends ·{' '}
          <Search className="mr-1 inline h-4 w-4" aria-hidden />
          RealScout search loads on every page below
        </p>
      </div>
    </section>
  )
}
