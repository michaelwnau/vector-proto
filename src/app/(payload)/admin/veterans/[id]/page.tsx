import React from 'react'
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default async function VeteranDetail({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config: await config })

  const veteran = (await payload
    .findByID({ collection: 'veterans', id: params.id })
    .catch(() => null)) as Veteran | null

  if (!veteran) return notFound()

  // Fetch veteran activities in chronological order
  const activitiesRes = await payload.find({
    collection: 'veteran-activities',
    where: { veteran: { equals: params.id } },
    sort: 'timestamp', // ascending chronological order
    depth: 1,
  })

  const activities = activitiesRes.docs as VeteranActivity[]

  return (
    <div className="veteran-detail p-6">
      <h1 className="text-2xl font-bold">{veteran.fullName}</h1>
      <Tabs defaultValue="profile" className="mt-4">
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <p className="mb-1">
            <strong>Email:</strong> {veteran.email}
          </p>
          <p>
            <strong>Status:</strong> {veteran.status}
          </p>
        </TabsContent>
        <TabsContent value="activities">
          <Card>
            <CardHeader>
              <CardTitle>Activities</CardTitle>
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
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Link href="/admin/collections/veterans" className="text-blue-600 hover:underline">
          ← Back to Veterans List
        </Link>
      </div>
    </div>
  )
}
