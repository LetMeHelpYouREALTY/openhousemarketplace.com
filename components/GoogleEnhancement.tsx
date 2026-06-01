'use client'

/**
 * Per-route WebPage JSON-LD (GEO / AEO page context).
 * Sitewide Organization, LocalBusiness, RealEstateAgent, and WebSite live in SiteEntityGraph.
 */
import { usePathname } from 'next/navigation'
import { getSiteUrl } from '@/lib/site'
import { SEO_HOME_DESCRIPTION, SEO_OPEN_HOUSES_DESCRIPTION, SEO_PRIMARY_KEYWORD } from '@/config/seo'

const BASE_URL = getSiteUrl()

const PAGE_META: Record<string, { name: string; description: string }> = {
  '/': {
    name: 'Summerlin Las Vegas Open Houses | Dr. Jan Duffy Real Estate',
    description: SEO_HOME_DESCRIPTION,
  },
  '/about': { name: 'About Dr. Jan Duffy | Summerlin West Real Estate Agent', description: 'Meet Dr. Jan Duffy, your trusted Summerlin West real estate agent. Expert in luxury homes, new construction, and Las Vegas real estate.' },
  '/contact': { name: 'Contact Dr. Jan Duffy | Summerlin West Real Estate', description: 'Contact Dr. Jan Duffy for Summerlin West real estate. Schedule a private showing, get a market report, or discuss buying and selling in Las Vegas.' },
  '/open-houses': { name: `${SEO_PRIMARY_KEYWORD} | Dr. Jan Duffy`, description: SEO_OPEN_HOUSES_DESCRIPTION },
  '/book-tour': { name: 'Schedule a private showing | Dr. Jan Duffy | Summerlin Real Estate', description: 'Schedule a private showing with Dr. Jan Duffy. Book a time that works for you.' },
  '/schedule-consultation': { name: 'Schedule a Free Consultation | Dr. Jan Duffy Real Estate', description: 'Schedule a free consultation with Dr. Jan Duffy. Discuss your goals or schedule a private showing—no obligation.' },
  '/open-house-guide': { name: 'Open House Guide 2026 | What Buyers Need to Know | Summerlin Las Vegas', description: 'NAR rules shape how open houses work in 2026. Learn what forms to expect, your rights as a buyer, and how to get the most from Summerlin open houses with Dr. Jan Duffy.' },
  '/amenity-map': { name: 'Amenity Map | Nearby Restaurants, Parks & More | Summerlin', description: 'Explore nearby amenities in Summerlin: restaurants, parks, parking, cafes, grocery, gyms, pharmacies. Interactive map powered by Google Maps.' },
  '/store-locations': { name: 'Office Location & Map | Summerlin Open Houses | Dr. Jan Duffy', description: 'Visit Open House Market Place in Summerlin West. Office map, directions, phone, and hours for open house tours.' },
  '/directions': { name: 'Get Directions | Plan Your Visit | Dr. Jan Duffy Real Estate', description: 'Plan your trip to our Summerlin office. Driving, transit, walking, and biking directions with estimated travel time.' },
  '/tour/mls': { name: 'MLS Property Search | Summerlin Real Estate | Dr. Jan Duffy', description: "Search MLS listings in Summerlin. Access the full MLS database of homes for sale in Las Vegas's premier master-planned community." },
  '/neighborhoods': { name: 'Summerlin Neighborhoods | Dr. Jan Duffy Real Estate', description: 'Explore Summerlin West neighborhoods: The Ridges, Red Rock Country Club, Summerlin Centre, Sun City, and more.' },
  '/luxury-homes': { name: 'Luxury Homes in Summerlin West | Dr. Jan Duffy', description: 'Luxury homes and high-end real estate in Summerlin West, The Ridges, and Las Vegas. Expert luxury home representation.' },
  '/new-construction': { name: 'New Construction Homes in Summerlin | Dr. Jan Duffy', description: 'New construction homes and builders in Summerlin West. Toll Brothers, Lennar, Pulte and more.' },
  '/market-report': { name: 'Summerlin West Market Report | Dr. Jan Duffy', description: 'Summerlin real estate market trends, home values, and local market analysis from Dr. Jan Duffy.' },
  '/schools': { name: 'Schools Near Summerlin West | Dr. Jan Duffy Real Estate', description: 'Schools and education near Summerlin West neighborhoods. Top-rated schools serving Summerlin, NV.' },
  '/review-us': { name: 'Review us on Google | Dr. Jan Duffy Real Estate', description: 'Leave a review for Dr. Jan Duffy on Google. Share our review link or QR code. Reviews build trust and help our Business Profile stand out.' },
  '/disclaimer': { name: 'Disclaimer | Open House Market Place', description: 'Disclaimer and terms for Open House Market Place and Dr. Jan Duffy Real Estate.' },
  '/privacy-policy': { name: 'Privacy Policy | Open House Market Place', description: 'Privacy policy for Open House Market Place and Dr. Jan Duffy Real Estate.' },
  '/terms-of-service': { name: 'Terms of Service | Open House Market Place', description: 'Terms of service for Open House Market Place and Dr. Jan Duffy Real Estate.' },
  '/sitemap': { name: 'Sitemap | Open House Market Place', description: 'Sitemap of all pages on Open House Market Place - Summerlin West open houses and real estate.' },
  '/test-form': { name: 'API Test Page | Open House Market Place', description: 'Developer test page for Open House Market Place.' },
}

const DEFAULT_PAGE = {
  name: 'Summerlin Las Vegas Open Houses & Real Estate | Dr. Jan Duffy',
  description:
    'Summerlin Las Vegas open houses, MLS search, and private showings with Dr. Jan Duffy. Expert help for buyers and sellers in Summerlin West and the Las Vegas Valley.',
}

function slugToTitle(slug: string): string {
  return slug
    .split(/[-/]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(' ')
}

function getWebPageData(pathname: string) {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname
  if (PAGE_META[normalized]) return PAGE_META[normalized]
  const segments = normalized.split('/').filter(Boolean)
  if (segments[0] === 'neighborhoods' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} Real Estate | Summerlin Neighborhood | Dr. Jan Duffy`, description: `Homes for sale and real estate in ${name}, Summerlin West. Neighborhood guide, listings, and expert help from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'builders' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} Homes in Summerlin | New Construction | Dr. Jan Duffy`, description: `New construction homes by ${name} in Summerlin West. Builder info, communities, and expert representation from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'zip' && segments[1]) {
    return { name: `Homes for Sale in ${segments[1]} | Summerlin Zip Code | Dr. Jan Duffy`, description: `Real estate and homes for sale in zip code ${segments[1]}, Summerlin West. Listings and market info from Dr. Jan Duffy.` }
  }
  if (segments[0] === 'resources' && segments[1]) {
    const name = slugToTitle(segments[1])
    return { name: `${name} | Summerlin Real Estate Resources | Dr. Jan Duffy`, description: `Real estate resources: ${name}. Guides and tips for Summerlin West buyers and sellers from Dr. Jan Duffy.` }
  }
  return DEFAULT_PAGE
}

export default function GoogleEnhancement() {
  const pathname = usePathname()
  const pageMeta = getWebPageData(pathname ?? '/')
  const pageUrl = `${BASE_URL}${pathname === null ? '' : pathname}`

  const organizationId = `${BASE_URL}/#organization`
  const agentId = `${BASE_URL}/about#agent`
  const websiteId = `${BASE_URL}/#website`

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: pageMeta.name,
    description: pageMeta.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    author: { '@id': agentId },
    publisher: { '@id': organizationId },
    about: { '@id': organizationId },
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }} />
  )
}
