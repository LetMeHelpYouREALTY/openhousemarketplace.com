'use client'

import { useState } from 'react'
import {
  MapPin,
  UtensilsCrossed,
  TreePine,
  Car,
  Coffee,
  ShoppingCart,
  Fuel,
  Dumbbell,
  Pill,
  ExternalLink as ExternalLinkIcon,
} from 'lucide-react'
import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import ExternalLink from '@/components/ExternalLink'
import { getGoogleMapsNearbySearchUrl } from '@/config/gbp'

const AMENITY_TYPES: { type: string; label: string; searchQuery: string; icon: React.ReactNode }[] = [
  { type: 'restaurant', label: 'Restaurants', searchQuery: 'restaurants', icon: <UtensilsCrossed className="h-4 w-4" /> },
  { type: 'park', label: 'Parks', searchQuery: 'parks', icon: <TreePine className="h-4 w-4" /> },
  { type: 'parking', label: 'Parking', searchQuery: 'parking', icon: <Car className="h-4 w-4" /> },
  { type: 'cafe', label: 'Cafes', searchQuery: 'cafes', icon: <Coffee className="h-4 w-4" /> },
  { type: 'grocery', label: 'Grocery', searchQuery: 'grocery stores', icon: <ShoppingCart className="h-4 w-4" /> },
  { type: 'gas', label: 'Gas', searchQuery: 'gas stations', icon: <Fuel className="h-4 w-4" /> },
  { type: 'gym', label: 'Gyms', searchQuery: 'gyms', icon: <Dumbbell className="h-4 w-4" /> },
  { type: 'pharmacy', label: 'Pharmacies', searchQuery: 'pharmacies', icon: <Pill className="h-4 w-4" /> },
]

export default function AmenityMap() {
  const [activeType, setActiveType] = useState<string>('restaurant')

  const activeAmenity =
    AMENITY_TYPES.find((a) => a.type === activeType) ?? AMENITY_TYPES[0]!
  const searchUrl = getGoogleMapsNearbySearchUrl(activeAmenity.searchQuery)

  return (
    <div className="relative w-full space-y-4">
      <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5 w-full sm:w-auto">
          <MapPin className="h-4 w-4 text-brand-teal" aria-hidden />
          Explore nearby in Google Maps:
        </span>
        {AMENITY_TYPES.map(({ type, label, icon }) => (
          <button
            key={type}
            type="button"
            onClick={() => setActiveType(type)}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
              activeType === type
                ? 'bg-brand-teal text-white border-brand-teal'
                : 'bg-white text-gray-700 border-gray-300 hover:border-brand-teal'
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <GoogleMyMapsEmbed
        mapScope="service-area"
        title={`Summerlin area map — nearby ${activeAmenity.label.toLowerCase()}`}
      />

      <p className="text-sm text-gray-600 text-center">
        <ExternalLink
          href={searchUrl}
          className="inline-flex items-center gap-1.5 font-semibold text-brand-teal hover:text-brand-plum"
          ariaLabel={`Open ${activeAmenity.label} near Summerlin in Google Maps`}
          showIcon={false}
        >
          <ExternalLinkIcon className="h-4 w-4" aria-hidden />
          View {activeAmenity.label.toLowerCase()} near Summerlin in Google Maps
        </ExternalLink>
      </p>
    </div>
  )
}
