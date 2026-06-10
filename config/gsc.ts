import { getSiteUrl } from '@/lib/site'

/** Canonical Search Console property origin (www). */
export function getGscCanonicalOrigin(): string {
  return getSiteUrl()
}

/** Full sitemap URL to submit in Google Search Console → Sitemaps. */
export function getGscSitemapUrl(): string {
  return `${getGscCanonicalOrigin()}/sitemap.xml`
}

/** Apex host that should 301 to www (monitor in GSC as “Page with redirect”, not errors). */
export const GSC_APEX_HOST = 'openhousemarketplace.com' as const
