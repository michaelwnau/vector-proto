// Layout file to allow proper routing with server components
export default function EmployersOverviewLayout({
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