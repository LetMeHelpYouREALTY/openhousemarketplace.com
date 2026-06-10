'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navigation, Car, Footprints, Bike, Train, MapPin } from 'lucide-react'
import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import ExternalLink from '@/components/ExternalLink'
import {
  getGoogleMapsDirectionsUrlFromOrigin,
  getOfficeAddressQuery,
  type GoogleMapsTravelMode,
} from '@/config/gbp'
import type { StoreLocation } from '@/data/storeLocations'

interface DirectionsWidgetProps {
  destinations: StoreLocation[]
  className?: string
}

const TRAVEL_MODE_OPTIONS: { value: GoogleMapsTravelMode; label: string; icon: React.ReactNode }[] = [
  { value: 'driving', label: 'Driving', icon: <Car className="h-4 w-4" /> },
  { value: 'walking', label: 'Walking', icon: <Footprints className="h-4 w-4" /> },
  { value: 'bicycling', label: 'Bicycling', icon: <Bike className="h-4 w-4" /> },
  { value: 'transit', label: 'Transit', icon: <Train className="h-4 w-4" /> },
]

export default function DirectionsWidget({ destinations, className = '' }: DirectionsWidgetProps) {
  const [origin, setOrigin] = useState('')
  const [destinationId, setDestinationId] = useState<string>(destinations[0]?.id ?? '')
  const [travelMode, setTravelMode] = useState<GoogleMapsTravelMode>('driving')
  const [error, setError] = useState<string | null>(null)

  if (destinations.length === 0) {
    return (
      <div className={`rounded-xl border border-gray-200 bg-gray-50 p-6 text-center ${className}`}>
        <p className="text-gray-600">
          Directions are temporarily unavailable.{' '}
          <Link href="/store-locations" className="text-brand-teal font-medium hover:underline">
            View our Summerlin office on the map
          </Link>{' '}
          or call us for help planning your visit.
        </p>
      </div>
    )
  }

  const selectedDestination = destinations.find((d) => d.id === destinationId)
  const destinationQuery = selectedDestination
    ? `${selectedDestination.address}, ${selectedDestination.city}, ${selectedDestination.state} ${selectedDestination.zip}`
    : getOfficeAddressQuery()

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }
    setError(null)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setOrigin(`${pos.coords.latitude},${pos.coords.longitude}`)
      },
      () => {
        setError('Could not get your location. Enter an address instead.')
      }
    )
  }

  const directionsUrl =
    origin.trim().length > 0
      ? getGoogleMapsDirectionsUrlFromOrigin(origin.trim(), destinationQuery, travelMode)
      : null

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4 p-4 rounded-xl border border-gray-200 bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">Plan your visit</h2>
          <p className="text-sm text-gray-600">
            Enter a starting point and open turn-by-turn directions in Google Maps. No API key required.
          </p>

          <div>
            <label htmlFor="directions-origin" className="block text-sm font-medium text-gray-700 mb-1">
              From (address or city)
            </label>
            <div className="flex gap-2">
              <input
                id="directions-origin"
                type="text"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="e.g. Las Vegas, NV or 123 Main St"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
              />
              <button
                type="button"
                onClick={handleUseMyLocation}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand-teal text-white text-sm font-medium hover:bg-brand-plum"
                title="Use my location"
              >
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">My location</span>
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="directions-destination" className="block text-sm font-medium text-gray-700 mb-1">
              To (our location)
            </label>
            <select
              id="directions-destination"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} – {d.city}
                </option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Travel mode</span>
            <div className="flex flex-wrap gap-2">
              {TRAVEL_MODE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setTravelMode(opt.value)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    travelMode === opt.value
                      ? 'border-brand-teal bg-brand-teal text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-brand-teal'
                  }`}
                >
                  {opt.icon}
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {directionsUrl ? (
            <ExternalLink
              href={directionsUrl}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-brand-teal px-4 py-3 text-white font-semibold hover:bg-brand-plum"
              ariaLabel="Open directions in Google Maps"
              showIcon={false}
            >
              <Navigation className="h-5 w-5" />
              Open directions in Google Maps
            </ExternalLink>
          ) : (
            <p className="text-sm text-gray-500">Enter a starting point to open directions.</p>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>

        <div className="lg:col-span-2">
          <GoogleMyMapsEmbed
            mapScope="office"
            title="Directions destination — Open House Market Place, Summerlin"
          />
        </div>
      </div>
    </div>
  )
}
