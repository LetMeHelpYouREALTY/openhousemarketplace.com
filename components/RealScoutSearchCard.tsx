'use client'

import { useEffect, useState, type CSSProperties } from 'react'
import ExternalLink from '@/components/ExternalLink'

export default function RealScoutSearchCard() {
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false)

  useEffect(() => {
    const checkWidget = window.setInterval(() => {
      if (window.customElements?.get('realscout-advanced-search')) {
        setIsWidgetLoaded(true)
        window.clearInterval(checkWidget)
      }
    }, 100)

    const timeout = window.setTimeout(() => window.clearInterval(checkWidget), 5000)
    return () => {
      window.clearInterval(checkWidget)
      window.clearTimeout(timeout)
    }
  }, [])

  return (
    <div>
      <div className="realscout-search-container">
        {!isWidgetLoaded && (
          <div className="animate-pulse" aria-hidden="true">
            <div className="mb-3 h-12 rounded-sm bg-stone" />
            <div className="mb-3 h-12 rounded-sm bg-stone" />
            <div className="h-12 rounded-sm bg-stone" />
          </div>
        )}
        {/* @ts-expect-error - Web component is defined at runtime */}
        <realscout-advanced-search
          agent-encoded-id="QWdlbnQtMjI1MDUw"
          class={isWidgetLoaded ? 'opacity-100' : 'opacity-0'}
          style={{ transition: 'opacity 0.3s ease-in-out' } as CSSProperties}
        />
      </div>
      <div className="mt-5 border-t border-stone pt-4 text-center">
        <ExternalLink
          href="https://drjanduffy.realscout.com"
          className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-forest transition-colors hover:text-olive"
          showIcon={false}
        >
          Open the full home search <span aria-hidden="true">→</span>
        </ExternalLink>
      </div>
    </div>
  )
}
