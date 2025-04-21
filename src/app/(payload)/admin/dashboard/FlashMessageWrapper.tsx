'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import './FlashMessage.css'

const FlashMessageWrapper: React.FC = () => {
  const searchParams = useSearchParams()
  const [visible, setVisible] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [type, setType] = React.useState<'success' | 'error'>('success')

  React.useEffect(() => {
    // Check URL parameters for success or error messages
    const success = searchParams.get('success')
    const error = searchParams.get('error')

    if (success) {
      const messages: Record<string, string> = {
        'sync_complete': 'Data successfully synchronized with API',
      }
      setMessage(messages[success] || 'Operation completed successfully')
      setType('success')
      setVisible(true)
    } else if (error) {
      const messages: Record<string, string> = {
        'sync_failed': 'Failed to synchronize data with API. Check logs for details.',
        'api_credentials_missing': 'API credentials not configured. Check environment variables.',
      }
      setMessage(messages[error] || 'An error occurred')
      setType('error')
      setVisible(true)
    }

    // Auto-hide message after 5 seconds
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [searchParams, visible])

  if (!visible) return null

  return (
    <div className={`flash-message ${type}`}>
      <p>{message}</p>
      <button onClick={() => setVisible(false)} className="close-button">×</button>
    </div>
  )
}

export default FlashMessageWrapper