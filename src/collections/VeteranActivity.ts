import { CollectionConfig } from 'payload'

const VeteranActivity: CollectionConfig = {
  slug: 'veteran-activities',
  admin: {
    useAsTitle: 'activityType',
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'veteran',
      type: 'relationship',
      relationTo: 'veterans',
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      options: [
        'Counselor Appointment',
        'Resume Review',
        'Interview Prep',
        'Employer Follow-Up',
        'Job Fair Participation',
        'Outcome Verification',
        'Other',
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      required: false,
    },
    {
      name: 'timestamp',
      type: 'date',
      defaultValue: () => new Date(),
      required: true,
    },
  ],
}

export default VeteranActivity
