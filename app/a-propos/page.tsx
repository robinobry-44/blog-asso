import { Suspense } from 'react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { MEMBERS_QUERY, type MembersQueryResult } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez l'association Unis Pour La Trinité Sur Mer, ses valeurs et ses actions à Trinité-sur-Mer.",
}

const values = [
  {
    title: 'Écouter les habitants',
    desc: "Les grandes décisions qui engagent l'avenir de la commune ne peuvent pas se construire sans les Trinitains. Elles doivent être expliquées, discutées et construites avec ceux qui vivent ici.",
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Gérer avec responsabilité',
    desc: "L'argent public appartient aux habitants. Les choix financiers doivent être maîtrisés, compréhensibles et transparents. Informer sur les dépenses n'est pas une contrainte : c'est une exigence démocratique.",
    color: 'bg-accent-yellow/20 text-dark',
  },
  {
    title: "Préparer l'avenir",
    desc: "La Trinité-sur-Mer possède un patrimoine naturel, maritime, culturel et humain exceptionnel. Nous voulons le préserver tout en permettant à la commune de rester vivante et attractive toute l'année.",
    color: 'bg-primary/10 text-primary',
  },
  {
    title: 'Porter la voix des Trinitains',
    desc: "De nombreuses décisions qui influencent notre quotidien (eau, déchets, transports…) sont prises à l'intercommunalité. Nous voulons les rendre plus lisibles et rendre compte de ce qui s'y décide.",
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
  const data = await client.fetch(MEMBERS_QUERY)
  const members = (data ?? []) as MembersQueryResult

  if (members.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text flex items-center gap-3 mb-10">
        <span className="block h-7 w-1 bg-accent-yellow shrink-0" />
        L&apos;équipe
      </h2>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {members.map((member, i) => {
          const color = avatarColors[i % avatarColors.length]
          const photoUrl = member.photo
            ? urlFor(member.photo).width(160).height(160).fit('crop').auto('format').url()
            : null

          return (
            <div key={member._id} className="flex flex-col items-center text-center group">
              {/* Photo or initials */}
              <div className="mb-4 relative w-20 h-20 shrink-0">
                {photoUrl ? (
                  <Image
                    src={photoUrl}
                    alt={member.name ?? ''}
                    fill
                    className="rounded-full object-cover ring-2 ring-zinc-100 group-hover:ring-primary/30 transition-all"
                  />
                ) : (
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${color.bg}`}>
                    <span className={`font-display font-extrabold text-lg ${color.text}`}>
                      {member.name ? getInitials(member.name) : '?'}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <p className="font-display font-bold text-sm text-text leading-snug">
                {member.name}
              </p>
              {member.role && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted">
                  {member.role}
                </p>
              )}
              {member.bio && (
                <p className="mt-2 text-sm text-muted leading-relaxed line-clamp-2">
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
            Unis pour La Trinité-sur-Mer
          </h1>
          <p className="mt-2 text-sm text-muted ml-4">Une démarche citoyenne pour l&apos;avenir de notre commune</p>
        </div>
      </div>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-4">Notre association</p>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-text leading-tight">
            Agir ensemble<br />pour la Trinité-sur-Mer
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed text-sm">
            <p>
              Nous avons fait campagne ensemble. Nous avons rencontré beaucoup d&apos;entre vous. Nous avons écouté, échangé, parfois débattu. Et, au fil de ces rencontres, une conviction s&apos;est imposée : nous avions envie de continuer.
            </p>
            <p>
              Les élections municipales sont désormais derrière nous. Mais les questions que nous avons partagées pendant la campagne sont toujours là : quel avenir voulons-nous pour La Trinité-sur-Mer ? Comment permettre à celles et ceux qui y vivent à l&apos;année d&apos;y rester ? Comment préserver notre littoral, notre patrimoine et notre cadre de vie ?
            </p>
            <p>
              Les 45 % des suffrages exprimés qui nous ont été accordés au second tour constituent une marque de confiance. Ils nous donnent aussi une responsabilité : continuer à être présents, à suivre les dossiers, à poser les questions qui doivent l&apos;être.
            </p>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors"
          >
            Rejoindre l'association
          </Link>
        </div>

        {/* Élus */}
        <div className="mt-12 bg-surface rounded-xl border border-zinc-100 border-l-4 border-l-primary p-6">
          <p className="font-display font-extrabold text-base text-text mb-4">Vos élus dans les commissions municipales</p>
          <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 text-sm text-muted leading-relaxed">
            {[
              { role: 'Écoles, maison de santé, lien social, CCAS', names: 'Michèle Aubry' },
              { role: 'Urbanisme', names: 'Nathalie Laureau et Benoît Massiet du Biest' },
              { role: 'Économie locale', names: 'Benoît Massiet du Biest' },
              { role: 'Associations, travaux', names: 'Pierre Le Borgne' },
              { role: 'Communication, participation démocratique', names: 'Nathalie Laureau' },
              { role: 'Environnement, développement durable', names: 'Nathalie Laureau et Michèle Aubry' },
              { role: 'Finances', names: 'Michèle Aubry' },
            ].map(({ role, names }) => (
              <li key={role}>
                <span className="text-text font-semibold">{role}</span> : {names}
              </li>
            ))}
          </ul>
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
              <div key={title} className="h-full flex flex-col bg-bg rounded-xl border border-zinc-100 p-6 hover:border-primary/30 hover:shadow-sm transition-all">
                <span className={`inline-flex items-center min-h-[2.5rem] text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-3 ${color}`}>
                  {title}
                </span>
                <p className="flex-1 text-sm text-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <Suspense fallback={
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="h-8 w-40 bg-zinc-100 rounded mb-10 animate-pulse" />
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-zinc-100 animate-pulse" />
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
          <h2 className="font-display font-extrabold text-2xl text-text">Une question, un avis, une idée, un projet ?</h2>
          <p className="mt-3 text-sm text-muted max-w-md mx-auto">
            Parlons-en. Nous sommes à votre écoute.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="bg-primary text-white font-semibold text-sm px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors">
              Écrire à l&apos;association
            </Link>
            <Link href="/blog" className="border border-zinc-300 text-text font-medium text-sm px-5 py-2.5 rounded-md hover:border-primary/40 hover:text-primary transition-colors">
              Lire le blog
            </Link>
            <a href="mailto:unispourlatrinitesurmer@gmail.com" className="border border-zinc-300 text-text font-medium text-sm px-5 py-2.5 rounded-md hover:border-primary/40 hover:text-primary transition-colors">
              unispourlatrinitesurmer@gmail.com
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
