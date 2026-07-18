export const HERO_IMAGE_URL =
  'https://images.unsplash.com/photo-1657031960833-c13cee6c3064?w=1920&q=80&fit=crop&auto=format'

export const HERO_OVERLAY_GRADIENT = 'linear-gradient(rgba(27, 94, 166, 0.75), rgba(27, 94, 166, 0.85))'

export const heroBackgroundStyle = {
  backgroundImage: `${HERO_OVERLAY_GRADIENT}, url('${HERO_IMAGE_URL}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
} as const
