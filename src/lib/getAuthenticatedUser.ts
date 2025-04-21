import { getPayload } from 'payload'
import config from '@/payload.config'
import { cookies } from 'next/headers'

/**
 * Helper function to get the authenticated user from Payload
 */
export async function getAuthenticatedUser() {
  try {
    const payload = await getPayload({ config: await config })
    
    // Get the token from cookies - need to await this in Next.js 15
    const cookieStore = await cookies()
    const token = cookieStore.get('payload-token')?.value
    
    if (!token) {
      return { user: null }
    }
    
    // Get the user directly from the collection
    try {
      // Simpler approach using the "me" special ID
      const user = await payload.findByID({
        collection: 'users',
        id: 'me',
        // This headers structure is critical for proper auth
        headers: {
          Authorization: `JWT ${token}`,
        },
      })
      
      return { user }
    } catch (userError) {
      console.error('Failed to get user:', userError)
      return { user: null }
    }
  } catch (error) {
    console.error('Error getting authenticated user:', error)
    return { user: null }
  }
}