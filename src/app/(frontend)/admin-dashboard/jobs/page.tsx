"use client"

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Calendar,
  Check,
  Clock,
  Download,
  Eye,
  Filter,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Trash2,
  X,
} from 'lucide-react'

// Mock data for jobs
const mockJobs = [
  {
    id: '1',
    title: 'Software Engineer',
    company: 'Tech Solutions Inc.',
    location: 'Boston, MA',
    type: 'Full-Time',
    status: 'active',
    featured: true,
    applications: 24,
    postedDate: '2025-04-10T10:00:00',
    expiryDate: '2025-05-10T10:00:00',
  },
  {
    id: '2',
    title: 'IT Support Specialist',
    company: 'Global Services',
    location: 'Remote',
    type: 'Full-Time',
    status: 'active',
    featured: false,
    applications: 18,
    postedDate: '2025-04-12T14:30:00',
    expiryDate: '2025-05-12T14:30:00',
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Data Insights Corp',
    location: 'Chicago, IL',
    type: 'Full-Time',
    status: 'active',
    featured: true,
    applications: 32,
    postedDate: '2025-04-08T09:15:00',
    expiryDate: '2025-05-08T09:15:00',
  },
  {
    id: '4',
    title: 'Project Manager',
    company: 'Construct Builder',
    location: 'New York, NY',
    type: 'Contract',
    status: 'expired',
    featured: false,
    applications: 15,
    postedDate: '2025-03-15T11:20:00',
    expiryDate: '2025-04-15T11:20:00',
  },
  {
    id: '5',
    title: 'Marketing Coordinator',
    company: 'Brand Solutions',
    location: 'Los Angeles, CA',
    type: 'Part-Time',
    status: 'draft',
    featured: false,
    applications: 0,
    postedDate: null,
    expiryDate: null,
  },
  {
    id: '6',
    title: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    type: 'Full-Time',
    status: 'active',
    featured: false,
    applications: 28,
    postedDate: '2025-04-05T15:45:00',
    expiryDate: '2025-05-05T15:45:00',
  },
  {
    id: '7',
    title: 'Customer Service Representative',
    company: 'Support Heroes',
    location: 'Dallas, TX',
    type: 'Full-Time',
    status: 'paused',
    featured: false,
    applications: 10,
    postedDate: '2025-04-02T13:10:00',
    expiryDate: '2025-05-02T13:10:00',
  },
  {
    id: '8',
    title: 'Cybersecurity Analyst',
    company: 'Security Solutions',
    location: 'Washington, DC',
    type: 'Full-Time',
    status: 'active',
    featured: true,
    applications: 14,
    postedDate: '2025-04-18T08:30:00',
    expiryDate: '2025-05-18T08:30:00',
  },
]

