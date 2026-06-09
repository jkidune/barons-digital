import type { Metadata, Viewport } from 'next'
import Studio from '@/sanity/Studio'

export const metadata: Metadata = {
  title: 'Barons Digital CMS',
  robots: 'noindex',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StudioPage() {
  return <Studio />
}
