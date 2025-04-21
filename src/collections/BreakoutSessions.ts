import { CollectionConfig, Where } from 'payload'

export const BreakoutSessions: CollectionConfig = {
  slug: 'breakout-sessions',
  admin: {
    useAsTitle: 'topic',
    defaultColumns: ['topic', 'leader', 'is_active', 'job_fair', 'createdAt'],
  },
  access: {
    read: () => true, // All authenticated users can read breakout sessions
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
      name: 'topic',
      type: 'text',
      required: true,
    },
    {
      name: 'leader',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'job_fair',
      type: 'relationship',
      relationTo: 'job-fairs',
      required: true,
    },
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'users',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'session_date',
      type: 'date',
    },
    {
      name: 'session_time',
      type: 'text',
    },
    {
      name: 'external_id',
      type: 'number',
      admin: {
        description: 'ID from the external API',
      },
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