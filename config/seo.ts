/**
 * Primary keyword focus: SEO (Google), AEO (answer engines), GEO (generative / AI search).
 * Use in titles, meta descriptions, H1/H2, FAQ JSON-LD, and WebSite/ WebPage schema.
 * NAP and business name still come from config/gbp.ts (Google Business Profile).
 */

/** Primary homepage search phrase for Summerlin open house intent. */
export const SEO_PRIMARY_KEYWORD = 'Summerlin Las Vegas Open Houses' as const
export const SEO_TARGET_KEYWORD = 'open house' as const

export const SEO_HOME_TITLE = 'Summerlin Open Houses & Luxury Homes | Dr. Jan Duffy' as const

export const SEO_HOME_DESCRIPTION =
  'Find a Summerlin open house and explore Las Vegas listings with Dr. Jan Duffy. Discover local neighborhoods and arrange a private home tour with an experienced real estate advisor.'

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

/** Visible + JSON-LD FAQ for the homepage. */
export const HOME_PAGE_FAQS = [
  {
    question: 'What areas does Dr. Jan Duffy serve?',
    answer:
      'Dr. Jan Duffy works with buyers and sellers in Summerlin and the greater Las Vegas Valley, including nearby communities such as Henderson. Contact her to discuss a specific neighborhood or property.',
  },
  {
    question: 'How do I find open houses in Summerlin?',
    answer:
      'Use the open houses page to find scheduled property tours and the home search to browse current listings. When you are ready, Dr. Jan Duffy can help you compare homes and plan a visit around your priorities.',
  },
  {
    question: 'Can I arrange a private home tour?',
    answer:
      'Yes. Use the private tour or contact links on this site, or call (702) 200-3422. Dr. Jan Duffy can help coordinate a tour of homes in Summerlin and the Las Vegas Valley.',
  },
] as const
