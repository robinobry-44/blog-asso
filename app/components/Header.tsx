'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/blog', label: 'Blog' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Logo + title */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="rounded-xl border border-zinc-100 bg-white px-2 py-0.5 shadow-sm">
              <Image
                src="/logo.png"
                alt="Unis pour la Trinité-sur-Mer"
                width={140}
                height={79}
                style={{ height: '70px', width: 'auto', mixBlendMode: 'multiply' }}
                priority
              />
            </div>
            <span className="hidden sm:block whitespace-nowrap text-sm font-semibold text-text">
              Unis Pour La Trinité Sur Mer
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  isActive(href)
                    ? 'text-primary'
                    : 'text-muted hover:text-text'
                }`}
              >
                {label}
                {isActive(href) && (
                  <span className="block h-0.5 bg-primary mt-0.5 -mb-0.5" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-muted hover:text-text transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-zinc-100 bg-surface">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-zinc-50 transition-colors ${
                isActive(href) ? 'text-primary bg-primary/5' : 'text-muted hover:text-text'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
