/**
 * Per-URL copy for GSC “Discovered – currently not indexed” pages.
 * Visible FAQs + speakable summaries (AEO) and internal links (SEO).
 */
import type { FaqItem } from '@/lib/json-ld'
import { GBP } from '@/config/gbp'
import { AGENT_LICENSE, AGENT_MEMBER_OF, AGENT_NAME, SEO_PRIMARY_KEYWORD } from '@/config/seo'

export type IndexingPageContent = {
  speakableSummary: string
  faqs: readonly FaqItem[]
  relatedLinks: readonly { href: string; label: string }[]
}

const PHONE = GBP.phone
const SITE = 'Open House Market Place'
const AGENT = `${AGENT_NAME} (${AGENT_MEMBER_OF}, License ${AGENT_LICENSE})`

const CORE_LINKS = [
  { href: '/open-houses', label: 'Summerlin open houses this weekend' },
  { href: '/tour/mls', label: 'MLS home search' },
  { href: '/contact', label: 'Contact & schedule a showing' },
  { href: '/neighborhoods', label: 'Summerlin neighborhoods' },
] as const

function neighborhoodContent(
  name: string,
  slug: string,
  zip: string,
  highlight: string
): IndexingPageContent {
  const path = `/neighborhoods/${slug}`
  return {
    speakableSummary: `${name} is a Summerlin West neighborhood in Las Vegas zip ${zip}, known for ${highlight}. ${AGENT} helps buyers tour homes and schedule private showings.`,
    faqs: [
      {
        question: `Where is ${name} in Summerlin?`,
        answer: `${name} is in Summerlin West, Las Vegas, Nevada (zip ${zip}). It is part of the master-planned Summerlin community with access to trails, parks, and Downtown Summerlin shopping.`,
      },
      {
        question: `How do I find homes for sale in ${name}?`,
        answer: `Browse live listings on our MLS search, view ${SEO_PRIMARY_KEYWORD} on the open houses page, or call ${PHONE} for a curated list in ${name}.`,
      },
      {
        question: `What schools serve ${name}?`,
        answer: `School assignments vary by address within ${name}. Use our Schools page for CCSD Area 2 ratings, then confirm boundaries with the district before you buy.`,
      },
      {
        question: `Can I schedule a private showing in ${name}?`,
        answer: `Yes. Book online at /book-tour or call ${PHONE}. ${AGENT} offers private tours in ${name} and nearby Summerlin villages.`,
      },
    ],
    relatedLinks: [
      { href: path, label: `${name} guide` },
      { href: `/zip/${zip}`, label: `Homes in zip ${zip}` },
      ...CORE_LINKS,
    ],
  }
}

