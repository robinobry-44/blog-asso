import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY, SITE_SETTINGS_QUERY, type PostsQueryResult, type SiteSettingsQueryResult } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import ArticleCard from './components/ArticleCard'

async function Hero() {
  'use cache'
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY })
  const settings = data as SiteSettingsQueryResult
  const heroImageUrl = settings?.heroImage
    ? urlFor(settings.heroImage).width(1600).height(560).fit('crop').auto('format').url()
    : null
  const tagline = settings?.tagline ?? "Une association citoyenne engagée pour le développement et la qualité de vie à Trinité-sur-Mer."

  return (
    <section className="relative overflow-hidden bg-primary">
      {/* Background image */}
      {heroImageUrl && (
        <>
          <Image
            src={heroImageUrl}
            alt={settings?.heroImage?.alt ?? 'Trinité-sur-Mer'}
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient overlay: left is opaque blue, right fades to semi-transparent */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-primary/50" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:py-20">
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 mb-6">
          <span className="h-px w-6 bg-accent-yellow" />
          Trinité-sur-Mer, Morbihan
        </span>

        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight max-w-2xl">
          Agir Avec{' '}
          <span className="relative inline-block">
            <span className="relative z-10">Vous Tous</span>
            <span aria-hidden className="absolute left-0 -bottom-1 h-2.5 w-full bg-accent-yellow" />
          </span>
        </h1>

        <p className="mt-5 text-base sm:text-lg text-white/75 leading-relaxed max-w-xl">
          {tagline}
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
  'use cache'
  const { data } = await sanityFetch({ query: POSTS_QUERY })
  const posts = ((data ?? []) as PostsQueryResult).slice(0, 3)
  if (posts.length === 0) return null
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => <ArticleCard key={post._id} post={post} />)}
    </div>
  )
}

export default function Home() {
  return (
    <>
      <Suspense fallback={
        <div className="bg-primary h-64 animate-pulse" />
      }>
        <Hero />
      </Suspense>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
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
