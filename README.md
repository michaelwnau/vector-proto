# Vector Proto - Job Board Project

This project is built on PayloadCMS and Next.js with integration to an external VRE Job Board API microservice.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Local Development Setup](#local-development-setup)
- [Docker Development Setup](#docker-development-setup)
- [Project Structure and Architecture](#project-structure-and-architecture)
- [Available Commands](#available-commands)
- [Verification and Testing](#verification-and-testing)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)
- [Additional Resources](#additional-resources)

## Prerequisites

Before setting up the development environment, ensure you have the following software installed:

### Required Software

- **Node.js**: Version 18.20.2 or higher, or version 20.9.0 or higher

  - Download from: [https://nodejs.org/](https://nodejs.org/)
  - Verify installation: `node --version`

- **pnpm**: Package manager (version 10.7.1 or higher recommended)

  - Install via npm: `npm install -g pnpm`
  - Or install via standalone script: `curl -fsSL https://get.pnpm.io/install.sh | sh -`
  - Official installation guide: [https://pnpm.io/installation](https://pnpm.io/installation)
  - Verify installation: `pnpm --version`

- **Git**: Version control system
  - Download from: [https://git-scm.com/downloads](https://git-scm.com/downloads)
  - Verify installation: `git --version`

### Optional Software (for Docker setup)

- **Docker**: Container platform for running the full application stack

  - Download Docker Desktop: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
  - Verify installation: `docker --version`

- **Docker Compose**: Container orchestration (included with Docker Desktop)
  - Verify installation: `docker-compose --version`

### Development Tools (Recommended)

- **Visual Studio Code**: Code editor with excellent TypeScript support

  - Download from: [https://code.visualstudio.com/](https://code.visualstudio.com/)
  - Recommended extensions: TypeScript, ESLint, Prettier

- **MongoDB Compass**: GUI for MongoDB database management (optional)
  - Download from: [https://www.mongodb.com/products/compass](https://www.mongodb.com/products/compass)

## Quick Start

For experienced developers who want to get up and running immediately:

```bash
# Clone the repository
git clone <repository-url>
cd vector-proto

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and API credentials

# Start development server
pnpm dev
```

**Verification**: Open [http://localhost:3000](http://localhost:3000) to view the application and [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel.

## Local Development Setup

Follow these detailed steps to set up the Vector Proto application for local development without Docker:

### Step 1: Clone and Navigate to Repository

```bash
# Clone the repository
git clone <repository-url>
cd vector-proto
```

### Step 2: Install Dependencies

```bash
# Install all project dependencies using pnpm
pnpm install
```

**Expected Output**: You should see pnpm downloading and installing packages. The process typically takes 1-3 minutes depending on your internet connection.

### Step 3: Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env
```

Open the `.env` file in your text editor and configure the following variables:

#### Required Environment Variables

**Database Configuration:**

```env
# Local MongoDB connection string
MONGODB_URI=mongodb://127.0.0.1:27017/vector-proto
```

**PayloadCMS Configuration:**

```env
# Secret key for PayloadCMS (use a secure random string)
PAYLOAD_SECRET=your-secure-secret-key-here

# Public server URL for PayloadCMS
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# Optional: Vercel Blob storage token (leave as placeholder for local development)
BLOB_READ_WRITE_TOKEN=VERCEL_BLOB_SECRET_HERE
```

**VRE Job Board API Integration:**

```env
# API endpoint URL (adjust if running API on different port)
JOB_BOARD_API_URL=http://localhost:8000

# API authentication credentials
JOB_BOARD_API_EMAIL=admin@example.com
JOB_BOARD_API_PASSWORD=password123
```

> **Note**: Replace `your-secure-secret-key-here` with a strong, unique secret key. You can generate one using: `openssl rand -base64 32`

### Step 4: Set Up Local MongoDB Database

You have two options for running MongoDB locally:

#### Option A: MongoDB with Docker (Recommended)

```bash
# Start only the MongoDB container from docker-compose
docker-compose up mongo -d
```

**Expected Output**: MongoDB will start on port 27017 and be accessible at `mongodb://127.0.0.1:27017/vector-proto`

#### Option B: Native MongoDB Installation

1. **Install MongoDB Community Edition:**

   - **macOS**: `brew install mongodb-community`
   - **Windows**: Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
   - **Linux**: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB service:**

   ```bash
   # macOS/Linux
   brew services start mongodb-community
   # or
   mongod --dbpath /usr/local/var/mongodb

   # Windows
   net start MongoDB
   ```

3. **Verify MongoDB is running:**
   ```bash
   # Test connection
   mongosh mongodb://127.0.0.1:27017/vector-proto
   ```

### Step 5: Generate PayloadCMS Types

```bash
# Generate TypeScript types for PayloadCMS collections
pnpm generate:types
```

**Expected Output**: This creates/updates the `src/payload-types.ts` file with TypeScript definitions for your collections.

### Step 6: Start the Development Server

```bash
# Start the Next.js development server with PayloadCMS
pnpm dev
```

**Expected Output**:

```
▲ Next.js 15.3.1
- Local:        http://localhost:3000
- Environments: .env

✓ Ready in 2.3s
[PayloadCMS] Starting Payload...
[PayloadCMS] Connected to MongoDB at mongodb://127.0.0.1:27017/vector-proto
[PayloadCMS] Payload Admin URL: http://localhost:3000/admin
```

### Step 7: Verify Application Setup

1. **Test Main Application:**

   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - You should see the Vector Proto application homepage

2. **Test Admin Panel:**

   - Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - Create your first admin user account when prompted
   - You should be able to access the PayloadCMS admin interface

3. **Test API Connection:**

   - Visit [http://localhost:3000/api-test](http://localhost:3000/api-test)
   - This endpoint tests the connection to the VRE Job Board API
   - **Note**: This will show an error if the external API is not running, which is normal for local development

4. **Test Database Connection:**
   - In the admin panel, try creating a test user or media item
   - If successful, your MongoDB connection is working correctly

### Step 8: Optional - Set Up VRE Job Board API (for Full Integration)

If you need the complete job board functionality, you'll also need to run the VRE Job Board API microservice:

```bash
# Start the VRE Job Board API container
docker-compose up vre-job-board-api -d
```

Once running, you can test the full integration by visiting [http://localhost:3000/api/sync](http://localhost:3000/api/sync) to sync job data.

### Development Workflow

Your typical development workflow will be:

1. **Start MongoDB** (if not already running):

   ```bash
   docker-compose up mongo -d
   ```

2. **Start the development server**:

   ```bash
   pnpm dev
   ```

3. **Make your changes** to the codebase

4. **Generate types** (when you modify collections):
   ```bash
   pnpm generate:types
   ```

The development server supports hot reloading, so your changes will be reflected immediately in the browser.

## Docker Development Setup

The Docker Compose configuration provides a complete development environment with all services containerized. This approach is ideal for developers who want consistent environments across different machines or prefer not to install dependencies locally.

### Docker Services Overview

The `docker-compose.yml` file defines three main services:

#### 1. **payload** - Main Application Service

- **Purpose**: Runs the PayloadCMS + Next.js application
- **Base Image**: `node:18-alpine`
- **Port**: `3000` (mapped to host port 3000)
- **Features**:
  - Automatic dependency installation using pnpm
  - Hot reloading with volume mounting
  - Environment variable configuration
  - Automatic startup of development server

#### 2. **mongo** - MongoDB Database Service

- **Purpose**: Provides MongoDB database for both PayloadCMS and VRE Job Board API
- **Base Image**: `mongo:latest`
- **Port**: `27017` (mapped to host port 27017)
- **Features**:
  - WiredTiger storage engine for better performance
  - Persistent data storage with Docker volumes
  - Shared database access between services

#### 3. **vre-job-board-api** - External API Microservice

- **Purpose**: Provides job board data and API endpoints
- **Base Image**: `ghcr.io/name-of-org/vre-job-board-api:latest`
- **Port**: `8000` (mapped to host port 8000)
- **Features**:
  - Pre-configured with admin credentials
  - Automatic database connection to shared MongoDB
  - API endpoints for job data synchronization

### Starting the Docker Environment

#### Option 1: Start All Services

```bash
# Start all services (payload, mongo, vre-job-board-api)
docker-compose up
```

**Expected Output**: You'll see logs from all three services. The payload service will install dependencies and start the development server.

#### Option 2: Start Services in Background

```bash
# Start all services in detached mode (background)
docker-compose up -d
```

#### Option 3: Start Individual Services

```bash
# Start only the database
docker-compose up mongo -d

# Start payload application (requires mongo to be running)
docker-compose up payload

# Start the job board API (requires mongo to be running)
docker-compose up vre-job-board-api -d
```

### Environment Configuration for Docker

The Docker setup uses environment variables defined in the `docker-compose.yml` file. You can override these by creating a `.env` file:

```bash
# Copy the example environment file
cp .env.example .env
```

**Key Docker Environment Variables:**

```env
# Database connection (automatically configured for Docker)
MONGODB_URI=mongodb://mongo:27017/vector-proto

# PayloadCMS configuration
PAYLOAD_SECRET=vector-proto-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3000

# VRE Job Board API integration (automatically configured for Docker)
JOB_BOARD_API_URL=http://vre-job-board-api:8000
JOB_BOARD_API_EMAIL=admin@example.com
JOB_BOARD_API_PASSWORD=password123

# Optional: Vercel Blob storage
BLOB_READ_WRITE_TOKEN=VERCEL_BLOB_SECRET_HERE
```

> **Note**: The Docker configuration automatically sets up service-to-service communication using Docker network hostnames (`mongo`, `vre-job-board-api`).

### Accessing Services

Once the Docker environment is running, you can access:

- **Main Application**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **API Test Endpoint**: [http://localhost:3000/api-test](http://localhost:3000/api-test)
- **Data Sync Endpoint**: [http://localhost:3000/api/sync](http://localhost:3000/api/sync)
- **VRE Job Board API**: [http://localhost:8000](http://localhost:8000) (if running)
- **MongoDB**: `mongodb://localhost:27017/vector-proto` (for external tools)

### Container Management Commands

#### Viewing Service Status

```bash
# Check running containers
docker-compose ps

# View service logs
docker-compose logs payload
docker-compose logs mongo
docker-compose logs vre-job-board-api

# Follow logs in real-time
docker-compose logs -f payload
```

#### Stopping and Restarting Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (clears database data)
docker-compose down -v

# Restart a specific service
docker-compose restart payload

# Rebuild and restart services (after code changes)
docker-compose up --build
```

#### Development Commands Inside Containers

```bash
# Execute commands inside the payload container
docker-compose exec payload pnpm generate:types
docker-compose exec payload pnpm build

# Access the payload container shell
docker-compose exec payload sh

# Access MongoDB shell
docker-compose exec mongo mongosh vector-proto
```

### Docker Development Workflow

Your typical Docker development workflow:

1. **Start the environment**:

   ```bash
   docker-compose up -d
   ```

2. **View application logs**:

   ```bash
   docker-compose logs -f payload
   ```

3. **Make code changes**: Files are automatically synced via volume mounting

4. **Generate types when needed**:

   ```bash
   docker-compose exec payload pnpm generate:types
   ```

5. **Stop the environment**:
   ```bash
   docker-compose down
   ```

### Troubleshooting Docker Setup

#### Common Issues and Solutions

**Port Conflicts:**

```bash
# If port 3000 is already in use, modify docker-compose.yml:
# Change "3000:3000" to "3001:3000" under payload service ports
```

**Container Won't Start:**

```bash
# Check container logs for errors
docker-compose logs payload

# Rebuild containers if needed
docker-compose up --build
```

**Database Connection Issues:**

```bash
# Ensure MongoDB container is running
docker-compose ps mongo

# Check MongoDB logs
docker-compose logs mongo

# Reset database if needed
docker-compose down -v
docker-compose up mongo -d
```

**Dependency Installation Issues:**

```bash
# Clear node_modules volume and rebuild
docker-compose down
docker volume rm vector-proto_node_modules
docker-compose up --build
```

### Docker vs Local Development

**Choose Docker when:**

- You want consistent environments across team members
- You prefer not to install Node.js, MongoDB locally
- You need the full stack including the VRE Job Board API
- You're working on integration features

**Choose Local Development when:**

- You want faster startup times
- You prefer using local development tools
- You're working primarily on frontend features
- You want more control over individual services## Projec
  t Structure and Architecture

The Vector Proto application follows a modern Next.js 15 + PayloadCMS 3 architecture with clear separation of concerns and modular organization.

### Directory Structure

```
vector-proto/
├── src/                          # Main application source code
│   ├── app/                      # Next.js App Router structure
│   │   ├── (frontend)/           # Public-facing application routes
│   │   │   ├── admin-dashboard/  # Custom admin dashboard pages
│   │   │   ├── layout.tsx        # Frontend layout wrapper
│   │   │   └── page.tsx          # Homepage component
│   │   ├── (payload)/            # PayloadCMS admin interface
│   │   │   ├── admin/            # Admin panel customizations
│   │   │   └── api/              # PayloadCMS API routes
│   │   ├── api/                  # Custom API endpoints
│   │   │   └── sync/             # Data synchronization endpoint
│   │   ├── api-test/             # API connection testing endpoint
│   │   └── db-test/              # Database connection testing endpoint
│   ├── collections/              # PayloadCMS collection definitions
│   │   ├── Users.ts              # User authentication and roles
│   │   ├── Veterans.ts           # Veteran profiles and data
│   │   ├── Jobs.ts               # Job listings from external API
│   │   ├── Employers.ts          # Company profiles and information
│   │   ├── JobFairs.ts           # Job fair events and scheduling
│   │   ├── BreakoutSessions.ts   # Career development sessions
│   │   ├── VeteranActivity.ts    # Activity tracking for veterans
│   │   ├── VectorData.ts         # AI vector embeddings for search
│   │   └── Media.ts              # File uploads and media management
│   ├── components/               # Reusable React components
│   │   ├── admin/                # Admin-specific components
│   │   ├── ui/                   # UI component library (shadcn/ui)
│   │   ├── AdminRedirect.tsx     # Admin authentication redirect
│   │   └── theme-provider.tsx    # Theme context provider
│   ├── hooks/                    # Custom React hooks
│   │   └── use-mobile.ts         # Mobile device detection hook
│   ├── lib/                      # Utility functions and configurations
│   │   ├── storage/              # File storage utilities
│   │   ├── getAuthenticatedUser.ts    # Server-side auth helper
│   │   ├── getAuthenticatedUserClient.ts # Client-side auth helper
│   │   ├── useAuth.ts            # Authentication hook
│   │   └── utils.ts              # General utility functions
│   ├── services/                 # External service integrations
│   │   └── api/                  # API service layer
│   │       └── jobBoardApiService.ts # VRE Job Board API integration
│   ├── middleware.ts             # Next.js middleware for routing
│   ├── payload.config.ts         # PayloadCMS configuration
│   └── payload-types.ts          # Generated TypeScript types
├── .kiro/                        # Kiro IDE configuration
│   └── specs/                    # Feature specifications
├── media/                        # Uploaded media files
├── scripts/                      # Build and deployment scripts
├── .env.example                  # Environment variable template
├── docker-compose.yml            # Docker development environment
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

### Architecture Overview

#### 1. **Frontend Architecture (Next.js 15)**

**App Router Structure:**

- `(frontend)/` - Public-facing pages using Next.js App Router
- `(payload)/` - PayloadCMS admin interface with custom styling
- Route groups provide clean URL structure while maintaining organization

**Key Features:**

- Server-side rendering (SSR) for optimal performance
- Client-side navigation with React 19
- Responsive design using Tailwind CSS
- Theme support with next-themes

#### 2. **Backend Architecture (PayloadCMS 3)**

**Collection-Based Data Model:**

- Each collection represents a core business entity
- Role-based access control (RBAC) for data security
- Automatic API generation for all collections
- Built-in authentication and user management

**Database Layer:**

- MongoDB with Mongoose ODM
- Automatic schema validation
- Relationship management between collections
- Optimized queries with indexing

#### 3. **API Integration Layer**

**External API Service:**

- Centralized service class for VRE Job Board API
- Authentication token management
- Data synchronization with local collections
- Error handling and retry logic

**Sync Strategy:**

- Bidirectional data synchronization
- Conflict resolution with timestamp tracking
- Batch processing for large datasets
- Manual and automatic sync triggers

### Core Collections and Data Models

#### User Management

```typescript
Users Collection:
├── Authentication (email/password)
├── Role-based access (admin, counselor, veteran, employer)
├── Profile information (fullName, external_id)
├── Relationships (saved_jobs, applied_jobs, employers)
└── API sync tracking
```

#### Veteran Management

```typescript
Veterans Collection:
├── Profile (fullName, email, phone, serviceBranch)
├── Status tracking (Assessment, Training, Job Search, Employed, Graduated)
├── Education and certifications
├── Resume upload (relationship to Media)
├── Counselor assignment (relationship to Users)
├── Activity tracking (relationship to VeteranActivity)
└── Access control by role and counselor assignment
```

#### Job Board Data

```typescript
Jobs Collection:
├── Job details (title, description, is_active)
├── Employer relationship
├── Applicant tracking (relationship to Veterans)
├── User saves (relationship to Users)
├── External API sync (external_id, api_sync metadata)
└── Automatic sync hooks

Employers Collection:
├── Company information (company_name, description, logo)
├── Activity status (is_active)
├── User interactions (user_likes)
├── Job fair participation (relationship to JobFairs)
├── External API sync (external_id, api_sync metadata)
└── Automatic sync hooks
```

#### Event Management

```typescript
JobFairs Collection:
├── Event details (description, fair_date, location)
├── Virtual meeting support (virtual_link)
├── Participant tracking (users, employers)
├── External API sync (external_id, api_sync metadata)
└── Access control for creation and updates

BreakoutSessions Collection:
├── Session details (topic, leader, is_active)
├── Job fair association (relationship to JobFairs)
├── User registration tracking
├── External API sync (external_id, api_sync metadata)
└── Automatic sync hooks
```

#### AI and Analytics

```typescript
VectorData Collection:
├── Vector embeddings (vector_data array)
├── Metadata (title, description, tags)
├── Resource linking (linked_resource_type, linked_resource_id)
├── External API sync (external_id, api_sync metadata)
└── Admin-only access control

VeteranActivity Collection:
├── Activity tracking (activityType, notes, timestamp)
├── User and veteran relationships
├── Activity types (Counselor Appointment, Resume Review, etc.)
└── Open access for activity logging
```

### Configuration Files

#### Core Configuration

- **`payload.config.ts`**: PayloadCMS configuration with collections, database, and admin settings
- **`next.config.mjs`**: Next.js configuration with Payload integration and webpack optimizations
- **`package.json`**: Dependencies, scripts, and Node.js version requirements

#### Development Configuration

- **`docker-compose.yml`**: Multi-service development environment (payload, mongo, vre-job-board-api)
- **`tailwind.config.js`**: Tailwind CSS configuration with custom animations
- **`tsconfig.json`**: TypeScript configuration with strict type checking

#### Environment Configuration

- **`.env.example`**: Template for required environment variables
- **Environment Variables**:
  - `MONGODB_URI`: Database connection string
  - `PAYLOAD_SECRET`: PayloadCMS encryption key
  - `JOB_BOARD_API_URL`: External API endpoint
  - `JOB_BOARD_API_EMAIL/PASSWORD`: API authentication credentials

### Data Relationships and Flow

#### User Role Hierarchy

```
Admin
├── Full access to all collections
├── User management capabilities
├── System configuration access
└── API sync management

Counselor
├── Veteran management (assigned veterans only)
├── Job and employer data access
├── Activity tracking and reporting
└── Limited user creation

Veteran
├── Own profile management
├── Job search and application
├── Activity viewing (own activities)
└── Read-only access to jobs/employers

Employer
├── Company profile management
├── Job fair participation
├── Limited veteran interaction
└── Read-only access to relevant data
```

#### Data Synchronization Flow

```
External VRE Job Board API
├── Jobs → Local Jobs Collection
├── Employers → Local Employers Collection
├── Job Fairs → Local JobFairs Collection
├── Breakout Sessions → Local BreakoutSessions Collection
├── Vector Data → Local VectorData Collection
└── Bidirectional sync with conflict resolution
```

#### Activity Tracking Flow

```
Veteran Interactions
├── Counselor appointments → VeteranActivity records
├── Resume reviews → VeteranActivity records
├── Job applications → Jobs.applicants relationship
├── Employer interactions → Activity tracking
└── Status updates → Veterans.status field
```

This architecture provides a scalable, maintainable foundation for the Vector Proto job board application with clear separation between frontend presentation, backend data management, and external API integration.## Available
Commands

The Vector Proto project provides several pnpm scripts for development, building, and maintenance tasks. Below is a comprehensive reference of all available commands:

### Development Commands

#### `pnpm dev`

**Purpose**: Starts the Next.js development server with hot reloading enabled.

**Usage**:

```bash
pnpm dev
```

**What it does**:

- Starts the development server on `http://localhost:3000`
- Enables hot module replacement for instant code updates
- Runs PayloadCMS alongside Next.js
- Watches for file changes and automatically recompiles

**Expected Output**:

```
▲ Next.js 15.3.1
- Local:        http://localhost:3000
- Environments: .env

✓ Ready in 2.3s
[PayloadCMS] Starting Payload...
[PayloadCMS] Connected to MongoDB
[PayloadCMS] Payload Admin URL: http://localhost:3000/admin
```

#### `pnpm devsafe`

**Purpose**: Starts development server with a clean build by removing the `.next` cache directory first.

**Usage**:

```bash
pnpm devsafe
```

**When to use**:

- When experiencing build cache issues
- After major dependency updates
- When development server behaves unexpectedly
- To ensure a completely fresh development build

### Build and Production Commands

#### `pnpm build`

**Purpose**: Creates an optimized production build of the application.

**Usage**:

```bash
pnpm build
```

**What it does**:

- Compiles TypeScript to JavaScript
- Optimizes and minifies code for production
- Generates static assets and pages
- Creates the `.next` build directory
- Validates all TypeScript types

**Expected Output**:

```
▲ Next.js 15.3.1

✓ Creating an optimized production build
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    1.2 kB          87.3 kB
├ ○ /admin                               0 B                0 B
└ ○ /api-test                            0 B                0 B
```

#### `pnpm start`

**Purpose**: Starts the production server using the built application.

**Usage**:

```bash
# First build the application
pnpm build

# Then start the production server
pnpm start
```

**Requirements**: Must run `pnpm build` first to create the production build.

### PayloadCMS-Specific Commands

#### `pnpm generate:types`

**Purpose**: Generates TypeScript type definitions for all PayloadCMS collections and configurations.

**Usage**:

```bash
pnpm generate:types
```

**What it does**:

- Analyzes your PayloadCMS configuration
- Creates TypeScript interfaces for all collections
- Updates `src/payload-types.ts` with current schema
- Ensures type safety across your application

**When to run**:

- After modifying any collection definitions
- After adding new fields to existing collections
- After changing collection relationships
- Before building for production

**Expected Output**:

```
[PayloadCMS] Generating TypeScript definitions...
[PayloadCMS] Types generated successfully at src/payload-types.ts
```

#### `pnpm generate:importmap`

**Purpose**: Generates an import map for PayloadCMS modules and dependencies.

**Usage**:

```bash
pnpm generate:importmap
```

**What it does**:

- Creates module resolution mappings
- Optimizes PayloadCMS module loading
- Improves build performance and bundle size

**When to run**:

- After PayloadCMS version updates
- When experiencing module resolution issues
- As part of build optimization process

#### `pnpm payload`

**Purpose**: Direct access to PayloadCMS CLI commands.

**Usage**:

```bash
# General payload CLI access
pnpm payload [command] [options]

# Examples:
pnpm payload --help                    # Show all available Payload commands
pnpm payload generate:types            # Alternative way to generate types
pnpm payload generate:importmap        # Alternative way to generate import map
```

**Available Payload CLI Commands**:

- Database operations and migrations
- User management commands
- Collection data import/export
- Development utilities

### Code Quality Commands

#### `pnpm lint`

**Purpose**: Runs ESLint to check code quality and enforce coding standards.

**Usage**:

```bash
pnpm lint
```

**What it does**:

- Analyzes JavaScript and TypeScript files for issues
- Checks adherence to coding standards
- Reports syntax errors and potential bugs
- Suggests code improvements

**Expected Output (when no issues)**:

```
✓ No ESLint warnings or errors
```

**Expected Output (with issues)**:

```
./src/components/example.tsx
  12:5  Warning: 'useState' is defined but never used  @typescript-eslint/no-unused-vars
  25:10 Error: Missing return statement                 consistent-return

✖ 2 problems (1 error, 1 warning)
```

### Admin Panel and API Access

#### Admin Panel Access

**URL**: `http://localhost:3000/admin`

**Default Setup**:

- First visit will prompt you to create an admin user
- Use the credentials you create to access the admin interface
- Manage all collections, users, and system settings

**Features Available**:

- Collection data management (Users, Veterans, Jobs, Employers, etc.)
- User role management and permissions
- Media file uploads and management
- Data synchronization with external API
- System configuration and settings

#### API Testing Endpoints

**API Connection Test**: `http://localhost:3000/api-test`

- Tests connectivity to the VRE Job Board API
- Validates API credentials and endpoint availability
- Returns connection status and basic API information

**Data Synchronization**: `http://localhost:3000/api/sync`

- Triggers manual data sync from external API
- Syncs Jobs, Employers, Job Fairs, and other collections
- Returns sync status and number of records processed

**Database Connection Test**: `http://localhost:3000/db-test`

- Validates MongoDB connection
- Tests database read/write operations
- Returns database status and connection details

### Development Workflow Commands

#### Typical Development Session

```bash
# Start your development session
pnpm dev

# In another terminal, generate types after collection changes
pnpm generate:types

# Run linting to check code quality
pnpm lint

# Build for production testing
pnpm build
```

#### Pre-deployment Checklist

````bash
# 1. Generate latest types
pnpm generate:types

# 2. Run linting
pnpm lint

# 3. Build the application
pnpm build

# 4. Test the production build locally
pnpm start
```## Ve
rification and Testing

After completing your development environment setup, follow these steps to verify everything is working correctly:

### Step 1: Application Access Verification

1. **Main Application Test:**
   ```bash
   # Ensure development server is running
   pnpm dev
````

- Open [http://localhost:3000](http://localhost:3000) in your browser
- You should see the Vector Proto application homepage
- Verify the page loads without errors in browser console

2. **Admin Panel Access:**
   - Navigate to [http://localhost:3000/admin](http://localhost:3000/admin)
   - If this is your first time, you'll be prompted to create an admin user
   - Fill out the admin user creation form with:
     - Email: Your preferred admin email
     - Password: A secure password (minimum 8 characters)
     - Confirm password
   - After creation, you should be redirected to the PayloadCMS admin dashboard

### Step 2: Database Connection Verification

1. **Database Test Endpoint:**

   - Visit [http://localhost:3000/db-test](http://localhost:3000/db-test)
   - You should see a JSON response indicating successful database connection
   - Expected response format:
     ```json
     {
       "status": "success",
       "message": "Database connection successful",
       "database": "vector-proto"
     }
     ```

2. **Admin Panel Database Test:**
   - In the admin panel, try creating a test media item or user
   - Navigate to Collections → Media → Create New
   - Upload a small test image
   - If successful, your database connection is working properly

### Step 3: API Integration Verification

1. **API Connection Test:**

   - Visit [http://localhost:3000/api-test](http://localhost:3000/api-test)
   - This tests the connection to the VRE Job Board API
   - **Expected Results:**
     - If VRE Job Board API is running: Success message with API status
     - If VRE Job Board API is not running: Connection error (this is normal for local development)

2. **Data Synchronization Test (Optional):**
   - If you have the VRE Job Board API running, visit [http://localhost:3000/api/sync](http://localhost:3000/api/sync)
   - This will attempt to sync data from the external API
   - Check the admin panel for newly synced data in Jobs, Employers, etc.

### Step 4: Collection Access Verification

1. **User Management:**

   - In admin panel, navigate to Collections → Users
   - You should see your admin user listed
   - Try creating a test user with different roles (counselor, veteran, employer)

2. **Collection Structure:**
   - Verify all collections are visible in the admin sidebar:
     - Users
     - Veterans
     - Jobs
     - Employers
     - Job Fairs
     - Breakout Sessions
     - Veteran Activity
     - Vector Data
     - Media

### Step 5: Development Tools Verification

1. **Type Generation Test:**

   ```bash
   pnpm generate:types
   ```

   - Should complete without errors
   - Check that `src/payload-types.ts` is updated with current timestamp

2. **Linting Test:**

   ```bash
   pnpm lint
   ```

   - Should complete with minimal or no warnings
   - Address any critical errors before proceeding

3. **Build Test:**
   ```bash
   pnpm build
   ```
   - Should complete successfully
   - Verify no TypeScript errors or build failures

### Verification Checklist

Use this checklist to confirm your setup is complete:

- [ ] Application loads at [http://localhost:3000](http://localhost:3000)
- [ ] Admin panel accessible at [http://localhost:3000/admin](http://localhost:3000/admin)
- [ ] Admin user account created successfully
- [ ] Database connection test passes at [http://localhost:3000/db-test](http://localhost:3000/db-test)
- [ ] All collections visible in admin panel
- [ ] Can create and edit records in admin panel
- [ ] Type generation runs without errors (`pnpm generate:types`)
- [ ] Linting passes without critical errors (`pnpm lint`)
- [ ] Application builds successfully (`pnpm build`)
- [ ] API test endpoint responds (connection may fail if external API not running)

### Common Verification Issues

**Admin Panel Won't Load:**

- Check browser console for JavaScript errors
- Verify `PAYLOAD_SECRET` is set in `.env`
- Ensure MongoDB is running and accessible

**Database Connection Fails:**

- Verify `MONGODB_URI` in `.env` file
- Check MongoDB service is running
- Test connection string with MongoDB Compass

**Type Generation Fails:**

- Check for syntax errors in collection files
- Verify PayloadCMS configuration is valid
- Restart development server after fixing issues

**Build Errors:**

- Run `pnpm generate:types` first
- Check for TypeScript errors in your code
- Verify all imports are correct## A
  PI Integration

This project integrates with the "vre-job-board-api" microservice to provide comprehensive job board functionality.

### Integration Overview

The Vector Proto application connects to an external VRE Job Board API to synchronize and manage job-related data including:

- **Jobs**: Job listings with detailed descriptions, requirements, and application tracking
- **Employers**: Company profiles with contact information and job fair participation
- **Job Fairs**: Virtual and in-person career events with scheduling and registration
- **Breakout Sessions**: Career development workshops and networking sessions
- **Vector Data**: AI-powered embeddings for intelligent job matching and search

### API Service Architecture

The integration is handled through a centralized service layer located at `src/services/api/jobBoardApiService.ts` that provides:

- **Authentication Management**: Automatic token handling and refresh
- **Data Synchronization**: Bidirectional sync with conflict resolution
- **Error Handling**: Retry logic and graceful failure handling
- **Type Safety**: Full TypeScript support for all API operations

### Environment Configuration

Configure the following environment variables in your `.env` file:

```env
# VRE Job Board API Integration
JOB_BOARD_API_URL=http://localhost:8000
JOB_BOARD_API_EMAIL=admin@example.com
JOB_BOARD_API_PASSWORD=password123
```

**Variable Descriptions:**

- `JOB_BOARD_API_URL`: Base URL for the VRE Job Board API service
- `JOB_BOARD_API_EMAIL`: Authentication email for API access
- `JOB_BOARD_API_PASSWORD`: Authentication password for API access

### API Endpoints and Testing

#### Connection Testing

**Endpoint**: `GET /api-test`
**Purpose**: Validates connectivity and authentication with the external API

**Usage**:

```bash
curl http://localhost:3000/api-test
```

**Response Examples**:

```json
// Successful connection
{
  "status": "success",
  "message": "API connection successful",
  "apiUrl": "http://localhost:8000",
  "authenticated": true
}

// Connection failure
{
  "status": "error",
  "message": "Failed to connect to API",
  "error": "ECONNREFUSED"
}
```

#### Data Synchronization

**Endpoint**: `POST /api/sync`
**Purpose**: Triggers manual synchronization of data from external API to local collections

**Usage**:

```bash
curl -X POST http://localhost:3000/api/sync
```

**Response Example**:

```json
{
  "status": "success",
  "message": "Data synchronization completed",
  "results": {
    "jobs": { "created": 15, "updated": 8, "errors": 0 },
    "employers": { "created": 5, "updated": 3, "errors": 0 },
    "jobFairs": { "created": 2, "updated": 1, "errors": 0 },
    "breakoutSessions": { "created": 8, "updated": 2, "errors": 0 }
  },
  "syncTime": "2024-01-15T10:30:00Z"
}
```

### Data Synchronization Process

#### Sync Strategy

1. **Authentication**: Establish secure connection with API credentials
2. **Data Retrieval**: Fetch updated records from external API endpoints
3. **Conflict Resolution**: Compare timestamps and resolve data conflicts
4. **Local Updates**: Update PayloadCMS collections with new/changed data
5. **Relationship Mapping**: Maintain data relationships between collections
6. **Error Handling**: Log and report any synchronization failures

#### Automatic Sync Triggers

- **Scheduled Sync**: Configurable automatic synchronization intervals
- **Webhook Triggers**: Real-time updates when external data changes
- **Manual Triggers**: On-demand sync via admin panel or API endpoint

#### Sync Monitoring

Monitor synchronization status through:

- **Admin Panel**: View sync history and status in PayloadCMS admin
- **API Logs**: Check application logs for detailed sync information
- **Error Reports**: Automatic notification of sync failures and issues

### Collection Mapping

#### Jobs Collection Sync

- **External Source**: `/api/jobs` endpoint
- **Local Collection**: `Jobs`
- **Key Fields**: `external_id`, `title`, `description`, `is_active`
- **Relationships**: Links to `Employers` collection
- **Sync Frequency**: Every 15 minutes or on-demand

#### Employers Collection Sync

- **External Source**: `/api/employers` endpoint
- **Local Collection**: `Employers`
- **Key Fields**: `external_id`, `company_name`, `description`, `logo`
- **Relationships**: Links to `Jobs` and `JobFairs` collections
- **Sync Frequency**: Every 30 minutes or on-demand

#### Job Fairs Collection Sync

- **External Source**: `/api/job-fairs` endpoint
- **Local Collection**: `JobFairs`
- **Key Fields**: `external_id`, `description`, `fair_date`, `location`
- **Relationships**: Links to `Employers` and `BreakoutSessions`
- **Sync Frequency**: Daily or on-demand

### API Integration Best Practices

#### Error Handling

- **Retry Logic**: Automatic retry for transient failures
- **Circuit Breaker**: Prevent cascade failures during API outages
- **Graceful Degradation**: Continue operation with cached data when API unavailable
- **Error Logging**: Comprehensive logging for debugging and monitoring

#### Performance Optimization

- **Batch Processing**: Sync data in batches to reduce API load
- **Incremental Sync**: Only sync changed records based on timestamps
- **Caching Strategy**: Cache frequently accessed data to reduce API calls
- **Rate Limiting**: Respect API rate limits to prevent service disruption

#### Security Considerations

- **Credential Management**: Secure storage of API credentials
- **Token Refresh**: Automatic handling of authentication token expiration
- **Data Validation**: Validate all incoming data before storage
- **Access Control**: Restrict API sync operations to authorized users

### Troubleshooting API Integration

#### Common Issues and Solutions

**API Connection Failures:**

```bash
# Test API connectivity
curl -v http://localhost:8000/health

# Check environment variables
echo $JOB_BOARD_API_URL
echo $JOB_BOARD_API_EMAIL
```

**Authentication Errors:**

- Verify API credentials in `.env` file
- Check if API user account is active
- Confirm API endpoint URLs are correct

**Data Sync Issues:**

- Check application logs for detailed error messages
- Verify database connectivity and permissions
- Test individual collection sync operations

**Performance Problems:**

- Monitor API response times and adjust batch sizes
- Check for database indexing on frequently queried fields
- Review sync frequency settings for optimization

For detailed API documentation, refer to the `API_DOCUMENTATION.md` file in the project root.##
Troubleshooting

This section covers common issues you might encounter during development setup and their solutions.

### Prerequisites and Installation Issues

#### Node.js Version Problems

**Issue**: Application fails to start with Node.js version errors

```
Error: The engine "node" is incompatible with this module
```

**Solution**:

```bash
# Check your current Node.js version
node --version

# Install correct version (18.20.2+ or 20.9.0+)
# Using nvm (recommended)
nvm install 20.9.0
nvm use 20.9.0

# Or download from https://nodejs.org/
```

#### pnpm Installation Issues

**Issue**: `pnpm` command not found or version conflicts

**Solution**:

```bash
# Install pnpm globally
npm install -g pnpm

# Or use standalone installer
curl -fsSL https://get.pnpm.io/install.sh | sh -

# Verify installation
pnpm --version

# Should show version 10.7.1 or higher
```

### Environment Configuration Issues

#### MongoDB Connection Problems

**Issue**: Database connection failures

```
Error: connect ECONNREFUSED 127.0.0.1:27017
```

**Solutions**:

1. **Check MongoDB Service Status:**

   ```bash
   # For Docker setup
   docker-compose ps mongo

   # For local MongoDB installation
   # macOS
   brew services list | grep mongodb

   # Windows
   net start | findstr MongoDB
   ```

2. **Start MongoDB Service:**

   ```bash
   # Docker
   docker-compose up mongo -d

   # Local installation
   # macOS
   brew services start mongodb-community

   # Windows
   net start MongoDB
   ```

3. **Verify Connection String:**

   ```bash
   # Check .env file
   cat .env | grep MONGODB_URI

   # Should be: mongodb://127.0.0.1:27017/vector-proto
   # For Docker: mongodb://mongo:27017/vector-proto
   ```

#### Environment Variable Issues

**Issue**: Missing or incorrect environment variables

**Solution**:

```bash
# Copy example file if missing
cp .env.example .env

# Verify required variables are set
grep -E "(MONGODB_URI|PAYLOAD_SECRET|JOB_BOARD_API)" .env

# Generate secure PAYLOAD_SECRET
openssl rand -base64 32
```

**Required Variables Checklist:**

- [ ] `MONGODB_URI` - Database connection string
- [ ] `PAYLOAD_SECRET` - PayloadCMS encryption key
- [ ] `PAYLOAD_PUBLIC_SERVER_URL` - Public server URL
- [ ] `JOB_BOARD_API_URL` - External API endpoint
- [ ] `JOB_BOARD_API_EMAIL` - API authentication email
- [ ] `JOB_BOARD_API_PASSWORD` - API authentication password

### Port Conflicts

#### Port 3000 Already in Use

**Issue**: Development server can't start due to port conflicts

```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions**:

1. **Find and Kill Process Using Port 3000:**

   ```bash
   # Find process using port 3000
   lsof -ti:3000

   # Kill the process (replace PID with actual process ID)
   kill -9 <PID>

   # Or kill all processes on port 3000
   npx kill-port 3000
   ```

2. **Use Alternative Port:**

   ```bash
   # Start on different port
   PORT=3001 pnpm dev

   # Update PAYLOAD_PUBLIC_SERVER_URL in .env
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
   ```

#### MongoDB Port Conflicts

**Issue**: MongoDB can't start on port 27017

**Solution**:

```bash
# For Docker setup, modify docker-compose.yml
# Change port mapping from "27017:27017" to "27018:27017"

# Update MONGODB_URI in .env
MONGODB_URI=mongodb://127.0.0.1:27018/vector-proto
```

### Development Server Issues

#### Build and Type Generation Errors

**Issue**: TypeScript errors or build failures

**Solutions**:

1. **Regenerate Types:**

   ```bash
   # Clean and regenerate PayloadCMS types
   rm -f src/payload-types.ts
   pnpm generate:types
   ```

2. **Clear Build Cache:**

   ```bash
   # Remove build cache
   rm -rf .next

   # Clean start
   pnpm devsafe
   ```

3. **Check Collection Definitions:**
   ```bash
   # Verify collection files for syntax errors
   pnpm lint src/collections/
   ```

#### Hot Reloading Not Working

**Issue**: Changes not reflected in browser

**Solutions**:

1. **Restart Development Server:**

   ```bash
   # Stop server (Ctrl+C) and restart
   pnpm dev
   ```

2. **Clear Browser Cache:**

   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (macOS)
   - Clear browser cache and cookies for localhost

3. **Check File Watchers:**
   ```bash
   # Increase file watcher limit (Linux)
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

### Docker-Specific Issues

#### Container Startup Failures

**Issue**: Docker containers fail to start

**Solutions**:

1. **Check Docker Service:**

   ```bash
   # Verify Docker is running
   docker --version
   docker-compose --version

   # Start Docker Desktop if needed
   ```

2. **View Container Logs:**

   ```bash
   # Check logs for specific service
   docker-compose logs payload
   docker-compose logs mongo

   # Follow logs in real-time
   docker-compose logs -f payload
   ```

3. **Rebuild Containers:**

   ```bash
   # Stop and remove containers
   docker-compose down

   # Rebuild and start
   docker-compose up --build
   ```

#### Volume and Permission Issues

**Issue**: File permission errors in Docker containers

**Solutions**:

1. **Fix File Permissions:**

   ```bash
   # Change ownership of project files
   sudo chown -R $USER:$USER .

   # Set proper permissions
   chmod -R 755 .
   ```

2. **Reset Docker Volumes:**
   ```bash
   # Remove volumes and restart
   docker-compose down -v
   docker-compose up
   ```

### API Integration Issues

#### External API Connection Failures

**Issue**: Cannot connect to VRE Job Board API

**Solutions**:

1. **Verify API Service:**

   ```bash
   # Check if API is running
   curl http://localhost:8000/health

   # Start API service if needed
   docker-compose up vre-job-board-api -d
   ```

2. **Check API Credentials:**

   ```bash
   # Verify credentials in .env
   grep JOB_BOARD_API .env

   # Test authentication
   curl -X POST http://localhost:8000/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@example.com","password":"password123"}'
   ```

#### Data Synchronization Problems

**Issue**: API sync fails or returns errors

**Solutions**:

1. **Check Sync Endpoint:**

   ```bash
   # Test sync endpoint
   curl -X POST http://localhost:3000/api/sync
   ```

2. **Review Application Logs:**
   ```bash
   # Check development server logs for sync errors
   # Look for authentication, network, or data validation errors
   ```

### Performance Issues

#### Slow Application Startup

**Issue**: Development server takes too long to start

**Solutions**:

1. **Optimize Dependencies:**

   ```bash
   # Clean install dependencies
   rm -rf node_modules pnpm-lock.yaml
   pnpm install
   ```

2. **Reduce File Watching:**
   ```bash
   # Add to .gitignore to reduce file watching
   echo "*.log" >> .gitignore
   echo ".DS_Store" >> .gitignore
   ```

#### Database Performance Issues

**Issue**: Slow database queries or operations

**Solutions**:

1. **Check Database Indexes:**

   ```bash
   # Connect to MongoDB and check indexes
   mongosh mongodb://127.0.0.1:27017/vector-proto

   # In MongoDB shell
   db.jobs.getIndexes()
   db.users.getIndexes()
   ```

2. **Monitor Database Performance:**
   ```bash
   # Use MongoDB Compass for performance monitoring
   # Check slow query logs and optimize as needed
   ```

### Getting Additional Help

If you continue to experience issues:

1. **Check Application Logs**: Look for detailed error messages in the development server output
2. **Review Documentation**: Refer to [PayloadCMS Documentation](https://payloadcms.com/docs) and [Next.js Documentation](https://nextjs.org/docs)
3. **Community Support**: Check GitHub issues or community forums for similar problems
4. **Development Tools**: Use browser developer tools to inspect network requests and console errors## Addi
   tional Resources

### Documentation Links

- **PayloadCMS Documentation**: [https://payloadcms.com/docs](https://payloadcms.com/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **MongoDB Documentation**: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Docker Documentation**: [https://docs.docker.com/](https://docs.docker.com/)
- **pnpm Documentation**: [https://pnpm.io/](https://pnpm.io/)

### Project-Specific Resources

- **API Documentation**: See `API_DOCUMENTATION.md` in the project root
- **Database Audit**: See `DB_AUDIT.md` for database schema information
- **Integration Guide**: See `INTEGRATION.md` for detailed integration instructions

### Development Tools and Extensions

#### Visual Studio Code Extensions

- **TypeScript**: Enhanced TypeScript support
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **MongoDB for VS Code**: MongoDB database management
- **Docker**: Docker container management
- **GitLens**: Enhanced Git integration

#### Useful Development Commands

```bash
# Quick project health check
pnpm lint && pnpm generate:types && pnpm build

# Database backup (MongoDB)
mongodump --uri="mongodb://127.0.0.1:27017/vector-proto" --out=./backup

# Database restore (MongoDB)
mongorestore --uri="mongodb://127.0.0.1:27017/vector-proto" ./backup/vector-proto

# View application logs
tail -f .next/trace

# Monitor file changes
watch -n 1 'ls -la src/collections/'
```