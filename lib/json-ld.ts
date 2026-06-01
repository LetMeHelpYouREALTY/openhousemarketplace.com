import { GBP, getAreaServedJsonLd, getBusinessSameAsUrls, getGbpAggregateRating, OFFICE_GEO } from '@/config/gbp'
import {
  AGENT_LICENSE,
  AGENT_MEMBER_OF,
  AGENT_NAME,
  SEO_HOME_DESCRIPTION,
  SEO_PRIMARY_KEYWORD,
} from '@/config/seo'
import { getSiteUrl } from '@/lib/site'

export type FaqItem = { question: string; answer: string }

export type HowToStep = { name: string; text: string; url?: string }

export function buildFaqPageJsonLd(faqs: readonly FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildHowToJsonLd(options: {
  name: string
  description: string
  url: string
  steps: readonly HowToStep[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.name,
    description: options.description,
    url: options.url,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  }
}

/** Beta: voice / speakable summaries — cssSelector must match visible DOM. */
export function buildSpeakableWebPageJsonLd(options: {
  url: string
  name: string
  description: string
  cssSelectors: readonly string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: options.url,
    name: options.name,
    description: options.description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: options.cssSelectors,
    },
  }
}

/** Sitewide @graph: Organization (GBP), RealEstateAgent (E-E-A-T), WebSite (GEO entity). */
export function buildSiteEntityGraph(baseUrl: string = getSiteUrl()) {
  const organizationId = `${baseUrl}/#organization`
  const agentId = `${baseUrl}/about#agent`
  const websiteId = `${baseUrl}/#website`

  const rating = getGbpAggregateRating()

  const specialOpeningHoursSpecification = GBP.specialHoursClosed.map((closure) => ({
    '@type': 'OpeningHoursSpecification' as const,
    validFrom: closure.date,
    validThrough: closure.date,
    opens: '00:00',
    closes: '00:00',
  }))

  const organization = {
    '@type': ['Organization', 'LocalBusiness'],
    '@id': organizationId,
    name: GBP.name,
    description: GBP.description,
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/images/logo/logo.svg`,
    },
    image: `${baseUrl}/images/dr-jan-duffy.jpg`,
    telephone: GBP.phoneE164,
    email: 'jan@openhousemarketplace.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: GBP.address.street,
      addressLocality: GBP.address.locality,
      addressRegion: GBP.address.region,
      postalCode: GBP.address.postalCode,
      addressCountry: GBP.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: OFFICE_GEO.lat,
      longitude: OFFICE_GEO.lng,
    },
    areaServed: getAreaServedJsonLd(),
    sameAs: getBusinessSameAsUrls(),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: GBP.phoneE164,
      contactType: 'customer service',
      areaServed: 'US',
      availableLanguage: 'English',
    },
    openingHoursSpecification: GBP.hours.specification.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    ...(specialOpeningHoursSpecification.length > 0
      ? { specialOpeningHoursSpecification }
      : {}),
    knowsAbout: [
      SEO_PRIMARY_KEYWORD,
      'Real Estate',
      'Open Houses',
      'Luxury Homes',
      'New Construction',
      'Summerlin Real Estate Market',
    ],
    employee: { '@id': agentId },
    ...(rating
      ? { aggregateRating: { '@type': 'AggregateRating', ...rating } }
      : {}),
  }

  const agent = {
    '@type': 'RealEstateAgent',
    '@id': agentId,
    name: AGENT_NAME,
    honorificPrefix: 'Dr.',
    url: `${baseUrl}/about`,
    image: `${baseUrl}/images/dr-jan-duffy.jpg`,
    telephone: GBP.phoneE164,
    email: 'jan@openhousemarketplace.com',
    description:
      'Licensed Nevada real estate professional serving Summerlin West and the Las Vegas Valley. Expert in open houses, luxury homes, and new construction.',
    worksFor: { '@id': organizationId },
    memberOf: AGENT_MEMBER_OF,
    knowsAbout: [
      SEO_PRIMARY_KEYWORD,
      'Open Houses',
      'Summerlin West Real Estate',
      'Luxury Homes',
      'New Construction',
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Real Estate License',
      name: AGENT_LICENSE,
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    name: `Open House Market Place | ${SEO_PRIMARY_KEYWORD}`,
    alternateName: 'Summerlin Las Vegas Open Houses - Dr. Jan Duffy Real Estate',
    url: baseUrl,
    description: SEO_HOME_DESCRIPTION,
    inLanguage: 'en-US',
    publisher: { '@id': organizationId },
    potentialAction: [
      {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${baseUrl}/tour/mls?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      {
        '@type': 'ContactAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/contact` },
        description: 'Contact Dr. Jan Duffy for Summerlin real estate',
      },
      {
        '@type': 'ViewAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/open-houses` },
        name: `View ${SEO_PRIMARY_KEYWORD}`,
      },
    ],
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, agent, website],
  }
}
