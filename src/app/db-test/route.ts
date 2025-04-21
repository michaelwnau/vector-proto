import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function GET() {
  try {
    // Initialize Payload with our config
    const payload = await getPayload({ config: await config })
    
    // Test connection by getting count of users
    const usersCount = await payload.db.collections.users.count()
    
    return NextResponse.json({ 
      status: 'connected',
      message: 'Successfully connected to MongoDB',
      usersCount
    })
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to MongoDB',
      error: (error as Error).message
    }, { status: 500 })
  }
}