const CATEGORY_COLORS: Record<string, string> = {
  'revue-de-presse': '#F5C400',
  'compte-rendu': '#1B6BB5',
  'actualites': '#E63232',
  'evenements': '#2AACB8',
  'benevolat': '#3AAA35',
  'courrier-a-la-mairie': '#9B59B6',
}

export const DEFAULT_CATEGORY_COLOR = '#888888'

export function getCategoryColor(slug?: string | null): string {
  if (!slug) return DEFAULT_CATEGORY_COLOR
  return CATEGORY_COLORS[slug] ?? DEFAULT_CATEGORY_COLOR
}
