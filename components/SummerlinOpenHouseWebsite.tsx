'use client'

import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'
import { Calendar, Phone } from 'lucide-react'
import { REALSCOUT_OFFICE_PRICE_RANGE_LABEL } from '@/config/realscout-office-bands'
import StickySearchBar from './StickySearchBar'
import PrimaryCtaButtons from '@/components/conversion/PrimaryCtaButtons'
import CalendlyPopupLink from '@/components/CalendlyPopupLink'
import { GBP } from '@/config/gbp'
import { BRAND_CTA_BUTTON_CLASS } from '@/config/brand'
import { HOME_PAGE_FAQS } from '@/config/seo'

const ExitIntentPopup = dynamic(() => import('./ExitIntentPopup'))

const SummerlinOpenHouseWebsite = () => {
  const [showExitPopup, setShowExitPopup] = useState(false)
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)
  // Buyer tools moved into BuyerToolsSection

  // Delay page ready state to ensure Google Analytics loads first
  useEffect(() => {
    // Wait 15 seconds before allowing exit intent popup to show
    // This gives Google Analytics time to load and be detected
    const timer = setTimeout(() => {
      setIsPageReady(true)
    }, 15000) // 15 seconds delay

    return () => clearTimeout(timer)
  }, [])

  // Exit intent detection - only after page is ready
  useEffect(() => {
    if (!isPageReady) return // Don't show popup until page is ready

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true)
        setHasShownExitPopup(true)
      }
    }

    const handleBeforeUnload = () => {
      if (!hasShownExitPopup) {
        setShowExitPopup(true)
        setHasShownExitPopup(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [hasShownExitPopup, isPageReady])

  return (
    <div className="min-h-screen bg-gray-50">
      <StickySearchBar />

      {/* AEO / GEO: visible answers matching homepage FAQPage JSON-LD */}
      <section className="border-b border-gray-200 bg-white py-10 sm:py-12" aria-labelledby="home-open-house-faq-heading">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 id="home-open-house-faq-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Summerlin Las Vegas open houses: quick answers
          </h2>
          <p className="mt-2 text-gray-600">
            Straightforward facts for buyers searching Summerlin and Las Vegas—aligned with how people ask voice assistants and AI search.
          </p>
          <dl className="mt-8 space-y-6">
            {HOME_PAGE_FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="font-semibold text-gray-900">{faq.question}</dt>
                <dd className="mt-2 text-gray-700 leading-relaxed">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-center">
            <Link href="/open-houses" className="font-semibold text-brand-teal hover:text-brand-plum hover:underline">
              Open Houses hub: tours, FAQs, and scheduling →
            </Link>
          </p>
        </div>
      </section>

      {/* Live MLS: one RealScout embed set site-wide in layout (#office-listings-bands) — avoids duplicate grids on the homepage */}
      <section className="bg-gray-50 py-8 sm:py-12" aria-labelledby="home-live-listings-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 id="home-live-listings-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Live listings: Summerlin Las Vegas open houses &amp; homes for sale
            </h2>
            <p className="text-lg text-gray-600">
              Browse{' '}
              <a href="#office-listings-bands" className="font-semibold text-brand-teal hover:text-brand-plum hover:underline">
                office MLS listings
              </a>{' '}
              ({REALSCOUT_OFFICE_PRICE_RANGE_LABEL}), or use the full{' '}
              <Link href="/tour/mls" className="font-semibold text-brand-teal hover:text-brand-plum hover:underline">
                MLS property search
              </Link>{' '}
              and{' '}
              <Link href="/open-houses" className="font-semibold text-brand-teal hover:text-brand-plum hover:underline">
                open houses hub
              </Link>
              . For market context, see the{' '}
              <Link href="/market-report" className="font-semibold text-brand-teal hover:underline">
                market report
              </Link>{' '}
              or{' '}
              <Link href="/book-tour" className="font-semibold text-brand-teal hover:underline">
                schedule a showing
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Neighborhood Spotlight */}
      <section className="bg-white py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Summerlin West Neighborhoods
            </h2>
            <p className="text-lg text-gray-600">
              Explore Las Vegas's premier master-planned community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "The Ridges",
                description: "Luxury custom homes with stunning mountain and city views",
                priceRange: "$1.5M - $5M+",
                highlights: ["Guard-gated", "Custom lots", "Mountain views"],
                image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=250&fit=crop"
              },
              {
                name: "Red Rock Country Club",
                description: "Championship golf course living with resort-style amenities",
                priceRange: "$800K - $3M",
                highlights: ["Golf course", "Country club", "Tennis"],
                image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=250&fit=crop"
              },
              {
                name: "Summerlin Centre",
                description: "Family-friendly community with parks and top-rated schools",
                priceRange: "$500K - $900K",
                highlights: ["Great schools", "Parks", "Family-friendly"],
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=250&fit=crop"
              }
            ].map((neighborhood) => {
              const neighborhoodUrls: Record<string, string> = {
                'The Ridges': '/neighborhoods/the-ridges',
                'Red Rock Country Club': '/neighborhoods/red-rock-country-club',
                'Summerlin Centre': '/neighborhoods/summerlin-centre',
              }
              const neighborhoodUrl = neighborhoodUrls[neighborhood.name] || '#'
              
              return (
                <div key={neighborhood.name} className="bg-gray-50 rounded-lg overflow-hidden">
                  <Link href={neighborhoodUrl}>
                    <OptimizedImage
                      src={neighborhood.image}
                      alt={`${neighborhood.name} - Summerlin West neighborhood`}
                      className="hover:opacity-90 transition-opacity"
                    />
                  </Link>
                  <div className="p-6">
                    <Link href={neighborhoodUrl}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-brand-teal">{neighborhood.name}</h3>
                    </Link>
                    <p className="text-gray-600 mb-3">{neighborhood.description}</p>
                    <p className="text-brand-teal font-semibold mb-3">{neighborhood.priceRange}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {neighborhood.highlights.map(highlight => (
                        <span key={highlight} className="bg-brand-mint text-brand-plum px-2 py-1 rounded text-sm font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <Link 
                      href={neighborhoodUrl}
                      className="inline-block text-brand-teal hover:text-brand-plum font-medium text-sm"
                    >
                      Explore {neighborhood.name} →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1">
            <Link href="/neighborhoods" className="text-brand-teal font-semibold hover:underline">
              Explore all neighborhoods →
            </Link>
            <Link href="/sitemap" className="text-brand-teal font-semibold hover:underline">
              Browse full sitemap
            </Link>
          </div>
        </div>
      </section>

      {/* Short testimonial strip */}
      <section className="bg-gray-50 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-700 italic max-w-2xl mx-auto mb-2">
            &ldquo;Dr. Jan found us the perfect home in The Ridges within 2 weeks. Her market knowledge is incredible!&rdquo; — Sarah & Mike Johnson
          </p>
          <Link href="/review-us" className="text-brand-teal font-semibold hover:underline">
            Read more reviews
          </Link>
        </div>
      </section>

      {/* Compact RealScout CTA band */}
      <section className="bg-brand-plum text-white py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Never miss your dream home</h3>
          <p className="text-brand-mint mb-6 max-w-xl mx-auto">Get MLS alerts for new listings, price drops, and open houses in Summerlin West.</p>
          <PrimaryCtaButtons layout="row" mlsLabel="Search & get alerts" />
        </div>
      </section>

      <section className="bg-brand-plum text-white py-8 sm:py-12 border-t border-brand-teal/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl font-bold mb-2">Work with Dr. Jan Duffy</h3>
          <p className="text-brand-mint/90 mb-4 max-w-xl mx-auto">
            Your trusted Summerlin West real estate expert · Nevada license S.0197614.LLC
          </p>
          <p className="text-white/70 text-sm mb-6">{GBP.address.street}, {GBP.address.locality}, {GBP.address.region} {GBP.address.postalCode}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`tel:${GBP.phoneE164}`} className="inline-flex items-center justify-center min-h-[48px] gap-2 border-2 border-brand-mint text-white hover:bg-brand-mint/20 px-6 py-3 rounded-xl font-semibold">
              <Phone className="h-4 w-4" aria-hidden />
              Call {GBP.phone}
            </a>
            <CalendlyPopupLink className={BRAND_CTA_BUTTON_CLASS}>
              <Calendar className="h-4 w-4" aria-hidden />
              Schedule a showing
            </CalendlyPopupLink>
          </div>
        </div>
      </section>

       {/* Exit Intent Popup */}
       <ExitIntentPopup
         isVisible={showExitPopup}
         onClose={() => setShowExitPopup(false)}
       />

     </div>
   )
 }

export default SummerlinOpenHouseWebsite
