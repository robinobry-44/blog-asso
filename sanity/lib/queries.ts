import { groq } from 'next-sanity'
import type { Post, PostDetail, Category, Member } from './types'

const postFields = groq`
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  excerpt,
  mainImage,
  "author": author->name,
  "categories": categories[]->{title, "slug": slug.current},
`

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    ${postFields}
  }
`

export type PostsQueryResult = Post[]

export const POSTS_BY_CATEGORY_QUERY = groq`
  *[_type == "post" && defined(slug.current) && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    ${postFields}
  }
`

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${postFields}
    body,
  }
`

export type PostQueryResult = PostDetail | null

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
  }
`

export type PostSlugsQueryResult = { slug: string }[]

export const CATEGORIES_QUERY = groq`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
  }
`

export type CategoriesQueryResult = Category[]

export const MEMBERS_QUERY = groq`
  *[_type == "member"] | order(order asc, name asc) {
    _id,
    name,
    role,
    bio,
    photo,
  }
`

export type MembersQueryResult = Member[]

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    heroImage,
    tagline,
  }
`

export type SiteSettingsQueryResult = {
  heroImage: import('./types').SanityImage | null
  tagline: string | null
} | null
