import { MetadataRoute } from 'next'
import { buildMarketingSitemap } from '@/config/sitemap-routes'
import { getSiteUrl } from '@/lib/site'

export const revalidate = 86400 // Revalidate sitemap daily (GSC refetch)

/**
 * Sitemap URLs use absolute https://www origins from getSiteUrl().
 * Route list: config/sitemap-routes.ts (also drives verify-gsc-404s).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildMarketingSitemap(getSiteUrl())
}
