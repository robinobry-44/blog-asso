import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter, Syne } from 'next/font/google'
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

const syne = Syne({
  variable: '--font-syne-google',
  subsets: ['latin'],
  weight: ['700', '800'],
})

export const metadata: Metadata = {
  title: {
    template: '%s — Unis Pour La Trinité Sur Mer',
    default: 'Unis Pour La Trinité Sur Mer',
  },
  description: "Association citoyenne engagée pour le développement et le bien-être de la commune de Trinité-sur-Mer.",
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${plusJakarta.variable} ${inter.variable} ${syne.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased bg-bg text-text">
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <SanityLive />
      </body>
    </html>
  )
}
