'use client'

import { useEffect, useState } from 'react'
import {
  isRealScoutScriptReady,
  markRealScoutScriptReady,
  subscribeRealScoutScriptReady,
} from '@/lib/realscout-script-ready'

const OFFICE_TAG = 'realscout-office-listings'

function isOfficeListingsDefined(): boolean {
  return typeof window !== 'undefined' && Boolean(window.customElements?.get?.(OFFICE_TAG))
}

/** Script loaded + custom element registered (safe to mount office listings). */
export function isRealScoutOfficeListingsReady(): boolean {
  return isRealScoutScriptReady() && isOfficeListingsDefined()
}

/**
 * If the UMD bundle is already in the document (client navigations), mark script ready
 * once the custom element exists.
 */
export function syncRealScoutScriptReadyFromDom(): void {
  if (typeof window === 'undefined') return
  if (isRealScoutScriptReady()) return
  if (isOfficeListingsDefined()) {
    markRealScoutScriptReady()
  }
}

export function useRealScoutOfficeListingsReady(): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const check = () => {
      syncRealScoutScriptReadyFromDom()
      if (isRealScoutOfficeListingsReady()) {
        setReady(true)
        return true
      }
      return false
    }

    if (check()) return

    const unsubScript = subscribeRealScoutScriptReady(() => {
      if (check()) return
      const poll = setInterval(() => {
        if (check()) clearInterval(poll)
      }, 50)
      setTimeout(() => clearInterval(poll), 12000)
    })

    const poll = setInterval(() => {
      if (check()) clearInterval(poll)
    }, 100)
    const timeout = setTimeout(() => clearInterval(poll), 12000)

    return () => {
      unsubScript()
      clearInterval(poll)
      clearTimeout(timeout)
    }
  }, [])

  return ready
}
