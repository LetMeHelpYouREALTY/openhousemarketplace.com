/**
 * Open House Market Place brand palette (site-wide).
 * Tailwind: brand-plum, brand-teal, brand-mint, brand-stone, brand-surface
 *
 * | Token   | Hex       | RGB              |
 * |---------|-----------|------------------|
 * | plum    | #4a3861   | 74, 56, 97       |
 * | teal    | #6399a3   | 99, 153, 163     |
 * | mint    | #b8dad7   | 184, 218, 215    |
 * | stone   | #ada3a1   | 173, 163, 161    |
 * | surface | #e5e7eb   | 229, 231, 235    |
 */
export const BRAND_COLORS = {
  plum: '#4a3861',
  teal: '#6399a3',
  mint: '#b8dad7',
  stone: '#ada3a1',
  surface: '#e5e7eb',
} as const

export const BRAND_RGB = {
  plum: [74, 56, 97] as const,
  teal: [99, 153, 163] as const,
  mint: [184, 218, 215] as const,
  stone: [173, 163, 161] as const,
  surface: [229, 231, 235] as const,
} as const

export const BRAND_CTA_BUTTON_CLASS =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3 font-bold text-white shadow-lg shadow-brand-plum/20 transition-all hover:bg-brand-plum hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'

export const BRAND_CTA_SECONDARY_CLASS =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-brand-teal bg-white px-6 py-3 font-bold text-brand-plum transition-all hover:bg-brand-mint/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'
