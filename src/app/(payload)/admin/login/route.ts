import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

// This is only used to handle direct access to the login page
// when already authenticated
export async function GET(request: NextRequest) {
  try {
    // Get token from cookies
    const token = request.cookies.get('payload-token')?.value
    
    // If not authenticated, show the login page (handled by page.tsx)
    if (!token) {
      return NextResponse.next()
    }
    
    // If authenticated, redirect to dashboard or admin
    try {
      // Initialize Payload
      const payload = await getPayload({ config: await config })
      
      // Get the user with the token
      const user = await payload.findByID({
        collection: 'users',
        id: 'me',
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      
      // Redirect based on role
      if (user?.role === 'admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      } else {
        return NextResponse.redirect(new URL('/admin/collections/users', request.url))
      }
    } catch (error) {
      // Token invalid or expired - show login page
      return NextResponse.next()
    }
  } catch (error) {
    // Any error - show login page
    return NextResponse.next()
  }
}