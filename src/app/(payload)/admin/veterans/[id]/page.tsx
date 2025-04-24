import { getPayload } from 'payload'
import config from '@payload-config'
import { format } from 'date-fns'
import { notFound } from 'next/navigation'
import type { Veteran, VeteranActivity } from '@/payload-types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default async function VeteranDetail({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config: await config })

  const veteran = (await payload
    .findByID({ collection: 'veterans', id: params.id })
    .catch(() => null)) as Veteran | null

  if (!veteran) return notFound()

  const activitiesRes = await payload.find({
    collection: 'veteran-activities',
    where: { veteran: { equals: params.id } },
    sort: '-timestamp',
    depth: 1,
  })

  const activities = activitiesRes.docs as VeteranActivity[]

  return (
    <div className="veteran-detail p-6">
      <h1 className="text-2xl font-bold mb-4">{veteran.fullName} - Profile</h1>
      <p className="mb-1">
        <strong>Email:</strong> {veteran.email}
      </p>
      <p className="mb-4">
        <strong>Status:</strong> {veteran.status}
      </p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Interaction History</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <TableCell colSpan={4} className="text-center italic text-gray-500">
                    No activities logged.
                  </TableCell>
                </TableRow>
              ) : (
                activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{format(new Date(activity.timestamp), 'PPP')}</TableCell>
                    <TableCell>{activity.activityType}</TableCell>
                    <TableCell>{activity.notes || '-'}</TableCell>
                    <TableCell>
                      {typeof activity.user === 'object' ? activity.user.fullName : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Link href="/admin/collections/veterans" className="text-blue-600 hover:underline">
          ← Back to Veterans List
        </Link>
      </div>
    </div>
  )
}
