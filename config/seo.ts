/**
 * Primary keyword focus: SEO (Google), AEO (answer engines), GEO (generative / AI search).
 * Use in titles, meta descriptions, H1/H2, FAQ JSON-LD, and WebSite/ WebPage schema.
 * NAP and business name still come from config/gbp.ts (Google Business Profile).
 *
 * Google (2026): AEO/GEO are implemented as people-first content + correct JSON-LD entities
 * (@id, sameAs, author/publisher) — not separate “AI markup.” See docs/SEO-GEO-AEO-2026.md.
 */

/** Target phrase for Summerlin + Las Vegas open house intent */
export const SEO_PRIMARY_KEYWORD = 'Summerlin Las Vegas Open Houses' as const

/** E-E-A-T: agent identity (visible copy + RealEstateAgent schema) */
export const AGENT_NAME = 'Dr. Jan Duffy' as const
export const AGENT_LICENSE = 'Nevada S.0197614.LLC' as const
export const AGENT_MEMBER_OF = 'Berkshire Hathaway HomeServices Nevada Properties' as const

export const SEO_HOME_TITLE = 'Summerlin Las Vegas Open Houses | Dr. Jan Duffy Real Estate' as const

export const SEO_HOME_DESCRIPTION =
  'Summerlin Las Vegas open houses this weekend in Summerlin West—The Ridges, Red Rock Country Club, Summerlin Centre, and more. Search MLS listings, tour homes, and schedule a private showing with Dr. Jan Duffy at Open House Market Place.'

export const SEO_OPEN_HOUSES_TITLE =
  'Summerlin Las Vegas Open Houses | Weekend Tours & Private Showings' as const

export const SEO_OPEN_HOUSES_DESCRIPTION =
  "Browse Summerlin Las Vegas open houses and weekend home tours. Luxury homes, new construction, and family homes in Las Vegas's premier master-planned community. Schedule a private showing with Dr. Jan Duffy."

/** Section heading on homepage (featured listings strip) */
export const SEO_FEATURED_OPEN_HOUSES_HEADING = 'Featured Summerlin Las Vegas Open Houses This Weekend' as const

/** Open Houses hub page: FAQ for JSON-LD + visible dl (AEO) */
export const OPEN_HOUSES_PAGE_FAQS = [
  {
    question: 'When are Summerlin Las Vegas open houses?',
    answer:
      "Summerlin Las Vegas open houses are usually held on weekends (Saturday and Sunday), often from late morning through afternoon. Times vary by listing—check our featured list and Dr. Jan Duffy's home search for current dates, addresses, and hours.",
  },
  {
    question: 'How do I find Summerlin Las Vegas open houses this weekend?',
    answer:
      'Use the Open House Market Place Open Houses page, the featured weekend list on the homepage, or the MLS home search to filter by open house dates. You can also schedule a private showing with Dr. Jan Duffy if you prefer a one-on-one tour in Summerlin or Las Vegas.',
  },
  {
    question: 'What should I bring to a Summerlin open house?',
    answer:
      'Bring questions, a notepad or phone for notes, and comfortable shoes. If you may make an offer, a pre-approval letter helps. Dr. Jan Duffy can help you compare homes after touring Summerlin Las Vegas open houses.',
  },
  {
    question: 'Are there open houses in Summerlin West neighborhoods like The Ridges or Red Rock Country Club?',
    answer:
      'Yes. Summerlin Las Vegas open houses are held across Summerlin West, including The Ridges, Red Rock Country Club, Summerlin Centre, The Trails, and nearby areas. Use our neighborhood pages and search tools to find homes that match your price range and lifestyle.',
  },
] as const

