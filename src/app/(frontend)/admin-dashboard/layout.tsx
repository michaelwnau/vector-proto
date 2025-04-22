import React from 'react'
// Styles are loaded via the root layout's styles.css; no additional CSS imports needed

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gray-100 p-4 border-b">
        <h1 className="text-xl font-bold">Vector Admin Dashboard</h1>
      </header>
      
      <div className="flex">
        <nav className="w-64 bg-gray-50 p-4 border-r min-h-screen">
          <ul className="space-y-2">
            <li><a href="/admin-dashboard" className="block p-2 hover:bg-gray-200 rounded">Dashboard</a></li>
            <li><a href="/admin-dashboard/analytics" className="block p-2 hover:bg-gray-200 rounded">Analytics</a></li>
            <li><a href="/admin-dashboard/users" className="block p-2 hover:bg-gray-200 rounded">Users</a></li>
            <li><a href="/admin-dashboard/jobs" className="block p-2 hover:bg-gray-200 rounded">Jobs</a></li>
            <li><a href="/admin-dashboard/employers" className="block p-2 hover:bg-gray-200 rounded">Employers</a></li>
            <li><a href="/admin-dashboard/vector-data" className="block p-2 hover:bg-gray-200 rounded">Vector Data</a></li>
            <li><a href="/admin-dashboard/settings" className="block p-2 hover:bg-gray-200 rounded">Settings</a></li>
          </ul>
        </nav>
        
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  )
}
