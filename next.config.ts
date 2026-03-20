import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    const isLaunched = process.env.SITE_LAUNCHED === 'true'

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
