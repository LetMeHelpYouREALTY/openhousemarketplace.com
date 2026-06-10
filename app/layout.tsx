import "styles/tailwind.css"
import { Metadata, Viewport } from "next"
import Script from "next/script"
import SiteHeader from "@/components/SiteHeader"
import Footer from "@/components/Footer"
import SiteEntityGraph from "@/components/SiteEntityGraph"
import GoogleEnhancement from "@/components/GoogleEnhancement"
import CalendlyBadgeWidget from "@/components/CalendlyBadgeWidget"
import CalendlyCSS from "@/components/CalendlyCSS"
import { getSiteUrl } from "@/lib/site"
import { SEO_HOME_DESCRIPTION, SEO_HOME_TITLE } from "@/config/seo"
import {
  OG_IMAGE_DEFAULT_ALT,
  OG_IMAGE_DEFAULT_HEIGHT,
  OG_IMAGE_DEFAULT_PATH,
  OG_IMAGE_DEFAULT_WIDTH,
} from "@/config/og"
import { getFacebookAppId } from "@/config/facebook"
import FacebookPixel from "@/components/FacebookPixel"
import RealScoutScriptLoader from "@/components/RealScoutScriptLoader"
import RealScoutOfficeListingsBandsDynamic from "@/components/RealScoutOfficeListingsBandsDynamic"
import ScheduleTourBand from "@/components/conversion/ScheduleTourBand"
import StickyMobileCta from "@/components/conversion/StickyMobileCta"
import SiteMaintenanceBanner from "@/components/SiteMaintenanceBanner"

// Google Analytics scripts must be in head as standard script tags for detection
// SEO: Google 2026 – metadata defaults, E-E-A-T, structured data, Core Web Vitals

const SITE_URL = getSiteUrl()
const DEFAULT_TITLE = SEO_HOME_TITLE
const DEFAULT_DESCRIPTION = SEO_HOME_DESCRIPTION
const FB_APP_ID = getFacebookAppId()

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: '%s | Open House Market Place',
  },
  description: DEFAULT_DESCRIPTION,
  // Per-route canonical is set in each page’s metadata (see app/page.tsx for `/`).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Open House Market Place',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [{
      url: `${SITE_URL}${OG_IMAGE_DEFAULT_PATH}`,
      width: OG_IMAGE_DEFAULT_WIDTH,
      height: OG_IMAGE_DEFAULT_HEIGHT,
      alt: OG_IMAGE_DEFAULT_ALT,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  ...(FB_APP_ID ? { facebook: { appId: FB_APP_ID } } : {}),
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4a3861',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://em.realscout.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.realscout.com" />
        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="anonymous" />
        {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ? (
          <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="anonymous" />
        ) : null}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="preload" href="/images/team/dr-jan-duffy.jpg" as="image" fetchPriority="high" />
        <noscript>
          <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        </noscript>
        {/* Google tag (gtag.js) - load afterInteractive to avoid blocking LCP */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-G22H2J3EMX"
          strategy="afterInteractive"
        />
        <Script id="gtag-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-G22H2J3EMX', {
              page_path: window.location.pathname,
              cookie_domain: 'auto',
              cookie_flags: 'SameSite=None;Secure'
            });
          `}
        </Script>
      </head>
      <body className="overflow-x-hidden">
        <RealScoutScriptLoader />
        <CalendlyCSS />
        <FacebookPixel />
        <SiteEntityGraph />
        <GoogleEnhancement />
        <CalendlyBadgeWidget />
        <SiteMaintenanceBanner />
        <SiteHeader />
        <div className="pb-20 md:pb-0">{children}</div>
        <ScheduleTourBand />
        <RealScoutOfficeListingsBandsDynamic />
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  )
}
