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
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import {
  AlertCircle,
  BarChart3,
  BrainCircuit,
  ChevronRight,
  Clock,
  Database,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Layers,
  LineChart,
  Play,
  Plus,
  RefreshCcw,
  Search,
  Settings,
  Terminal,
  Upload,
  X,
  Zap,
} from 'lucide-react'

// Mock data for vector collections
const mockVectorCollections = [
  {
    id: '1',
    name: 'Resume Embeddings',
    description: 'Vector embeddings of all veteran resumes',
    documentCount: 924,
    vectorDimensions: 1536,
    model: 'text-embedding-3-large',
    lastUpdated: '2025-04-21T08:15:30',
    status: 'active',
    size: '128MB',
    similarity: 'cosine',
    indexType: 'HNSW',
  },
  {
    id: '2',
    name: 'Job Descriptions',
    description: 'Vector embeddings of all job listings',
    documentCount: 678,
    vectorDimensions: 1536,
    model: 'text-embedding-3-large',
    lastUpdated: '2025-04-21T09:30:45',
    status: 'active',
    size: '96MB',
    similarity: 'cosine',
    indexType: 'HNSW',
  },
  {
    id: '3',
    name: 'Skill Taxonomy',
    description: 'Structured skill database with vector representations',
    documentCount: 2450,
    vectorDimensions: 768,
    model: 'text-embedding-3-small',
    lastUpdated: '2025-04-15T14:20:10',
    status: 'active',
    size: '45MB',
    similarity: 'dot-product',
    indexType: 'FLAT',
  },
  {
    id: '4',
    name: 'Company Profiles',
    description: 'Vector embeddings of company descriptions and cultures',
    documentCount: 48,
    vectorDimensions: 1536,
    model: 'text-embedding-3-large',
    lastUpdated: '2025-04-10T11:45:20',
    status: 'active',
    size: '12MB',
    similarity: 'cosine',
    indexType: 'HNSW',
  },
  {
    id: '5',
    name: 'Training Data',
    description: 'Vector embeddings for model fine-tuning',
    documentCount: 15000,
    vectorDimensions: 1536,
    model: 'text-embedding-3-large',
    lastUpdated: '2025-03-30T16:40:15',
    status: 'inactive',
    size: '350MB',
    similarity: 'cosine',
    indexType: 'HNSW',
  },
]

// Mock data for recent vector operations
const mockVectorOperations = [
  {
    id: '1',
    operation: 'Index Update',
    collection: 'Resume Embeddings',
    status: 'success',
    timestamp: '2025-04-21T08:15:30',
    duration: '45s',
    documentsProcessed: 32,
    details: 'Added 32 new resume embeddings to the index',
  },
  {
    id: '2',
    operation: 'Vector Search',
    collection: 'Job Descriptions',
    status: 'success',
    timestamp: '2025-04-21T09:25:12',
    duration: '0.2s',
    documentsProcessed: 1,
    details: 'Job matching query for user_id=12345',
  },
  {
    id: '3',
    operation: 'Reindex',
    collection: 'Skill Taxonomy',
    status: 'success',
    timestamp: '2025-04-15T14:20:10',
    duration: '125s',
    documentsProcessed: 2450,
    details: 'Full reindex of skill taxonomy after model update',
  },
  {
    id: '4',
    operation: 'Vector Deletion',
    collection: 'Resume Embeddings',
    status: 'success',
    timestamp: '2025-04-14T11:30:45',
    duration: '3s',
    documentsProcessed: 5,
    details: 'Removed 5 outdated resume embeddings',
  },
  {
    id: '5',
    operation: 'Model Change',
    collection: 'Training Data',
    status: 'failed',
    timestamp: '2025-04-05T15:10:25',
    duration: '350s',
    documentsProcessed: 10250,
    details: 'Failed to update all embeddings - insufficient memory',
  },
]

