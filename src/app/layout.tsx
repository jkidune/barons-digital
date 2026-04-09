import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import { InitialLoadProvider } from '@/context/InitialLoadContext'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
})

export const metadata: Metadata = {
  title: 'Barons Digital | Strategy, Branding and Website Design for Serious Tanzanian Businesses',
  description:
    'Barons Digital is the agency for Tanzanian businesses that are too serious to settle for average. We build brands, websites, and communications systems with strategy, clarity, and premium execution.',
  openGraph: {
    title:       'Barons Digital',
    description: 'Strategy, Branding and Website Design for Serious Tanzanian Businesses',
    url:         'https://baronsdigital.co.tz',
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
    <html lang="en" className={geist.variable}>
      <body>
        <InitialLoadProvider>
          {children}
        </InitialLoadProvider>
      </body>
    </html>
  )
}
