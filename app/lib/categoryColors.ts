const CATEGORY_COLORS: Record<string, string> = {
  'courriers': '#2AACB8',
  'lettre-d-opposition': '#E63232',
  'revue-de-presse': '#F5C400',
  'autre': '#3AAA8C',
  'conseil-municipal': '#1B5EA6',
}

export const DEFAULT_CATEGORY_COLOR = '#888888'

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