export default function JobsPage() {
  const [jobs, setJobs] = useState(mockJobs)
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showJobDetailsDialog, setShowJobDetailsDialog] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)

  // Filter jobs based on selected tab, search term, job type, and status
  const filteredJobs = jobs.filter(job => {
    // Filter by tab
    if (selectedTab === 'active' && job.status !== 'active') return false
    if (selectedTab === 'drafts' && job.status !== 'draft') return false
    if (selectedTab === 'expired' && job.status !== 'expired') return false
    if (selectedTab === 'featured' && !job.featured) return false

    // Filter by search term
    if (
      searchTerm &&
      !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !job.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by job type
    if (selectedJobType !== 'all' && job.type !== selectedJobType) return false

    // Filter by status
    if (selectedStatus !== 'all' && job.status !== selectedStatus) return false

    return true
  })

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date)
  }

  // Function to view job details
  const viewJobDetails = (job) => {
    setSelectedJob(job)
    setShowJobDetailsDialog(true)
  }

  // Function to toggle job status
  const toggleJobStatus = (jobId, newStatus) => {
    setJobs(
      jobs.map(job =>
        job.id === jobId ? { ...job, status: newStatus } : job
      )
    )
  }

  // Function to toggle featured status
  const toggleFeatured = (jobId) => {
    setJobs(
      jobs.map(job =>
        job.id === jobId ? { ...job, featured: !job.featured } : job
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Jobs</h1>
          <p className="text-muted-foreground">
            Manage job listings across the platform.
          </p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New Job
        </Button>
      </div>

      <div className="space-y-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Jobs</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="expired">Expired</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <RefreshCcw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <TabsContent value={selectedTab} className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                  <CardTitle>Job Listings</CardTitle>
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search jobs..."
                        className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Select value={selectedJobType} onValueChange={setSelectedJobType}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Job Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="Full-Time">Full-Time</SelectItem>
                        <SelectItem value="Part-Time">Part-Time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Job Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead className="text-center">Applications</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No jobs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobs.map(job => (
                        <TableRow key={job.id}>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <span className="font-medium">{job.title}</span>
                                {job.featured && (
                                  <Badge className="ml-2 bg-amber-100 text-amber-800 hover:bg-amber-100">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {job.company}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{job.location}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {job.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                job.status === 'active'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : job.status === 'draft'
                                  ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                  : job.status === 'paused'
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }
                            >
                              {job.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(job.postedDate)}</TableCell>
                          <TableCell className="text-center">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                              {job.applications}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => viewJobDetails(job)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {job.status === 'active' ? (
                                  <DropdownMenuItem onClick={() => toggleJobStatus(job.id, 'paused')}>
                                    <Clock className="mr-2 h-4 w-4" />
                                    Pause Listing
                                  </DropdownMenuItem>
                                ) : job.status === 'paused' ? (
                                  <DropdownMenuItem onClick={() => toggleJobStatus(job.id, 'active')}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Resume Listing
                                  </DropdownMenuItem>
                                ) : job.status === 'draft' ? (
                                  <DropdownMenuItem onClick={() => toggleJobStatus(job.id, 'active')}>
                                    <Check className="mr-2 h-4 w-4" />
                                    Publish Listing
                                  </DropdownMenuItem>
                                ) : null}
                                <DropdownMenuItem onClick={() => toggleFeatured(job.id)}>
                                  {job.featured ? (
                                    <>
                                      <X className="mr-2 h-4 w-4" />
                                      Remove Featured
                                    </>
                                  ) : (
                                    <>
                                      <Check className="mr-2 h-4 w-4" />
                                      Mark as Featured
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Job
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Job Details Dialog */}
      {selectedJob && (
        <Dialog open={showJobDetailsDialog} onOpenChange={setShowJobDetailsDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Job Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected job listing
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">{selectedJob.title}</h3>
                <Badge
                  className={
                    selectedJob.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : selectedJob.status === 'draft'
                      ? 'bg-blue-100 text-blue-800'
                      : selectedJob.status === 'paused'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {selectedJob.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Company</h4>
                  <p>{selectedJob.company}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Location</h4>
                  <p>{selectedJob.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Job Type</h4>
                  <p>{selectedJob.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Applications</h4>
                  <p>{selectedJob.applications}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Posted Date</h4>
                  <p>{formatDate(selectedJob.postedDate)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Expiry Date</h4>
                  <p>{formatDate(selectedJob.expiryDate)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                <div className="flex space-x-2 mt-1">
                  <Badge
                    className={
                      selectedJob.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : selectedJob.status === 'draft'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedJob.status === 'paused'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }
                  >
                    {selectedJob.status}
                  </Badge>
                  {selectedJob.featured && (
                    <Badge className="bg-amber-100 text-amber-800">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Job Description</h4>
                <p className="mt-1 text-sm">
                  This is a placeholder for the job description. In a real application, the full
                  job description would be displayed here, including responsibilities, requirements,
                  benefits, and other relevant information.
                </p>
              </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row sm:justify-between sm:space-x-2">
              <Button variant="outline" onClick={() => setShowJobDetailsDialog(false)}>
                Close
              </Button>
              <div className="flex space-x-2 mt-3 sm:mt-0">
                <Button variant="outline">View Applications</Button>
                <Button>Edit Job</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
