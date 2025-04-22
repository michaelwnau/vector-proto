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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  RefreshCcw,
  Download,
  UserCog,
  Mail,
  UserPlus,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Trash2,
} from 'lucide-react'

// Mock data for users
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'veteran',
    status: 'active',
    lastActive: '2025-04-21T14:48:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-01-15T09:30:00',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@company.org',
    role: 'employer',
    status: 'active',
    lastActive: '2025-04-20T10:23:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-02-03T14:15:00',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@veterans.org',
    role: 'admin',
    status: 'active',
    lastActive: '2025-04-22T08:05:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-01-05T11:45:00',
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    role: 'veteran',
    status: 'pending',
    lastActive: null,
    verified: false,
    profileComplete: false,
    dateJoined: '2025-04-19T15:30:00',
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@recruiters.com',
    role: 'employer',
    status: 'inactive',
    lastActive: '2025-03-10T16:42:00',
    verified: true,
    profileComplete: false,
    dateJoined: '2025-03-01T10:20:00',
  },
  {
    id: '6',
    name: 'Sarah Davis',
    email: 'sarah.d@example.com',
    role: 'veteran',
    status: 'active',
    lastActive: '2025-04-21T11:23:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-02-14T09:15:00',
  },
  {
    id: '7',
    name: 'James Wilson',
    email: 'james@hiringfirm.com',
    role: 'employer',
    status: 'active',
    lastActive: '2025-04-18T14:30:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-01-20T13:45:00',
  },
  {
    id: '8',
    name: 'Jessica Miller',
    email: 'jessica@example.com',
    role: 'veteran',
    status: 'suspended',
    lastActive: '2025-03-15T10:20:00',
    verified: true,
    profileComplete: true,
    dateJoined: '2025-02-25T16:30:00',
  },
]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [selectedTab, setSelectedTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showNewUserDialog, setShowNewUserDialog] = useState(false)

  // Filter users based on selected tab, search term, role, and status
  const filteredUsers = users.filter(user => {
    // Filter by tab
    if (selectedTab === 'verified' && !user.verified) return false
    if (selectedTab === 'pending' && user.status !== 'pending') return false
    if (selectedTab === 'suspended' && user.status !== 'suspended') return false

    // Filter by search term
    if (
      searchTerm &&
      !user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by role
    if (selectedRole !== 'all' && user.role !== selectedRole) return false

    // Filter by status
    if (selectedStatus !== 'all' && user.status !== selectedStatus) return false

    return true
  })

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Never'
    
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Function to toggle user status
  const toggleUserStatus = (userId, newStatus) => {
    setUsers(
      users.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage user accounts, roles, and permissions.
          </p>
        </div>
        
        <Button onClick={() => setShowNewUserDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="space-y-4">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
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
                  <CardTitle>User Management</CardTitle>
                  <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search users..."
                        className="w-full pl-8 md:w-[200px] lg:w-[300px]"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <Select value={selectedRole} onValueChange={setSelectedRole}>
                      <SelectTrigger className="w-[160px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="veteran">Veteran</SelectItem>
                        <SelectItem value="employer">Employer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                      <SelectTrigger className="w-[180px]">
                        <Filter className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map(user => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium">{user.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {user.email}
                                </span>
                              </div>
                              {user.verified && (
                                <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 hover:bg-blue-50">
                                  <ShieldCheck className="mr-1 h-3 w-3" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === 'admin'
                                  ? 'bg-purple-50 text-purple-700 hover:bg-purple-50'
                                  : user.role === 'veteran'
                                  ? 'bg-green-50 text-green-700 hover:bg-green-50'
                                  : 'bg-orange-50 text-orange-700 hover:bg-orange-50'
                              }
                            >
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
                                  : user.status === 'suspended'
                                  ? 'bg-red-100 text-red-800 hover:bg-red-100'
                                  : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(user.dateJoined)}</TableCell>
                          <TableCell>{formatDate(user.lastActive)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>
                                  <UserCog className="mr-2 h-4 w-4" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === 'active' ? (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user.id, 'inactive')}>
                                    <Lock className="mr-2 h-4 w-4" />
                                    Deactivate
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user.id, 'active')}>
                                    <Unlock className="mr-2 h-4 w-4" />
                                    Activate
                                  </DropdownMenuItem>
                                )}
                                {user.status === 'suspended' ? (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user.id, 'active')}>
                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                    Remove Suspension
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => toggleUserStatus(user.id, 'suspended')}>
                                    <ShieldAlert className="mr-2 h-4 w-4" />
                                    Suspend User
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete User
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

      {/* Add New User Dialog */}
      <Dialog open={showNewUserDialog} onOpenChange={setShowNewUserDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new user account. Users will receive an email to set their password.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" placeholder="Full name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input id="email" type="email" placeholder="email@example.com" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select defaultValue="veteran">
                <SelectTrigger id="role" className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="veteran">Veteran</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <div className="col-span-4 flex items-center space-x-2">
                <Checkbox id="verified" />
                <label
                  htmlFor="verified"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as verified (skip verification email)
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewUserDialog(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowNewUserDialog(false)}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
