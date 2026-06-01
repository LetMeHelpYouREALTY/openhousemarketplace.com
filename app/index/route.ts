import { NextResponse } from 'next/server'

/** Permanent redirect — /index must not render duplicate homepage (GSC canonical). */
export function GET(request: Request) {
  const url = new URL('/', request.url)
  url.search = new URL(request.url).search
  return NextResponse.redirect(url, 301)
}

export function HEAD(request: Request) {
  return GET(request)
}
