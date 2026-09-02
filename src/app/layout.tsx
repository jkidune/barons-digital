import type { Metadata } from 'next'
import { Geist, Source_Serif_4 } from 'next/font/google'
import './globals.css'
import { InitialLoadProvider } from '@/context/InitialLoadContext'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  weight: ['500'],
  style: ['italic'],
})

export const metadata: Metadata = {
  title: 'Barons Digital — Make Quality Visible',
  description:
    'Barons Digital helps serious Tanzanian businesses and organizations turn the quality of what they do into brands, digital experiences and practical solutions people can trust.',
  openGraph: {
    title:       'Barons Digital — Make Quality Visible',
    description: 'Strategy, creativity and disciplined delivery for serious Tanzanian businesses and organizations.',
    url:         'https://barons-digital.com',
    siteName:    'Barons Digital',
    type:        'website',
  },
  icons: {
    icon: '/logos/barons-blue-icon.svg',
    shortcut: '/logos/barons-blue-icon.svg',
    apple: '/logos/barons-blue-icon.svg',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${sourceSerif4.variable}`}>
      <body>
        <InitialLoadProvider>
          {children}
        </InitialLoadProvider>
      </body>
    </html>
  )
}
