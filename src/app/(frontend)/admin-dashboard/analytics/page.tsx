"use client"

import React, { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { 
  BarChart,
  BarChart3,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Calendar,
  Download
} from 'lucide-react'

// Mock data for charts
const userRegistrationData = [
  { name: 'Jan', veterans: 65, employers: 28 },
  { name: 'Feb', veterans: 59, employers: 32 },
  { name: 'Mar', veterans: 80, employers: 25 },
  { name: 'Apr', veterans: 81, employers: 18 },
  { name: 'May', veterans: 56, employers: 20 },
  { name: 'Jun', veterans: 55, employers: 22 },
  { name: 'Jul', veterans: 40, employers: 15 },
  { name: 'Aug', veterans: 70, employers: 30 },
  { name: 'Sep', veterans: 90, employers: 35 },
  { name: 'Oct', veterans: 110, employers: 40 },
  { name: 'Nov', veterans: 120, employers: 45 },
  { name: 'Dec', veterans: 130, employers: 50 },
]

const jobMetricsData = [
  { name: 'Jan', posted: 42, filled: 23, expired: 8 },
  { name: 'Feb', posted: 38, filled: 19, expired: 11 },
  { name: 'Mar', posted: 45, filled: 28, expired: 7 },
  { name: 'Apr', posted: 39, filled: 22, expired: 10 },
  { name: 'May', posted: 52, filled: 31, expired: 9 },
  { name: 'Jun', posted: 58, filled: 33, expired: 12 },
  { name: 'Jul', posted: 48, filled: 28, expired: 15 },
  { name: 'Aug', posted: 61, filled: 40, expired: 11 },
  { name: 'Sep', posted: 55, filled: 36, expired: 8 },
  { name: 'Oct', posted: 67, filled: 42, expired: 14 },
  { name: 'Nov', posted: 72, filled: 48, expired: 10 },
  { name: 'Dec', posted: 63, filled: 39, expired: 13 },
]

const applicationSourceData = [
  { name: 'Direct Website', value: 45 },
  { name: 'Job Fairs', value: 25 },
  { name: 'Partner Referrals', value: 15 },
  { name: 'Social Media', value: 10 },
  { name: 'Other', value: 5 },
]

const employerTypeData = [
  { name: 'Corporate', value: 38 },
  { name: 'Government', value: 27 },
  { name: 'Non-Profit', value: 20 },
  { name: 'Small Business', value: 15 },
]

const websiteTrafficData = [
  { name: 'Jan', views: 2400, visitors: 1500, interactions: 900 },
  { name: 'Feb', views: 1398, visitors: 900, interactions: 700 },
  { name: 'Mar', views: 9800, visitors: 6000, interactions: 4500 },
  { name: 'Apr', views: 3908, visitors: 2500, interactions: 1700 },
  { name: 'May', views: 4800, visitors: 3000, interactions: 2200 },
  { name: 'Jun', views: 3800, visitors: 2300, interactions: 1800 },
  { name: 'Jul', views: 4300, visitors: 2600, interactions: 2000 },
  { name: 'Aug', views: 5000, visitors: 3100, interactions: 2400 },
  { name: 'Sep', views: 7000, visitors: 4500, interactions: 3500 },
  { name: 'Oct', views: 9000, visitors: 6000, interactions: 4500 },
  { name: 'Nov', views: 5500, visitors: 3500, interactions: 2700 },
  { name: 'Dec', views: 8000, visitors: 5200, interactions: 4000 },
]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('year')

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Review system performance metrics and user analytics.
          </p>
        </div>
        <div className="flex space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last quarter</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main content */}
      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="jobs">Job Metrics</TabsTrigger>
          <TabsTrigger value="employers">Employer Data</TabsTrigger>
          <TabsTrigger value="traffic">Site Traffic</TabsTrigger>
        </TabsList>

        {/* User Analytics Tab */}
        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% from last month
                </p>
              </CardContent>
              <CardFooter className="px-2">
                <div className="bg-primary/10 w-full rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[70%]"></div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Veterans</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">924</div>
                <p className="text-xs text-muted-foreground">
                  +7.4% from last month
                </p>
              </CardContent>
              <CardFooter className="px-2">
                <div className="bg-primary/10 w-full rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[74%]"></div>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Employers</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">330</div>
                <p className="text-xs text-muted-foreground">
                  +1.1% from last month
                </p>
              </CardContent>
              <CardFooter className="px-2">
                <div className="bg-primary/10 w-full rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-[26%]"></div>
                </div>
              </CardFooter>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Registrations</CardTitle>
                <CardDescription>
                  Monthly user registration breakdown
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Bar chart showing monthly user registrations will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Veterans: 924, Employers: 330
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>
                  Breakdown of user types and demographics
                </CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <PieChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Pie chart showing user demographics will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Veterans (74%), Employers (26%)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Job Metrics Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">678</div>
                <p className="text-xs text-muted-foreground">
                  +2.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">287</div>
                <p className="text-xs text-muted-foreground">
                  +4.5% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fill Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">62%</div>
                <p className="text-xs text-muted-foreground">
                  +3.8% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Job Metrics Over Time</CardTitle>
              <CardDescription>
                Posted, filled, and expired jobs
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <LineChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Line chart showing job metrics will render here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Posted: 678, Filled: 369, Expired: 118
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Sources</CardTitle>
              <CardDescription>
                Where job applications are coming from
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <PieChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Pie chart showing application sources will render here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Direct: 45%, Job Fairs: 25%, Partners: 15%, Social: 10%, Other: 5%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Employer Data Tab */}
        <TabsContent value="employers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Employer Types</CardTitle>
                <CardDescription>
                  Breakdown of employer categories
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <PieChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Pie chart showing employer types will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Corporate: 38%, Government: 27%, Non-Profit: 20%, Small Business: 15%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Employer Activity</CardTitle>
                <CardDescription>
                  Job posting activity by employer type
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Bar chart showing employer activity will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Average 14.2 jobs per employer
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Employer Growth</CardTitle>
                <CardDescription>
                  New employer registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <LineChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Line chart showing employer growth will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      48 new employers in the last quarter
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Site Traffic Tab */}
        <TabsContent value="traffic" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">58,642</div>
                <p className="text-xs text-muted-foreground">
                  +15.8% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">37,105</div>
                <p className="text-xs text-muted-foreground">
                  +12.3% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.8%</div>
                <p className="text-xs text-muted-foreground">
                  +0.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Website Traffic</CardTitle>
              <CardDescription>
                Views, visitors, and interactions over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <div className="h-full w-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <LineChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Line chart showing website traffic metrics will render here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total views: 58,642, Visitors: 37,105, Interactions: 28,753
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>
                  Where website visitors are coming from
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <PieChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Pie chart showing traffic sources will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Direct: 40%, Search: 30%, Referral: 20%, Social: 10%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Usage</CardTitle>
                <CardDescription>
                  Types of devices used to access the site
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <div className="h-full w-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <PieChartIcon className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Pie chart showing device usage will render here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Desktop: 45%, Mobile: 42%, Tablet: 13%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
