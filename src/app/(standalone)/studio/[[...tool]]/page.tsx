import type { Metadata, Viewport } from 'next'
import { redirect } from 'next/navigation'

const studioUrl = 'https://barons-digital-studio.kidunejoseph91.workers.dev'

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
  redirect(studioUrl)
}
