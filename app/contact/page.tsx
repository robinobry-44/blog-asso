'use client'

import { useState } from 'react'
import Link from 'next/link'

type State = 'idle' | 'sending' | 'sent'

const inputClass =
  'w-full bg-bg border border-zinc-200 rounded-md px-4 py-2.5 text-sm text-text placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition-colors'

export default function ContactPage() {
  const [state, setState] = useState<State>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('sending')
    setTimeout(() => setState('sent'), 900)
  }

  return (
    <main>
      {/* Header */}
      <div className="bg-surface border-b border-zinc-200">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <nav className="text-xs text-muted mb-4 flex items-center gap-1.5">
            <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
            <span className="text-zinc-300">/</span>
            <span className="text-text">Contact</span>
          </nav>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-text flex items-center gap-3">
            <span className="block h-8 w-1 bg-accent-yellow shrink-0" />
            Contact
          </h1>
          <p className="mt-2 text-sm text-muted ml-4">Une question, une suggestion ? Écrivez-nous.</p>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-16 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        {/* Left — info */}
        <div>
          <h2 className="font-display font-extrabold text-xl text-text mb-7">Prenez contact avec nous</h2>

          <div className="space-y-6">
            {[
              {
                label: 'Adresse',
                content: 'Trinité-sur-Mer, 56470\nMorbihan, Bretagne',
              },
              {
                label: 'Email',
                content: 'contact@agir-avec-vous-tous.fr',
                note: 'À personnaliser',
              },
              {
                label: 'Délai de réponse',
                content: 'Nous répondons sous 48 h ouvrées',
              },
            ].map(({ label, content, note }) => (
              <div key={label} className="flex gap-4">
                <span className="shrink-0 mt-0.5 h-2 w-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">{label}</p>
                  <p className="text-sm text-text whitespace-pre-line">{content}</p>
                  {note && <p className="text-xs text-muted/60 italic mt-0.5">{note}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-primary/5 border border-primary/15 rounded-xl p-5">
            <p className="text-sm font-semibold text-primary mb-1">Devenir membre</p>
            <p className="text-sm text-muted leading-relaxed">
              Précisez-le dans votre message et nous vous enverrons les informations d'adhésion.
            </p>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-surface rounded-xl border border-zinc-200 p-8">
          {state === 'sent' ? (
            <div className="text-center py-10">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600 mb-5">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-display font-extrabold text-lg text-text">Message envoyé !</p>
              <p className="mt-2 text-sm text-muted">Nous vous répondrons dans les meilleurs délais.</p>
              <button
                onClick={() => setState('idle')}
                className="mt-6 text-sm text-primary hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <p className="font-display font-extrabold text-lg text-text mb-6">Envoyez-nous un message</p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="prenom" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Prénom</label>
                  <input id="prenom" name="prenom" type="text" required placeholder="Marie" className={inputClass} />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Nom</label>
                  <input id="nom" name="nom" type="text" required placeholder="Dupont" className={inputClass} />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Email</label>
                <input id="email" name="email" type="email" required placeholder="marie@exemple.fr" className={inputClass} />
              </div>

              <div>
                <label htmlFor="sujet" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Sujet</label>
                <select id="sujet" name="sujet" required className={inputClass}>
                  <option value="">Choisissez un sujet…</option>
                  <option value="adhesion">Adhésion à l&apos;association</option>
                  <option value="evenement">Événement ou initiative</option>
                  <option value="information">Demande d&apos;information</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Votre message…"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={state === 'sending'}
                className="w-full bg-primary text-white font-semibold text-sm py-3 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {state === 'sending' ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours…
                  </>
                ) : 'Envoyer le message'}
              </button>

              <p className="text-center text-xs text-muted/50">
                Formulaire placeholder — à connecter à un service d&apos;envoi d&apos;email.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}
