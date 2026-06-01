# Google Search Console – "Page with redirect" and indexing

## Domain setup

- **Primary domain:** **https://www.openhousemarketplace.com** (with `www`) — this is the canonical domain for indexing and branding.
- **Both hostnames in use:** Users and links may use either `openhousemarketplace.com` or `www.openhousemarketplace.com`. Traffic that arrives on non-www (or HTTP) is redirected to the primary www URL so there is a single canonical version in search.

## GSC “Validation details” — Failed (expected)

If Search Console shows **Validation Failed** under **Page indexing → Page with redirect**, with examples like:

| URL (redirect source) | Expected |
|------------------------|----------|
| `http://openhousemarketplace.com/` | 301 → `https://www.openhousemarketplace.com/` |
| `https://openhousemarketplace.com/` | 301 → `https://www.openhousemarketplace.com/` |
| `http://www.openhousemarketplace.com/` | 301 → `https://www.openhousemarketplace.com/` |

**Do not run “Validate fix” again** for this issue. Google’s validator checks whether those URLs become **indexable**; they should **keep redirecting**, so validation will keep failing. That is not a site bug.

**What to do instead:**

1. Monitor the **`https://www.openhousemarketplace.com`** property (URL-prefix or domain property that treats **www** as canonical).
2. In **Pages**, confirm **`https://www.openhousemarketplace.com/`** and key paths are **Indexed** (200, not redirect).
3. Submit **`https://www.openhousemarketplace.com/sitemap.xml`** in that property (sitemap URLs are already **www** only).
4. Set Google Business Profile **Website** to **`https://www.openhousemarketplace.com/`** so fewer crawls start on apex/http URLs.
5. In the redirect report, use **Dismiss** / stop validating if Google offers it — or ignore the row count for intentional redirect sources.

“Sitemap: All known pages” on this report only means Google associated those URLs with your site; it does **not** mean the sitemap lists non-www URLs ([`app/sitemap.ts`](../app/sitemap.ts) uses `getSiteUrl()` → **www** only).

---

## Why you see "Page with redirect"

The site is configured so **https://www.openhousemarketplace.com** is the only canonical domain. All other variants redirect to it with a **301 (permanent)** redirect:

- `http://openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`
- `https://openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`
- `http://www.openhousemarketplace.com/*` → `https://www.openhousemarketplace.com/*`

So when Google crawls the non‑www or HTTP URLs, it gets a redirect. Google **does not index the redirecting URL**; it indexes the **destination** (the www URL). That’s correct behavior.

In GSC, "Page with redirect" means: *these URLs redirect, so they are not indexed*. The **8 “affected” URLs** in your report are the **redirect sources**. They are not supposed to be indexed; the **www** versions are.

## What "Validation Failed" means here

If you ran **Validate fix** for this issue, validation can still show as failed because:

- The “fix” Google tests is whether those URLs can be indexed.
- They still redirect by design, so they still aren’t indexed.
- So the “affected” count doesn’t go to zero, and validation appears to fail.

That’s expected. The goal is not to index the redirecting URLs; it’s to have the **canonical www** URLs indexed.

### Do not rely on "Validate fix" for redirect sources

For **Page with redirect** issues where the redirect is **intentional** (consolidation to `https://www`), **do not expect** Google’s **Validate fix** to pass. The tool checks whether the listed URLs become indexable; they should **keep** redirecting. Treat this document as the source of truth for that behavior. In GSC you may use **Dismiss** / acknowledge the issue, or focus on the **www** property indexing (below) instead of clearing the redirect report.

## Manual verification checklist (www property)

Complete these in Search Console for **`https://www.openhousemarketplace.com`** (not the bare-domain property):

1. Open **Indexing → Pages** (or **Page indexing**).
2. Confirm the homepage and priority URLs show **Indexed** — e.g. `/`, `/open-houses`, `/neighborhoods/the-ridges`, `/neighborhoods/summerlin-centre`, `/neighborhoods/sun-city-summerlin`, `/neighborhoods/red-rock-country-club`.
3. Use **URL Inspection** only on **canonical** URLs (`https://www.openhousemarketplace.com/...`). Do not use inspection on `http://` or `https://openhousemarketplace.com/...` as the primary signal; those are expected to report a redirect.
4. If a **www** URL is not indexed, request indexing for that **www** URL after confirming it returns **200** and matches your `robots`/metadata rules.
5. Ensure **Sitemaps** includes `https://www.openhousemarketplace.com/sitemap.xml`.

## What to do in Search Console

1. **Use the correct property**
   - Add (or use) a property for the **canonical** domain: **`https://www.openhousemarketplace.com`**.
   - You can keep a property for `openhousemarketplace.com` (no www) to monitor; it will keep showing "Page with redirect" for the same URLs. That’s normal.

2. **Check indexing for www**
   - In the **www** property, open **Pages** (or **Indexing** → **Pages**).
   - Confirm that **https://www.openhousemarketplace.com/** and important URLs (e.g. `/open-houses`, `/neighborhoods/...`) are **Indexed**, not "Redirect" or "Excluded".

