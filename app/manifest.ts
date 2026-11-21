import type { MetadataRoute } from 'next'
import { SEO_HOME_DESCRIPTION } from '@/config/seo'
import { SITE_NAME } from '@/config/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} | Dr. Jan Duffy`,
    short_name: 'Jan Duffy Homes',
    description: SEO_HOME_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#f4f1e9',
    theme_color: '#f4f1e9',
    icons: [
      {
        src: '/images/logo/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
  }
}
