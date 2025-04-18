import { CollectionConfig, Where } from 'payload'

export const Veterans: CollectionConfig = {
  slug: 'veterans',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'status', 'counselor', 'updatedAt'],
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      if (req.user?.role === 'counselor') {
        return {
          and: [
            {
              counselor: {
                equals: req.user.id,
              },
            },
          ],
        } as Where
      }

      if (req.user?.role === 'veteran') {
        return {
          and: [
            {
              user: {
                equals: req.user.id,
              },
            },
          ],
        } as Where
      }

      return false
    },
    create: ({ req }) => req.user?.role === 'admin',

    update: ({ req }) => {
      if (req.user?.role === 'admin') {
        return true
      }

      if (req.user?.role === 'counselor') {
        return {
          and: [
            {
              counselor: {
                equals: req.user.id,
              },
            },
          ],
        } as Where
      }

      if (req.user?.role === 'veteran') {
        return {
          and: [
            {
              user: {
                equals: req.user.id,
              },
            },
          ],
        } as Where
      }

      return false
    },
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'serviceBranch',
      type: 'select',
      options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard', 'Space Force'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: ['Assessment', 'Training', 'Job Search', 'Employed', 'Graduated'],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'issuer',
          type: 'text',
        },
        {
          name: 'dateReceived',
          type: 'date',
        },
      ],
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'institution',
          type: 'text',
        },
        {
          name: 'degree',
          type: 'text',
        },
        {
          name: 'fieldOfStudy',
          type: 'text',
        },
        {
          name: 'graduationYear',
          type: 'number',
        },
      ],
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'counselor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'user', // Relationship to the User record (to link back to authenticated veteran)
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
