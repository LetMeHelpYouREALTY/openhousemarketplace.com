'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { Calendar, Heart } from 'lucide-react'
import { ListingDetailModal } from './ListingDetailModal'
import { VirtualTourBadge } from './VirtualTourBadge'
import { VirtualTourModal } from './VirtualTourModal'
import CalendlyPopupLink from './CalendlyPopupLink'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { brandAccentBadgeClass } from '@/lib/brand-classes'
import GoogleMyMapsEmbed from '@/components/GoogleMyMapsEmbed'
import { summerlinOpenHouses } from '@/data/summerlinOpenHouses'
import { SEO_FEATURED_OPEN_HOUSES_HEADING } from '@/config/seo'
import type { Listing } from '@/types/listing'
import { Checkbox } from './ui/checkbox'

const NEIGHBORHOOD_URL_MAP: Record<string, string> = {
  'The Ridges': '/neighborhoods/the-ridges',
  'Red Rock Country Club': '/neighborhoods/red-rock-country-club',
  'Summerlin Centre': '/neighborhoods/summerlin-centre',
  'Sun City Summerlin': '/neighborhoods/sun-city-summerlin',
  'Mesa Ridge': '/neighborhoods/mesa-ridge',
  'Willows': '/neighborhoods/willows',
}

export default function FeaturedOpenHouses() {
  const [searchQuery] = useState('')
  const [selectedNeighborhood] = useState('all')
  const [filterVirtualTour, setFilterVirtualTour] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [showMap, setShowMap] = useState(false)
  const [tourModalUrl, setTourModalUrl] = useState<string | null>(null)
  const [detailListing, setDetailListing] = useState<Listing | null>(null)

  const openHouses = summerlinOpenHouses

  const filteredHouses = openHouses.filter((house) => {
    const matchesSearch =
      house.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      house.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesNeighborhood =
      selectedNeighborhood === 'all' || house.neighborhood === selectedNeighborhood
    const matchesVirtualTour = !filterVirtualTour || !!house.virtualTourUrl
    return matchesSearch && matchesNeighborhood && matchesVirtualTour
  })

  const virtualTourCount = openHouses.filter((h) => h.virtualTourUrl).length

  const toggleFavorite = (houseId: number) => {
    setFavorites((prev) =>
      prev.includes(houseId) ? prev.filter((id) => id !== houseId) : [...prev, houseId]
    )
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className={`mb-4 ${brandAccentBadgeClass}`}>
            <Calendar className="h-4 w-4 text-brand-teal" aria-hidden />
            This weekend — book a private showing
          </div>
          <h2 className="mb-4 text-2xl sm:text-3xl font-bold text-gray-900">
            {SEO_FEATURED_OPEN_HOUSES_HEADING}
          </h2>
          <p className="mb-6 text-lg text-gray-600">
            {filteredHouses.length} premium Summerlin Las Vegas open houses in Summerlin West.{' '}
            <Link href="/open-houses" className="font-semibold text-brand-teal hover:underline">
              See all Summerlin Las Vegas open house listings
            </Link>
            .
          </p>

          <div className="mb-8">
            <PrimaryCtaButtons layout="row" calendlyLabel="Schedule a private showing" />
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
            <label className="flex cursor-pointer items-center gap-2" htmlFor="filter-virtual-tour">
              <Checkbox
                id="filter-virtual-tour"
                checked={filterVirtualTour}
                onCheckedChange={(checked) => setFilterVirtualTour(checked === true)}
                aria-describedby="virtual-tour-count"
              />
              <span className="text-sm font-medium">Virtual Tour Available</span>
            </label>
            <span id="virtual-tour-count" className="text-sm text-gray-600">
              {virtualTourCount} listing{virtualTourCount !== 1 ? 's' : ''} with virtual tours
              available
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => setShowMap((v) => !v)}
              className="min-h-[44px] inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 shadow-md transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
            >
              {showMap ? 'Show list' : 'Show map'}
            </button>
            <button
              type="button"
              onClick={() =>
                window.open(
                  'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==',
                  '_blank'
                )
              }
              className="min-h-[44px] inline-flex items-center justify-center rounded-xl bg-brand-teal px-6 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:bg-brand-plum hover:shadow-lg"
            >
              View All Listings
            </button>
            <CalendlyPopupLink className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-gray-200 bg-gray-100 px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-300 hover:bg-gray-200">
              Schedule a private showing
            </CalendlyPopupLink>
          </div>
        </div>

        {showMap ? (
          <div className="mb-8">
            <GoogleMyMapsEmbed
              mapScope="service-area"
              title="Summerlin open houses area map"
            />
            <p className="mt-3 text-center text-sm text-gray-600">
              Browse individual listings below or{' '}
              <Link href="/open-houses" className="font-semibold text-brand-teal hover:underline">
                see all open houses
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHouses.map((house, index) => (
              <div
                key={house.id}
                className="overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <div className="relative">
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() =>
                      window.open(
                        'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==',
                        '_blank'
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        window.open(
                          'https://drjanduffy.realscout.com/homesearch/shared-searches/U2hhcmVhYmxlU2VhcmNoTGluay0xMDkzMA==',
                          '_blank'
                        )
                      }
                    }}
                    className="cursor-pointer"
                    title="Click to view all listings"
                  >
                    <OptimizedImage
                      src={house.image}
                      alt={`${house.address} - ${house.neighborhood} open house`}
                      className="transition-opacity hover:opacity-90"
                      priority={index === 0}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleFavorite(house.id)}
                    className="absolute right-3 top-3 rounded-full bg-white/80 p-2 transition-colors hover:bg-white"
                    aria-label={
                      favorites.includes(house.id) ? 'Remove from favorites' : 'Add to favorites'
                    }
                    title={
                      favorites.includes(house.id) ? 'Remove from favorites' : 'Add to favorites'
                    }
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(house.id) ? 'fill-current text-brand-teal' : 'text-gray-600'
                      }`}
                    />
                  </button>
                  <div className="absolute bottom-3 left-3">
                    <span className="rounded bg-brand-teal px-2 py-1 text-sm font-medium text-white">
                      {house.openHouseTime}
                    </span>
                  </div>
                  <div className="absolute left-3 top-3">
                    <span className="rounded bg-brand-teal px-2 py-1 text-sm font-medium text-white">
                      New This Weekend!
                    </span>
                  </div>
                  {house.virtualTourUrl && (
                    <VirtualTourBadge
                      onClick={() => setTourModalUrl(house.virtualTourUrl ?? null)}
                    />
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <p className="text-lg font-bold text-gray-900">{house.price}</p>
                    <span className="text-sm text-gray-600">{house.zipCode}</span>
                  </div>

                  <p className="mb-2 text-gray-700">{house.address}</p>
                  {house.neighborhood &&
                    (NEIGHBORHOOD_URL_MAP[house.neighborhood] ? (
                      <Link
                        href={NEIGHBORHOOD_URL_MAP[house.neighborhood]!}
                        className="mb-3 inline-block text-sm font-medium text-brand-teal hover:text-brand-plum"
                      >
                        {house.neighborhood}
                      </Link>
                    ) : (
                      <p className="mb-3 text-sm font-medium text-brand-teal">{house.neighborhood}</p>
                    ))}

                  <div className="mb-3 flex justify-between text-sm text-gray-600">
                    <span>{house.beds} beds</span>
                    <span>{house.baths} baths</span>
                    <span>{house.sqft} sqft</span>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-1">
                    {house.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                      >
                        {feature}
                      </span>
                    ))}
                    {house.features.length > 2 && (
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
                        +{house.features.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setDetailListing(house)}
                      className="w-full rounded border border-brand-teal px-3 py-2 text-sm font-medium text-brand-teal hover:bg-brand-mint/40"
                    >
                      View details
                    </button>
                    <CalendlyPopupLink className="flex-1 rounded bg-brand-teal px-3 py-2 text-sm font-medium text-white hover:bg-brand-plum text-center block">
                      Schedule a private showing
                    </CalendlyPopupLink>
                    <button
                      type="button"
                      onClick={() => window.open(`https://maps.google.com/?q=${house.address}`, '_blank')}
                      className="flex-1 rounded bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                    >
                      Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ListingDetailModal
        open={!!detailListing}
        onOpenChange={(open) => !open && setDetailListing(null)}
        listing={detailListing}
        onOpenVirtualTour={(url) => {
          setDetailListing(null)
          setTourModalUrl(url)
        }}
      />
      {tourModalUrl && (
        <VirtualTourModal
          isOpen={!!tourModalUrl}
          onClose={() => setTourModalUrl(null)}
          url={tourModalUrl}
          title="Virtual tour"
        />
      )}
    </section>
  )
}
