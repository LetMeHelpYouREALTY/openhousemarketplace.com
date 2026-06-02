import { connection } from 'next/server'
import {
  getSiteMaintenanceMessage,
  isSiteMaintenanceBannerOnly,
  isSiteMaintenanceMode,
} from '@/lib/site-maintenance'

/**
 * Optional amber banner when `NEXT_PUBLIC_SITE_MAINTENANCE_BANNER_ONLY=true`.
 * Default maintenance mode blocks consumers in middleware (no banner).
 */
export default async function SiteMaintenanceBanner() {
  await connection()
  if (!isSiteMaintenanceMode() || !isSiteMaintenanceBannerOnly()) return null

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
