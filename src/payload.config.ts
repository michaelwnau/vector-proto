import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Veterans } from './collections/Veterans'
import { Jobs } from './collections/Jobs'
import { Employers } from './collections/Employers'
import { JobFairs } from './collections/JobFairs'
import { BreakoutSessions } from './collections/BreakoutSessions'
import { VectorData } from './collections/VectorData'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users, 
    Media, 
    Veterans, 
    Jobs, 
    Employers, 
    JobFairs, 
    BreakoutSessions, 
    VectorData
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || '',
  }),
  plugins: [],
})
