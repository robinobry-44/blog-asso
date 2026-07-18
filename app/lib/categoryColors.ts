const CATEGORY_COLORS: Record<string, string> = {
  'Revue de presse': '#F5C400',
  'Compte rendu': '#1B6BB5',
  'Actualités': '#E63232',
  'Événements': '#2AACB8',
  'Bénévolat': '#3AAA35',
}

export const DEFAULT_CATEGORY_COLOR = '#888888'

export function getCategoryColor(title?: string | null): string {
  if (!title) return DEFAULT_CATEGORY_COLOR
  return CATEGORY_COLORS[title] ?? DEFAULT_CATEGORY_COLOR
}
