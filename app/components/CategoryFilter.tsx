'use client'

import { useState } from 'react'
import ArticleCard from './ArticleCard'
import type { Post, Category } from '@/sanity/lib/types'

export default function CategoryFilter({
  posts,
  categories,
}: {
  posts: Post[]
  categories: Category[]
}) {
  const [active, setActive] = useState<string | null>(null)

  const filtered =
    active === null
      ? posts
      : posts.filter((p) => p.categories?.some((c) => c._id === active))

  return (
    <>
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActive(null)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
              active === null
                ? 'bg-primary text-white'
                : 'bg-white border border-primary text-primary hover:bg-primary/5'
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActive(cat._id)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                active === cat._id
                  ? 'bg-primary text-white'
                  : 'bg-white border border-primary text-primary hover:bg-primary/5'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((post) => (
          <ArticleCard key={post._id} post={post} compact />
        ))}
      </div>
    </>
  )
}
