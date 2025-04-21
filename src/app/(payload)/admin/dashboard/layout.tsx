// We need a layout file to allow the custom dashboard to work with Next.js routing
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      {children}
    </div>
  )
}