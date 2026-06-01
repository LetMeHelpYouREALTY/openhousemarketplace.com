/**
 * Open House Market Place brand palette (site-wide).
 * Tailwind: brand-plum, brand-teal, brand-mint, brand-stone, brand-surface
 */
export const BRAND_COLORS = {
  plum: '#4a3861',
  teal: '#6399a3',
  mint: '#b8dad7',
  stone: '#ada3a1',
  surface: '#e5e7eb',
} as const

export const BRAND_CTA_BUTTON_CLASS =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-brand-teal px-6 py-3 font-bold text-white shadow-lg shadow-brand-plum/20 transition-all hover:bg-brand-plum hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'

export const BRAND_CTA_SECONDARY_CLASS =
  'inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border-2 border-brand-teal bg-white px-6 py-3 font-bold text-brand-plum transition-all hover:bg-brand-mint/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-teal'
