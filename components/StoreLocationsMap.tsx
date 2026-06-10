'use client'

import { MapPin, Phone, Clock, Navigation } from 'lucide-react'
import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import type { StoreLocation } from '@/data/storeLocations'

interface StoreLocationsMapProps {
  locations: StoreLocation[]
  className?: string
}

export default function StoreLocationsMap({ locations, className = '' }: StoreLocationsMapProps) {
  if (locations.length === 0) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-gray-50 p-8 text-center ${className}`}>
        <p className="text-gray-600">
          Office location details are temporarily unavailable. Please call or use the contact page and we
          will help you plan your visit.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      <div className="lg:col-span-1 space-y-4 order-2 lg:order-1">
        <h2 className="text-lg font-semibold text-gray-900">Office details</h2>
        {locations.map((loc) => (
          <article
            key={loc.id}
            className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold text-gray-900 mb-2">{loc.name}</h3>
            <div className="flex items-start gap-2 text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-brand-teal" aria-hidden />
              <span>
                {loc.address}, {loc.city}, {loc.state} {loc.zip}
              </span>
            </div>
            {loc.phone && (
              <div className="flex items-center gap-2 text-sm mb-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-teal" aria-hidden />
                <a href={`tel:+1${loc.phone.replace(/\D/g, '')}`} className="text-brand-teal hover:underline">
                  {loc.phone}
                </a>
              </div>
            )}
            {loc.hours && (
              <div className="flex items-start gap-2 text-xs text-gray-500 mb-3">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                <span>{loc.hours}</span>
              </div>
            )}
            <a
              href={loc.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-teal hover:text-brand-plum"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Get directions
            </a>
          </article>
        ))}
      </div>

      <div className="lg:col-span-2 order-1 lg:order-2">
        <GoogleMyMapsEmbed
          mapScope="office"
          title="Open House Market Place office — 760 Windover Ct, Summerlin"
        />
      </div>
    </div>
  )
}
