import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7 * 24 * 60 * 60, // 1 week in seconds
    verify: false,
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000, // 15 minutes
    useAPIKey: false,
    depth: 0,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'role', 'fullName'],
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return {
        id: {
          equals: req.user?.id,
        },
      }
    },
    update: ({ req }) => {
      if (req.user?.role === 'admin') return true
      return {
        id: {
          equals: req.user?.id,
        },
      }
    },
    delete: ({ req }) => req.user?.role === 'admin',
    // Allow public creation of users (anyone can register)
    create: () => true,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'counselor',
      options: [
        {
          label: 'Counselor',
          value: 'counselor',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Veteran',
          value: 'veteran',
        },
        {
          label: 'Employer',
          value: 'employer',
        },
      ],
      // Allow all authenticated users to update role
      access: {
        update: () => true,
      },
    },
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'external_id',
      type: 'number',
      admin: {
        description: 'ID from the external API',
      },
    },
    {
      name: 'breakout_sessions',
      type: 'relationship',
      relationTo: 'breakout-sessions',
      hasMany: true,
    },
    {
      name: 'employers',
      type: 'relationship',
      relationTo: 'employers',
      hasMany: true,
    },
    {
      name: 'job_fairs',
      type: 'relationship',
      relationTo: 'job-fairs',
      hasMany: true,
    },
    {
      name: 'saved_jobs',
      type: 'relationship',
      relationTo: 'jobs',
      hasMany: true,
    },
    {
      name: 'applied_jobs',
      type: 'relationship',
      relationTo: 'jobs',
      hasMany: true,
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
        if (data.api_sync) {
          return {
            ...data,
            api_sync: {
              ...data.api_sync,
              last_synced: new Date(),
              sync_source: 'manual',
            },
          }
        }
        return data
      },
    ],
  },
}
