# Changelog

## 2026

### Site update (June 2026)

* **SEO / GEO / AEO sitewide:** `PageIndexingEnhancement` on all 41 marketing sitemap URLs; expanded `config/indexing-pages.ts` (home, open houses, neighborhoods hub, amenity map, store locations, consultation, sitemap, disclaimer, four luxury villages).
* **Brand palette (sitewide):** `config/brand.ts`, `lib/brand-classes.ts`, Tailwind `brand-*` tokens; 70+ app pages and shared components migrated from legacy blue/red/green; RealScout widget CSS, Calendly badge, map markers, and `themeColor` use palette; header, footer, homepage, and enhancement sections updated.
* **Vercel deploy audit:** Document repo transfer (LetMeHelpYouREALTY vs DrJanDuffy), correct `prj_UH4vlCl7EkB4ipEIvu7kflQN3p2E`, stale production SHA; GitHub Actions guard for drjanduffy project ID.
* **GSC canonical:** `/index`, `/index/`, `/index.html` → **301** to `/` (Vercel edge, `next.config`, middleware, `app/index/route.ts`) — fixes “Duplicate without user-selected canonical”.
* **GSC indexing:** `PageIndexingEnhancement` + `config/indexing-pages.ts` (FAQs, speakable summaries, internal links) on 28 discovered URLs; privacy/terms set to `index`; sitemap `lastModified`; home-buying HowTo.
* **GBP / NAP:** Office address updated to **760 Windover Ct, Las Vegas, NV 89138** (`config/gbp.ts`, map pin, directions, JSON-LD).
* **Vercel:** Removed invalid `outputDirectory` from `vercel.json`; aligned install/build with pnpm; GitHub Actions deploy uses `vercel@latest`, validates `VERCEL_PROJECT_ID` targets openhousemarketplace (not drjanduffy.com); `docs/VERCEL_DEPLOYMENT.md` audit table and repo-transfer notes.
* **SEO / GEO / AEO (2026):** Sitewide `@graph` (`SiteEntityGraph`), HowTo + Speakable on open-house-guide, linked WebPage author/publisher `@id`s, `docs/SEO-GEO-AEO-2026.md`.
* **Google Search Console:** Centralized marketing URLs in `config/sitemap-routes.ts`; trailing-slash 301s; `robots.txt` disallows `/test-form`; verify script checks live `sitemap.xml`; WebSite schema adds `SearchAction` for `/tour/mls`.
* **Email:** Contact form and open house sign-in can send notifications via Resend when `RESEND_*` env vars are set; otherwise logs in dev (no simulated delay).
* **SEO / GBP:** Default Google Business Profile URL in schema and UI from `config/gbp.ts`; optional `NEXT_PUBLIC_GBP_RATING` / `NEXT_PUBLIC_GBP_REVIEW_COUNT` for `aggregateRating` in LocalBusiness JSON-LD.
* **Social:** Open Graph images use `/images/dr-jan-duffy.jpg` fallback until `public/images/og/og-image.jpg` is added (shared via `config/og.ts`).

### Site audit and optimization

* **CTAs:** Aligned remaining pages to primary goal—about, schools, market-report, new-construction, open-house-signin, and OpenHouseSignInForm now use “Schedule a private showing” instead of “Book Your Tour” / “Schedule a Free Consultation.”
* **SEO:** Root layout default description updated to mention “schedule a private showing.”
* **Accessibility:** Footer logo given descriptive `alt="Open House Market Place"`.
* **Docs:** Added `docs/SITE_AUDIT.md` with audit summary and follow-up recommendations.

### Site updated for 2026

* Open House Guide: titles, metadata, and hero copy updated to 2026.
* SEO comments and Google enhancement page meta (open-house-guide) set to 2026.
* Docs: added `docs/SEO-GOOGLE-2026.md`; previous year’s SEO doc retained as `SEO-GOOGLE-2025.md` for reference.

---

# 1.0.0 (2025-08-07)

### Features

* add comprehensive GitHub integration documentation ([318f03b](https://github.com/DrJanDuffy/openhousemarketplace.com/commit/318f03baa981343da62b764a02493ad0732a3fae))
