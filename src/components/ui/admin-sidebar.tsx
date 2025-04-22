
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  BarChart3,
  Users,
  Briefcase,
  Building2,
  CalendarDays,
  Settings,
  LogOut,
  Home,
  LayoutDashboard,
  FileText,
  Layers,
  Database,
  GraduationCap
} from 'lucide-react'

interface AdminSidebarProps {
  className?: string
}

export function AdminSidebar({ className }: AdminSidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin-dashboard',
      active: pathname === '/admin-dashboard',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/admin-dashboard/analytics',
      active: pathname === '/admin-dashboard/analytics',
    },
    {
      label: 'Users',
      icon: Users,
      href: '/admin-dashboard/users',
      active: pathname === '/admin-dashboard/users',
    },
    {
      label: 'Veterans',
      icon: GraduationCap,
      href: '/admin-dashboard/veterans',
      active: pathname === '/admin-dashboard/veterans',
    },
    {
      label: 'Jobs',
      icon: Briefcase,
      href: '/admin-dashboard/jobs',
      active: pathname === '/admin-dashboard/jobs',
    },
    {
      label: 'Employers',
      icon: Building2,
      href: '/admin-dashboard/employers',
      active: pathname === '/admin-dashboard/employers',
    },
    {
      label: 'Job Fairs',
      icon: CalendarDays,
      href: '/admin-dashboard/job-fairs',
      active: pathname === '/admin-dashboard/job-fairs',
    },
    {
      label: 'Documents',
      icon: FileText,
      href: '/admin-dashboard/documents',
      active: pathname === '/admin-dashboard/documents',
    },
    {
      label: 'Vector Data',
      icon: Database,
      href: '/admin-dashboard/vector-data',
      active: pathname === '/admin-dashboard/vector-data',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/admin-dashboard/settings',
      active: pathname === '/admin-dashboard/settings',
    },
  ]

  return (
    <div className={cn("pb-12 border-r border-r-sidebar-border", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="h-6 w-6" />
            <h2 className="text-lg font-semibold tracking-tight">Vector Admin</h2>
          </div>
          <div className="space-y-1">
            <Button
              asChild
              variant="default"
              className="w-full justify-start"
            >
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-start"
            >
              <Link href="/admin">
                <Layers className="mr-2 h-4 w-4" />
                PayloadCMS Admin
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="px-4">
          <h2 className="mb-2 px-2 text-xs font-semibold tracking-tight text-sidebar-foreground/70">
            Admin Navigation
          </h2>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            <div className="space-y-1 px-2">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  asChild
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    route.active ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                  )}
                >
                  <Link href={route.href}>
                    <route.icon className="mr-2 h-4 w-4" />
                    {route.label}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      <div className="px-4 py-4 mt-auto border-t border-t-sidebar-border">
        <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-100/10">
          <LogOut className="mr-2 h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
