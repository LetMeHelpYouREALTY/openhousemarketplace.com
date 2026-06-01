# SEO, GEO, and AEO (2026) — Open House Market Place

Google’s [AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) (May 2026) states that **answer-engine and generative visibility follow the same fundamentals as Search**: helpful content, crawlable pages, correct entities, and accurate local data—not separate “AI-only” markup.

This site implements all three layers in one stack:

| Layer | Goal | Implementation in this repo |
|-------|------|------------------------------|
| **SEO** | Rank and index on Google Search | `generateMetadata`, canonical www, sitemap, Core Web Vitals, internal links |
| **AEO** | Direct answers for voice / AI summaries | Visible Q→A (`<dl>`, FAQ sections), `FAQPage` + `HowTo` JSON-LD where content matches |
| **GEO** | Clear entities for generative systems | `@graph` with stable `@id` (`#organization`, `#website`, `/about#agent`), `sameAs` from GBP |

NAP, hours, and service area: **[`config/gbp.ts`](../config/gbp.ts)** only.

Brand palette (UI): **[`config/brand.ts`](../config/brand.ts)** — Tailwind utilities `brand-plum`, `brand-teal`, `brand-mint`, `brand-stone`, `brand-surface`.

Per-page AEO blocks: **[`components/PageIndexingEnhancement.tsx`](../components/PageIndexingEnhancement.tsx)** + **[`config/indexing-pages.ts`](../config/indexing-pages.ts)** on every marketing URL in the sitemap.

---

## SEO (Google Search)

- **Canonical:** `https://www.openhousemarketplace.com` via [`lib/site.ts`](../lib/site.ts), [`middleware.ts`](../middleware.ts), [`vercel.json`](../vercel.json).
- **Sitemap:** [`config/sitemap-routes.ts`](../config/sitemap-routes.ts) → [`app/sitemap.ts`](../app/sitemap.ts).
- **GSC:** [`docs/gsc-gbp-runbook.md`](./gsc-gbp-runbook.md).
- **Verification:** `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in [`app/layout.tsx`](../app/layout.tsx).

---

## AEO (answer engines)

1. **Lead with the answer** — First 1–2 sentences under each H2/H3 state the fact (see homepage FAQ `<dl>` and open-house-guide).
2. **FAQPage JSON-LD** — [`lib/json-ld.ts`](../lib/json-ld.ts) `buildFaqPageJsonLd()`; text must match visible copy. Note: [FAQ rich results](https://developers.google.com/search/docs/appearance/structured-data/faqpage) are limited; markup still helps machine readability.
3. **HowTo** — Buyer guides use `HowTo` + visible `<ol>` (e.g. [`app/open-house-guide/page.tsx`](../app/open-house-guide/page.tsx)).
4. **Do not use QAPage** for static FAQs — [QAPage](https://developers.google.com/search/docs/appearance/structured-data/qapage) is for user-submitted answers (forums), not site-authored lists.
5. **Speakable (beta)** — Optional `SpeakableSpecification` with `cssSelector` matching real classes (e.g. `.page-title-speakable`, `.speakable-summary`).

FAQ copy sources: [`config/seo.ts`](../config/seo.ts) (`HOME_PAGE_FAQS`, `OPEN_HOUSES_PAGE_FAQS`, `OPEN_HOUSE_GUIDE_FAQS`).

---

## GEO (generative / entity SEO)

1. **Sitewide `@graph`** — [`components/SiteEntityGraph.tsx`](../components/SiteEntityGraph.tsx): `Organization`, `RealEstateAgent`, `WebSite` with linked `@id`s.
2. **Per-page WebPage** — [`components/GoogleEnhancement.tsx`](../components/GoogleEnhancement.tsx): `author` → `#agent`, `publisher` → `#organization`, `isPartOf` → `#website`.
3. **sameAs** — GBP + Facebook via [`getBusinessSameAsUrls()`](../config/gbp.ts).
4. **E-E-A-T** — Agent license and brokerage in schema + `/about`; never use placeholder review counts (use env GBP rating only when real).
5. **Crawlers** — [`app/robots.ts`](../app/robots.ts): explicit `Googlebot` rule; `Google-Extended` documented separately from Search.

---

## Validation

- [Rich Results Test](https://search.google.com/test/rich-results)
- [Search Console](https://search.google.com/search-console) — www property, `sitemap.xml`
- `pnpm run verify-gsc-404s` after deploy

---

## Related

- [SEO-GOOGLE-2026.md](./SEO-GOOGLE-2026.md) — GBP env, ratings
- [gsc-gbp-runbook.md](./gsc-gbp-runbook.md) — Search Console operations
