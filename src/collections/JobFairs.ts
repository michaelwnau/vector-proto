import { CollectionConfig, Where } from 'payload'

export const JobFairs: CollectionConfig = {
  slug: 'job-fairs',
  admin: {
    useAsTitle: 'description',
    defaultColumns: ['description', 'fair_date', 'createdAt'],
  },
  access: {
    read: () => true, // All authenticated users can read job fairs
    create: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'counselor',
    update: ({ req }) => {
      if (req.user?.role === 'admin' || req.user?.role === 'counselor') {
        return true
      }
      return false
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'fair_date',
      type: 'date',
      required: true,
    },
    {
      name: 'users',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'employers',
      type: 'relationship',
      relationTo: 'employers',
      hasMany: true,
    },
    {
      name: 'external_id',
      type: 'number',
      admin: {
        description: 'ID from the external API',
      },
    },
    {
      name: 'location',
      type: 'text',
    },
    {
      name: 'virtual_link',
      type: 'text',
    },
    // Fields for tracking synchronization with external API
    {
      name: 'api_sync',
      type: 'group',
      admin: {
        description: 'API synchronization information',
        condition: (data, siblingData) => data?.role === 'admin',
      },
      fields: [
        {
          name: 'last_synced',
          type: 'date',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'sync_source',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Update the API sync info when changed through the admin
        return {
          ...data,
          api_sync: {
            ...data.api_sync,
            last_synced: new Date(),
            sync_source: 'manual',
          },
        }
      },
    ],
  },
}