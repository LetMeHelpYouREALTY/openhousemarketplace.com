import { getGscSitemapUrl } from '@/config/gsc'
import { getGscVerificationPaths } from '@/config/sitemap-routes'
import { BASE_URL } from '@/lib/metadata-utils'

/**
 * GSC verification: fetch sitemap paths (www + apex), record status and redirect chain.
 * Run: pnpm run verify-gsc-404s  or  npx tsx scripts/verify-gsc-404s.ts
 * Writes scripts/gsc-404-report.md
 */

const GSC_404_PATHS = getGscVerificationPaths()

const NON_WWW_ORIGIN = 'https://openhousemarketplace.com'
const WWW_ORIGIN = `${BASE_URL}`

type ChainStep = { status: number; url: string; location?: string }
type Result = { url: string; status: number; chain: ChainStep[]; finalUrl: string; ok: boolean }

async function fetchWithChain(url: string): Promise<Result> {
  const chain: ChainStep[] = []
  let currentUrl = url
  const seen = new Set<string>()

  while (true) {
    if (seen.has(currentUrl)) {
      chain.push({ status: 0, url: currentUrl })
      return { url, status: 0, chain, finalUrl: currentUrl, ok: false }
    }
    seen.add(currentUrl)

    let res: Response
    try {
      res = await fetch(currentUrl, {
        redirect: 'manual',
        headers: { 'User-Agent': 'GSC-Verify-Script/1.0' },
      })
    } catch {
      chain.push({ status: 0, url: currentUrl })
      return { url, status: 0, chain, finalUrl: currentUrl, ok: false }
    }
    const location = res.headers.get('location')
    chain.push({
      status: res.status,
      url: currentUrl,
      ...(location && { location: location.startsWith('http') ? location : new URL(location, currentUrl).href }),
    })

    if (res.status >= 300 && res.status < 400 && location) {
      currentUrl = location.startsWith('http') ? location : new URL(location, currentUrl).href
      continue
    }

    const lastStep = chain[chain.length - 1]
    const lastStatus = lastStep?.status ?? res.status
    const finalUrlNormalized = currentUrl.replace(/\/$/, '') || currentUrl
    const wwwNormalized = WWW_ORIGIN.replace(/\/$/, '')
    const isIndexRedirect =
      url.includes('/index') &&
      (lastStatus === 301 || lastStatus === 308) &&
      (finalUrlNormalized === wwwNormalized || finalUrlNormalized === `${wwwNormalized}/`)
    const finalOk =
      isIndexRedirect ||
      (lastStatus === 200 &&
        (currentUrl.startsWith(WWW_ORIGIN) || currentUrl.startsWith(`${WWW_ORIGIN}/`)))
    return {
      url,
      status: res.status,
      chain,
      finalUrl: currentUrl,
      ok: finalOk,
    }
  }
}

function formatChain(chain: ChainStep[]): string {
  return chain.map((s) => `${s.status}${s.location ? ` → ${s.location}` : ''}`).join(' ; ')
}

async function verifySitemapXml(): Promise<{ ok: boolean; detail: string }> {
  const sitemapUrl = getGscSitemapUrl()
  try {
    const res = await fetch(sitemapUrl, {
      headers: { 'User-Agent': 'GSC-Verify-Script/1.0' },
    })
    if (!res.ok) {
      return { ok: false, detail: `HTTP ${res.status}` }
    }
    const text = await res.text()
    const locCount = (text.match(/<loc>/g) ?? []).length
    const expected = GSC_404_PATHS.length
    if (locCount < expected) {
      return { ok: false, detail: `${locCount} <loc> entries (expected at least ${expected})` }
    }
    if (!text.includes(WWW_ORIGIN)) {
      return { ok: false, detail: 'missing www canonical origin in <loc> URLs' }
    }
    return { ok: true, detail: `${locCount} URLs at ${sitemapUrl}` }
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : 'fetch failed' }
  }
}

async function main() {
  const sitemapCheck = await verifySitemapXml()
  const results: Result[] = []

  const extraPaths = ['/index', '/index.html'] as const
  const pathsToCheck = [...GSC_404_PATHS, ...extraPaths]

  for (const path of pathsToCheck) {
    const pathSuffix = path === '/' ? '' : path
    const nonWwwUrl = `${NON_WWW_ORIGIN}${pathSuffix}`
    const wwwUrl = `${WWW_ORIGIN}${pathSuffix}`

    results.push(await fetchWithChain(nonWwwUrl))
    results.push(await fetchWithChain(wwwUrl))
  }

  const okCount = results.filter((r) => r.ok).length
  const failed = results.filter((r) => !r.ok)

  const lines: string[] = [
    '# GSC 404 verification report',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- **Sitemap (${getGscSitemapUrl()}):** ${sitemapCheck.ok ? 'OK' : 'FAILED'} — ${sitemapCheck.detail}`,
    `- **OK (301→www + 200):** ${okCount}`,
    `- **Failed (404 or other):** ${failed.length}`,
    `- **Total URLs checked:** ${results.length}`,
    '',
    '## Results',
    '',
    '| URL | Status | Redirect chain | Final URL |',
    '|-----|--------|----------------|-----------|',
  ]

  for (const r of results) {
    const statusStr = r.chain.map((s) => s.status).join(' → ')
    const chainStr = formatChain(r.chain).replace(/\|/g, '\\|').replace(/\n/g, ' ')
    const finalStr = r.finalUrl.replace(/\|/g, '\\|')
    const urlCell = r.url.replace(/\|/g, '\\|')
    lines.push(`| ${urlCell} | ${statusStr} | ${chainStr} | ${finalStr} |`)
  }

  lines.push('')
  lines.push('## Failed URLs (if any)')
  lines.push('')
  if (failed.length === 0) {
    lines.push('None.')
  } else {
    for (const r of failed) {
      lines.push(`- ${r.url} (status ${r.status})`)
    }
  }

  const report = lines.join('\n')
  const fs = await import('fs')
  const path = await import('path')
  const outPath = path.join(process.cwd(), 'scripts', 'gsc-404-report.md')
  fs.writeFileSync(outPath, report, 'utf8')
  console.log('Report written to scripts/gsc-404-report.md')
  console.log(report.split('\n').slice(0, 20).join('\n'))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
