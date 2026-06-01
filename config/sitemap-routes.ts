import type { MetadataRoute } from 'next'

type ChangeFrequency = NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>

export type MarketingSitemapRoute = {
  /** Path including leading slash; use `'/'` for homepage. */
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}

/**
 * Marketing URLs submitted to Google Search Console via /sitemap.xml.
 * Keep in sync with public App Router pages; excluded: /admin, /test-form, /open-house-signin, /api.
 */
export const MARKETING_SITEMAP_ROUTES: readonly MarketingSitemapRoute[] = [
  { path: '/', changeFrequency: 'daily', priority: 1.0 },
  { path: '/open-houses', changeFrequency: 'daily', priority: 0.9 },
  { path: '/luxury-homes', changeFrequency: 'daily', priority: 0.9 },
  { path: '/new-construction', changeFrequency: 'daily', priority: 0.9 },
  { path: '/book-tour', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/schedule-consultation', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/neighborhoods', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/market-report', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/open-house-guide', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/amenity-map', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/store-locations', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/directions', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/buyers', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/schools', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/review-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/tour/mls', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/sitemap', changeFrequency: 'monthly', priority: 0.4 },
  { path: '/neighborhoods/the-ridges', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/red-rock-country-club', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/summerlin-centre', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/sun-city-summerlin', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/the-trails', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/willows', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/mesa-ridge', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/siena', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/neighborhoods/regency', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/zip/89135', changeFrequency: 'daily', priority: 0.7 },
  { path: '/zip/89138', changeFrequency: 'daily', priority: 0.7 },
  { path: '/zip/89144', changeFrequency: 'daily', priority: 0.7 },
  { path: '/resources/home-buying-guide', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/resources/hoa-communities', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/resources/lifestyle-guide', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/resources/new-construction', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/builders/toll-brothers', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/builders/lennar', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/builders/pulte', changeFrequency: 'weekly', priority: 0.6 },
  { path: '/privacy-policy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms-of-service', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
] as const

/** Paths used by scripts/verify-gsc-404s.ts (deduped, stable order). */
export function getGscVerificationPaths(): readonly string[] {
  const paths = MARKETING_SITEMAP_ROUTES.map((r) => r.path)
  return paths as readonly string[]
}

export function buildMarketingSitemap(baseUrl: string): MetadataRoute.Sitemap {
  return MARKETING_SITEMAP_ROUTES.map((route) => ({
    url: route.path === '/' ? `${baseUrl}/` : `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