// Mock data for system metrics
const mockSystemMetrics = {
  vectorDbStatus: 'healthy',
  apiStatus: 'healthy',
  indexerStatus: 'healthy',
  memoryUsage: 72, // percentage
  cpuUsage: 45, // percentage
  totalVectors: 19100,
  totalCollections: 5,
  averageQueryTime: '15ms',
  totalQueriesLast24h: 2542,
  totalUpdatesLast24h: 128,
}

export default function VectorDataPage() {
  const [collections, setCollections] = useState(mockVectorCollections)
  const [operations, setOperations] = useState(mockVectorOperations)
  const [selectedTab, setSelectedTab] = useState('collections')
  const [searchTerm, setSearchTerm] = useState('')
  const [showCollectionDetailsDialog, setShowCollectionDetailsDialog] = useState(false)
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [showQueryTestDialog, setShowQueryTestDialog] = useState(false)
  const [queryInput, setQueryInput] = useState('')
  const [selectedModel, setSelectedModel] = useState('text-embedding-3-large')
  
  // Function to view collection details
  const viewCollectionDetails = (collection) => {
    setSelectedCollection(collection)
    setShowCollectionDetailsDialog(true)
  }
  
  // Function to open query test dialog
  const openQueryTestDialog = () => {
    setShowQueryTestDialog(true)
  }
  
  // Function to search collections
  const filteredCollections = collections.filter(collection => {
    if (
      searchTerm &&
      !collection.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !collection.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }
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
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vector Data</h1>
          <p className="text-muted-foreground">
            Manage vector embeddings and matching algorithms.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button onClick={openQueryTestDialog} variant="outline">
            <Terminal className="mr-2 h-4 w-4" />
            Test Query
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Collection
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemMetrics.totalVectors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Across {mockSystemMetrics.totalCollections} collections
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSystemMetrics.averageQueryTime}</div>
            <p className="text-xs text-muted-foreground">
              Average query time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">System Status</CardTitle>
              <Badge 
                className={
                  mockSystemMetrics.vectorDbStatus === 'healthy'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }
              >
                {mockSystemMetrics.vectorDbStatus === 'healthy' ? 'Healthy' : 'Issues Detected'}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Memory Usage</span>
              <span>{mockSystemMetrics.memoryUsage}%</span>
            </div>
            <Progress value={mockSystemMetrics.memoryUsage} className="h-2" />
            
            <div className="flex justify-between items-center text-sm">
              <span>CPU Usage</span>
              <span>{mockSystemMetrics.cpuUsage}%</span>
            </div>
            <Progress value={mockSystemMetrics.cpuUsage} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="collections">
            <Database className="mr-2 h-4 w-4" />
            Collections
          </TabsTrigger>
          <TabsTrigger value="operations">
            <Clock className="mr-2 h-4 w-4" />
            Recent Operations
          </TabsTrigger>
          <TabsTrigger value="metrics">
            <BarChart3 className="mr-2 h-4 w-4" />
            Performance Metrics
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Configuration
          </TabsTrigger>
        </TabsList>
        
        {/* Collections Tab */}
        <TabsContent value="collections" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <CardTitle>Vector Collections</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search collections..."
                      className="w-full pl-8 md:w-[250px]"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Refresh
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Collection</TableHead>
                    <TableHead>Dimensions</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCollections.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="h-24 text-center">
                        No collections found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredCollections.map(collection => (
                      <TableRow key={collection.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{collection.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {collection.description}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{collection.vectorDimensions}</TableCell>
                        <TableCell>{collection.documentCount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {collection.model}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatDate(collection.lastUpdated)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              collection.status === 'active'
                                ? 'bg-green-100 text-green-800 hover:bg-green-100'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-100'
                            }
                          >
                            {collection.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => viewCollectionDetails(collection)}>
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Operations Tab */}
        <TabsContent value="operations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Vector Operations</CardTitle>
              <CardDescription>
                History of vector operations performed on the system
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Operation</TableHead>
                    <TableHead>Collection</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {operations.map(op => (
                    <TableRow key={op.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{op.operation}</span>
                          <span className="text-xs text-muted-foreground">
                            {op.details}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{op.collection}</TableCell>
                      <TableCell>{formatDate(op.timestamp)}</TableCell>
                      <TableCell>{op.duration}</TableCell>
                      <TableCell>{op.documentsProcessed.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            op.status === 'success'
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                          }
                        >
                          {op.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between py-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Log
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full History
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Vector database performance and usage statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] w-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <LineChart className="h-12 w-12 mx-auto text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Performance metrics chart will render here
                </p>
                <div className="flex justify-center space-x-4 text-sm">
                  <div className="text-center">
                    <div className="font-bold">{mockSystemMetrics.totalQueriesLast24h.toLocaleString()}</div>
                    <div className="text-muted-foreground">Queries (24h)</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{mockSystemMetrics.totalUpdatesLast24h.toLocaleString()}</div>
                    <div className="text-muted-foreground">Updates (24h)</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold">{mockSystemMetrics.averageQueryTime}</div>
                    <div className="text-muted-foreground">Avg. Response</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>
                  Current status of vector database components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Database className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Vector Database</span>
                    </div>
                    <Badge 
                      className={
                        mockSystemMetrics.vectorDbStatus === 'healthy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {mockSystemMetrics.vectorDbStatus}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>API Service</span>
                    </div>
                    <Badge 
                      className={
                        mockSystemMetrics.apiStatus === 'healthy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {mockSystemMetrics.apiStatus}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Layers className="mr-2 h-5 w-5 text-muted-foreground" />
                      <span>Indexer Service</span>
                    </div>
                    <Badge 
                      className={
                        mockSystemMetrics.indexerStatus === 'healthy'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {mockSystemMetrics.indexerStatus}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Resource Usage</CardTitle>
                <CardDescription>
                  System resource consumption
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Memory Usage</span>
                    <span>{mockSystemMetrics.memoryUsage}%</span>
                  </div>
                  <Progress value={mockSystemMetrics.memoryUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>CPU Usage</span>
                    <span>{mockSystemMetrics.cpuUsage}%</span>
                  </div>
                  <Progress value={mockSystemMetrics.cpuUsage} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span>Storage</span>
                    <span>628MB</span>
                  </div>
                  <div className="flex gap-1 h-2">
                    <div className="bg-blue-500 h-full rounded-l-full" style={{ width: '45%' }}></div>
                    <div className="bg-amber-500 h-full" style={{ width: '25%' }}></div>
                    <div className="bg-green-500 h-full" style={{ width: '15%' }}></div>
                    <div className="bg-purple-500 h-full" style={{ width: '12%' }}></div>
                    <div className="bg-gray-300 h-full rounded-r-full" style={{ width: '3%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Resume Embeddings</span>
                    <span>Job Descriptions</span>
                    <span>Other</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vector Database Configuration</CardTitle>
              <CardDescription>
                Configure vector database settings and parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Default Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultModel">Default Embedding Model</Label>
                    <Select defaultValue="text-embedding-3-large">
                      <SelectTrigger id="defaultModel">
                        <SelectValue placeholder="Select model" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                        <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                        <SelectItem value="custom-domain-embedding">custom-domain-embedding</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultDimensions">Default Vector Dimensions</Label>
                    <Select defaultValue="1536">
                      <SelectTrigger id="defaultDimensions">
                        <SelectValue placeholder="Select dimensions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1536">1536 (Large)</SelectItem>
                        <SelectItem value="768">768 (Medium)</SelectItem>
                        <SelectItem value="384">384 (Small)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="defaultMetric">Default Similarity Metric</Label>
                    <Select defaultValue="cosine">
                      <SelectTrigger id="defaultMetric">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cosine">Cosine Similarity</SelectItem>
                        <SelectItem value="dot-product">Dot Product</SelectItem>
                        <SelectItem value="euclidean">Euclidean Distance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="indexType">Default Index Type</Label>
                    <Select defaultValue="HNSW">
                      <SelectTrigger id="indexType">
                        <SelectValue placeholder="Select index type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HNSW">HNSW (Fast Search)</SelectItem>
                        <SelectItem value="FLAT">FLAT (Exact Search)</SelectItem>
                        <SelectItem value="IVF">IVF (Balanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Query Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxResults">Default Max Results</Label>
                    <Input id="maxResults" type="number" defaultValue="10" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="minScore">Minimum Score Threshold</Label>
                    <Input id="minScore" type="number" defaultValue="0.7" step="0.01" min="0" max="1" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="cacheResults" className="flex flex-1 items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span>Cache Query Results</span>
                  </Label>
                  <Switch id="cacheResults" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="hybridSearch" className="flex flex-1 items-center space-x-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>Enable Hybrid Search (Vector + Keyword)</span>
                  </Label>
                  <Switch id="hybridSearch" defaultChecked />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">System Settings</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxMemory">Maximum Memory Usage (MB)</Label>
                    <Input id="maxMemory" type="number" defaultValue="2048" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxThreads">Maximum Threads</Label>
                    <Input id="maxThreads" type="number" defaultValue="4" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="autoReindex" className="flex flex-1 items-center space-x-2">
                    <RefreshCcw className="h-4 w-4" />
                    <span>Automatic Reindexing</span>
                  </Label>
                  <Switch id="autoReindex" defaultChecked />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Collection Details Dialog */}
      {selectedCollection && (
        <Dialog open={showCollectionDetailsDialog} onOpenChange={setShowCollectionDetailsDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Collection Details</DialogTitle>
              <DialogDescription>
                Detailed information about the vector collection
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold flex items-center">
                  <Database className="mr-2 h-5 w-5" />
                  {selectedCollection.name}
                </h3>
                <Badge
                  className={
                    selectedCollection.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }
                >
                  {selectedCollection.status}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground">
                {selectedCollection.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Collection Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Document Count</div>
                      <div>{selectedCollection.documentCount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Vector Dimensions</div>
                      <div>{selectedCollection.vectorDimensions}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Size</div>
                      <div>{selectedCollection.size}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Last Updated</div>
                      <div>{formatDate(selectedCollection.lastUpdated)}</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Vector Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Embedding Model</div>
                      <div>{selectedCollection.model}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Similarity Metric</div>
                      <div>{selectedCollection.similarity}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Index Type</div>
                      <div>{selectedCollection.indexType}</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-muted-foreground">Status</div>
                      <div>{selectedCollection.status}</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" size="sm" className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Query
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <RefreshCcw className="mr-2 h-4 w-4" />
                    Reindex
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Import
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </CardContent>
              </Card>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCollectionDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Query Test Dialog */}
      <Dialog open={showQueryTestDialog} onOpenChange={setShowQueryTestDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Test Vector Query</DialogTitle>
            <DialogDescription>
              Run a test query against vector collections
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="queryText">Query Text</Label>
              <Textarea
                id="queryText"
                placeholder="Enter your query text here..."
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="queryCollection">Collection</Label>
                <Select defaultValue="1">
                  <SelectTrigger id="queryCollection">
                    <SelectValue placeholder="Select collection" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map(collection => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="queryModel">Embedding Model</Label>
                <Select 
                  value={selectedModel} 
                  onValueChange={setSelectedModel}
                >
                  <SelectTrigger id="queryModel">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-embedding-3-large">text-embedding-3-large</SelectItem>
                    <SelectItem value="text-embedding-3-small">text-embedding-3-small</SelectItem>
                    <SelectItem value="custom-domain-embedding">custom-domain-embedding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topK">Top K Results</Label>
                <Input id="topK" type="number" defaultValue="5" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minScore">Min Score Threshold</Label>
                <Input id="minScore" type="number" defaultValue="0.7" step="0.01" min="0" max="1" />
              </div>
            </div>
            
            <div className="rounded-md border border-muted p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  This is a test environment. Queries will not affect production data.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowQueryTestDialog(false)}>
              Cancel
            </Button>
            <Button>Run Query</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