export const INDEXING_PAGE_CONTENT: Record<string, IndexingPageContent> = {
  '/about': {
    speakableSummary: `${AGENT} is a Summerlin West real estate agent with 30+ years of experience, License ${AGENT_LICENSE}, helping buyers and sellers at ${SITE}.`,
    faqs: [],
    relatedLinks: [
      { href: '/open-houses', label: 'Open houses' },
      { href: '/book-tour', label: 'Schedule a showing' },
      { href: '/review-us', label: 'Google reviews' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  '/contact': {
    speakableSummary: `Contact ${AGENT} at ${PHONE} or book online. Office: ${GBP.address.street}, ${GBP.address.locality}, NV ${GBP.address.postalCode}.`,
    faqs: [],
    relatedLinks: [
      { href: '/book-tour', label: 'Book a tour' },
      { href: '/directions', label: 'Directions' },
      { href: '/tour/mls', label: 'MLS search' },
      { href: '/about', label: 'About Dr. Jan Duffy' },
    ],
  },
  '/book-tour': {
    speakableSummary: `Book a private showing or consultation with ${AGENT} at ${SITE}. Choose a time online—no signup required—or call ${PHONE}.`,
    faqs: [
      {
        question: 'How do I schedule a private showing in Summerlin?',
        answer: `Use this page’s Calendly scheduler or call ${PHONE}. ${AGENT} tours Summerlin West listings, open houses, and new construction by appointment.`,
      },
      {
        question: 'Is booking a showing free?',
        answer: 'Yes. Scheduling a consultation or private tour is free. Buyer representation terms are discussed before you sign any agreement.',
      },
      {
        question: 'Can I tour homes on the same day I book?',
        answer: 'Often yes, depending on listing access and your schedule. Same-day tours are subject to seller approval and agent availability.',
      },
      {
        question: 'What is the difference between an open house and a private showing?',
        answer: 'Open houses are open to the public during posted hours. A private showing is a one-on-one tour arranged for you at a specific time.',
      },
    ],
    relatedLinks: [
      { href: '/open-houses', label: 'Weekend open houses' },
      { href: '/schedule-consultation', label: 'Free consultation' },
      ...CORE_LINKS,
    ],
  },
  '/buyers': {
    speakableSummary: `${SITE} buyer tools include a mortgage calculator, school guide, neighborhood map, and MLS search—built for Summerlin West homebuyers working with ${AGENT}.`,
    faqs: [
      {
        question: 'What buyer tools does Open House Market Place offer?',
        answer: 'Mortgage calculator, top-rated Summerlin schools guide, neighborhood discovery map, and links to MLS search and open houses.',
      },
      {
        question: 'Do I need pre-approval before using the buyer tools?',
        answer: 'Pre-approval is not required to browse tools, but it strengthens your offer when you find a home in Summerlin.',
      },
      {
        question: 'How do I search MLS listings from the buyer page?',
        answer: 'Use the link to MLS Property Search (/tour/mls) to filter Summerlin listings, save searches, and request showings.',
      },
    ],
    relatedLinks: [
      { href: '/resources/home-buying-guide', label: 'Home buying guide' },
      { href: '/schools', label: 'Summerlin schools' },
      ...CORE_LINKS,
    ],
  },
  '/directions': {
    speakableSummary: `Plan your visit to ${SITE} at ${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}. Get driving, transit, walking, and biking directions, then book a showing with ${AGENT}.`,
    faqs: [
      {
        question: 'Where is Open House Market Place located?',
        answer: `${GBP.name} is at ${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}. Use the directions tool on this page for turn-by-turn routes.`,
      },
      {
        question: 'What are the office hours?',
        answer: `${GBP.name} is open daily 9:00 AM–5:00 PM per our Google Business Profile. Appointments outside those hours are available by request.`,
      },
      {
        question: 'Can I schedule a visit after getting directions?',
        answer: 'Yes. Use the scheduler on this page or visit /book-tour to reserve a private showing or consultation.',
      },
    ],
    relatedLinks: [
      { href: '/store-locations', label: 'Office on the map' },
      { href: '/book-tour', label: 'Book a showing' },
      ...CORE_LINKS,
    ],
  },
  '/luxury-homes': {
    speakableSummary: `Explore luxury homes for sale in Summerlin West—including The Ridges and Red Rock Country Club—with ${AGENT}. Median luxury prices, golf communities, and private showings.`,
    faqs: [
      {
        question: 'What neighborhoods have luxury homes in Summerlin?',
        answer: 'The Ridges, Red Rock Country Club, and select enclaves in 89135 offer custom estates, golf properties, and gated luxury homes.',
      },
      {
        question: 'How do I tour luxury listings privately?',
        answer: `Call ${PHONE} or book at /book-tour. Many luxury homes require appointments rather than public open houses.`,
      },
      {
        question: 'Are Summerlin luxury homes in gated communities?',
        answer: 'Many are. Gated access, HOA amenities, and golf memberships vary by subdivision—review each listing with your agent.',
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods/the-ridges', label: 'The Ridges' },
      { href: '/neighborhoods/red-rock-country-club', label: 'Red Rock Country Club' },
      { href: '/zip/89135', label: 'Zip 89135 homes' },
      ...CORE_LINKS,
    ],
  },
  '/market-report': {
    speakableSummary: `The Summerlin West market report covers median prices, days on market, inventory, and monthly trends for Las Vegas zip codes 89135, 89138, and 89144—updated for buyers and sellers.`,
    faqs: [
      {
        question: 'How often is the Summerlin market report updated?',
        answer: 'Market metrics on this page refresh on a regular cadence; confirm current numbers with MLS data or a consultation before making offers.',
      },
      {
        question: 'What zip codes are included in Summerlin West?',
        answer: 'Primary corridors include 89135 (luxury west), 89138 (family and new construction), and 89144 (Sun City Summerlin 55+).',
      },
      {
        question: 'Can I get a custom market analysis for my home?',
        answer: `Yes. Contact ${AGENT} at ${PHONE} for a seller CMA or buyer pricing guidance in your neighborhood.`,
      },
    ],
    relatedLinks: [
      { href: '/zip/89135', label: '89135 market' },
      { href: '/zip/89138', label: '89138 market' },
      { href: '/zip/89144', label: '89144 market' },
      ...CORE_LINKS,
    ],
  },
  '/new-construction': {
    speakableSummary: `New construction homes in Summerlin West include communities by Toll Brothers, Lennar, and Pulte. Compare builders, incentives, and model homes with ${AGENT}.`,
    faqs: [
      {
        question: 'Which builders are active in Summerlin?',
        answer: 'Toll Brothers (luxury), Lennar (Everything\'s Included®), and Pulte (energy-efficient plans) build in multiple Summerlin villages.',
      },
      {
        question: 'How long does new construction take in Las Vegas?',
        answer: 'Typical build timelines are roughly four to six months after contract, depending on lot, plan, and upgrades.',
      },
      {
        question: 'Do I need a realtor for new construction?',
        answer: `Yes—your agent represents you in builder negotiations. ${AGENT} helps with lot selection, upgrades, and timeline milestones.`,
      },
    ],
    relatedLinks: [
      { href: '/builders/toll-brothers', label: 'Toll Brothers' },
      { href: '/builders/lennar', label: 'Lennar' },
      { href: '/builders/pulte', label: 'Pulte Homes' },
      { href: '/resources/new-construction', label: 'New construction guide' },
      ...CORE_LINKS,
    ],
  },
  '/schools': {
    speakableSummary: `Top schools serving Summerlin West include CCSD Area 2 public schools, charter options like Doral Academy, and private schools. Compare ratings and boundaries before you buy.`,
    faqs: [
      {
        question: 'What school district is Summerlin in?',
        answer: 'Most of Summerlin West is in Clark County School District (CCSD) Area 2, with strong public, charter, and private options nearby.',
      },
      {
        question: 'How do I verify school zones for a listing?',
        answer: 'Use CCSD zoning tools with the property address. This page is a guide—always confirm assignment before closing.',
      },
      {
        question: 'Are there private schools near Summerlin?',
        answer: 'Yes, including faith-based and college-prep campuses within a short drive of 89135 and 89138.',
      },
    ],
    relatedLinks: [
      { href: '/buyers', label: 'Buyer tools' },
      { href: '/neighborhoods/summerlin-centre', label: 'Summerlin Centre (families)' },
      ...CORE_LINKS,
    ],
  },
  '/review-us': {
    speakableSummary: `Leave a Google review for ${AGENT} and ${SITE}. Reviews support our local Business Profile on Search and Maps and help other Summerlin buyers find trusted representation.`,
    faqs: [
      {
        question: 'How do I leave a review for Dr. Jan Duffy?',
        answer: 'Use the Google review link or QR code on this page. Sign in to Google, select a star rating, and share your experience.',
      },
      {
        question: 'Do reviews help local SEO?',
        answer: 'Yes. Authentic Google reviews strengthen our Business Profile visibility in Summerlin and Las Vegas local search.',
      },
    ],
    relatedLinks: [
      { href: '/about', label: 'About Dr. Jan Duffy' },
      { href: '/contact', label: 'Contact' },
      ...CORE_LINKS,
    ],
  },
  '/tour/mls': {
    speakableSummary: `Search MLS listings in Summerlin and Las Vegas with ${AGENT}'s home search. Filter by price, beds, open houses, and save alerts for new listings.`,
    faqs: [
      {
        question: 'Is the MLS search free?',
        answer: 'Yes. Create a free account to save searches, favorite homes, and request showings. Your agent is notified when you engage with listings.',
      },
      {
        question: 'Does the MLS search include Summerlin open houses?',
        answer: 'Yes. Filter by open house dates or visit /open-houses for featured weekend tours in Summerlin West.',
      },
      {
        question: 'How do I schedule a showing from MLS results?',
        answer: `Request a showing in the search tool or call ${PHONE}. ${AGENT} coordinates access with listing agents.`,
      },
      {
        question: 'What areas does the search cover?',
        answer: 'Summerlin West, greater Summerlin, and the Las Vegas Valley—including Henderson and North Las Vegas listings in the MLS feed.',
      },
    ],
    relatedLinks: [
      { href: '/open-houses', label: 'Open houses hub' },
      { href: '/luxury-homes', label: 'Luxury homes' },
      ...CORE_LINKS,
    ],
  },
  '/privacy-policy': {
    speakableSummary: `${SITE} privacy policy explains how we collect, use, and protect personal information when you browse listings, schedule showings, or contact ${AGENT}.`,
    faqs: [
      {
        question: 'What information does Open House Market Place collect?',
        answer: 'We may collect contact details you submit (name, email, phone), usage data, and cookies as described in the full policy on this page.',
      },
      {
        question: 'How do I contact you about privacy?',
        answer: `Email ${GBP.email} or call ${PHONE}. Our office is at ${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}.`,
      },
    ],
    relatedLinks: [
      { href: '/terms-of-service', label: 'Terms of service' },
      { href: '/contact', label: 'Contact' },
      { href: '/', label: 'Home' },
    ],
  },
  '/terms-of-service': {
    speakableSummary: `Terms of service for ${SITE} and real estate information provided by ${AGENT}. Read usage rules before browsing listings or scheduling appointments.`,
    faqs: [
      {
        question: 'Who operates Open House Market Place?',
        answer: `${SITE} is operated in connection with ${AGENT}, ${AGENT_MEMBER_OF}, Nevada License ${AGENT_LICENSE}.`,
      },
      {
        question: 'Is listing information guaranteed accurate?',
        answer: 'MLS and third-party data may change without notice. Verify all property details, schools, and HOA fees before making decisions.',
      },
    ],
    relatedLinks: [
      { href: '/privacy-policy', label: 'Privacy policy' },
      { href: '/disclaimer', label: 'Disclaimer' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  '/resources/home-buying-guide': {
    speakableSummary: `Step-by-step home buying guide for Summerlin: pre-approval, choose an agent, search homes, offer, inspection, and closing—with ${AGENT}.`,
    faqs: [
      {
        question: 'What is the first step to buy a home in Summerlin?',
        answer: 'Get mortgage pre-approval, then work with a local buyer\'s agent who knows Summerlin villages, HOAs, and builder contracts.',
      },
      {
        question: 'How long does closing take in Nevada?',
        answer: 'Escrow often closes in 30–45 days for resale; new construction timelines depend on the builder schedule.',
      },
    ],
    relatedLinks: [
      { href: '/buyers', label: 'Buyer tools' },
      { href: '/open-house-guide', label: 'Open house guide' },
      ...CORE_LINKS,
    ],
  },
  '/resources/hoa-communities': {
    speakableSummary: `Most Summerlin homes are in HOA communities. Learn what HOA fees cover, CC&Rs, and questions to ask before you buy in Las Vegas.`,
    faqs: [
      {
        question: 'Do all Summerlin homes have an HOA?',
        answer: 'Nearly all master-planned Summerlin villages have HOAs that maintain common areas and enforce community standards.',
      },
      {
        question: 'What should I review before buying in an HOA?',
        answer: 'Request resale documents: budget, reserves, litigation history, rental rules, and architectural guidelines.',
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods', label: 'Neighborhood guides' },
      { href: '/resources/home-buying-guide', label: 'Home buying guide' },
      ...CORE_LINKS,
    ],
  },
  '/resources/lifestyle-guide': {
    speakableSummary: `Summerlin lifestyle includes Downtown Summerlin shopping, 250+ miles of trails, Red Rock Canyon, golf, and family events—minutes from the Las Vegas Strip.`,
    faqs: [
      {
        question: 'What is there to do in Summerlin?',
        answer: 'Shopping and dining at Downtown Summerlin, community parks, golf, trails, and quick access to Red Rock Canyon and the Strip.',
      },
      {
        question: 'Is Summerlin family-friendly?',
        answer: 'Yes. Parks, schools, sports programs, and master-planned amenities make Summerlin popular for families relocating to Las Vegas.',
      },
    ],
    relatedLinks: [
      { href: '/amenity-map', label: 'Amenity map' },
      { href: '/open-houses', label: 'Open houses' },
      ...CORE_LINKS,
    ],
  },
  '/resources/new-construction': {
    speakableSummary: `Guide to buying new construction in Summerlin: compare Toll Brothers, Lennar, and Pulte, model homes, upgrades, and closing timelines.`,
    faqs: [
      {
        question: 'What are the benefits of new construction in Summerlin?',
        answer: 'Modern floor plans, warranties, energy efficiency, and optional smart-home features—often in newer village amenities.',
      },
      {
        question: 'Should I use my own agent for builder purchases?',
        answer: `Yes. ${AGENT} negotiates on your behalf with the builder and reviews contracts, upgrades, and inspection milestones.`,
      },
    ],
    relatedLinks: [
      { href: '/new-construction', label: 'New construction hub' },
      { href: '/builders/lennar', label: 'Lennar' },
      ...CORE_LINKS,
    ],
  },
  '/builders/toll-brothers': {
    speakableSummary: `Toll Brothers builds luxury new homes in Summerlin communities such as The Ridges and Red Rock Country Club. Explore plans, pricing, and private tours.`,
    faqs: [
      {
        question: 'Where does Toll Brothers build in Summerlin?',
        answer: 'Primarily luxury villages including The Ridges and Red Rock Country Club—confirm active communities on this page and with the builder.',
      },
      {
        question: 'How do I tour Toll Brothers model homes?',
        answer: `Schedule through the builder or with ${AGENT} at ${PHONE} for representation during your visit.`,
      },
    ],
    relatedLinks: [
      { href: '/luxury-homes', label: 'Luxury homes' },
      { href: '/new-construction', label: 'New construction' },
      ...CORE_LINKS,
    ],
  },
  '/builders/lennar': {
    speakableSummary: `Lennar new homes in Summerlin feature the Everything's Included® program—smart home tech and upgrades bundled in select Summerlin Centre and Mesa Ridge communities.`,
    faqs: [
      {
        question: 'What is Lennar Everything\'s Included®?',
        answer: 'Select features and smart-home packages included in the base price on qualifying plans—details vary by community and plan.',
      },
      {
        question: 'Which Summerlin areas have Lennar communities?',
        answer: 'Communities such as Summerlin Centre and Mesa Ridge have featured Lennar inventory—check live listings for availability.',
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods/summerlin-centre', label: 'Summerlin Centre' },
      { href: '/neighborhoods/mesa-ridge', label: 'Mesa Ridge' },
      ...CORE_LINKS,
    ],
  },
  '/builders/pulte': {
    speakableSummary: `Pulte Homes offers energy-efficient new construction in Summerlin with modern floor plans in villages including Summerlin Centre and The Trails.`,
    faqs: [
      {
        question: 'What makes Pulte homes energy efficient?',
        answer: 'Pulte emphasizes building science, insulation, and efficient systems—confirm specific HERS or program details per community.',
      },
      {
        question: 'How do I compare Pulte to other builders?',
        answer: 'Tour model homes, compare included features, HOA fees, and lot premiums. Your agent helps weigh total cost of ownership.',
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods/the-trails', label: 'The Trails' },
      { href: '/new-construction', label: 'New construction' },
      ...CORE_LINKS,
    ],
  },
  '/zip/89135': {
    speakableSummary: `Zip code 89135 covers luxury Summerlin West areas including The Ridges and Red Rock Country Club, with golf, trails, and premium resale and new homes.`,
    faqs: [
      {
        question: 'What neighborhoods are in zip 89135?',
        answer: 'The Ridges, Red Rock Country Club, and adjacent luxury enclaves in west Summerlin.',
      },
      {
        question: 'What is the price range in 89135?',
        answer: '89135 skews luxury—medians are higher than 89138. Search live MLS data for current asking prices.',
      },
    ],
    relatedLinks: [
      { href: '/luxury-homes', label: 'Luxury homes' },
      { href: '/neighborhoods/the-ridges', label: 'The Ridges' },
      ...CORE_LINKS,
    ],
  },
  '/zip/89138': {
    speakableSummary: `Zip 89138 includes Summerlin Centre, The Trails, Willows, and Mesa Ridge—family-friendly homes, parks, and Downtown Summerlin access.`,
    faqs: [
      {
        question: 'Is 89138 good for families?',
        answer: 'Yes. 89138 offers parks, CCSD schools, trails, and shopping—popular for move-up and new construction buyers.',
      },
      {
        question: 'Where is the Open House Market Place office?',
        answer: `Our office is at ${GBP.address.street}, ${GBP.address.locality}, NV 89138—see /directions for routes.`,
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods/summerlin-centre', label: 'Summerlin Centre' },
      { href: '/market-report', label: 'Market report' },
      ...CORE_LINKS,
    ],
  },
  '/zip/89144': {
    speakableSummary: `Zip 89144 is home to Sun City Summerlin, a 55+ active adult community with golf, recreation centers, and low-maintenance homes.`,
    faqs: [
      {
        question: 'Who can buy in Sun City Summerlin (89144)?',
        answer: 'Sun City communities typically require at least one resident age 55+; verify current HOA age rules before purchasing.',
      },
      {
        question: 'What amenities are in 89144?',
        answer: 'Golf courses, fitness centers, clubs, and on-site recreation—designed for active adult living.',
      },
    ],
    relatedLinks: [
      { href: '/neighborhoods/sun-city-summerlin', label: 'Sun City Summerlin' },
      { href: '/market-report', label: 'Market report' },
      ...CORE_LINKS,
    ],
  },
  '/neighborhoods/mesa-ridge': neighborhoodContent(
    'Mesa Ridge',
    'mesa-ridge',
    '89138',
    'spacious family homes and large backyards'
  ),
  '/neighborhoods/regency': neighborhoodContent(
    'Regency',
    'regency',
    '89138',
    'established streets and convenient Summerlin access'
  ),
  '/neighborhoods/siena': neighborhoodContent(
    'Siena',
    'siena',
    '89138',
    'Mediterranean-inspired architecture and community parks'
  ),
  '/neighborhoods/the-trails': neighborhoodContent(
    'The Trails',
    'the-trails',
    '89138',
    'mature landscaping and trail connectivity'
  ),
  '/neighborhoods/willows': neighborhoodContent(
    'Willows',
    'willows',
    '89138',
    'tree-lined streets and walkable blocks'
  ),
}

export function getIndexingPageContent(path: string): IndexingPageContent | undefined {
  return INDEXING_PAGE_CONTENT[path]
}
