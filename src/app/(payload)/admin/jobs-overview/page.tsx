import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { getAuthenticatedUser } from '@/lib/getAuthenticatedUser'
import AdminRedirect from '@/components/AdminRedirect'
import '../../../admin-redirect.css'
import './overview.css'

export default async function JobsOverview() {
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

  // Fetch job counts and data
  const jobsTotal = await payload.find({ collection: 'jobs', limit: 0 }).then(res => res.totalDocs)
  
  // Get active and inactive jobs count
  const activeJobs = await payload.find({ 
    collection: 'jobs', 
    where: { is_active: { equals: true } },
    limit: 0 
  }).then(res => res.totalDocs)
  
  const inactiveJobs = await payload.find({ 
    collection: 'jobs', 
    where: { is_active: { equals: false } },
    limit: 0 
  }).then(res => res.totalDocs)

  // Get jobs with employers and without employers
  const jobsWithEmployers = await payload.find({ 
    collection: 'jobs', 
    where: { employer: { exists: true } },
    limit: 0 
  }).then(res => res.totalDocs)
  
  const jobsWithoutEmployers = jobsTotal - jobsWithEmployers

  // Get most recent jobs
  const recentJobs = await payload.find({
    collection: 'jobs',
    limit: 10,
    sort: '-createdAt',
    depth: 1,
  })

  // Get jobs with most applicants
  const jobsWithApplicants = await payload.find({
    collection: 'jobs',
    where: {
      applicants: {
        exists: true,
      },
    },
    sort: 'applicants',
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
        <h1>Jobs Overview</h1>
        <div className="overview-actions">
          <Link href="/admin/collections/jobs/create" className="action-button">
            Add New Job
          </Link>
          <Link href="/admin/collections/jobs" className="secondary-button">
            View All Jobs
          </Link>
        </div>
      </div>

      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Jobs</h3>
          <p className="stat-number">{jobsTotal}</p>
        </div>
        <div className="stat-card">
          <h3>Active Jobs</h3>
          <p className="stat-number">{activeJobs}</p>
        </div>
        <div className="stat-card">
          <h3>Inactive Jobs</h3>
          <p className="stat-number">{inactiveJobs}</p>
        </div>
        <div className="stat-card">
          <h3>With Employers</h3>
          <p className="stat-number">{jobsWithEmployers}</p>
        </div>
        <div className="stat-card">
          <h3>Without Employers</h3>
          <p className="stat-number">{jobsWithoutEmployers}</p>
        </div>
      </div>

      <div className="overview-tables">
        <div className="overview-table">
          <h2>Recent Jobs</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Employer</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.docs.map((job) => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.employer?.company_name || 'No employer'}</td>
                  <td>
                    <span className={`status-badge ${job.is_active ? 'active' : 'inactive'}`}>
                      {job.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="table-actions">
                      <Link href={`/admin/collections/jobs/${job.id}`}>View</Link>
                      <Link href={`/admin/collections/jobs/${job.id}/edit`}>Edit</Link>
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
          <h2>Jobs with Applicants</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Employer</th>
                <th>Applicants</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobsWithApplicants.docs.length > 0 ? (
                jobsWithApplicants.docs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>
                    <td>{job.employer?.company_name || 'No employer'}</td>
                    <td>{Array.isArray(job.applicants) ? job.applicants.length : 0}</td>
                    <td>
                      <span className={`status-badge ${job.is_active ? 'active' : 'inactive'}`}>
                        {job.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        <Link href={`/admin/collections/jobs/${job.id}`}>View</Link>
                        <Link href={`/admin/collections/jobs/${job.id}/edit`}>Edit</Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No jobs with applicants found</td>
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