"use client"

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Database,
  Globe,
  Info,
  Key,
  Lock,
  Mail,
  RefreshCcw,
  Save,
  Server,
  Settings2,
  Upload,
  User,
  Users,
  Zap
} from 'lucide-react'

export default function SettingsPage() {
  const [systemStatus, setSystemStatus] = useState({
    apiStatus: 'online',
    databaseStatus: 'online',
    vectorDbStatus: 'online',
    lastSync: '2025-04-22T08:15:00',
    storageUsed: 68, // percentage
    apiEndpoint: 'https://api.vector-proto.org/v1',
    environment: 'production',
  })

  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'Vector Career Network',
    siteDescription: 'Connecting veterans with employment opportunities',
    contactEmail: 'support@vector-proto.org',
    maxJobsPerEmployer: 25,
    requireEmailVerification: true,
    autoApproveEmployers: false,
    maintenanceMode: false,
    analyticsEnabled: true,
    feedbackEnabled: true,
    maxFileUploadSize: 10, // MB
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.mailprovider.com',
    smtpPort: 587,
    smtpUsername: 'notifications@vector-proto.org',
    smtpPassword: '••••••••••••••••',
    senderName: 'Vector Careers',
    senderEmail: 'no-reply@vector-proto.org',
    enableEmailQueue: true,
    emailBatchSize: 50,
    defaultEmailTemplate: 'modern',
  })

  // Simple form submission handlers
  const handleSaveGeneral = (e) => {
    e.preventDefault()
    // In a real app, would save to API
    console.log('Saving general settings:', generalSettings)
    // Show success message
    alert('General settings saved successfully!')
  }

  const handleSaveEmail = (e) => {
    e.preventDefault()
    // In a real app, would save to API
    console.log('Saving email settings:', emailSettings)
    // Show success message
    alert('Email settings saved successfully!')
  }

  const handleTestEmail = () => {
    // In a real app, would call API to send test email
    alert('Test email sent to ' + emailSettings.senderEmail)
  }
  
  const handleMaintenanceToggle = (checked) => {
    setGeneralSettings({
      ...generalSettings,
      maintenanceMode: checked
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Configure system settings and preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">
            <Settings2 className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="mr-2 h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="mr-2 h-4 w-4" />
            API & Integration
          </TabsTrigger>
          <TabsTrigger value="system">
            <Server className="mr-2 h-4 w-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic system settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSaveGeneral} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalSettings.siteName}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) => setGeneralSettings({...generalSettings, contactEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="maxJobsPerEmployer">Max Jobs Per Employer</Label>
                    <Input
                      id="maxJobsPerEmployer"
                      type="number"
                      value={generalSettings.maxJobsPerEmployer}
                      onChange={(e) => setGeneralSettings({...generalSettings, maxJobsPerEmployer: parseInt(e.target.value)})}
                    />
                    <p className="text-sm text-muted-foreground">
                      Maximum number of job postings allowed per employer account
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">User Preferences</h3>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="requireEmailVerification" className="flex flex-1 items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Require Email Verification</span>
                    </Label>
                    <Switch
                      id="requireEmailVerification"
                      checked={generalSettings.requireEmailVerification}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, requireEmailVerification: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="autoApproveEmployers" className="flex flex-1 items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Auto-Approve Employer Accounts</span>
                    </Label>
                    <Switch
                      id="autoApproveEmployers"
                      checked={generalSettings.autoApproveEmployers}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, autoApproveEmployers: checked})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Settings</h3>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="maintenanceMode" className="flex flex-1 items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span>Maintenance Mode</span>
                    </Label>
                    <Switch
                      id="maintenanceMode"
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={handleMaintenanceToggle}
                    />
                  </div>
                  
                  {generalSettings.maintenanceMode && (
                    <Alert variant="warning" className="bg-yellow-50">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <AlertTitle>Warning</AlertTitle>
                      <AlertDescription>
                        Maintenance mode is active. The site will be inaccessible to regular users.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="analyticsEnabled" className="flex flex-1 items-center space-x-2">
                      <BarChart3 className="h-4 w-4" />
                      <span>Enable Analytics</span>
                    </Label>
                    <Switch
                      id="analyticsEnabled"
                      checked={generalSettings.analyticsEnabled}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, analyticsEnabled: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="feedbackEnabled" className="flex flex-1 items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <span>Enable User Feedback</span>
                    </Label>
                    <Switch
                      id="feedbackEnabled"
                      checked={generalSettings.feedbackEnabled}
                      onCheckedChange={(checked) => setGeneralSettings({...generalSettings, feedbackEnabled: checked})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="maxFileUploadSize">Max File Upload Size (MB)</Label>
                    <Input
                      id="maxFileUploadSize"
                      type="number"
                      value={generalSettings.maxFileUploadSize}
                      onChange={(e) => setGeneralSettings({...generalSettings, maxFileUploadSize: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Reset</Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email">
          <Card>
            <CardHeader>
              <CardTitle>Email Configuration</CardTitle>
              <CardDescription>
                Configure email settings for system notifications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveEmail} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">SMTP Configuration</h3>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input
                      id="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="smtpSecurity">Security</Label>
                      <Select defaultValue="tls">
                        <SelectTrigger id="smtpSecurity">
                          <SelectValue placeholder="Select security" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tls">TLS</SelectItem>
                          <SelectItem value="ssl">SSL</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="smtpUsername">SMTP Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="smtpPassword">SMTP Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Settings</h3>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="defaultEmailTemplate">Default Template</Label>
                    <Select 
                      defaultValue={emailSettings.defaultEmailTemplate}
                      onValueChange={(value) => setEmailSettings({...emailSettings, defaultEmailTemplate: value})}
                    >
                      <SelectTrigger id="defaultEmailTemplate">
                        <SelectValue placeholder="Select template" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="enableEmailQueue" className="flex flex-1 items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Enable Email Queue</span>
                    </Label>
                    <Switch
                      id="enableEmailQueue"
                      checked={emailSettings.enableEmailQueue}
                      onCheckedChange={(checked) => setEmailSettings({...emailSettings, enableEmailQueue: checked})}
                    />
                  </div>
                  
                  {emailSettings.enableEmailQueue && (
                    <div className="grid gap-2">
                      <Label htmlFor="emailBatchSize">Email Batch Size</Label>
                      <Input
                        id="emailBatchSize"
                        type="number"
                        value={emailSettings.emailBatchSize}
                        onChange={(e) => setEmailSettings({...emailSettings, emailBatchSize: parseInt(e.target.value)})}
                      />
                      <p className="text-sm text-muted-foreground">
                        Maximum number of emails to send in a single batch
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={handleTestEmail}>
                    <Mail className="mr-2 h-4 w-4" />
                    Send Test Email
                  </Button>
                  <Button type="submit">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API & Integration Tab */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Configure API settings and external integrations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">API Configuration</h3>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">API Status</h4>
                    <p className="text-sm text-muted-foreground">Current API service status</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    <Check className="mr-1 h-3 w-3" />
                    Active
                  </Badge>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="apiEndpoint">API Endpoint</Label>
                  <div className="flex">
                    <Input
                      id="apiEndpoint"
                      value={systemStatus.apiEndpoint}
                      readOnly
                      className="rounded-r-none"
                    />
                    <Button variant="secondary" className="rounded-l-none">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label>API Keys</Label>
                  <div className="rounded-md border border-border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Production Key</h4>
                          <p className="text-sm text-muted-foreground">Last used: 20 minutes ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Key
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Development Key</h4>
                          <p className="text-sm text-muted-foreground">Last used: 2 days ago</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-3 w-3" />
                          View Key
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        <Key className="mr-1 h-3 w-3" />
                        Generate New Key
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">External Integrations</h3>
                
                <div className="rounded-md border border-border divide-y">
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Job Board API</h4>
                        <p className="text-sm text-muted-foreground">External job listing service</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Database className="h-4 w-4 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Vector Database</h4>
                        <p className="text-sm text-muted-foreground">Resume and job matching</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-orange-700" />
                      </div>
                      <div>
                        <h4 className="font-medium">Event Service</h4>
                        <p className="text-sm text-muted-foreground">Job fair and event management</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Integration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                View system status and perform maintenance tasks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Service Status</h3>
                  
                  <div className="rounded-md border border-border divide-y">
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Globe className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">API Service</h4>
                          <p className="text-xs text-muted-foreground">All endpoints operating normally</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Database className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Main Database</h4>
                          <p className="text-xs text-muted-foreground">All operations normal</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Zap className="h-4 w-4 text-green-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Vector Database</h4>
                          <p className="text-xs text-muted-foreground">Matching operations functional</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Online</Badge>
                    </div>
                    
                    <div className="p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Server className="h-4 w-4 text-yellow-700" />
                        </div>
                        <div>
                          <h4 className="font-medium">Job Search Index</h4>
                          <p className="text-xs text-muted-foreground">Re-indexing in progress</p>
                        </div>
                      </div>
                      <Badge className="bg-yellow-100 text-yellow-800">Updating</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">System Information</h3>
                  
                  <div className="rounded-md border border-border p-4 space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Current Environment</div>
                      <div className="font-medium">
                        <Badge className="bg-blue-100 text-blue-800">
                          {systemStatus.environment}
                        </Badge>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Last System Sync</div>
                      <div className="font-medium">
                        {new Date(systemStatus.lastSync).toLocaleString()}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">Storage Usage</div>
                      <div className="mt-2">
                        <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              systemStatus.storageUsed > 90 
                                ? 'bg-red-500' 
                                : systemStatus.storageUsed > 75 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`} 
                            style={{ width: `${systemStatus.storageUsed}%` }}
                          ></div>
                        </div>
                        <div className="mt-1 text-sm">
                          {systemStatus.storageUsed}% of allocated storage used
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-muted-foreground">System Version</div>
                      <div className="font-medium">v2.4.1 (Latest)</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Maintenance</h3>
                
                <div className="rounded-md border border-border p-4 space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Sync External Data</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Synchronize with external job board API.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <RefreshCcw className="mr-2 h-4 w-4" />
                          Run Sync
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Backup Database</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Create a full system backup.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Create Backup
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Rebuild Search Index</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Rebuild job and resume search indices.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <ArrowRight className="mr-2 h-4 w-4" />
                          Start Rebuild
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Clear Caches</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-muted-foreground">
                          Clear system caches and temporary files.
                        </p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Clear All Caches
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <Info className="h-4 w-4 text-blue-600" />
                <AlertTitle>System Information</AlertTitle>
                <AlertDescription>
                  Last database backup was 6 hours ago. Weekly maintenance is scheduled for Sunday at 2:00 AM.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Missing import
import { BarChart3, Copy, Eye, MessageSquare } from 'lucide-react'
