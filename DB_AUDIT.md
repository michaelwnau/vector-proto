 # Database Audit

 This document catalogs all MongoDB-related touchpoints and patterns in the codebase.

 ## 1. Connection Setup
 - **File:** `src/payload.config.ts`
   - Uses `mongooseAdapter` from `@payloadcms/db-mongodb` to connect:
     ```ts
     db: mongooseAdapter({
       url: process.env.MONGODB_URI || ''
     }),
     ```
   - Environment variable: `MONGODB_URI`

 ## 2. Dependencies
 - **package.json**:
   - `@payloadcms/db-mongodb` provides the MongoDB adapter.
   - `payload` (core), indirectly relies on Mongoose via the adapter.

 ## 3. CRUD Operations & Patterns
 ### 3.1 PayloadCMS Direct Database Access
 - **Services:** `src/services/api/jobBoardApiService.ts`
   - Uses `getPayload` and then:
     - `payload.find({ collection: ..., where: ... })`
     - `payload.create({ collection: ..., data: ... })`
     - `payload.update({ collection: ..., id: ..., data: ... })`
     - (No direct `delete` shown, but follows same API.)
   - Vector-specific endpoints:
     - `getVectors()` → GET `/api/v1/vectors`
     - `createVector()` → POST `/api/v1/vectors`

 ### 3.2 Collection Definitions
 All collections are defined under `src/collections/*.ts`. Of particular interest:
 - **`VectorData` (`slug: 'vector-data'`)**
   - Fields:
     - `vector_data`: `array` of `{ value: number }`
     - `title`, `description`, `tags`, `linked_resource_type`, `linked_resource_id`, `external_id`
     - `api_sync` group with `last_synced`, `sync_source`
 - Other collections (metadata-only): `Users`, `Media`, `Veterans`, `Jobs`, `Employers`, `JobFairs`, `BreakoutSessions`, `VeteranActivity`

 ## 4. Data Models
 - **Vector storage**: embedded in Mongo documents under the `vector_data` field in the `vector-data` collection.
 - **Metadata**: stored in respective PayloadCMS collections under their defined schemas.

 ## 5. Ancillary MongoDB Usage
 - No explicit use of MongoDB features beyond standard CRUD:
   - No transactions (`withTransaction`), change streams, TTL indexes, or GridFS usage found.

 ## 6. Environment Variables
 - `MONGODB_URI`: connection URL for MongoDB adapter.
 - `JOB_BOARD_API_URL`: base URL for Job Board API (not DB but relevant for vector sync).

 ## Next Steps (Phase 2)
 - Introduce a storage abstraction layer (`VectorStore` interface).
 - Create a stub adapter for Mongo that delegates to PayloadCMS/Mongo.
 - Begin implementation of a Qdrant-backed adapter behind the same interface.