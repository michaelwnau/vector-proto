import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'
import jobBoardApiService from '@/services/api/jobBoardApiService'

export async function POST(request: NextRequest) {
  try {
    // Initialize Payload
    const payload = await getPayload({ config: await config })
    
    // Get API credentials from environment variables
    const apiEmail = process.env.JOB_BOARD_API_EMAIL
    const apiPassword = process.env.JOB_BOARD_API_PASSWORD

    if (!apiEmail || !apiPassword) {
      return NextResponse.json({ 
        status: 'error',
        message: 'API credentials not configured. Set JOB_BOARD_API_EMAIL and JOB_BOARD_API_PASSWORD environment variables.'
      }, { status: 500 })
    }

    // Parse the request body to get the entities to sync
    const { entities = ['employers', 'jobs', 'job-fairs', 'breakout-sessions'] } = await request.json()
    
    // Authenticate with the API
    await jobBoardApiService.authenticate(apiEmail, apiPassword)
    
    const results: Record<string, any> = {}
    
    // Sync employers if requested
    if (entities.includes('employers')) {
      await jobBoardApiService.syncEmployers()
      const employersCount = await payload.db.collections.employers.count()
      results.employers = { status: 'synced', count: employersCount }
    }
    
    // Sync jobs if requested
    if (entities.includes('jobs')) {
      await jobBoardApiService.syncJobs()
      const jobsCount = await payload.db.collections.jobs.count()
      results.jobs = { status: 'synced', count: jobsCount }
    }
    
    // Sync job fairs if requested
    if (entities.includes('job-fairs')) {
      await jobBoardApiService.syncJobFairs()
      const jobFairsCount = await payload.db.collections['job-fairs'].count()
      results['job-fairs'] = { status: 'synced', count: jobFairsCount }
    }
    
    // Sync breakout sessions if requested
    if (entities.includes('breakout-sessions')) {
      await jobBoardApiService.syncBreakoutSessions()
      const sessionsCount = await payload.db.collections['breakout-sessions'].count()
      results['breakout-sessions'] = { status: 'synced', count: sessionsCount }
    }

    // Return success response with results
    return NextResponse.json({ 
      status: 'success',
      message: 'Data sync completed successfully',
      results
    })
  } catch (error) {
    console.error('Sync error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to sync data from API',
      error: (error as Error).message
    }, { status: 500 })
  }
}