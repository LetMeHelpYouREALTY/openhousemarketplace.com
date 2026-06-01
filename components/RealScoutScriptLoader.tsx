'use client'

import Script from 'next/script'
import { markRealScoutScriptReady } from '@/lib/realscout-script-ready'

/** Loads RealScout web components once; signals readiness for office-listings mounts. */
export default function RealScoutScriptLoader() {
  return (
    <Script
      id="realscout-web-components"
      src="https://em.realscout.com/widgets/realscout-web-components.umd.js"
      strategy="afterInteractive"
      onLoad={() => markRealScoutScriptReady()}
    />
  )
}
