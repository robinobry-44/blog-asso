import Link from 'next/link'
import { IconBrandFacebook } from '@tabler/icons-react'

const FACEBOOK_URL = 'https://www.facebook.com/people/Unis-pour-la-Trinit%C3%A9-sur-Mer/61586182756588/'

export default function Footer() {
  return (
    <footer className="bg-[#1B5EA6] text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        {/* Large asso name */}
        <p className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-2">
          Unis Pour La<br />Trinité Sur Mer
        </p>
        <p className="text-muted text-sm mb-12">Trinité-sur-Mer — Morbihan</p>

        <div className="grid gap-10 sm:grid-cols-3 border-t border-white/10 pt-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Accueil' },
                { href: '/blog', label: 'Blog' },
                { href: '/a-propos', label: 'À propos' },
                { href: '/contact', label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Association</p>
            <address className="not-italic text-sm text-white/60 space-y-2">
              <p>Trinité-sur-Mer, 56470</p>
              <p>Morbihan, Bretagne</p>
            </address>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-4">Contact</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-[#1B5EA6] text-sm font-semibold px-4 py-2 rounded-md hover:bg-white/90 transition-colors"
            >
              Nous écrire
            </Link>
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 text-sm text-white hover:opacity-70 transition-opacity"
            >
              <IconBrandFacebook size={22} color="#ffffff" />
              Suivez-nous sur Facebook
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white/30">
          <p>© 2026 Unis Pour La Trinité Sur Mer</p>
          <p>Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
