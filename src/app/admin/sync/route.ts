import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import jobBoardApiService from '@/services/api/jobBoardApiService'

// This is a server API route instead of a page, to properly handle API operations
export async function GET(request: NextRequest) {
  try {
    // Initialize Payload
    const payload = await getPayload({ config: await config })
    
    // Get token from cookies
    const token = request.cookies.get('payload-token')?.value
    
    if (!token) {
      // If not authenticated, redirect to admin panel
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    try {
      // Get the user with the token
      const user = await payload.findByID({
        collection: 'users',
        id: 'me',
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      
      // If not admin, redirect to standard admin panel
      if (!user || user.role !== 'admin') {
        return NextResponse.redirect(new URL('/admin/collections/users', request.url))
      }
    } catch (userError) {
      console.error('Failed to authenticate user:', userError)
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    
    // Get API credentials from environment variables
    const apiEmail = process.env.JOB_BOARD_API_EMAIL
    const apiPassword = process.env.JOB_BOARD_API_PASSWORD

    if (!apiEmail || !apiPassword) {
      console.error('API credentials not configured')
      return NextResponse.redirect(new URL('/admin/dashboard?error=api_credentials_missing', request.url))
    }

    // Authenticate with the API
    await jobBoardApiService.authenticate(apiEmail, apiPassword)
    
    // Run sync operations
    await Promise.all([
      jobBoardApiService.syncEmployers(),
      jobBoardApiService.syncJobs(),
      jobBoardApiService.syncJobFairs(),
      jobBoardApiService.syncBreakoutSessions(),
    ])
    
    // Redirect back to dashboard with success message
    return NextResponse.redirect(new URL('/admin/dashboard?success=sync_complete', request.url))
  } catch (error) {
    console.error('Sync error:', error)
    // Redirect back to dashboard with error message
    return NextResponse.redirect(new URL('/admin/dashboard?error=sync_failed', request.url))
  }
}