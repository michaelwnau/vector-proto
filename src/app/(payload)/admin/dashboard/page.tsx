import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { getAuthenticatedUser } from '@/lib/getAuthenticatedUser'
import AdminRedirect from '@/components/AdminRedirect'
import '../../../admin-redirect.css'
import FlashMessageWrapper from './FlashMessageWrapper'

// ShadCN UI components
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  Users2,
  Briefcase,
  Building2,
  CalendarDays,
  PlusCircle,
  RefreshCw,
  UserPlus,
  GraduationCap,
  ChevronRight
} from "lucide-react"

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

  // Get veterans with job applications (for analytics tab)
  const veteransWithApps = await payload.find({
    collection: 'users',
    where: {
      role: { equals: 'veteran' },
      applied_jobs: { exists: true }
    },
    limit: 0
  })
  
  const veteransWithAppPercentage = veteransCount > 0 
    ? Math.round((veteransWithApps.totalDocs / veteransCount) * 100) 
    : 0

  // Get active jobs (for analytics tab)
  const activeJobs = await payload.find({
    collection: 'jobs',
    where: {
      active: { equals: true }
    },
    limit: 0
  })
  
  const activeJobsPercentage = jobsCount > 0 
    ? Math.round((activeJobs.totalDocs / jobsCount) * 100) 
    : 0

  // If not authenticated or not admin, return minimal content that will be replaced client-side
  if (!hasAuth || !isAdmin) {
    return (
      <div className="admin-dashboard-container">
        <AdminRedirect isAdmin={isAdmin} hasAuth={hasAuth} />
      </div>
    )
  }
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <FlashMessageWrapper />
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.fullName || user.email}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/collections/users">Standard Admin</Link>
        </Button>
      </div>

      {/* Dashboard Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="management">Management</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Users</CardTitle>
                <Users2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{usersCount}</div>
                <p className="text-xs text-muted-foreground">
                  Total registered users
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/collections/users">
                    <span>View All Users</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Jobs</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobsCount}</div>
                <p className="text-xs text-muted-foreground">
                  {activeJobs.totalDocs} active job listings
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/jobs-overview">
                    <span>Jobs Overview</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veterans</CardTitle>
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{veteransCount}</div>
                <p className="text-xs text-muted-foreground">
                  {veteransWithApps.totalDocs} with job applications
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/veterans-overview">
                    <span>Veterans Overview</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employers</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{employersCount}</div>
                <p className="text-xs text-muted-foreground">
                  Registered employer organizations
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/employers-overview">
                    <span>Employers Overview</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Job Fairs</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobFairsCount}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled job fair events
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/collections/job-fairs">
                    <span>View Job Fairs</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Breakout Sessions</CardTitle>
                <Users2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{breakoutSessionsCount}</div>
                <p className="text-xs text-muted-foreground">
                  Scheduled training sessions
                </p>
              </CardContent>
              <CardFooter className="p-2">
                <Button asChild variant="ghost" size="sm" className="w-full">
                  <Link href="/admin/collections/breakout-sessions">
                    <span>View Sessions</span>
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Latest job listings added to the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentJobs.docs.map((job) => (
                  <div key={job.id} className="flex items-start space-x-3 p-3 rounded-md bg-secondary/40">
                    <Briefcase className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{job.title}</h4>
                        {job.active && <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{job.employer?.company_name || 'No employer'}</p>
                      <Button asChild variant="link" size="sm" className="p-0 h-auto text-xs">
                        <Link href={`/admin/collections/jobs/${job.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/admin/collections/jobs">View All Jobs</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Employers</CardTitle>
                <CardDescription>Latest employers added to the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentEmployers.docs.map((employer) => (
                  <div key={employer.id} className="flex items-start space-x-3 p-3 rounded-md bg-secondary/40">
                    <Building2 className="h-5 w-5 mt-0.5 text-primary" />
                    <div className="space-y-1">
                      <h4 className="font-medium">{employer.company_name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {employer.description ? `${employer.description.substring(0, 60)}...` : 'No description available'}
                      </p>
                      <Button asChild variant="link" size="sm" className="p-0 h-auto text-xs">
                        <Link href={`/admin/collections/employers/${employer.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href="/admin/collections/employers">View All Employers</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Veteran Engagement</CardTitle>
                <CardDescription>Current veteran metrics and interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Veterans with Applications</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{veteransWithAppPercentage}%</span>
                      <span className="text-sm text-muted-foreground">({veteransWithApps.totalDocs} of {veteransCount})</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Engagement Summary</p>
                  <p className="text-sm text-muted-foreground">
                    {veteransWithAppPercentage > 50 
                      ? "Strong veteran engagement with jobs on the platform." 
                      : "Opportunity to improve veteran engagement with available positions."}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/veterans-overview">View Detailed Analytics</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Metrics</CardTitle>
                <CardDescription>Current job metrics and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Active Jobs</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{activeJobsPercentage}%</span>
                      <span className="text-sm text-muted-foreground">({activeJobs.totalDocs} of {jobsCount})</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Job Status Overview</p>
                  <p className="text-sm text-muted-foreground">
                    {activeJobsPercentage > 70 
                      ? "Most jobs are currently active and available to veterans." 
                      : "Consider reaching out to employers to activate more jobs."}
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/jobs-overview">View Detailed Analytics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Key metrics for the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{usersCount}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Jobs per Employer</p>
                  <p className="text-2xl font-bold">{employersCount > 0 ? (jobsCount / employersCount).toFixed(1) : '0'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Veteran-to-Job Ratio</p>
                  <p className="text-2xl font-bold">{jobsCount > 0 ? (veteransCount / jobsCount).toFixed(1) : '0'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Job Fairs & Sessions</p>
                  <p className="text-2xl font-bold">{jobFairsCount + breakoutSessionsCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Management Tab */}
        <TabsContent value="management" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Add and manage system users</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/admin/collections/users/create">
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create New User
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="/admin/collections/users">
                      <Users2 className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Admin Actions</h4>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <p className="font-medium">Create Admin Account</p>
                      <p className="text-sm text-muted-foreground">Add a new system administrator</p>
                    </div>
                    <Button asChild size="sm">
                      <Link href="/admin/create-account">Create Admin</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage platform content and data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/admin/collections/jobs/create">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Job
                    </Link>
                  </Button>
                  <Button asChild className="w-full" size="lg">
                    <Link href="/admin/collections/employers/create">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add New Employer
                    </Link>
                  </Button>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">System Actions</h4>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <p className="font-medium">Sync with External API</p>
                      <p className="text-sm text-muted-foreground">Update data from external systems</p>
                    </div>
                    <Button asChild variant="secondary" size="sm" prefetch={false}>
                      <Link href="/admin/sync">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Now
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
              <CardDescription>Manage upcoming job fairs and breakout sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Job Fairs</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Manage and organize job fair events</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild size="sm">
                      <Link href="/admin/collections/job-fairs/create">Create Job Fair</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/collections/job-fairs">View All ({jobFairsCount})</Link>
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Users2 className="h-5 w-5 text-primary" />
                    <h3 className="font-medium">Breakout Sessions</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">Manage training and networking sessions</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button asChild size="sm">
                      <Link href="/admin/collections/breakout-sessions/create">Create Session</Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href="/admin/collections/breakout-sessions">View All ({breakoutSessionsCount})</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}