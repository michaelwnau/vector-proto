import { CollectionConfig, Where } from 'payload'

export const Employers: CollectionConfig = {
  slug: 'employers',
  admin: {
    useAsTitle: 'company_name',
    defaultColumns: ['company_name', 'is_active', 'createdAt'],
  },
  access: {
    read: () => true, // All authenticated users can read employers
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
      name: 'company_name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'is_active',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'user_likes',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
    },
    {
      name: 'job_fairs',
      type: 'relationship',
      relationTo: 'job-fairs',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
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