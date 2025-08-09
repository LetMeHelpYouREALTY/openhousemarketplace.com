'use client'

import React, { useEffect, useState } from 'react'
import { Home, Phone } from 'lucide-react'

export default function StickySearchBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className={
        `fixed top-0 left-0 right-0 bg-white shadow-lg z-[60] transform transition-transform duration-300 ` +
        (isVisible ? 'translate-y-0' : '-translate-y-full')
      }
      role="region"
      aria-label="Sticky search bar"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Home className="h-6 w-6 text-red-600 mr-2" />
            <span className="font-bold text-gray-900 hidden sm:block">Summerlin Open Houses</span>
          </div>

          {/* Simple Search */}
          <div className="flex-1 max-w-md mx-4">
            {/* @ts-expect-error: web component defined at runtime */}
            <realscout-simple-search
              agent-encoded-id="QWdlbnQtMjI1MDUw"
              class="w-full"
            />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hidden sm:block"
              onClick={() => window.open('https://drjanduffy.realscout.com', '_blank')}
            >
              This Weekend's Tours
            </button>
            <button
              className="text-gray-600 p-2"
              onClick={() => window.open('tel:17029051222')}
              aria-label="Call Dr. Jan"
              title="Call Dr. Jan"
            >
              <Phone className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