/** Visible + JSON-LD FAQ for homepage (AEO / rich results) */
export const HOME_PAGE_FAQS = [
  {
    question: 'What are Summerlin Las Vegas open houses?',
    answer:
      'Summerlin Las Vegas open houses are scheduled showings of homes for sale in Summerlin, Nevada—usually on weekends—where buyers can tour a property during posted hours. Open House Market Place lists Summerlin open houses, connects you to MLS search, and helps you book a private showing with Dr. Jan Duffy (Berkshire Hathaway HomeServices Nevada Properties, License S.0197614.LLC).',
  },
  {
    question: 'Where can I find open houses in Summerlin, Las Vegas?',
    answer:
      'Open houses are held across Summerlin West and surrounding Summerlin villages, including The Ridges, Red Rock Country Club, Summerlin Centre, The Trails, and Sun City Summerlin, plus zip codes 89135, 89138, and 89144. Use this site’s Open Houses page, featured weekend list, and home search to find current Summerlin Las Vegas open houses.',
  },
  {
    question: 'How do I schedule a private showing instead of an open house?',
    answer:
      'Use the contact form, Calendly scheduling links, or call Open House Market Place at (702) 200-3422. Dr. Jan Duffy can arrange a private tour of Summerlin and Las Vegas listings that match your budget and neighborhood preferences.',
  },
] as const

/** Open House Guide — visible accordion + FAQPage JSON-LD (AEO direct answers) */
export const OPEN_HOUSE_GUIDE_FAQS = [
  {
    question: 'Do I need an agent to attend an open house?',
    answer:
      "No. You can attend open houses without an agent. Having your own buyer's agent protects your interests in negotiations and disclosures. Dr. Jan Duffy can serve as your exclusive buyer's agent while you explore Summerlin open houses.",
  },
  {
    question: 'What forms will I sign at a Summerlin open house?',
    answer:
      'You may see a visitor non-agency disclosure, a limited representation agreement, or a full exclusive buyer agreement. You are not required to sign a buyer agreement just to walk through an open house.',
  },
  {
    question: "Who pays the buyer's agent in Las Vegas?",
    answer:
      'After the August 2024 NAR settlement, buyer broker compensation is negotiated between you and your buyer\'s agent—not shown on the MLS. Discuss fees upfront with your agent.',
  },
  {
    question: 'Can I tour homes without committing to an agent?',
    answer:
      'Yes. Open houses remain exempt from signing a buyer agreement before viewing. Visit weekend open houses, sign in, and formalize representation when you are ready.',
  },
  {
    question: 'Why work with Dr. Jan Duffy in Summerlin?',
    answer:
      'Dr. Jan Duffy offers Summerlin West expertise, luxury market experience, and guidance through post-NAR disclosure and compensation rules in neighborhoods like The Ridges and Red Rock Country Club.',
  },
] as const

/** HowTo steps — mirror visible ordered list on /open-house-guide (AEO + HowTo schema) */
export const OPEN_HOUSE_GUIDE_HOWTO = {
  name: 'How to attend a Summerlin open house in 2026',
  description:
    'Steps for buyers touring Summerlin Las Vegas open houses after NAR settlement rule changes—forms, representation, and scheduling.',
  steps: [
    {
      name: 'Find open houses this weekend',
      text: 'Browse the Open Houses page or MLS search on Open House Market Place for current Summerlin listings, dates, and addresses.',
      url: '/open-houses',
    },
    {
      name: 'Attend without a buyer agreement',
      text: 'Open houses do not require a signed buyer representation agreement before you tour—unlike most private showings.',
    },
    {
      name: 'Review disclosure forms at the door',
      text: 'Expect a visitor non-agency disclosure or optional limited/full buyer agreements; read who represents whom before you tour.',
    },
    {
      name: 'Compare homes and neighborhoods',
      text: 'Take notes, ask about HOA and incentives, and explore Summerlin villages that fit your budget.',
    },
    {
      name: 'Schedule a private showing or consultation',
      text: 'When you are ready for dedicated representation, contact Dr. Jan Duffy to book a private tour or consultation.',
      url: '/book-tour',
    },
  ],
} as const

/** Speakable CSS selectors on open-house-guide (must exist in page DOM) */
export const OPEN_HOUSE_GUIDE_SPEAKABLE = {
  name: 'What to Expect at a Summerlin Open House in 2026',
  description:
    'New NAR-related rules mean more transparency for buyers at Summerlin Las Vegas open houses in 2026.',
  cssSelectors: ['.page-title-speakable', '.speakable-summary'],
} as const
