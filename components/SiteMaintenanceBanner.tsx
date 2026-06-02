import { connection } from 'next/server'
import { getSiteMaintenanceMessage, isSiteMaintenanceMode } from '@/lib/site-maintenance'

/**
 * Visible maintenance notice. Does not block pages or change robots — SEO stays on.
 * Uses `connection()` so the flag is read at request time (Vercel env changes without stale static shell).
 */
export default async function SiteMaintenanceBanner() {
  await connection()
  if (!isSiteMaintenanceMode()) return null

  const message = getSiteMaintenanceMessage()

  return (
    <div
      role="status"
      className="sticky top-0 z-[60] border-b-2 border-amber-400 bg-amber-100 px-4 py-3 text-center text-sm text-amber-950 shadow-sm"
    >
      <p className="font-semibold">Site maintenance in progress</p>
      <p className="mt-1 max-w-3xl mx-auto text-amber-900/90">{message}</p>
    </div>
  )
}
