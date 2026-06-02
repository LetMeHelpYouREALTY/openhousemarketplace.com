import { GBP } from '@/config/gbp'
import { NextResponse, type NextRequest } from 'next/server'
import { userAgent } from 'next/server'

/**
 * Consumer maintenance gate (Vercel middleware).
 * When `NEXT_PUBLIC_SITE_MAINTENANCE_MODE=true`, humans get a 503 page;
 * search crawlers still reach the app (robots.txt / sitemap stay public via matcher).
 *
 * Banner-only (no block): set `NEXT_PUBLIC_SITE_MAINTENANCE_BANNER_ONLY=true`.
 */
export function isSiteMaintenanceMode(): boolean {
  return process.env.NEXT_PUBLIC_SITE_MAINTENANCE_MODE === 'true'
}

export function isSiteMaintenanceBannerOnly(): boolean {
  return process.env.NEXT_PUBLIC_SITE_MAINTENANCE_BANNER_ONLY === 'true'
}

export function getSiteMaintenanceMessage(): string {
  const custom = process.env.NEXT_PUBLIC_SITE_MAINTENANCE_MESSAGE?.trim()
  if (custom) return custom
  return 'Open House Market Place is undergoing scheduled updates. Call or email Dr. Jan Duffy to book an open house tour or ask about Summerlin listings.'
}

const CRAWLER_UA =
  /googlebot|google-inspectiontool|googleother|bingbot|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot|applebot|yandexbot|baiduspider/i

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname.startsWith('127.0.0.1') ||
    hostname.startsWith('[::1]') ||
    hostname.endsWith('.localhost')
  )
}

/** Allow verified search/social crawlers through during maintenance (SEO). */
export function isMaintenanceBypassCrawler(request: NextRequest): boolean {
  const uaHeader = request.headers.get('user-agent') ?? ''
  if (CRAWLER_UA.test(uaHeader)) return true
  try {
    const { isBot } = userAgent(request)
    if (isBot) return true
  } catch {
    // userAgent() unavailable — regex above is enough
  }
  return false
}

/**
 * True when this HTML page request should receive the 503 maintenance screen
 * instead of the normal site.
 */
export function shouldBlockConsumerWithMaintenance(
  request: NextRequest,
  pathname: string
): boolean {
  if (!isSiteMaintenanceMode() || isSiteMaintenanceBannerOnly()) return false
  if (pathname === '/maintenance') return false

  const hostname = request.headers.get('host') ?? ''
  if (isLocalHostname(hostname)) return false
  if (isMaintenanceBypassCrawler(request)) return false

  return true
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function buildMaintenancePageHtml(): string {
  const message = escapeHtml(getSiteMaintenanceMessage())
  const title = escapeHtml(GBP.name)
  const address = escapeHtml(
    `${GBP.address.street}, ${GBP.address.locality}, ${GBP.address.region} ${GBP.address.postalCode}`
  )
  const phone = escapeHtml(GBP.phone)
  const email = escapeHtml(GBP.email)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${title} — temporarily unavailable</title>
  <style>
    body { margin: 0; font-family: system-ui, -apple-system, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f3f7; color: #1f2937; padding: 1.5rem; }
    .card { max-width: 28rem; text-align: center; }
    h1 { font-size: 1.375rem; color: #4a3861; margin: 0 0 1rem; }
    p { line-height: 1.6; margin: 0 0 1rem; font-size: 1rem; }
    a { color: #0d9488; font-weight: 600; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .nap { font-size: 0.9375rem; color: #4b5563; }
  </style>
</head>
<body>
  <div class="card">
    <h1>We&rsquo;ll be right back</h1>
    <p>${message}</p>
    <p class="nap"><strong>${title}</strong><br />${address}</p>
    <p>
      <a href="tel:${GBP.phoneE164}">Call ${phone}</a><br />
      <a href="mailto:${GBP.email}">${email}</a>
    </p>
  </div>
</body>
</html>`
}

export function createMaintenancePageResponse(): NextResponse {
  return new NextResponse(buildMaintenancePageHtml(), {
    status: 503,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Retry-After': '3600',
    },
  })
}
