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
  "categories": categories[]->{_id, title, "slug": slug.current},
`

export const POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...6] {
    ${postFields}
  }
`

export type PostsQueryResult = Post[]

export const LATEST_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc)[0...4] {
    ${postFields}
  }
`

export type LatestPostsQueryResult = Post[]

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
    siteName,
    siteDescription,
    heroImage,
    heroTitle,
    heroSubtitle,
    primaryColor,
    contactEmail,
    contactPhone,
    address,
  }
`

export type SiteSettingsQueryResult = {
  siteName: string | null
  siteDescription: string | null
  heroImage: import('./types').SanityImage | null
  heroTitle: string | null
  heroSubtitle: string | null
  primaryColor: string | null
  contactEmail: string | null
  contactPhone: string | null
  address: string | null
} | null
