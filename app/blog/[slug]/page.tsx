import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_QUERY, POST_SLUGS_QUERY, type PostQueryResult, type PostSlugsQueryResult } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { client } from '@/sanity/lib/client' // used only for generateStaticParams (no cache needed there)

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<PostSlugsQueryResult>(POST_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

async function fetchPostMeta(slug: string): Promise<PostQueryResult> {
  'use cache'
  const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } })
  return data as PostQueryResult
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await fetchPostMeta(slug)
  if (!post) return {}
  return {
    title: post.title ?? undefined,
    description: post.excerpt ?? undefined,
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function PostContent({ slug }: { slug: string }) {
  'use cache'
  const { data } = await sanityFetch({ query: POST_QUERY, params: { slug } })
  const post = data as PostQueryResult
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted mb-10 flex items-center gap-1.5">
        <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
        <span className="text-zinc-300">/</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="text-zinc-300">/</span>
        <span className="text-text line-clamp-1">{post.title}</span>
      </nav>

      {/* Category + date */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        {post.categories?.map((cat, i) =>
          cat.title ? (
            cat.slug ? (
              <Link
                key={i}
                href={`/blog?category=${cat.slug}`}
                className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/8 px-2.5 py-1 rounded hover:bg-primary/15 transition-colors"
              >
                {cat.title}
              </Link>
            ) : (
              <span key={i} className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/8 px-2.5 py-1 rounded">
                {cat.title}
              </span>
            )
          ) : null
        )}
        {post.publishedAt && (
          <time className="text-xs text-muted">{formatDate(post.publishedAt)}</time>
        )}
        {post.author && (
          <span className="text-xs text-muted">— {post.author}</span>
        )}
      </div>

      {/* Title */}
      <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text leading-tight tracking-tight">
        {post.title}
      </h1>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="mt-6 text-lg text-muted leading-relaxed border-l-4 border-accent-yellow pl-5">
          {post.excerpt}
        </p>
      )}

      {/* Main image */}
      {post.mainImage && (
        <div className="mt-8 overflow-hidden rounded-xl bg-zinc-100">
          <Image
            src={urlFor(post.mainImage).width(1200).height(630).fit('crop').url()}
            alt={post.mainImage.alt ?? post.title ?? ''}
            width={1200}
            height={630}
            className="w-full object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      {post.body && (
        <div className="mt-10 prose prose-zinc prose-lg max-w-none
          prose-headings:font-display prose-headings:font-extrabold prose-headings:text-text
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl
          prose-blockquote:border-l-accent-yellow prose-blockquote:text-muted prose-blockquote:not-italic
          prose-strong:text-text
          prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1 prose-code:rounded">
          <PortableText value={post.body} />
        </div>
      )}

      {/* Back */}
      <div className="mt-16 pt-8 border-t border-zinc-200">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Retour aux actualités
        </Link>
      </div>
    </article>
  )
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <main>
      <Suspense fallback={
        <div className="mx-auto max-w-3xl px-6 py-12 space-y-4 animate-pulse">
          <div className="h-3 bg-zinc-200 rounded w-48" />
          <div className="h-12 bg-zinc-200 rounded w-3/4 mt-8" />
          <div className="h-4 bg-zinc-200 rounded w-1/2" />
          <div className="aspect-video bg-zinc-200 rounded-xl mt-8" />
        </div>
      }>
        <PostContent slug={slug} />
      </Suspense>
    </main>
  )
}
