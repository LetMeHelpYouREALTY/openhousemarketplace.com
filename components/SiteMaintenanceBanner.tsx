import { getSiteMaintenanceMessage, isSiteMaintenanceMode } from '@/lib/site-maintenance'

/**
 * Visible maintenance notice. Does not block pages or change robots — SEO stays on.
 */
export default function SiteMaintenanceBanner() {
  if (!isSiteMaintenanceMode()) return null

  const message = getSiteMaintenanceMessage()

  return (
    <div
      role="status"
      className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950"
    >
      <p className="font-semibold">Site maintenance in progress</p>
      <p className="mt-1 max-w-3xl mx-auto text-amber-900/90">{message}</p>
    </div>
  )
}
