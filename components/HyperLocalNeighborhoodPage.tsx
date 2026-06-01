'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { MapPin, Home, Clock, ChartBar, School, Leaf, Car, Search } from 'lucide-react'
import CalendlyInlineWidget from './CalendlyInlineWidget'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import { BRAND_CTA_BUTTON_CLASS } from '@/config/brand'
import { brandAccentBadgeClass } from '@/lib/brand-classes'

interface MarketStats {
  medianPrice: string
  daysOnMarket: number
  activeListings: number
  pricePerSqFt: string
  monthlyChange: string
}

interface SchoolInfo {
  name: string
  rating: number
  type: string
  distance: string
}

interface Amenity {
  name: string
  type: string
  distance: string
}

interface HyperLocalNeighborhoodPageProps {
  name: string
  description: string
  marketStats: MarketStats
  schools: SchoolInfo[]
  amenities: Amenity[]
  imageUrl: string
  realscoutUrl: string
  className?: string
  /** Use h2 when the page already has a top-level h1 (e.g. Open Houses hub). */
  heroHeadingLevel?: 'h1' | 'h2'
}

const HyperLocalNeighborhoodPage: React.FC<HyperLocalNeighborhoodPageProps> = ({
  name,
  description,
  marketStats,
  schools,
  amenities,
  imageUrl,
  realscoutUrl,
  className = "",
  heroHeadingLevel = 'h1',
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'schools' | 'amenities'>('overview')

  const handleRealScoutClick = () => {
    window.open(realscoutUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      {/* Hero Section */}
      <section 
        className={`relative h-[60vh] min-h-[400px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            {heroHeadingLevel === 'h2' ? (
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h2>
            ) : (
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{name}</h1>
            )}
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">{description}</p>
            <div className="flex flex-col items-center gap-4">
              <PrimaryCtaButtons
                layout="row"
                calendlyLabel="Book a private showing"
                mlsLabel="Search MLS listings"
              />
              <button
                type="button"
                onClick={handleRealScoutClick}
                className="text-sm font-semibold text-brand-mint underline-offset-2 hover:underline"
              >
                Or open full {name} search in RealScout →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'overview' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('market')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'market' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-gray-600'
              }`}
            >
              Market Stats
            </button>
            <button
              onClick={() => setActiveTab('schools')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'schools' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-gray-600'
              }`}
            >
              Schools
            </button>
            <button
              onClick={() => setActiveTab('amenities')}
              className={`px-6 py-4 font-medium ${
                activeTab === 'amenities' ? 'text-brand-teal border-b-2 border-brand-teal' : 'text-gray-600'
              }`}
            >
              Amenities
            </button>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">About {name}</h2>
                  <p className="text-gray-600 leading-relaxed">{description}</p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Current Market Snapshot</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-teal">{marketStats.medianPrice}</div>
                      <div className="text-sm text-gray-600">Median Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-teal">{marketStats.daysOnMarket}</div>
                      <div className="text-sm text-gray-600">Days on Market</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-teal">{marketStats.activeListings}</div>
                      <div className="text-sm text-gray-600">Active Listings</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-teal">{marketStats.pricePerSqFt}</div>
                      <div className="text-sm text-gray-600">Price/Sq.Ft</div>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {activeTab === 'market' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Analysis</h2>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Median Home Price</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.medianPrice}</div>
                    </div>
                    <div className="text-sm text-green-600">
                      {marketStats.monthlyChange} from last month
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Average Days on Market</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.daysOnMarket} days</div>
                    </div>
                    <Clock className="h-6 w-6 text-brand-teal" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Active Listings</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.activeListings}</div>
                    </div>
                    <Home className="h-6 w-6 text-brand-teal" />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-sm text-gray-600">Price per Square Foot</div>
                      <div className="text-xl font-bold text-gray-900">{marketStats.pricePerSqFt}</div>
                    </div>
                    <ChartBar className="h-6 w-6 text-brand-teal" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'schools' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Schools</h2>
                <div className="space-y-4">
                  {schools.map((school, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      <School className="h-6 w-6 text-brand-teal mt-1 mr-4" />
                      <div>
                        <div className="font-medium text-gray-900">{school.name}</div>
                        <div className="text-sm text-gray-600">{school.type}</div>
                        <div className="text-sm text-gray-600">Rating: {school.rating}/10</div>
                        <div className="text-sm text-gray-600">{school.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Local Amenities</h2>
                <div className="space-y-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                      {amenity.type === 'park' ? (
                        <Leaf className="h-6 w-6 text-green-600 mt-1 mr-4" />
                      ) : (
                        <MapPin className="h-6 w-6 text-brand-teal mt-1 mr-4" />
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{amenity.name}</div>
                        <div className="text-sm text-gray-600">{amenity.type}</div>
                        <div className="text-sm text-gray-600">{amenity.distance}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="rounded-2xl border-2 border-brand-teal/30 bg-gradient-to-b from-brand-mint/30 to-white p-6 shadow-lg">
              <span className={brandAccentBadgeClass}>Fastest way to tour</span>
              <h3 className="text-xl font-bold text-brand-plum mt-2 mb-2">Schedule a private showing</h3>
              <p className="text-gray-600 text-sm mb-4">Pick a time — Dr. Jan Duffy will meet you at the home or office.</p>
              <CalendlyPopupLink className={`${BRAND_CTA_BUTTON_CLASS} w-full mb-4`}>
                Book on Calendly
              </CalendlyPopupLink>
              <CalendlyInlineWidget
                minWidth={280}
                height={600}
                className="rounded-lg overflow-hidden"
              />
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Facts</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Car className="h-5 w-5 text-brand-teal mr-3" />
                  <span className="text-gray-600">15 minutes to Downtown</span>
                </div>
                <div className="flex items-center">
                  <School className="h-5 w-5 text-brand-teal mr-3" />
                  <span className="text-gray-600">Top-rated schools nearby</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="h-5 w-5 text-brand-teal mr-3" />
                  <span className="text-gray-600">Multiple parks and trails</span>
                </div>
                <div className="flex items-center">
                  <Home className="h-5 w-5 text-brand-teal mr-3" />
                  <span className="text-gray-600">Gated communities available</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-brand-mint bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-brand-plum mb-2 flex items-center gap-2">
                <Search className="h-5 w-5 text-brand-teal" aria-hidden />
                {name} listings
              </h3>
              <p className="text-sm text-gray-600 mb-4">Live MLS homes — save favorites and request tours.</p>
              <button
                type="button"
                onClick={handleRealScoutClick}
                className={`${BRAND_CTA_BUTTON_CLASS} w-full`}
              >
                View all {name} homes
              </button>
              <Link
                href="#office-listings-bands"
                className="mt-3 block text-center text-sm font-semibold text-brand-teal hover:text-brand-plum"
              >
                Scroll to site-wide MLS grid ↓
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HyperLocalNeighborhoodPage
