'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface AddVeteranActivityProps {
  veteranId: string
  userId: string
}

export default function AddVeteranActivity({ veteranId, userId }: AddVeteranActivityProps) {
  const { register, handleSubmit, reset } = useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (data: any) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/veteran-activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          veteran_id: veteranId,
          user_id: userId,
          activity_type: data.activityType,
          notes: data.notes,
          timestamp: new Date().toISOString(),
          source: 'admin-ui',
        }),
      })
      if (!res.ok) throw new Error('Failed to create activity')
      reset()
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border rounded p-4 mt-6 bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Log New Activity</h3>

      <label className="block text-sm mb-1">Activity Type</label>
      <select {...register('activityType')} className="w-full border px-2 py-1 rounded mb-3">
        <option value="">Select...</option>
        <option value="Counselor Appointment">Counselor Appointment</option>
        <option value="Resume Review">Resume Review</option>
        <option value="Interview Coaching">Interview Coaching</option>
        <option value="Employer Follow-Up">Employer Follow-Up</option>
        <option value="Job Fair Participation">Job Fair Participation</option>
        <option value="Employment Verification">Employment Verification</option>
        <option value="Program Exit Interview">Program Exit Interview</option>
        <option value="Other">Other</option>
      </select>

      <label className="block text-sm mb-1">Notes</label>
      <Textarea {...register('notes')} rows={3} className="w-full mb-4" />

      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Activity'}
      </Button>
    </form>
  )
}
