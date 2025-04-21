import { NextRequest, NextResponse } from 'next/server'

// This middleware is intentionally minimal 
// Authentication is handled directly in page components

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Handle admin/dashboard routes - ensure user has token
  if (pathname.startsWith('/admin/dashboard') || 
      pathname.startsWith('/admin/jobs-overview') ||
      pathname.startsWith('/admin/employers-overview') ||
      pathname.startsWith('/admin/veterans-overview')) {
    
    const token = request.cookies.get('payload-token')
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }
  
  // Continue to the destination for all other routes
  return NextResponse.next()
}

// Only run on specified routes
export const config = {
  matcher: [
    // Exclude login page from middleware to prevent redirect loops
    '/((?!admin/login|admin/create-account).*)',
  ]
}