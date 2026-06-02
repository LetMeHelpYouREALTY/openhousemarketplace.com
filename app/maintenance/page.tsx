import { Metadata } from 'next'
import { GBP } from '@/config/gbp'
import { getSiteMaintenanceMessage } from '@/lib/site-maintenance'

export const metadata: Metadata = {
  title: 'Site maintenance',
  robots: { index: false, follow: false },
}

/** Fallback route if middleware rewrites here; consumers normally receive 503 HTML from middleware. */
export default function MaintenancePage() {
  const message = getSiteMaintenanceMessage()

  return (
    <main className="min-h-screen flex items-center justify-center bg-brand-surface px-6 py-16">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-brand-plum mb-4">We&rsquo;ll be right back</h1>
        <p className="text-gray-700 mb-6">{message}</p>
        <p className="text-sm text-gray-600 mb-4">
          <strong>{GBP.name}</strong>
        </p>
        <p className="text-sm">
          <a href={`tel:${GBP.phoneE164}`} className="text-brand-teal font-semibold hover:underline">
            {GBP.phone}
          </a>
          {' · '}
          <a href={`mailto:${GBP.email}`} className="text-brand-teal font-semibold hover:underline">
            {GBP.email}
          </a>
        </p>
      </div>
    </main>
  )
}
