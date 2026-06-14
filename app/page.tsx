import { Suspense } from 'react'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import {
  POSTS_QUERY,
  CATEGORIES_QUERY,
  type PostsQueryResult,
  type CategoriesQueryResult,
} from '@/sanity/lib/queries'
import CategoryFilter from './components/CategoryFilter'

function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary max-h-[350px]">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
          <span className="h-px w-6 bg-accent-yellow" />
          Trinité-sur-Mer, Morbihan
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-2xl">
          Unis Pour La Trinité Sur Mer
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
          Une association citoyenne engagée pour le développement et la qualité de vie à Trinité-sur-Mer.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="bg-white text-primary font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors"
          >
            Nos actualités
          </Link>
          <Link
            href="/a-propos"
            className="border border-white/30 text-white font-medium text-sm px-5 py-2.5 rounded-md hover:bg-white/10 transition-colors"
          >
            Qui sommes-nous ?
          </Link>
        </div>
      </div>
    </section>
  )
}

async function LatestArticles() {
  const [postsResult, categoriesResult] = await Promise.all([
    sanityFetch({ query: POSTS_QUERY }),
    sanityFetch({ query: CATEGORIES_QUERY }),
  ])
  const posts = (postsResult.data ?? []) as PostsQueryResult
  const categories = (categoriesResult.data ?? []) as CategoriesQueryResult
  if (posts.length === 0) return null
  return <CategoryFilter posts={posts} categories={categories} />
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-6 py-8 sm:py-10">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-3">
            <span className="block h-7 w-1 bg-accent-yellow shrink-0" />
            Dernières actualités
          </h2>
          <Link
            href="/blog"
            className="hidden sm:inline-flex text-sm font-medium text-primary hover:text-primary-dark transition-colors"
          >
            Tout voir →
          </Link>
        </div>

        <Suspense fallback={
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-xl bg-surface border border-zinc-100 border-l-4 border-l-primary/20 aspect-[4/3] animate-pulse" />
            ))}
          </div>
        }>
          <LatestArticles />
        </Suspense>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/blog"
            className="inline-flex text-sm font-semibold text-primary border border-primary px-5 py-2.5 rounded-md hover:bg-primary/5 transition-colors"
          >
            Voir toutes les actualités
          </Link>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-t border-zinc-200 bg-surface">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <p className="font-display font-extrabold text-lg text-text">Rejoignez le mouvement</p>
            <p className="mt-1 text-sm text-muted">Participez à la vie locale et agissez avec nous.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </>
  )
}
