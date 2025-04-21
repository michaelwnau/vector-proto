// Layout file to allow proper routing with server components
export default function JobsOverviewLayout({
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