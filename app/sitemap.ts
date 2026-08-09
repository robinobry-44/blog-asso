import type { MetadataRoute } from 'next'
import { cacheLife } from 'next/cache'
import { groq } from 'next-sanity'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://unispourlatrinitesurmer.fr'

const SITEMAP_POSTS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    _updatedAt,
  }
`

type SitemapPost = {
  slug: string
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  'use cache'
  cacheLife('hours')

  const posts = await client.fetch<SitemapPost[]>(SITEMAP_POSTS_QUERY)

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...postEntries,
  ]
}
