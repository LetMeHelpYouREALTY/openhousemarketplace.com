/**
 * Public maintenance banner — site stays fully visible and indexable for SEO.
 * Toggle in Vercel: NEXT_PUBLIC_SITE_MAINTENANCE_MODE=true
 * Optional message: NEXT_PUBLIC_SITE_MAINTENANCE_MESSAGE
 */
export function isSiteMaintenanceMode(): boolean {
  return process.env.NEXT_PUBLIC_SITE_MAINTENANCE_MODE === 'true'
}

export function getSiteMaintenanceMessage(): string {
  const custom = process.env.NEXT_PUBLIC_SITE_MAINTENANCE_MESSAGE?.trim()
  if (custom) return custom
  return 'We are updating Open House Market Place. You can still browse listings and book tours — some features may change briefly.'
}
