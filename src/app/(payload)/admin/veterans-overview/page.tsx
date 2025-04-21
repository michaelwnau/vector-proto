import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { getAuthenticatedUser } from '@/lib/getAuthenticatedUser'
import AdminRedirect from '@/components/AdminRedirect'
import '../../../admin-redirect.css'
import '../jobs-overview/overview.css'

export default async function VeteransOverview() {
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

  // Fetch veteran counts and data
  const veteransTotal = await payload.find({ collection: 'veterans', limit: 0 }).then(res => res.totalDocs)
  
  // Get veterans by status
  const statuses = ['Assessment', 'Training', 'Job Search', 'Employed', 'Graduated']
  const veteransByStatus = await Promise.all(
    statuses.map(status => 
      payload.find({ 
        collection: 'veterans', 
        where: { status: { equals: status } },
        limit: 0 
      }).then(res => ({ status, count: res.totalDocs }))
    )
  )

  // Get veterans by service branch
  const branches = ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force']
  const veteransByBranch = await Promise.all(
    branches.map(branch => 
      payload.find({ 
        collection: 'veterans', 
        where: { serviceBranch: { equals: branch } },
        limit: 0 
      }).then(res => ({ branch, count: res.totalDocs }))
    )
  )

  // Get most recent veterans
  const recentVeterans = await payload.find({
    collection: 'veterans',
    limit: 10,
    sort: '-createdAt',
    depth: 1,
  })

  // Get veterans by counselor
  const veteransByCounselor = await payload.find({
    collection: 'users',
    where: {
      role: {
        equals: 'counselor',
      },
    },
    depth: 1,
  }).then(async res => {
    const counselors = res.docs
    const counts = await Promise.all(
      counselors.map(async counselor => {
        const count = await payload.find({
          collection: 'veterans',
          where: {
            counselor: {
              equals: counselor.id,
            },
          },
          limit: 0,
        }).then(res => res.totalDocs)
        
        return {
          counselor: {
            id: counselor.id,
            name: counselor.fullName || counselor.email,
          },
          count,
        }
      })
    )
    return counts.sort((a, b) => b.count - a.count).slice(0, 5)
  })

  return (
    <div className="overview-container">
      <div className="page-nav">
        <Link href="/admin/dashboard" className="back-to-dashboard">← Back to Dashboard</Link>
        <Link href="/admin/collections/users" className="standard-admin-link">Standard Admin</Link>
      </div>
      <div className="overview-header">
        <h1>Veterans Overview</h1>
        <div className="overview-actions">
          <Link href="/admin/collections/veterans/create" className="action-button">
            Add New Veteran
          </Link>
          <Link href="/admin/collections/veterans" className="secondary-button">
            View All Veterans
          </Link>
        </div>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Veterans</h3>
          <p className="stat-number">{veteransTotal}</p>
        </div>
        {veteransByStatus.map(({ status, count }) => (
          <div className="stat-card" key={status}>
            <h3>{status}</h3>
            <p className="stat-number">{count}</p>
          </div>
        ))}
      </div>

      <div className="overview-tables">
        <div className="overview-table">
          <h2>Veterans by Service Branch</h2>
          <table>
            <thead>
              <tr>
                <th>Branch</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {veteransByBranch.map(({ branch, count }) => (
                <tr key={branch}>
                  <td>{branch}</td>
                  <td>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overview-tables">
        <div className="overview-table">
          <h2>Recent Veterans</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Counselor</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentVeterans.docs.map((veteran) => (
                <tr key={veteran.id}>
                  <td>{veteran.fullName}</td>
                  <td>{veteran.email}</td>
                  <td>
                    <span className={`status-badge`}>
                      {veteran.status}
                    </span>
                  </td>
                  <td>
                    {veteran.counselor ? 
                      (typeof veteran.counselor === 'object' ? 
                        (veteran.counselor.fullName || veteran.counselor.email) : 
                        'Unknown') : 
                      'No Counselor'}
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/admin/collections/veterans/${veteran.id}`}>View</Link>
                      <Link href={`/admin/collections/veterans/${veteran.id}/edit`}>Edit</Link>
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
          <h2>Veterans by Counselor</h2>
          <table>
            <thead>
              <tr>
                <th>Counselor</th>
                <th>Veterans Assigned</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {veteransByCounselor.map(({ counselor, count }) => (
                <tr key={counselor.id}>
                  <td>{counselor.name}</td>
                  <td>{count}</td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/admin/collections/users/${counselor.id}`}>View Counselor</Link>
                      <Link href={`/admin/collections/veterans?where[counselor][equals]=${counselor.id}`}>View Veterans</Link>
                    </div>
                  </td>
                </tr>
              ))}
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