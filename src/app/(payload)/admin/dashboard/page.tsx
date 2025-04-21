import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import FlashMessageWrapper from './FlashMessageWrapper'
import { getAuthenticatedUser } from '@/lib/getAuthenticatedUser'
import AdminRedirect from '@/components/AdminRedirect'
import '../../../admin-redirect.css'
import './dashboard.css'

// Dashboard page for admin users
export default async function Dashboard() {
  // Get payload instance and user
  const payload = await getPayload({ config: await config })
  const { user } = await getAuthenticatedUser()
  
  // Determine auth status for client-side redirect
  const hasAuth = !!user
  const isAdmin = user?.role === 'admin'

  // Fetch counts for each collection
  const [
    usersCount,
    jobsCount,
    employersCount,
    veteransCount,
    jobFairsCount,
    breakoutSessionsCount,
  ] = await Promise.all([
    payload.find({ collection: 'users', limit: 0 }).then(res => res.totalDocs),
    payload.find({ collection: 'jobs', limit: 0 }).then(res => res.totalDocs), 
    payload.find({ collection: 'employers', limit: 0 }).then(res => res.totalDocs),
    payload.find({ collection: 'veterans', limit: 0 }).then(res => res.totalDocs),
    payload.find({ collection: 'job-fairs', limit: 0 }).then(res => res.totalDocs),
    payload.find({ collection: 'breakout-sessions', limit: 0 }).then(res => res.totalDocs),
  ])

  // Get recent jobs
  const recentJobs = await payload.find({
    collection: 'jobs',
    limit: 5,
    sort: '-createdAt',
    depth: 1,
  })

  // Get recent employers
  const recentEmployers = await payload.find({
    collection: 'employers',
    limit: 5,
    sort: '-createdAt',
  })

  // If not authenticated or not admin, return minimal content that will be replaced client-side
  if (!hasAuth || !isAdmin) {
    return (
      <div className="admin-dashboard">
        <AdminRedirect isAdmin={isAdmin} hasAuth={hasAuth} />
      </div>
    )
  }
  
  return (
    <div className="admin-dashboard">
      <FlashMessageWrapper />
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="dashboard-nav">
          <p>Welcome back, {user.fullName || user.email}</p>
          <Link href="/admin/collections/users" className="standard-admin-link">Standard Admin</Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users</h3>
          <p className="stat-number">{usersCount}</p>
          <Link href="/admin/collections/users">View All</Link>
        </div>
        <div className="stat-card">
          <h3>Veterans</h3>
          <p className="stat-number">{veteransCount}</p>
          <div className="stat-links">
            <Link href="/admin/veterans-overview">Overview</Link>
            <Link href="/admin/collections/veterans">View All</Link>
          </div>
        </div>
        <div className="stat-card">
          <h3>Jobs</h3>
          <p className="stat-number">{jobsCount}</p>
          <div className="stat-links">
            <Link href="/admin/jobs-overview">Overview</Link>
            <Link href="/admin/collections/jobs">View All</Link>
          </div>
        </div>
        <div className="stat-card">
          <h3>Employers</h3>
          <p className="stat-number">{employersCount}</p>
          <div className="stat-links">
            <Link href="/admin/employers-overview">Overview</Link>
            <Link href="/admin/collections/employers">View All</Link>
          </div>
        </div>
        <div className="stat-card">
          <h3>Job Fairs</h3>
          <p className="stat-number">{jobFairsCount}</p>
          <Link href="/admin/collections/job-fairs">View All</Link>
        </div>
        <div className="stat-card">
          <h3>Breakout Sessions</h3>
          <p className="stat-number">{breakoutSessionsCount}</p>
          <Link href="/admin/collections/breakout-sessions">View All</Link>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="dashboard-col">
          <h2>Recent Jobs</h2>
          <div className="recent-list">
            {recentJobs.docs.map((job) => (
              <div key={job.id} className="recent-item">
                <h4>{job.title}</h4>
                <p>{job.employer?.company_name || 'No employer'}</p>
                <Link href={`/admin/collections/jobs/${job.id}`}>View Details</Link>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link href="/admin/collections/jobs">View All Jobs</Link>
          </div>
        </div>

        <div className="dashboard-col">
          <h2>Recent Employers</h2>
          <div className="recent-list">
            {recentEmployers.docs.map((employer) => (
              <div key={employer.id} className="recent-item">
                <h4>{employer.company_name}</h4>
                <p>{employer.description ? `${employer.description.substring(0, 50)}...` : ''}</p>
                <Link href={`/admin/collections/employers/${employer.id}`}>View Details</Link>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link href="/admin/collections/employers">View All Employers</Link>
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link href="/admin/collections/users/create" className="action-button">
            Add New User
          </Link>
          <Link href="/admin/collections/jobs/create" className="action-button">
            Add New Job
          </Link>
          <Link href="/admin/collections/employers/create" className="action-button">
            Add New Employer
          </Link>
          <Link href="/admin/sync" className="action-button" prefetch={false}>
            Sync with API
          </Link>
        </div>
      </div>
    </div>
  )
}