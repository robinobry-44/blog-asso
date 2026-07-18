import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/sanity/lib/live'
import { LATEST_POSTS_QUERY, type LatestPostsQueryResult } from '@/sanity/lib/queries'
import ArticleCard from './components/ArticleCard'
import { heroBackgroundStyle } from './lib/heroBackground'

function Hero() {
  return (
    <section
      className="relative overflow-hidden h-[380px] max-h-[380px] flex items-center"
      style={heroBackgroundStyle}
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 flex flex-col items-center text-center">
        <Image
          src="/logo.png"
          alt="Unis pour la Trinité-sur-Mer"
          width={200}
          height={113}
          style={{
            height: '80px',
            width: 'auto',
            filter: 'drop-shadow(0 0 18px rgba(255,255,255,0.6)) drop-shadow(0 0 4px rgba(255,255,255,0.4))',
          }}
          className="mb-4"
          priority
        />

        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/70 mb-3">
          <span className="h-px w-6 bg-accent-yellow" />
          Trinité-sur-Mer, Morbihan
          <span className="h-px w-6 bg-accent-yellow" />
        </span>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
          Unis Pour La Trinité Sur Mer
        </h1>

        <p className="mt-3 text-sm sm:text-base text-white/85 leading-relaxed max-w-lg">
          Une association citoyenne engagée pour le développement et la qualité de vie à Trinité-sur-Mer.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/blog"
            className="bg-white text-primary font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors"
          >
            Nos actualités
          </Link>
          <Link
            href="/a-propos"
            className="border border-white/40 text-white font-medium text-sm px-5 py-2.5 rounded-md hover:bg-white/10 transition-colors"
          >
            Qui sommes-nous ?
          </Link>
        </div>
      </div>
    </section>
  )
}

async function LatestArticles() {
  'use cache'
  const { data } = await sanityFetch({ query: LATEST_POSTS_QUERY })
  const posts = (data ?? []) as LatestPostsQueryResult
  if (posts.length === 0) return null
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {posts.map((post) => (
        <ArticleCard key={post._id} post={post} compact />
      ))}
    </div>
  )
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
            Tous les articles →
          </Link>
        </div>

        <Suspense fallback={
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-surface border border-zinc-100 border-l-4 border-l-primary/20 h-64 animate-pulse" />
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
