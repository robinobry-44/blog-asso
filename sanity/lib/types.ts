export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; width: number; height: number }
  crop?: { top: number; bottom: number; left: number; right: number }
  alt?: string
}

export interface Category {
  _id: string
  title: string | null
  slug: string | null
}

export interface PostCategory {
  title: string | null
  slug: string | null
}

export interface Post {
  _id: string
  title: string | null
  slug: string | null
  publishedAt: string | null
  excerpt: string | null
  mainImage: SanityImage | null
  author: string | null
  categories: PostCategory[] | null
}

export interface PostDetail extends Post {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: any[] | null
}

export interface Member {
  _id: string
  name: string | null
  role: string | null
  bio: string | null
  photo: SanityImage | null
  order: number | null
}
