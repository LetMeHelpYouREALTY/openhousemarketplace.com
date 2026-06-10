# Google 2026 SEO Setup

This doc covers optional env and data updates to complete the site’s Google 2026 SEO setup.

For **SEO + GEO + AEO** architecture (entity graph, HowTo, speakable, robots), see **[SEO-GEO-AEO-2026.md](./SEO-GEO-AEO-2026.md)**.

## 1. Google Business Profile (GBP) link in schema

**Purpose:** `sameAs` in Organization/LocalBusiness/WebSite publisher links the site to your Google Business Profile for E-E-A-T and knowledge panel.

**Steps:**

1. Get your GBP URL (e.g. `https://www.google.com/maps/place/...` or your `g.page` link).
2. Add to Vercel (or local) env:
   ```bash
   NEXT_PUBLIC_GOOGLE_BUSINESS_PROFILE_URL=https://www.google.com/maps/place/your-place-id
   ```
3. Redeploy. The WebSite publisher, Organization, and LocalBusiness schemas will include `sameAs: [your URL]`.

## 2. Real review data for star ratings

**Purpose:** `aggregateRating` in LocalBusiness should reflect real GBP reviews so rich results stay accurate and compliant.

**Current:** `GoogleEnhancement` adds `aggregateRating` only when both env vars are set:

```bash
NEXT_PUBLIC_GBP_RATING=4.9
NEXT_PUBLIC_GBP_REVIEW_COUNT=127
```

**Steps:**

1. Pull rating and review count from Google Business Profile (API or manual).
2. Set the env vars in Vercel and redeploy. If unset, rating schema is omitted (preferred over placeholder values).

## 3. What’s already in place

- WebSite + Organization + WebPage (author/publisher) structured data
- RealEstateAgent with license, worksFor, knowsAbout
- LocalBusiness with NAP, services, opening hours
- ItemList schema on neighborhoods index
- Default metadata, viewport, themeColor
- Single sitemap in `robots.txt`
- LCP priority on first property image
- AI crawlers allowed in `robots.ts`
- Custom 404 (`not-found.tsx`) with noindex and helpful links
- Error boundary (`error.tsx`) for graceful error handling
- Test form page noindexed via `test-form/layout.tsx`

## 4. Validation

- [Google Rich Results Test](https://search.google.com/test/rich-results): validate WebSite, Organization, LocalBusiness, FAQPage.
- [Google Search Console](https://search.google.com/search-console): submit sitemap, check Core Web Vitals and Enhancements.
