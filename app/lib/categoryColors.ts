const CATEGORY_COLORS: Record<string, string> = {
  'compte-rendu': '#1B5EA6',
  'courrier-a-la-mairie': '#3AAA8C',
  'revue-de-presse': '#F5C400',
  'vie-a-la-trinite': '#E63232',
}

export const DEFAULT_CATEGORY_COLOR = '#2AACB8'

export function getCategoryColor(slug?: string | null): string {
  if (!slug) return DEFAULT_CATEGORY_COLOR
  return CATEGORY_COLORS[slug] ?? DEFAULT_CATEGORY_COLOR
}

export function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
