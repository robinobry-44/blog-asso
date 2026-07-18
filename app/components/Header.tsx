'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const FACEBOOK_URL = 'https://www.facebook.com/people/Unis-pour-la-Trinit%C3%A9-sur-Mer/61586182756588/'

function FacebookIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
      <rect width="24" height="24" rx="6" fill="#1877F2" />
      <path d="M16 8h-2a1 1 0 0 0-1 1v2h3l-.5 3H13v7h-3v-7H8v-3h2V9a4 4 0 0 1 4-4h2v3z" fill="white" />
    </svg>
  )
}

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
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E7EB]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-20 items-center justify-between">
          {/* Left: Logo + title */}
          <Link href="/" className="flex items-center gap-3 shrink-0 min-w-0">
            <Image
              src="/logo-icon.png"
              alt="Unis pour la Trinité-sur-Mer"
              width={64}
              height={64}
              style={{ height: '64px', width: '64px' }}
              className="shrink-0"
              priority
            />
            <span className="font-sans font-semibold text-[#1B5EA6] whitespace-nowrap leading-none text-sm">
              Unis Pour La Trinité Sur Mer
            </span>
          </Link>

          {/* Right: nav links + Facebook icon + mobile toggle */}
          <div className="flex items-center gap-4 shrink-0">
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`px-4 py-2 text-sm font-medium transition-colors text-[#1B5EA6] ${
                    isActive(href) ? '' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {label}
                  {isActive(href) && (
                    <span className="block h-0.5 bg-[#1B5EA6] mt-0.5 -mb-0.5" />
                  )}
                </Link>
              ))}
            </nav>

            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivez-nous sur Facebook"
              className="shrink-0 hover:opacity-70 transition-opacity"
            >
              <FacebookIcon />
            </a>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-[#1B5EA6] opacity-80 hover:opacity-100 transition-opacity shrink-0"
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
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-[#E5E7EB] bg-white">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-[#E5E7EB] text-[#1B5EA6] transition-opacity ${
                isActive(href) ? 'bg-[#1B5EA6]/5' : 'opacity-70 hover:opacity-100'
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
