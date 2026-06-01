/**
 * Open House Market Place brand palette (site-wide).
 * Use Tailwind utilities: brand-plum, brand-teal, brand-mint, brand-stone, brand-surface.
 */
export const BRAND_COLORS = {
  plum: '#4a3861',
  teal: '#6399a3',
  mint: '#b8dad7',
  stone: '#ada3a1',
  surface: '#e5e7eb',
} as const

/** RGB tuples for docs / tooling */
export const BRAND_RGB = {
  plum: [74, 56, 97] as const,
  teal: [99, 153, 163] as const,
  mint: [184, 218, 215] as const,
  stone: [173, 163, 161] as const,
  surface: [229, 231, 235] as const,
} as const

/** Default primary CTA button classes (Calendly, schedule links) */
export const BRAND_CTA_BUTTON_CLASS =
  'inline-flex items-center justify-center bg-brand-teal hover:bg-brand-plum text-white font-semibold transition-colors' as const
