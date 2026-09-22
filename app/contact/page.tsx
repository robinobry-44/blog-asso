'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'w-full bg-bg border border-zinc-200 rounded-md px-4 py-2.5 text-sm text-text placeholder-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition-colors'

export default function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formRef.current) return

    setStatus('sending')

    try {
      const response = await fetch('https://formspree.io/f/xoevdewd', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(formRef.current),
      })

      if (response.ok) {
        setStatus('success')
        formRef.current.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
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
                content: 'unispourlatrinitesurmer@gmail.com',
                href: 'mailto:unispourlatrinitesurmer@gmail.com',
              },
            ].map(({ label, content, href }) => (
              <div key={label} className="flex gap-4">
                <span className="shrink-0 mt-0.5 h-2 w-2 rounded-full bg-primary mt-1.5" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-1">{label}</p>
                  {href ? (
                    <a href={href} className="text-sm text-text hover:text-primary transition-colors whitespace-pre-line">
                      {content}
                    </a>
                  ) : (
                    <p className="text-sm text-text whitespace-pre-line">{content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-surface rounded-xl border border-zinc-200 p-8">
          <p className="font-display font-extrabold text-lg text-text mb-6">Envoyez-nous un message</p>

          {status === 'success' && (
            <div className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              Votre message a bien été envoyé ! Nous vous répondrons dans les meilleurs délais.
            </div>
          )}

          {status === 'error' && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Une erreur est survenue. Veuillez réessayer ou nous contacter par email.
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Nom complet</label>
              <input id="name" name="name" type="text" required placeholder="Marie Dupont" className={inputClass} />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Email</label>
              <input id="email" name="email" type="email" required placeholder="marie@exemple.fr" className={inputClass} />
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
              disabled={status === 'sending'}
              className="w-full bg-primary text-white font-semibold text-sm py-3 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'sending' ? (
                <>
                  <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Envoi en cours…
                </>
              ) : 'Envoyer le message'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
