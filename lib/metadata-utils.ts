/**
 * Utility functions for generating canonical URLs and shared Open Graph defaults.
 */
import { getSiteUrl } from '@/lib/site'
import {
  OG_IMAGE_DEFAULT_ALT,
  OG_IMAGE_DEFAULT_HEIGHT,
  OG_IMAGE_DEFAULT_PATH,
  OG_IMAGE_DEFAULT_WIDTH,
} from '@/config/og'

export const BASE_URL = getSiteUrl()

/** Default OG image metadata (fallback headshot until og-image.jpg is added). */
export const DEFAULT_OG_IMAGES = [
  {
    url: `${BASE_URL}${OG_IMAGE_DEFAULT_PATH}`,
    width: OG_IMAGE_DEFAULT_WIDTH,
    height: OG_IMAGE_DEFAULT_HEIGHT,
    alt: OG_IMAGE_DEFAULT_ALT,
  },
] as const

/** Shorthand for pages that pass `images: ['/images/...']` in metadata. */
export const DEFAULT_OG_IMAGE_PATHS = [`${OG_IMAGE_DEFAULT_PATH}`] as const

export function getCanonicalUrl(path: string): string {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${BASE_URL}${cleanPath}`
}

export function getAlternates(path: string) {
  return {
    canonical: getCanonicalUrl(path),
  }
}

