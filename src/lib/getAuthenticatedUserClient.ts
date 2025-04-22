import { getPayload } from 'payload'
import config from '@/payload.config'

/**
 * Helper function to get the authenticated user from Payload on the client-side
 */
export async function getAuthenticatedUserClient() {
  // Ensure we're on the client side before accessing document
  if (typeof window === 'undefined') {
    return { user: null }
  }

  try {
    const payload = await getPayload({ config: await config })
    
    // Get the token from cookies using client-side approach
    // This works in client components where next/headers is not available
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('payload-token='))
      ?.split('=')[1]
    
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