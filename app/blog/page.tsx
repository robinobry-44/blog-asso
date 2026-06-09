import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import {
  POSTS_QUERY,
  POSTS_BY_CATEGORY_QUERY,
  CATEGORIES_QUERY,
  type PostsQueryResult,
  type CategoriesQueryResult,
} from '@/sanity/lib/queries'
import ArticleCard from '../components/ArticleCard'

export const metadata: Metadata = {
  title: 'Blog',
  description: "Toutes les actualités et articles de l'association Agir Avec Vous Tous.",
}

async function CategoryNav({ currentCategory }: { currentCategory?: string }) {
  'use cache'
  const { data } = await sanityFetch({ query: CATEGORIES_QUERY })
  const categories = (data ?? []) as CategoriesQueryResult

  if (categories.length === 0) return null

  const pillBase = 'px-4 py-1.5 rounded-full text-sm font-semibold transition-colors border'
  const pillActive = 'bg-primary text-white border-primary'
  const pillIdle = 'bg-surface border-zinc-200 text-muted hover:border-primary/40 hover:text-primary'

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <Link
        href="/blog"
        className={`${pillBase} ${!currentCategory ? pillActive : pillIdle}`}
      >
        Tous
      </Link>
      {categories.map((cat) =>
        cat.slug ? (
          <Link
            key={cat._id}
            href={`/blog?category=${cat.slug}`}
            className={`${pillBase} ${currentCategory === cat.slug ? pillActive : pillIdle}`}
          >
            {cat.title}
          </Link>
        ) : null
      )}
    </div>
  )
}

async function PostList({ category }: { category?: string }) {
  'use cache'
  const isFiltered = Boolean(category)
  const { data } = await sanityFetch({
    query: isFiltered ? POSTS_BY_CATEGORY_QUERY : POSTS_QUERY,
    params: isFiltered ? { categorySlug: category } : {},
  })
  const posts = (data ?? []) as PostsQueryResult

  if (posts.length === 0) {
    return (
      <div className="rounded-xl bg-surface border border-zinc-100 px-8 py-20 text-center">
        <p className="text-muted text-sm">Aucun article dans cette catégorie.</p>
        <Link href="/blog" className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
          Voir tous les articles →
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
    </div>
  )
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams

  return (
    <main>
      {/* Page header */}
      <div className="bg-surface border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <nav className="text-xs text-muted mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-text">Blog</span>
          </nav>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text flex items-center gap-3">
            <span className="block h-8 w-1 bg-accent-yellow shrink-0" />
            Actualités
          </h1>
          <p className="mt-2 text-muted text-sm ml-4">Les dernières nouvelles de l&apos;association</p>

          {/* Category filter pills */}
          <Suspense fallback={<div className="mt-6 h-9" />}>
            <CategoryNav currentCategory={category} />
          </Suspense>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Suspense
          key={category ?? 'all'}
          fallback={
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl bg-surface border border-zinc-100 border-l-4 border-l-primary/20 aspect-[4/3] animate-pulse" />
              ))}
            </div>
          }
        >
          <PostList category={category} />
        </Suspense>
      </div>
    </main>
  )
}
