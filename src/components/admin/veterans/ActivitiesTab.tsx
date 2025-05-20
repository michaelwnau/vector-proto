'use client'
import { getPayload } from 'payload'
import { useEffect, useState } from 'react'

function usePayloadAPI(endpoint: string, options: RequestInit) {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, options)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [endpoint, options])

  return { data, isLoading }
}
import { format } from 'date-fns'
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table'
import type { FieldRow as FieldProps } from 'payload'

export default function ActivitiesTab({ doc }: { doc: { id: string } }) {
  const veteranId = doc?.id
  const { data, isLoading } = usePayloadAPI(
    `/api/veteran-activities?where[veteran][equals]=${veteranId}&sort=-timestamp`,
    { method: 'get' },
  )

  if (isLoading) return <p>Loading…</p>
  const activities = data?.docs ?? []

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Activity Type</TableHead>
          <TableHead>Notes</TableHead>
          <TableHead>Logged By</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activities.length === 0 ? (
          <TableRow>
            <TableCell colSpan={4} className="italic text-muted-foreground text-center">
              No activities logged.
            </TableCell>
          </TableRow>
        ) : (
          activities.map((a: any) => (
            <TableRow key={a.id}>
              <TableCell>{format(new Date(a.timestamp), 'PPP')}</TableCell>
              <TableCell>{a.activityType}</TableCell>
              <TableCell>{a.notes ?? '-'}</TableCell>
              <TableCell>{a.user?.fullName ?? 'N/A'}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
