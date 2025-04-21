import { NextResponse } from 'next/server'
import jobBoardApiService from '@/services/api/jobBoardApiService'

export async function GET(request: Request) {
  try {
    // Get API credentials from environment variables
    const apiEmail = process.env.JOB_BOARD_API_EMAIL
    const apiPassword = process.env.JOB_BOARD_API_PASSWORD

    if (!apiEmail || !apiPassword) {
      return NextResponse.json({ 
        status: 'error',
        message: 'API credentials not configured. Set JOB_BOARD_API_EMAIL and JOB_BOARD_API_PASSWORD environment variables.'
      }, { status: 500 })
    }

    // Authenticate with the API
    await jobBoardApiService.authenticate(apiEmail, apiPassword)
    
    // Test the API connection by getting the current user
    const currentUser = await jobBoardApiService.getCurrentUser()
    
    // Return success response
    return NextResponse.json({ 
      status: 'connected',
      message: 'Successfully connected to Job Board API',
      user: {
        id: currentUser.id,
        email: currentUser.email,
        role: currentUser.role
      }
    })
  } catch (error) {
    console.error('API connection error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to Job Board API',
      error: (error as Error).message
    }, { status: 500 })
  }
}