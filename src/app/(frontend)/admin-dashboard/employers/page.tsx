"use client"

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Building,
  Briefcase,
  CheckCircle,
  Download,
  Eye,
  Filter,
  Globe,
  MapPin,
  MoreHorizontal,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Star,
  Trash2,
  User,
  UserCheck,
  Users,
  XCircle,
} from 'lucide-react'

// Mock data for employers
const mockEmployers = [
  {
    id: '1',
    name: 'Tech Solutions Inc.',
    logo: '/logos/tech-solutions.png',
    industry: 'Technology',
    location: 'Boston, MA',
    website: 'https://techsolutions.example.com',
    employees: '500-1000',
    verified: true,
    featured: true,
    status: 'active',
    jobsPosted: 12,
    dateJoined: '2025-01-15T09:30:00',
    primaryContact: {
      name: 'Jane Smith',
      email: 'jane.smith@techsolutions.example.com',
      phone: '(555) 123-4567',
    },
  },
  {
    id: '2',
    name: 'Global Services',
    logo: '/logos/global-services.png',
    industry: 'Professional Services',
    location: 'New York, NY',
    website: 'https://globalservices.example.com',
    employees: '1000+',
    verified: true,
    featured: false,
    status: 'active',
    jobsPosted: 8,
    dateJoined: '2025-02-10T14:15:00',
    primaryContact: {
      name: 'Michael Johnson',
      email: 'michael@globalservices.example.com',
      phone: '(555) 987-6543',
    },
  },
  {
    id: '3',
    name: 'Data Insights Corp',
    logo: '/logos/data-insights.png',
    industry: 'Data Analytics',
    location: 'Chicago, IL',
    website: 'https://datainsights.example.com',
    employees: '100-500',
    verified: true,
    featured: true,
    status: 'active',
    jobsPosted: 5,
    dateJoined: '2025-03-05T11:45:00',
    primaryContact: {
      name: 'Sarah Davis',
      email: 'sarah@datainsights.example.com',
      phone: '(555) 456-7890',
    },
  },
  {
    id: '4',
    name: 'Construct Builder',
    logo: '/logos/construct-builder.png',
    industry: 'Construction',
    location: 'Phoenix, AZ',
    website: 'https://constructbuilder.example.com',
    employees: '100-500',
    verified: true,
    featured: false,
    status: 'inactive',
    jobsPosted: 3,
    dateJoined: '2025-01-20T13:30:00',
    primaryContact: {
      name: 'Robert Wilson',
      email: 'robert@constructbuilder.example.com',
      phone: '(555) 789-0123',
    },
  },
  {
    id: '5',
    name: 'Brand Solutions',
    logo: '/logos/brand-solutions.png',
    industry: 'Marketing',
    location: 'Los Angeles, CA',
    website: 'https://brandsolutions.example.com',
    employees: '50-100',
    verified: false,
    featured: false,
    status: 'pending',
    jobsPosted: 0,
    dateJoined: '2025-04-18T15:30:00',
    primaryContact: {
      name: 'Emily Brown',
      email: 'emily@brandsolutions.example.com',
      phone: '(555) 234-5678',
    },
  },
  {
    id: '6',
    name: 'Security Systems',
    logo: '/logos/security-systems.png',
    industry: 'Cybersecurity',
    location: 'Washington, DC',
    website: 'https://securitysystems.example.com',
    employees: '100-500',
    verified: true,
    featured: false,
    status: 'active',
    jobsPosted: 6,
    dateJoined: '2025-02-25T10:15:00',
    primaryContact: {
      name: 'Thomas Martin',
      email: 'thomas@securitysystems.example.com',
      phone: '(555) 345-6789',
    },
  },
]

