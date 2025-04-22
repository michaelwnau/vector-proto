import { useEffect, useState } from 'react'

export type User = {
  id: string
  email: string
  role?: string
  fullName?: string
  [key: string]: any
}

interface AuthResponse {
  user: User | null
  message?: string
}

/**
 * Custom hook to handle authentication in client components
 * This uses a straightforward fetch to Payload's /api/users/me endpoint
 */
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Use the Payload API directly
        const response = await fetch('/api/users/me', {
          credentials: 'include', // Important for cookies to be sent
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch user')
        }

        const data = await response.json()
        
        // If user is authenticated, Payload will return the user object
        // Otherwise, it will return a docs array that's empty
        if (data && data.user) {
          setUser(data.user)
        } else {
          setUser(null)
        }
      } catch (err) {
        console.error('Error fetching authenticated user:', err)
        setError(err instanceof Error ? err : new Error(String(err)))
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  return { user, isLoading, error }
}
