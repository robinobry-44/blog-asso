import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { Post } from '@/sanity/lib/types'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function ArticleCard({ post }: { post: Post }) {
  const category = post.categories?.[0]

  return (
    <article className="relative group flex flex-col bg-surface rounded-xl border border-zinc-100 border-l-4 border-l-primary hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden">
      {/* Image */}
      {post.mainImage ? (
        <div className="overflow-hidden aspect-video bg-zinc-100 shrink-0">
          <Image
            src={urlFor(post.mainImage).width(600).height(340).fit('crop').url()}
            alt={post.mainImage.alt ?? post.title ?? ''}
            width={600}
            height={340}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/10 to-bg flex items-center justify-center shrink-0">
          <span className="font-display font-extrabold text-3xl text-primary/20">AAT</span>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        {/* Category badge — relative z-10 sits above the stretched link */}
        <div className="flex items-center gap-3 mb-3">
          {category?.title && (
            category.slug ? (
              <Link
                href={`/blog?category=${category.slug}`}
                className="relative z-10 text-xs font-semibold text-primary uppercase tracking-wider bg-primary/8 px-2 py-0.5 rounded hover:bg-primary/15 transition-colors"
              >
                {category.title}
              </Link>
            ) : (
              <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/8 px-2 py-0.5 rounded">
                {category.title}
              </span>
            )
          )}
          {post.publishedAt && (
            <time className="text-xs text-muted">{formatDate(post.publishedAt)}</time>
          )}
        </div>

        {/* Title — stretched link covers the entire card via ::after */}
        <h3 className="font-display font-extrabold text-lg text-text group-hover:text-primary transition-colors leading-snug line-clamp-2">
          <Link
            href={`/blog/${post.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>
        )}

        <span className="mt-4 text-xs font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all pointer-events-none">
          Lire la suite
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </article>
  )
}
