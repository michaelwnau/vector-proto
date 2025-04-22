'use client'

import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import {
  Users,
  Briefcase,
  Building2,
  CalendarDays,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

// Mock data - to be replaced with actual API calls
const summaryData = {
  totalUsers: 1254,
  usersChange: 5.2,
  totalJobs: 287,
  jobsChange: -2.3,
  totalEmployers: 48,
  employersChange: 1.1,
  totalJobFairs: 12,
  jobFairsChange: 0,
}

const recentUsers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    role: 'veteran',
    status: 'active',
    createdAt: '2025-04-20',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'employer',
    status: 'pending',
    createdAt: '2025-04-19',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael@org.edu',
    role: 'veteran',
    status: 'active',
    createdAt: '2025-04-18',
  },
  {
    id: 4,
    name: 'Emily Davis',
    email: 'emily@recruiter.net',
    role: 'employer',
    status: 'active',
    createdAt: '2025-04-18',
  },
  {
    id: 5,
    name: 'Robert Wilson',
    email: 'robert@veteran.org',
    role: 'veteran',
    status: 'inactive',
    createdAt: '2025-04-17',
  },
]

const recentJobs = [
  {
    id: 1,
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    status: 'active',
    applications: 24,
    postedAt: '2025-04-20',
  },
  {
    id: 2,
    title: 'Project Manager',
    company: 'Global Innovations',
    location: 'Boston, MA',
    status: 'active',
    applications: 18,
    postedAt: '2025-04-19',
  },
  {
    id: 3,
    title: 'Data Analyst',
    company: 'Data Insights',
    location: 'Remote',
    status: 'closed',
    applications: 32,
    postedAt: '2025-04-15',
  },
  {
    id: 4,
    title: 'IT Support Specialist',
    company: 'Tech Solutions Inc.',
    location: 'Chicago, IL',
    status: 'active',
    applications: 12,
    postedAt: '2025-04-18',
  },
  {
    id: 5,
    title: 'Marketing Coordinator',
    company: 'Brand Builders',
    location: 'New York, NY',
    status: 'draft',
    applications: 0,
    postedAt: '2025-04-17',
  },
]

const systemAlerts = [
  { id: 1, type: 'error', message: 'API sync failed at 04:15 AM', date: '2025-04-21 04:15' },
  { id: 2, type: 'warning', message: 'Database optimization needed', date: '2025-04-20 18:30' },
  {
    id: 3,
    type: 'info',
    message: 'System backup completed successfully',
    date: '2025-04-20 02:00',
  },
  { id: 4, type: 'success', message: 'Email service restored', date: '2025-04-18 14:22' },
]

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the Vector Admin Dashboard. Overview of your systems
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <CardDescription> Total Users Card</CardDescription>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{summaryData.totalUsers.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  {summaryData.usersChange > 0 ? (
                    <>
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+{summaryData.usersChange}%</span>
                    </>
                  ) : summaryData.usersChange < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      <span className="text-red-500">{summaryData.usersChange}%</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No change</span>
                  )}
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter>
            <p>Footer Total Users</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">{summaryData.totalJobs.toLocaleString()}</div>
                <div className="flex items-center text-xs">
                  {summaryData.jobsChange > 0 ? (
                    <>
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+{summaryData.jobsChange}%</span>
                    </>
                  ) : summaryData.jobsChange < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      <span className="text-red-500">{summaryData.jobsChange}%</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No change</span>
                  )}
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {summaryData.totalEmployers.toLocaleString()}
                </div>
                <div className="flex items-center text-xs">
                  {summaryData.employersChange > 0 ? (
                    <>
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+{summaryData.employersChange}%</span>
                    </>
                  ) : summaryData.employersChange < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      <span className="text-red-500">{summaryData.employersChange}%</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No change</span>
                  )}
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Fairs</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {summaryData.totalJobFairs.toLocaleString()}
                </div>
                <div className="flex items-center text-xs">
                  {summaryData.jobFairsChange > 0 ? (
                    <>
                      <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                      <span className="text-green-500">+{summaryData.jobFairsChange}%</span>
                    </>
                  ) : summaryData.jobFairsChange < 0 ? (
                    <>
                      <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                      <span className="text-red-500">{summaryData.jobFairsChange}%</span>
                    </>
                  ) : (
                    <span className="text-muted-foreground">No change</span>
                  )}
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="recent-activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent-activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="system-alerts">System Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-activity" className="space-y-4">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            {/* Recent Users */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly registered users in the system</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-xs text-muted-foreground">{user.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="capitalize">
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                user.status === 'active'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : user.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View All Users
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
                <CardDescription>Recently posted job listings</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Applications</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentJobs.map((job) => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">{job.title}</div>
                              <div className="text-xs text-muted-foreground">{job.company}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                job.status === 'active'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : job.status === 'draft'
                                    ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                    : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }
                            >
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{job.applications}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View All Jobs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="system-alerts">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
              <CardDescription>Recent system notifications and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {systemAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`flex items-start p-3 rounded-md ${
                        alert.type === 'error'
                          ? 'bg-red-50 text-red-800'
                          : alert.type === 'warning'
                            ? 'bg-yellow-50 text-yellow-800'
                            : alert.type === 'success'
                              ? 'bg-green-50 text-green-800'
                              : 'bg-blue-50 text-blue-800'
                      }`}
                    >
                      {alert.type === 'error' && (
                        <AlertCircle className="h-5 w-5 mr-2 text-red-500 flex-shrink-0" />
                      )}
                      {alert.type === 'warning' && (
                        <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0" />
                      )}
                      {alert.type === 'success' && (
                        <CheckCircle2 className="h-5 w-5 mr-2 text-green-500 flex-shrink-0" />
                      )}
                      {alert.type === 'info' && (
                        <AlertCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium">{alert.message}</div>
                        <div className="text-xs opacity-80">{alert.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <Button variant="outline" size="sm">
                  View All Alerts
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
