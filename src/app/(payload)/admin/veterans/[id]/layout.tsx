// (payload)/admin/veterans/[id]/layout.tsx
// Give the detail view the same surface classes that the rest of the admin uses.
export default function VeteranDetailLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="mx-auto w-full max-w-5xl">{children}</div>
    </div>
  )
}
