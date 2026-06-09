import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { MEMBERS_QUERY, type MembersQueryResult } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez l'association Agir Avec Vous Tous, ses valeurs et ses actions à Trinité-sur-Mer.",
}

const values = [
  {
    title: 'Citoyenneté',
    desc: "Nous croyons en l'engagement de chacun pour construire une commune dynamique et solidaire.",
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Territoire',
    desc: "Trinité-sur-Mer est notre ancrage. Nous oeuvrons pour son développement durable et sa qualité de vie.",
    color: 'bg-accent-yellow/20 text-dark',
  },
  {
    title: 'Dialogue',
    desc: "Nous favorisons l'échange ouvert entre les habitants, les élus et les acteurs locaux.",
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Transparence',
    desc: "Nos actions, décisions et comptes sont ouverts à tous les membres et sympathisants.",
    color: 'bg-accent-yellow/20 text-dark',
  },
]

const avatarColors = [
  { bg: 'bg-primary/15', text: 'text-primary' },
  { bg: 'bg-accent-yellow/40', text: 'text-dark' },
  { bg: 'bg-accent-red/15', text: 'text-accent-red' },
]

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

async function TeamSection() {
  'use cache'
  const { data } = await sanityFetch({ query: MEMBERS_QUERY })
  const members = (data ?? []) as MembersQueryResult

  if (members.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-3 mb-10">
        <span className="block h-7 w-1 bg-accent-yellow shrink-0" />
        L&apos;équipe
      </h2>

      <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
        {members.map((member, i) => {
          const color = avatarColors[i % avatarColors.length]
          const photoUrl = member.photo
            ? urlFor(member.photo).width(200).height(200).fit('crop').auto('format').url()
            : null

          return (
            <div key={member._id} className="flex flex-col items-center text-center group">
              {/* Photo or initials */}
              <div className="mb-4 relative w-24 h-24 shrink-0">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={member.name ?? ''}
                    fill
                    className="rounded-full object-cover ring-2 ring-zinc-100 group-hover:ring-primary/30 transition-all"
                  />
                ) : (
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${color.bg}`}>
                    <span className={`font-display font-extrabold text-xl ${color.text}`}>
                      {member.name ? getInitials(member.name) : '?'}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <p className="font-display font-extrabold text-base text-text leading-snug">
                {member.name}
              </p>
              {member.role && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-3">
                  {member.bio}
                </p>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default function AProposPage() {
  return (
    <main>
      {/* Header */}
      <div className="bg-surface border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <nav className="text-xs text-muted mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-text">À propos</span>
          </nav>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text flex items-center gap-3">
            <span className="block h-8 w-1 bg-accent-yellow shrink-0" />
            À propos
          </h1>
          <p className="mt-2 text-sm text-muted ml-4">Qui sommes-nous et que défendons-nous ?</p>
        </div>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Notre association</p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text leading-tight">
            Agir ensemble<br />pour Trinité-sur-Mer
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed text-sm">
            <p>
              <strong className="text-text">Agir Avec Vous Tous</strong> est une association citoyenne fondée par des habitants de Trinité-sur-Mer, engagés dans la vie locale et désireux de contribuer activement au développement de leur commune.
            </p>
            <p>
              Notre démarche est fondée sur l'écoute, la participation et des propositions concrètes. Nous réunissons des femmes et des hommes de tous horizons, unis par leur attachement à ce territoire breton exceptionnel.
            </p>
            <p>
              Que vous soyez résident permanent ou saisonnier, nous vous invitons à rejoindre nos échanges et initiatives.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors"
          >
            Rejoindre l'association
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: '2022', label: 'Année de création' },
            { value: '150+', label: 'Membres actifs' },
            { value: '12', label: 'Événements par an' },
            { value: '56470', label: 'Code postal' },
          ].map(({ value, label }) => (
            <div key={label} className="bg-surface rounded-xl border border-zinc-100 border-l-4 border-l-primary p-6">
              <p className="font-display font-extrabold text-3xl text-text">{value}</p>
              <p className="mt-1 text-xs text-muted">{label}</p>
            </div>
          ))}
          <p className="col-span-2 text-xs text-muted/50 text-center italic mt-1">Données indicatives — à personnaliser</p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-surface border-y border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-3 mb-10">
            <span className="block h-7 w-1 bg-accent-yellow shrink-0" />
            Nos valeurs
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ title, desc, color }) => (
              <div key={title} className="bg-bg rounded-xl border border-zinc-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all">
                <span className={`inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 ${color}`}>
                  {title}
                </span>
                <p className="text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <Suspense fallback={
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="h-8 w-40 bg-zinc-100 rounded mb-10 animate-pulse" />
          <div className="grid gap-8 grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-zinc-100 animate-pulse" />
                <div className="h-4 w-28 bg-zinc-100 rounded animate-pulse" />
                <div className="h-3 w-20 bg-zinc-100 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      }>
        <TeamSection />
      </Suspense>

      {/* CTA */}
      <section className="bg-surface border-t border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <h2 className="font-display font-extrabold text-2xl text-text">Une question ? Venez nous rencontrer.</h2>
          <p className="mt-3 text-sm text-muted max-w-md mx-auto">
            Nos réunions sont ouvertes à tous. Suivez nos actualités ou contactez-nous directement.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors">
              Nous contacter
            </Link>
            <Link href="/blog" className="border border-zinc-300 text-text font-medium text-sm px-5 py-2.5 rounded-md hover:border-primary/40 hover:text-primary transition-colors">
              Lire le blog
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
