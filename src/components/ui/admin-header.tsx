
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Bell, 
  Menu, 
  Search, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  RefreshCw,
  UserCog
} from 'lucide-react'
import { ModeToggle } from './mode-toggle'

interface AdminHeaderProps {
  className?: string
  onSidebarToggle: () => void
  user?: {
    fullName?: string
    email: string
  }
}

export function AdminHeader({ className, onSidebarToggle, user }: AdminHeaderProps) {
  return (
    <header className={cn("flex h-16 items-center px-4 lg:px-6 border-b gap-4 w-full", className)}>
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onSidebarToggle}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search..."
          className="w-full bg-background pl-8 h-9 rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          asChild
          prefetch={false}
          className="rounded-full"
        >
          <Link href="/admin/sync" title="Sync with External API">
            <RefreshCw className="h-4 w-4" />
            <span className="sr-only">Sync with API</span>
          </Link>
        </Button>
        
        <ModeToggle />
        
        <Button variant="outline" size="icon" className="rounded-full">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                {/* Remove image source to use the fallback instead */}
                <AvatarFallback>{user?.fullName?.charAt(0) || user?.email?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.fullName || 'Admin User'}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email || 'admin@example.com'}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin-dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin/collections/users">
                <UserCog className="mr-2 h-4 w-4" />
                <span>User Management</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
