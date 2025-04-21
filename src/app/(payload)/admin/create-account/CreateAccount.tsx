'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type FormValues = {
  email: string
  password: string
  confirmPassword: string
  fullName: string
  role: string
}

const CreateAccount: React.FC = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      role: 'veteran',
    }
  })
  
  const password = watch('password')

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Create the user via the PayloadCMS API
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          fullName: data.fullName,
          role: data.role,
          is_active: true,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || errorData.errors?.email?.message || 'Account creation failed')
      }
      
      // Log the user in after account creation
      const loginResponse = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      })
      
      if (!loginResponse.ok) {
        throw new Error('Account created but login failed. Please go to login page.')
      }
      
      // Redirect to the appropriate page based on role
      if (data.role === 'admin') {
        router.push('/admin/dashboard')
      } else {
        router.push('/admin')
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during account creation')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="create-account-container">
      <div className="account-card">
        <div className="account-header">
          <h1>Create New Account</h1>
          <p>Join the Job Board platform</p>
        </div>
        
        {error && <div className="account-error">{error}</div>}
        
        <form onSubmit={handleSubmit(onSubmit)} className="account-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              })}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="error-message">{errors.fullName.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              placeholder="Create a password"
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="role">Account Type</label>
            <select
              id="role"
              {...register('role', { required: 'Please select an account type' })}
            >
              <option value="veteran">Veteran</option>
              <option value="employer">Employer</option>
              <option value="counselor">Counselor</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="error-message">{errors.role.message}</span>}
          </div>
          
          <button 
            type="submit" 
            className="create-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="account-actions">
          <p>Already have an account?</p>
          <Link href="/admin/login" className="login-link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CreateAccount