import type { Metadata, Viewport } from 'next'
import { redirect } from 'next/navigation'

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
  redirect(process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://www.sanity.io/manage')
}
