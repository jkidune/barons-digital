import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLaunched = process.env.SITE_LAUNCHED !== 'false'

  if (isLaunched) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = '/coming-soon'
  return NextResponse.redirect(url, 307) // easy to revert
}

export const config = {
  matcher: ['/', '/about', '/services', '/contact', '/work', '/work/:path*'],
}
