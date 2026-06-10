import { Search, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import { brandAccentBadgeClass } from '@/lib/brand-classes'

type RealScoutWidgetFrameProps = {
  title: string
  description: string
  children: ReactNode
  id?: string
  stepLabel?: string
}

/** Visual frame that draws attention to RealScout embeds. */
export default function RealScoutWidgetFrame({
  title,
  description,
  children,
  id,
  stepLabel = 'Step 1 — Search',
}: RealScoutWidgetFrameProps) {
  return (
    <section id={id} className="conversion-widget-frame" aria-labelledby={id ? `${id}-heading` : undefined}>
      <div className="conversion-widget-inner">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="text-left">
            <span className={brandAccentBadgeClass}>
              <Search className="h-4 w-4 text-brand-teal" aria-hidden />
              {stepLabel}
            </span>
            <h2
              id={id ? `${id}-heading` : undefined}
              className="mt-2 text-xl font-bold text-brand-plum sm:text-2xl"
            >
              {title}
            </h2>
            <p className="mt-1 text-gray-600 text-sm sm:text-base">{description}</p>
          </div>
          <p className="hidden sm:flex items-center gap-1 text-sm font-medium text-brand-teal shrink-0">
            <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
            Search below
          </p>
        </div>
        <div className="conversion-pulse-ring rounded-xl">{children}</div>
      </div>
    </section>
  )
}
