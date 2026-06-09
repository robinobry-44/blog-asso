import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { SanityLive } from '@/sanity/lib/live'
import Header from './components/Header'
import Footer from './components/Footer'

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-plus-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — Agir Avec Vous Tous',
    default: 'Agir Avec Vous Tous — Trinité-sur-Mer',
  },
  description: "Association citoyenne engagée pour le développement et le bien-être de la commune de Trinité-sur-Mer.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <SanityLive />
      </body>
    </html>
  )
}