export default function EmployersPage() {
  const [employers, setEmployers] = useState(mockEmployers)
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showEmployerDetailsDialog, setShowEmployerDetailsDialog] = useState(false)
  const [selectedEmployer, setSelectedEmployer] = useState(null)

  // Filter employers based on selected tab, search term, industry, and status
  const filteredEmployers = employers.filter(employer => {
    // Filter by tab
    if (selectedTab === 'active' && employer.status !== 'active') return false
    if (selectedTab === 'pending' && employer.status !== 'pending') return false
    if (selectedTab === 'inactive' && employer.status !== 'inactive') return false
    if (selectedTab === 'featured' && !employer.featured) return false

    // Filter by search term
    if (
      searchTerm &&
      !employer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !employer.location.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !employer.industry.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by industry
    if (selectedIndustry !== 'all' && employer.industry !== selectedIndustry) return false

    // Filter by status
    if (selectedStatus !== 'all' && employer.status !== selectedStatus) return false

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

  // Function to view employer details
  const viewEmployerDetails = (employer) => {
    setSelectedEmployer(employer)
    setShowEmployerDetailsDialog(true)
  }

  // Function to toggle employer status
  const toggleEmployerStatus = (employerId, newStatus) => {
    setEmployers(
      employers.map(employer =>
        employer.id === employerId ? { ...employer, status: newStatus } : employer
      )
    )
  }

  // Function to toggle featured status
  const toggleFeatured = (employerId) => {
    setEmployers(
      employers.map(employer =>
        employer.id === employerId ? { ...employer, featured: !employer.featured } : employer
      )
    )
  }

  // Function to toggle verified status
  const toggleVerified = (employerId) => {
    setEmployers(
      employers.map(employer =>
        employer.id === employerId ? { ...employer, verified: !employer.verified } : employer
      )
    )
  }

  // Get unique industries for the filter
  const industries = [...new Set(employers.map(employer => employer.industry))]

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employers</h1>
          <p className="text-muted-foreground">
            Manage employer accounts and company information.
          </p>
        </div>
        
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employer
        </Button>
      </div>

      <div className="space-y-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Employers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
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
                  <CardTitle>Employer Directory</CardTitle>
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search employers..."
                        className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Industries</SelectItem>
                        {industries.map(industry => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-center">Jobs</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No employers found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEmployers.map(employer => (
                        <TableRow key={employer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  <Building className="h-5 w-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <div className="flex items-center">
                                  <span className="font-medium">{employer.name}</span>
                                  {employer.verified && (
                                    <CheckCircle className="ml-1 h-4 w-4 text-blue-500" />
                                  )}
                                  {employer.featured && (
                                    <Star className="ml-1 h-4 w-4 text-amber-500" />
                                  )}
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {employer.primaryContact?.name || 'No contact'}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {employer.industry}
                            </Badge>
                          </TableCell>
                          <TableCell>{employer.location}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                employer.status === 'active'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                  : employer.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }
                            >
                              {employer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
                              {employer.jobsPosted}
                            </span>
                          </TableCell>
                          <TableCell>{formatDate(employer.dateJoined)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => viewEmployerDetails(employer)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-4 w-4" />
                                  Edit Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Briefcase className="mr-2 h-4 w-4" />
                                  View Jobs
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toggleVerified(employer.id)}>
                                  {employer.verified ? (
                                    <>
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Remove Verification
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="mr-2 h-4 w-4" />
                                      Verify Employer
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toggleFeatured(employer.id)}>
                                  {employer.featured ? (
                                    <>
                                      <Star className="mr-2 h-4 w-4" />
                                      Remove Featured
                                    </>
                                  ) : (
                                    <>
                                      <Star className="mr-2 h-4 w-4" />
                                      Mark as Featured
                                    </>
                                  )}
                                </DropdownMenuItem>
                                {employer.status === 'active' ? (
                                  <DropdownMenuItem onClick={() => toggleEmployerStatus(employer.id, 'inactive')}>
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Deactivate Account
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => toggleEmployerStatus(employer.id, 'active')}>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Activate Account
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Employer
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

      {/* Employer Details Dialog */}
      {selectedEmployer && (
        <Dialog open={showEmployerDetailsDialog} onOpenChange={setShowEmployerDetailsDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Employer Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected employer
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-2xl">
                    <Building className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold">{selectedEmployer.name}</h3>
                    {selectedEmployer.verified && (
                      <Badge className="ml-2 bg-blue-100 text-blue-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                    {selectedEmployer.featured && (
                      <Badge className="ml-2 bg-amber-100 text-amber-800">
                        <Star className="mr-1 h-3 w-3" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {selectedEmployer.location}
                    </span>
                  </div>
                  <div className="mt-1 text-sm">
                    <span className="flex items-center">
                      <Globe className="mr-1 h-4 w-4" />
                      <a href={selectedEmployer.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {selectedEmployer.website}
                      </a>
                    </span>
                  </div>
                </div>
                <Badge
                  className={
                    selectedEmployer.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : selectedEmployer.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {selectedEmployer.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Company Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Industry</div>
                      <div>{selectedEmployer.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Employee Size</div>
                      <div>{selectedEmployer.employees}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Date Joined</div>
                      <div>{formatDate(selectedEmployer.dateJoined)}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Jobs Posted</div>
                      <div>{selectedEmployer.jobsPosted}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Primary Contact</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Name</div>
                      <div className="flex items-center">
                        <User className="mr-1 h-4 w-4" />
                        {selectedEmployer.primaryContact?.name || 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Email</div>
                      <div className="flex items-center">
                        <Mail className="mr-1 h-4 w-4" />
                        {selectedEmployer.primaryContact?.email || 'Not provided'}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Phone</div>
                      <div className="flex items-center">
                        <Phone className="mr-1 h-4 w-4" />
                        {selectedEmployer.primaryContact?.phone || 'Not provided'}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Recent Jobs</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedEmployer.jobsPosted > 0 ? (
                    <div className="text-sm">
                      This employer has {selectedEmployer.jobsPosted} active job postings. 
                      Click the button below to view all jobs posted by this employer.
                    </div>
                  ) : (
                    <div className="text-sm">This employer has not posted any jobs yet.</div>
                  )}
                </CardContent>
                <CardFooter>
                  {selectedEmployer.jobsPosted > 0 && (
                    <Button variant="outline" size="sm">
                      <Briefcase className="mr-2 h-4 w-4" />
                      View All Jobs
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
            <DialogFooter className="flex-col sm:flex-row sm:justify-between sm:space-x-2">
              <Button variant="outline" onClick={() => setShowEmployerDetailsDialog(false)}>
                Close
              </Button>
              <div className="flex space-x-2 mt-3 sm:mt-0">
                <Button variant="outline">
                  <UserCheck className="mr-2 h-4 w-4" />
                  {selectedEmployer.verified ? 'Remove Verification' : 'Verify Employer'}
                </Button>
                <Button>
                  <Pencil className="mr-2 h-4 w-4" />
                  Edit Employer
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Missing import
import { Mail, Phone } from 'lucide-react'
