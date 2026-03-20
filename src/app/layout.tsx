import type { Metadata } from 'next'
import './globals.css'
import { InitialLoadProvider } from '@/context/InitialLoadContext'

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
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InitialLoadProvider>
          {children}
        </InitialLoadProvider>
      </body>
    </html>
  )
}
