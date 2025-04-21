import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Job, Employer, JobFair, BreakoutSession, User, Vector } from '../../payload-types'

const API_BASE_URL = process.env.JOB_BOARD_API_URL || 'http://localhost:8000'

/**
 * Service for interacting with the Job Board API
 */
export class JobBoardApiService {
  private token: string | null = null

  /**
   * Authenticate with the API
   */
  async authenticate(email: string, password: string): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error(`Authentication failed: ${response.statusText}`)
      }

      const data = await response.json()
      this.token = data.access_token
      return this.token
    } catch (error) {
      console.error('Authentication error:', error)
      throw error
    }
  }

  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<any> {
    return this.makeAuthenticatedRequest('/api/v1/users/me')
  }

  /**
   * Fetch jobs from the API
   */
  async getJobs(skip = 0, limit = 100): Promise<any[]> {
    return this.makeAuthenticatedRequest(`/api/v1/jobs?skip=${skip}&limit=${limit}`)
  }

  /**
   * Fetch a specific job from the API
   */
  async getJob(jobId: number): Promise<any> {
    return this.makeAuthenticatedRequest(`/api/v1/jobs/${jobId}`)
  }

  /**
   * Fetch employers from the API
   */
  async getEmployers(skip = 0, limit = 100): Promise<any[]> {
    return this.makeAuthenticatedRequest(`/api/v1/employers?skip=${skip}&limit=${limit}`)
  }

  /**
   * Fetch a specific employer from the API
   */
  async getEmployer(employerId: number): Promise<any> {
    return this.makeAuthenticatedRequest(`/api/v1/employers/${employerId}`)
  }

  /**
   * Fetch job fairs from the API
   */
  async getJobFairs(): Promise<any[]> {
    return this.makeAuthenticatedRequest('/api/v1/job_fairs')
  }

  /**
   * Fetch a specific job fair from the API
   */
  async getJobFair(jobFairId: number): Promise<any> {
    return this.makeAuthenticatedRequest(`/api/v1/job_fairs/${jobFairId}`)
  }

  /**
   * Fetch breakout sessions from the API
   */
  async getBreakoutSessions(): Promise<any[]> {
    return this.makeAuthenticatedRequest('/api/v1/breakout_sessions')
  }

  /**
   * Fetch a specific breakout session from the API
   */
  async getBreakoutSession(sessionId: number): Promise<any> {
    return this.makeAuthenticatedRequest(`/api/v1/breakout_sessions/${sessionId}`)
  }

  /**
   * Search USAJobs through the API
   */
  async searchUSAJobs(params: Record<string, string>): Promise<any> {
    const queryParams = new URLSearchParams(params).toString()
    return this.makeAuthenticatedRequest(`/api/v1/usajobs/search?${queryParams}`)
  }

  /**
   * Get USAJob details
   */
  async getUSAJobDetails(jobId: string): Promise<any> {
    return this.makeAuthenticatedRequest(`/api/v1/usajobs/${jobId}`)
  }

  /**
   * Fetch vector data from the API
   */
  async getVectors(): Promise<any[]> {
    return this.makeAuthenticatedRequest('/api/v1/vectors')
  }

  /**
   * Create vector data in the API
   */
  async createVector(vectorData: any): Promise<any> {
    return this.makeAuthenticatedRequest('/api/v1/vectors', 'POST', vectorData)
  }

  /**
   * Make an authenticated request to the API
   */
  private async makeAuthenticatedRequest(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any
  ): Promise<any> {
    if (!this.token) {
      throw new Error('Not authenticated. Call authenticate() first.')
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`Error making request to ${endpoint}:`, error)
      throw error
    }
  }

  /**
   * Sync jobs from the API to the local database
   */
  async syncJobs(): Promise<void> {
    try {
      const payload = await getPayload({ config })
      const apiJobs = await this.getJobs(0, 1000)
      
      for (const apiJob of apiJobs) {
        // Check if job already exists
        const existingJobs = await payload.find({
          collection: 'jobs',
          where: {
            external_id: {
              equals: apiJob.id,
            },
          },
        })

        // Get employer reference
        let employerId
        if (apiJob.employer_id) {
          const employerResult = await payload.find({
            collection: 'employers',
            where: {
              external_id: {
                equals: apiJob.employer_id,
              },
            },
          })

          if (employerResult.docs.length > 0) {
            employerId = employerResult.docs[0].id
          }
        }

        const jobData = {
          title: apiJob.title,
          description: apiJob.description,
          employer: employerId,
          is_active: apiJob.is_active,
          external_id: apiJob.id,
          api_sync: {
            last_synced: new Date(),
            sync_source: 'api',
          },
        }

        if (existingJobs.docs.length > 0) {
          // Update existing job
          await payload.update({
            collection: 'jobs',
            id: existingJobs.docs[0].id,
            data: jobData,
          })
        } else {
          // Create new job
          await payload.create({
            collection: 'jobs',
            data: jobData,
          })
        }
      }

      console.log(`Successfully synced ${apiJobs.length} jobs`)
    } catch (error) {
      console.error('Error syncing jobs:', error)
      throw error
    }
  }

  /**
   * Sync employers from the API to the local database
   */
  async syncEmployers(): Promise<void> {
    try {
      const payload = await getPayload({ config })
      const apiEmployers = await this.getEmployers(0, 1000)
      
      for (const apiEmployer of apiEmployers) {
        // Check if employer already exists
        const existingEmployers = await payload.find({
          collection: 'employers',
          where: {
            external_id: {
              equals: apiEmployer.id,
            },
          },
        })

        const employerData = {
          company_name: apiEmployer.company_name,
          description: apiEmployer.description,
          is_active: apiEmployer.is_active,
          external_id: apiEmployer.id,
          api_sync: {
            last_synced: new Date(),
            sync_source: 'api',
          },
        }

        if (existingEmployers.docs.length > 0) {
          // Update existing employer
          await payload.update({
            collection: 'employers',
            id: existingEmployers.docs[0].id,
            data: employerData,
          })
        } else {
          // Create new employer
          await payload.create({
            collection: 'employers',
            data: employerData,
          })
        }
      }

      console.log(`Successfully synced ${apiEmployers.length} employers`)
    } catch (error) {
      console.error('Error syncing employers:', error)
      throw error
    }
  }

  /**
   * Sync job fairs from the API to the local database
   */
  async syncJobFairs(): Promise<void> {
    try {
      const payload = await getPayload({ config })
      const apiJobFairs = await this.getJobFairs()
      
      for (const apiJobFair of apiJobFairs) {
        // Check if job fair already exists
        const existingJobFairs = await payload.find({
          collection: 'job-fairs',
          where: {
            external_id: {
              equals: apiJobFair.id,
            },
          },
        })

        const jobFairData = {
          description: apiJobFair.description,
          fair_date: apiJobFair.fair_date,
          external_id: apiJobFair.id,
          api_sync: {
            last_synced: new Date(),
            sync_source: 'api',
          },
        }

        if (existingJobFairs.docs.length > 0) {
          // Update existing job fair
          await payload.update({
            collection: 'job-fairs',
            id: existingJobFairs.docs[0].id,
            data: jobFairData,
          })
        } else {
          // Create new job fair
          await payload.create({
            collection: 'job-fairs',
            data: jobFairData,
          })
        }
      }

      console.log(`Successfully synced ${apiJobFairs.length} job fairs`)
    } catch (error) {
      console.error('Error syncing job fairs:', error)
      throw error
    }
  }

  /**
   * Sync breakout sessions from the API to the local database
   */
  async syncBreakoutSessions(): Promise<void> {
    try {
      const payload = await getPayload({ config })
      const apiSessions = await this.getBreakoutSessions()
      
      for (const apiSession of apiSessions) {
        // Check if session already exists
        const existingSessions = await payload.find({
          collection: 'breakout-sessions',
          where: {
            external_id: {
              equals: apiSession.id,
            },
          },
        })

        // Get job fair reference
        let jobFairId
        if (apiSession.job_fair_id) {
          const jobFairResult = await payload.find({
            collection: 'job-fairs',
            where: {
              external_id: {
                equals: apiSession.job_fair_id,
              },
            },
          })

          if (jobFairResult.docs.length > 0) {
            jobFairId = jobFairResult.docs[0].id
          }
        }

        const sessionData = {
          topic: apiSession.topic,
          leader: apiSession.leader,
          is_active: apiSession.is_active,
          job_fair: jobFairId,
          external_id: apiSession.id,
          api_sync: {
            last_synced: new Date(),
            sync_source: 'api',
          },
        }

        if (existingSessions.docs.length > 0) {
          // Update existing session
          await payload.update({
            collection: 'breakout-sessions',
            id: existingSessions.docs[0].id,
            data: sessionData,
          })
        } else {
          // Create new session
          await payload.create({
            collection: 'breakout-sessions',
            data: sessionData,
          })
        }
      }

      console.log(`Successfully synced ${apiSessions.length} breakout sessions`)
    } catch (error) {
      console.error('Error syncing breakout sessions:', error)
      throw error
    }
  }
}

export default new JobBoardApiService();