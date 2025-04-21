# VRE Job Board API Integration

This document describes the integration between the Vector Proto application and the VRE Job Board API microservice.

## Overview

The Vector Proto application integrates with an external microservice called "vre-job-board-api" for job data. This integration allows the application to:

1. Fetch job listings, employers, job fairs, and breakout sessions from the API
2. Store and sync this data in local Payload CMS collections
3. Use vector embeddings for AI-powered job matching

## Implemented Collections

The following collections have been created to store data from the API:

1. **Jobs**: Job listings with relationships to employers
2. **Employers**: Company profiles with relationships to job fairs
3. **JobFairs**: Virtual and in-person job fair events
4. **BreakoutSessions**: Career development sessions at job fairs
5. **VectorData**: Vector embeddings for AI-powered search

## Service Layer

A service layer has been created at `src/services/api/jobBoardApiService.ts` to handle communication with the API. This service provides:

- Authentication with the API
- Methods for fetching various data types
- Sync functions to update local collections

## API Routes

Several API routes have been created for testing and syncing:

- `/api-test`: Tests the connection to the Job Board API
- `/api/sync`: Syncs data from the external API to local collections

## Docker Setup

The `docker-compose.yml` file has been updated to include both the PayloadCMS application and the external VRE Job Board API microservice. The Docker Compose configuration includes:

1. **payload**: The PayloadCMS + Next.js application
2. **mongo**: Shared MongoDB database
3. **vre-job-board-api**: The external microservice

## Environment Variables

The following environment variables are required for API integration:

```
JOB_BOARD_API_URL=http://localhost:8000
JOB_BOARD_API_EMAIL=your-api-user@example.com
JOB_BOARD_API_PASSWORD=your-api-password
```

## Syncing Data

The API sync process works as follows:

1. The application authenticates with the API using JWT tokens
2. Data is fetched from various API endpoints
3. For each record:
   - If it exists in the local database (matched by external_id), it is updated
   - If it doesn't exist, a new record is created
4. Sync information (timestamp, source) is recorded in each record's api_sync field

To manually trigger a sync, send a POST request to `/api/sync` with a JSON body like:

```json
{
  "entities": ["employers", "jobs", "job-fairs", "breakout-sessions"]
}
```

## Next Steps

1. Implement automatic periodic syncing using a cron job or webhook
2. Add error handling and retry logic for sync failures
3. Create front-end components to display the synced data
4. Implement vector-based job matching using the VectorData collection