3. **Request indexing for key www URLs** (if needed)
   - Use **URL Inspection** for the canonical URL (e.g. `https://www.openhousemarketplace.com/`).
   - Click **Request indexing** so Google recrawls the **destination** URL.

4. **Submit the sitemap in the www property**
   - Sitemap URL: **https://www.openhousemarketplace.com/sitemap.xml**
   - All URLs in the sitemap are already **https://www.openhousemarketplace.com/...**, so Google discovers the canonical versions.

## Technical reference (this repo)

- **Canonical base:** `https://www.openhousemarketplace.com` (see `app/layout.tsx`, `middleware.ts`, `app/sitemap.ts`, `app/robots.ts`).
- **Redirects:** `vercel.json` (non‑www → www) and `middleware.ts` (http and non‑www → https www).
- **Sitemap / robots:** `app/sitemap.ts` and `app/robots.ts` use the same base URL.

Redirects are intentional for **http** and **apex** hosts. **Update the Google Business Profile “Website” field** to **https://www.openhousemarketplace.com/** so Google and users see the canonical URL (fewer “Page with redirect” rows from the apex hostname). Use the **www** property and the sitemap to monitor canonical pages.

## Automated redirect check (curl)

Use these to confirm non-www and HTTP URLs resolve to **https://www** (Vercel may use **301**, **307**, or **308**; all are acceptable for permanent consolidation):

```bash
curl -sI "http://openhousemarketplace.com/"
curl -sI "https://openhousemarketplace.com/open-houses"
curl -sI "http://www.openhousemarketplace.com/"
curl -sI "https://www.openhousemarketplace.com/index"
curl -sI "https://www.openhousemarketplace.com/"
```

**Last verified (repo check):** Non-www and HTTP requests return redirects toward `https://www.openhousemarketplace.com/...`; `/index` returns **301** with `Location: /` on www; the www homepage returns **200 OK**.

---

## "Crawled - currently not indexed" — Validation Failed (non-www URLs)

### GSC examples (expected)

If **Page indexing → Crawled - currently not indexed** shows **Validation Failed** with apex-host examples like:

| URL (non-www) | Canonical URL to monitor |
|---------------|---------------------------|
| `https://openhousemarketplace.com/neighborhoods/summerlin-centre` | `https://www.openhousemarketplace.com/neighborhoods/summerlin-centre` |
| `https://openhousemarketplace.com/open-houses` | `https://www.openhousemarketplace.com/open-houses` |

**Do not run “Validate fix”** on these rows. Google crawled the **apex** URL, then consolidated to **www** (redirect + `rel=canonical`). The apex URL is **not** meant to be a separate indexed document, so validation often **fails** when Google re-checks whether the listed URL should be indexed.

This is the same host-consolidation pattern as **Page with redirect** on the homepage variants — only the GSC label differs (“crawled” vs “redirect”).

### Why the site is configured correctly

- Each page sets **`alternates.canonical`** to **`https://www.openhousemarketplace.com/...`** (e.g. [`app/open-houses/page.tsx`](../app/open-houses/page.tsx), [`app/neighborhoods/summerlin-centre/page.tsx`](../app/neighborhoods/summerlin-centre/page.tsx)).
- **`/sitemap.xml`** lists only **www** URLs ([`config/sitemap-routes.ts`](../config/sitemap-routes.ts) includes `/open-houses` and `/neighborhoods/summerlin-centre`).
- Apex requests **301** to www ([`vercel.json`](../vercel.json), [`middleware.ts`](../middleware.ts)).

### What to do in Search Console

1. Open the **`https://www.openhousemarketplace.com`** property (or domain property where **www** is canonical).
2. **URL Inspection** — test the **www** URLs above (not the apex copies).
3. If www shows **URL is on Google** / **Indexed**, mark the apex report **Done fixing** or **Dismiss** — no code change needed.
4. If **www** is also **Crawled - currently not indexed**, then request indexing for the **www** URL, check content uniqueness, internal links, and manual actions — that is a real indexing task on the canonical URL.
5. Replace external links and GBP **Website** that still use `https://openhousemarketplace.com/...` without **www**.

### Quick checklist (www URLs only)

- [ ] `https://www.openhousemarketplace.com/open-houses` — 200, `index: true`, canonical = www
- [ ] `https://www.openhousemarketplace.com/neighborhoods/summerlin-centre` — 200, `index: true`, canonical = www
- [ ] Both paths present in live `sitemap.xml`

---

## "Blocked by robots.txt"

[app/robots.ts](app/robots.ts) disallows **`/api/`** and a few private paths only. **`/_next/static/...`** is **not** disallowed so Google can load JS/CSS for rendering.

If GSC reports **Blocked by robots.txt** for **`/api/...`**, that is expected for API routes.

**In Search Console:** For API-only blocks, you can mark **Done fixing** if you intend API URLs to stay non-indexed.
