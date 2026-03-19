import type { Metadata } from 'next'
import './globals.css'
import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider'
import Navbar               from '@/components/layout/Navbar'
import Preloader            from '@/components/ui/Preloader'
import { InitialLoadProvider } from '@/context/InitialLoadContext'

export const metadata: Metadata = {
  title: 'Barons Digital | Strategy, Branding and Website Design for Serious Tanzanian Businesses',
  description:
    'Barons Digital is the agency for Tanzanian businesses that are too serious to settle for average. We build brands, websites, and communications systems with strategy, clarity, and premium execution.',
  openGraph: {
    title:       'Barons Digital',
    description: 'Strategy, Branding and Website Design for Serious Tanzanian Businesses',
    url:         'https://barons-digital.com',
    siteName:    'Barons Digital',
    type:        'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <InitialLoadProvider>

          {/*
            Preloader sits outside SmoothScrollProvider so Lenis
            scroll-lock doesn't interfere with the preloader's own
            useDisableScroll hook. It is fixed + z-[9999] so it
            always renders on top regardless.
          */}
          <Preloader />

          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
          </SmoothScrollProvider>

        </InitialLoadProvider>
      </body>
    </html>
  )
}
