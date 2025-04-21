import { CollectionConfig, Where } from 'payload'

export const VectorData: CollectionConfig = {
  slug: 'vector-data',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'createdAt'],
  },
  access: {
    read: ({ req }) => req.user?.role === 'admin' || req.user?.role === 'counselor',
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'vector_data',
      type: 'array',
      fields: [
        {
          name: 'value',
          type: 'number',
        },
      ],
    },
    {
      name: 'linked_resource_type',
      type: 'select',
      options: [
        { label: 'Job', value: 'jobs' },
        { label: 'Employer', value: 'employers' },
        { label: 'Veteran', value: 'veterans' },
      ],
    },
    {
      name: 'linked_resource_id',
      type: 'text',
      admin: {
        description: 'ID of the linked resource',
      },
    },
    {
      name: 'external_id',
      type: 'text',
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