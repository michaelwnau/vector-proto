# Vector Proto - Job Board Project

This project is built on PayloadCMS and Next.js with integration to an external VRE Job Board API microservice.

## Job Board API Integration

This project integrates with the "vre-job-board-api" microservice to ingest and manage job-related data including:

- Jobs
- Employers
- Job Fairs
- Breakout Sessions
- Vector Data for AI-powered search

The integration is handled through a service layer that syncs data between the external API and the local PayloadCMS collections. The API documentation can be found in the `/API_DOCUMENTATION.md` file.

## Collections

The following collections have been configured for the Job Board functionality:

- **Users**: Authentication and user management
- **Media**: File uploads and management
- **Veterans**: Veteran profiles with job-seeking capabilities
- **Jobs**: Job listings synced from the external API
- **Employers**: Company profiles synced from the external API
- **JobFairs**: Virtual and in-person job fair events
- **BreakoutSessions**: Career development sessions at job fairs
- **VectorData**: Vector embeddings for AI-powered job matching

## API Routes

- `/api-test`: Tests the connection to the Job Board API
- `/api/sync`: Syncs data from the external API to local collections

## Environment Variables

The following environment variables are required for API integration:

```
JOB_BOARD_API_URL=http://localhost:8000
JOB_BOARD_API_EMAIL=your-api-user@example.com
JOB_BOARD_API_PASSWORD=your-api-password
```

## Docker Setup

This project uses Docker Compose to run both the PayloadCMS application and the external VRE Job Board API microservice. The Docker Compose configuration includes:

1. **payload**: The PayloadCMS + Next.js application
2. **mongo**: MongoDB database shared between services
3. **vre-job-board-api**: The external microservice that provides job data

To start the project with Docker:

```bash
docker-compose up
```

## Development

1. Clone the repository
2. Copy `.env.example` to `.env` and update environment variables
3. Run `pnpm install` to install dependencies
4. Run `pnpm dev` to start the development server
5. Open `http://localhost:3000` to view the application
6. Access the admin panel at `http://localhost:3000/admin`

## API Sync Process

The application will sync with the external API by:

1. Authenticating with the API using configured credentials
2. Fetching data from the API endpoints
3. Creating or updating local collections to match the API data
4. Tracking synchronization status with timestamp fields

You can trigger a sync manually by sending a POST request to the `/api/sync` endpoint.

## Questions

If you have any issues or questions, reach out to the project maintainers or refer to the PayloadCMS documentation at [https://payloadcms.com/docs](https://payloadcms.com/docs).
