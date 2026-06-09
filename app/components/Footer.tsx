import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-10">
        {/* Large asso name */}
        <p className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-none mb-2">
          Agir Avec<br />Vous Tous
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
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              Nous écrire
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-white/30">
          <p>© 2026 Agir Avec Vous Tous</p>
          <p>Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
