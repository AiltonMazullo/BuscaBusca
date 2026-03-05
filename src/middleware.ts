import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Check if the path starts with /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for auth cookie (simulated)
    // In a real app, this would be a secure token validation
    const authCookie = request.cookies.get('busca_busca_auth')
    const isAdminCookie = request.cookies.get('busca_busca_admin')

    // If no auth cookie or no admin cookie, redirect to login
    if (!authCookie || !isAdminCookie) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
 
  return NextResponse.next()
}
 
export const config = {
  matcher: '/admin/:path*',
}
