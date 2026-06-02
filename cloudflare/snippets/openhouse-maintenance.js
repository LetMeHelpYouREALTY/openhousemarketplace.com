/**
 * Cloudflare Snippet — site-wide maintenance page (503).
 * Paste into: Cloudflare dashboard → Rules → Snippets → Create snippet.
 *
 * Rule expression (enable maintenance for everyone):
 *   (http.host eq "www.openhousemarketplace.com" or http.host eq "openhousemarketplace.com")
 *
 * Rule expression (allow your IP during maintenance — create IP list "admin_ips" first):
 *   (http.host eq "www.openhousemarketplace.com" or http.host eq "openhousemarketplace.com") and (not ip.src in $admin_ips)
 *
 * SEO: set BYPASS_CRAWLERS to true so Googlebot still reaches Vercel (indexing continues).
 */
const BYPASS_CRAWLERS = true

const statusCode = 503
const title = 'Open House Market Place — brief maintenance'
const message =
  'We are updating our Summerlin open house site. You can still reach Dr. Jan Duffy by phone to book a tour or ask about listings.'
const contactPhone = '(702) 200-3422'
const contactPhoneTel = '+17022003422'
const contactEmail = 'DrJanSells@OpenHouseMarketplace.com'

const CRAWLER_UA =
  /googlebot|google-inspectiontool|bingbot|duckduckbot|slurp|facebookexternalhit|twitterbot|linkedinbot/i

export default {
  async fetch(request) {
    if (BYPASS_CRAWLERS) {
      const ua = request.headers.get('User-Agent') || ''
      if (CRAWLER_UA.test(ua)) {
        return fetch(request)
      }
    }

    return new Response(generateMaintenancePage(), {
      status: statusCode,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'Retry-After': '3600',
      },
    })
  },
}

function generateMaintenancePage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex, nofollow" />
  <title>${title}</title>
  <style>
    body { margin: 0; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f5f3f7; color: #1f2937; }
    .card { max-width: 32rem; padding: 2rem; text-align: center; }
    h1 { font-size: 1.5rem; color: #4a3861; margin: 0 0 1rem; }
    p { line-height: 1.6; margin: 0 0 1rem; }
    a { color: #0d9488; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p>
      <a href="tel:${contactPhoneTel}">Call ${contactPhone}</a><br />
      <a href="mailto:${contactEmail}">${contactEmail}</a>
    </p>
  </div>
</body>
</html>`
}
