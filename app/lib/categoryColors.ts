const CATEGORY_COLORS: Record<string, string> = {
  'compte-rendu': '#1B6BB5',
  'courrier-a-la-mairie': '#9B59B6',
  'revue-de-presse': '#F5C400',
  'vie-a-la-trinite': '#E63232',
}

export const DEFAULT_CATEGORY_COLOR = '#888888'

export function getCategoryColor(slug?: string | null): string {
  if (!slug) return DEFAULT_CATEGORY_COLOR
  return CATEGORY_COLORS[slug] ?? DEFAULT_CATEGORY_COLOR
}
