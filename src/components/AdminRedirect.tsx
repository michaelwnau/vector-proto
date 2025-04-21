'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AdminRedirectProps {
  isAdmin: boolean
  hasAuth: boolean
}

export default function AdminRedirect({ isAdmin, hasAuth }: AdminRedirectProps) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      if (!hasAuth) {
        router.push('/admin')
      } else if (!isAdmin) {
        router.push('/admin/collections/users')
      }
    }
  }, [isClient, isAdmin, hasAuth, router])

  if (!isClient) {
    return null
  }

  if (!hasAuth) {
    return (
      <div className="admin-redirect-message">
        <h3>Redirecting to login...</h3>
        <p>
          If you're not redirected, <a href="/admin">click here to log in</a>
        </p>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="admin-redirect-message">
        <h3>Admin access required</h3>
        <p>
          You don't have permission to access this page.{' '}
          <a href="/admin/collections/users">Go to standard admin</a>
        </p>
      </div>
    )
  }

  return null
}