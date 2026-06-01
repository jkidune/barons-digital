import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    const isLaunched = process.env.SITE_LAUNCHED !== 'false'

    if (isLaunched) return []

    return [
      {
        source:      '/',
        destination: '/coming-soon',
        permanent:   false, // 307 — easy to revert
      },
    ]
  },
}

export default nextConfig
