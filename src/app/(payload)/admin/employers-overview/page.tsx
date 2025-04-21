import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { getAuthenticatedUser } from '@/lib/getAuthenticatedUser'
import AdminRedirect from '@/components/AdminRedirect'
import '../../../admin-redirect.css'
import '../jobs-overview/overview.css'

export default async function EmployersOverview() {
  // Get payload instance
  const payload = await getPayload({ config: await config })
  
  // Get authenticated user
  const { user } = await getAuthenticatedUser()
  
  // Determine auth status for client-side redirect
  const hasAuth = !!user
  const isAdmin = user?.role === 'admin'
  
  // If not authenticated or not admin, return minimal content that will be replaced client-side
  if (!hasAuth || !isAdmin) {
    return (
      <div>
        <AdminRedirect isAdmin={isAdmin} hasAuth={hasAuth} />
      </div>
    )
  }

  // Fetch employer counts and data
  const employersTotal = await payload.find({ collection: 'employers', limit: 0 }).then(res => res.totalDocs)
  
  // Get active and inactive employers count
  const activeEmployers = await payload.find({ 
    collection: 'employers', 
    where: { is_active: { equals: true } },
    limit: 0 
  }).then(res => res.totalDocs)
  
  const inactiveEmployers = await payload.find({ 
    collection: 'employers', 
    where: { is_active: { equals: false } },
    limit: 0 
  }).then(res => res.totalDocs)

  // Get jobs count by employer
  const jobsByEmployer = await payload.find({
    collection: 'jobs',
    limit: 0,
    depth: 1,
  }).then(res => {
    const counts: Record<string, number> = {}
    res.docs.forEach(job => {
      if (job.employer) {
        const id = typeof job.employer === 'object' ? job.employer.id : job.employer
        counts[id] = (counts[id] || 0) + 1
      }
    })
    return counts
  })

  // Get most recent employers
  const recentEmployers = await payload.find({
    collection: 'employers',
    limit: 10,
    sort: '-createdAt',
  })

  // Get employers with most user likes
  const employersWithLikes = await payload.find({
    collection: 'employers',
    where: {
      user_likes: {
        exists: true,
      },
    },
    sort: 'user_likes',
    limit: 5,
    depth: 1,
  })

  return (
    <div className="overview-container">
      <div className="page-nav">
        <Link href="/admin/dashboard" className="back-to-dashboard">← Back to Dashboard</Link>
        <Link href="/admin/collections/users" className="standard-admin-link">Standard Admin</Link>
      </div>
      <div className="overview-header">
        <h1>Employers Overview</h1>
        <div className="overview-actions">
          <Link href="/admin/collections/employers/create" className="action-button">
            Add New Employer
          </Link>
          <Link href="/admin/collections/employers" className="secondary-button">
            View All Employers
          </Link>
        </div>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Employers</h3>
          <p className="stat-number">{employersTotal}</p>
        </div>
        <div className="stat-card">
          <h3>Active Employers</h3>
          <p className="stat-number">{activeEmployers}</p>
        </div>
        <div className="stat-card">
          <h3>Inactive Employers</h3>
          <p className="stat-number">{inactiveEmployers}</p>
        </div>
      </div>

      <div className="overview-tables">
        <div className="overview-table">
          <h2>Recent Employers</h2>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Jobs</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentEmployers.docs.map((employer) => (
                <tr key={employer.id}>
                  <td>{employer.company_name}</td>
                  <td>{employer.description ? `${employer.description.substring(0, 50)}...` : ''}</td>
                  <td>
                    <span className={`status-badge ${employer.is_active ? 'active' : 'inactive'}`}>
                      {employer.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{jobsByEmployer[employer.id] || 0}</td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/admin/collections/employers/${employer.id}`}>View</Link>
                      <Link href={`/admin/collections/employers/${employer.id}/edit`}>Edit</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-tables">
        <div className="overview-table">
          <h2>Popular Employers</h2>
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Description</th>
                <th>User Likes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employersWithLikes.docs.length > 0 ? (
                employersWithLikes.docs.map((employer) => (
                  <tr key={employer.id}>
                    <td>{employer.company_name}</td>
                    <td>{employer.description ? `${employer.description.substring(0, 50)}...` : ''}</td>
                    <td>{Array.isArray(employer.user_likes) ? employer.user_likes.length : 0}</td>
                    <td>
                      <span className={`status-badge ${employer.is_active ? 'active' : 'inactive'}`}>
                        {employer.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/admin/collections/employers/${employer.id}`}>View</Link>
                        <Link href={`/admin/collections/employers/${employer.id}/edit`}>Edit</Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No employers with user likes found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-footer">
        <Link href="/admin/dashboard" className="secondary-button">
          Back to Dashboard
        </Link>
      </div>
    </div>
  )
}