/**
 * Open Graph / social share image defaults.
 * Prefer `/images/og/og-image.jpg` (1200×630) when the asset exists; until then use the agent headshot path
 * referenced on About/Contact so shares do not 404.
 */
export const OG_IMAGE_PREFERRED_PATH = '/images/og/og-image.jpg' as const

/** Fallback when og-image.jpg is not yet in public/images/og/ */
export const OG_IMAGE_FALLBACK_PATH = '/images/dr-jan-duffy.jpg' as const

export const OG_IMAGE_DEFAULT_PATH = OG_IMAGE_FALLBACK_PATH

export const OG_IMAGE_DEFAULT_ALT =
  'Summerlin Las Vegas Open Houses - Dr. Jan Duffy Real Estate' as const

export const OG_IMAGE_DEFAULT_WIDTH = 1200
export const OG_IMAGE_DEFAULT_HEIGHT = 630
