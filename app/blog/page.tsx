import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import {
  PAGE_SIZE,
  PAGINATED_POSTS_QUERY,
  PAGINATED_POSTS_BY_CATEGORY_QUERY,
  POSTS_COUNT_QUERY,
  POSTS_COUNT_BY_CATEGORY_QUERY,
  CATEGORIES_QUERY,
  type PostsQueryResult,
  type PostsCountQueryResult,
  type CategoriesQueryResult,
} from '@/sanity/lib/queries'
import ArticleCard from '../components/ArticleCard'
import { getCategoryColor, hexToRgba } from '../lib/categoryColors'
import { heroBackgroundStyle } from '../lib/heroBackground'

const TOUS_INACTIVE_COLOR = '#888888'
const PAGE_BLUE = '#1B5EA6'

function buildBlogHref(page: number, category?: string) {
  const params = new URLSearchParams()
  if (category) params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/blog${qs ? `?${qs}` : ''}`
}

function getPageNumbers(current: number, total: number): (number | 'ellipsis')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | 'ellipsis')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) pages.push('ellipsis')
  for (let i = start; i <= end; i++) pages.push(i)
  if (end < total - 1) pages.push('ellipsis')
  pages.push(total)

  return pages
}

export const metadata: Metadata = {
  title: 'Blog',
  description: "Toutes les actualités et articles de l'association Unis Pour La Trinité Sur Mer.",
}

async function CategoryNav({ currentCategory }: { currentCategory?: string }) {
  'use cache'
  const { data } = await sanityFetch({ query: CATEGORIES_QUERY })
  const categories = (data ?? []) as CategoriesQueryResult

  if (categories.length === 0) return null

  const pillBase = 'px-4 py-1.5 rounded-full text-sm font-semibold text-white transition-all'
  const isAllActive = !currentCategory

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      <Link
        href="/blog"
        className={`${pillBase} ${isAllActive ? 'scale-105' : ''}`}
        style={{
          backgroundColor: isAllActive ? '#0D0D0D' : hexToRgba(TOUS_INACTIVE_COLOR, 0.7),
        }}
      >
        Tous
      </Link>
      {categories.map((cat) => {
        const ref = cat.slug ?? cat._id
        const color = getCategoryColor(cat.slug)
        const isActive = currentCategory === ref

        return (
          <Link
            key={cat._id}
            href={`/blog?category=${ref}`}
            className={`${pillBase} ${isActive ? 'scale-105' : ''}`}
            style={{ backgroundColor: isActive ? color : hexToRgba(color, 0.7) }}
          >
            {cat.title}
          </Link>
        )
      })}
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  category,
}: {
  currentPage: number
  totalPages: number
  category?: string
}) {
  if (totalPages <= 1) return null

  const pillBase =
    'inline-flex items-center justify-center min-w-9 h-9 px-3 rounded-md text-sm font-semibold border transition-colors'
  const prevDisabled = currentPage <= 1
  const nextDisabled = currentPage >= totalPages
  const pages = getPageNumbers(currentPage, totalPages)

  return (
    <nav className="mt-12 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      {prevDisabled ? (
        <span className={`${pillBase} border-zinc-200 text-zinc-300 cursor-not-allowed`}>
          Précédent
        </span>
      ) : (
        <Link
          href={buildBlogHref(currentPage - 1, category)}
          className={`${pillBase} bg-white hover:opacity-70`}
          style={{ borderColor: PAGE_BLUE, color: PAGE_BLUE }}
        >
          Précédent
        </Link>
      )}

      {pages.map((p, i) =>
        p === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-muted select-none">
            …
          </span>
        ) : (
          <Link
            key={p}
            href={buildBlogHref(p, category)}
            className={pillBase}
            style={
              p === currentPage
                ? { backgroundColor: PAGE_BLUE, borderColor: PAGE_BLUE, color: '#fff' }
                : { backgroundColor: '#fff', borderColor: PAGE_BLUE, color: PAGE_BLUE }
            }
          >
            {p}
          </Link>
        )
      )}

      {nextDisabled ? (
        <span className={`${pillBase} border-zinc-200 text-zinc-300 cursor-not-allowed`}>
          Suivant
        </span>
      ) : (
        <Link
          href={buildBlogHref(currentPage + 1, category)}
          className={`${pillBase} bg-white hover:opacity-70`}
          style={{ borderColor: PAGE_BLUE, color: PAGE_BLUE }}
        >
          Suivant
        </Link>
      )}
    </nav>
  )
}

async function PostList({ category, page }: { category?: string; page: number }) {
  'use cache'
  const isFiltered = Boolean(category)
  const offset = (page - 1) * PAGE_SIZE

  const [postsResult, countResult] = await Promise.all([
    sanityFetch({
      query: isFiltered ? PAGINATED_POSTS_BY_CATEGORY_QUERY : PAGINATED_POSTS_QUERY,
      params: isFiltered ? { categoryRef: category, offset } : { offset },
    }),
    sanityFetch({
      query: isFiltered ? POSTS_COUNT_BY_CATEGORY_QUERY : POSTS_COUNT_QUERY,
      params: isFiltered ? { categoryRef: category } : {},
    }),
  ])

  const posts = (postsResult.data ?? []) as PostsQueryResult
  const total = (countResult.data ?? 0) as PostsCountQueryResult
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  if (posts.length === 0) {
    return (
      <div className="rounded-xl bg-surface border border-zinc-100 px-8 py-20 text-center">
        <p className="text-muted text-sm">
          {category ? 'Aucun article dans cette catégorie.' : 'Aucun article à afficher.'}
        </p>
        <Link
          href={buildBlogHref(1, category)}
          className="mt-3 inline-flex text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Voir tous les articles →
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} category={category} />
    </>
  )
}

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  return (
    <main>
      {/* Hero banner */}
      <section
        className="relative overflow-hidden h-[200px] max-h-[200px] flex flex-col items-center justify-center"
        style={heroBackgroundStyle}
      >
        <h1 className="font-display font-extrabold text-white text-4xl sm:text-5xl text-center tracking-tight">
          Actualités
        </h1>
        <p className="font-sans font-normal text-white opacity-90 text-lg text-center mt-2">
          Tous nos articles
        </p>
      </section>

      {/* Page header */}
      <div className="bg-surface border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <nav className="text-xs text-muted mb-3 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-text">Blog</span>
          </nav>

          {/* Category filter pills — resolves searchParams inside Suspense */}
          <Suspense fallback={<div className="mt-6 h-9" />}>
            {searchParams.then(({ category }) => (
              <CategoryNav currentCategory={category} />
            ))}
          </Suspense>
        </div>
      </div>

      {/* Post grid — resolves searchParams inside Suspense */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Suspense
          fallback={
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl bg-surface border border-zinc-100 border-l-4 border-l-primary/20 aspect-[4/3] animate-pulse" />
              ))}
            </div>
          }
        >
          {searchParams.then(({ category, page }) => (
            <PostList category={category} page={Math.max(1, parseInt(page ?? '1', 10) || 1)} />
          ))}
        </Suspense>
      </div>
    </main>
  )
}
