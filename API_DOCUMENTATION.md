# VRE Job Board API - Developer Documentation

This document provides technical details for developers integrating with the VRE Job Board API microservice.

## Base URL

- Development: `http://localhost:8000`
- Production: [Your production URL]

## Authentication

Most endpoints require authentication using JSON Web Tokens (JWT).

### Obtaining a Token

```http
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

### Using the Token

Include the token in all API requests in the Authorization header:

```http
GET /api/v1/jobs
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Endpoints Reference

### Users

#### Get Current User

```http
GET /api/v1/users/me
Authorization: Bearer {token}
```

Response:
```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "breakout_sessions": [],
  "employers": [],
  "job_fairs": []
}
```

#### Create User

```http
POST /api/v1/users
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "USER"
}
```

Response:
```json
{
  "id": 2,
  "email": "newuser@example.com",
  "role": "USER",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00"
}
```

### Jobs

#### List Jobs

```http
GET /api/v1/jobs
Authorization: Bearer {token}
```

Query Parameters:
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum number of records to return (default: 100)

Response:
```json
[
  {
    "id": 1,
    "title": "Software Developer",
    "description": "Full-stack developer position",
    "employer_id": 1,
    "is_active": true,
    "created_at": "2023-01-01T00:00:00",
    "employer": {
      "id": 1,
      "company_name": "Tech Corp",
      "description": "Technology company"
    }
  }
]
```

#### Get Job

```http
GET /api/v1/jobs/{job_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "id": 1,
  "title": "Software Developer",
  "description": "Full-stack developer position",
  "employer_id": 1,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "employer": {
    "id": 1,
    "company_name": "Tech Corp",
    "description": "Technology company"
  },
  "applicants": [],
  "user_saves": []
}
```

#### Create Job

```http
POST /api/v1/jobs
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Senior Developer",
  "description": "Senior developer position",
  "employer_id": 1,
  "is_active": true
}
```

Response:
```json
{
  "id": 2,
  "title": "Senior Developer",
  "description": "Senior developer position",
  "employer_id": 1,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "employer": {
    "id": 1,
    "company_name": "Tech Corp",
    "description": "Technology company"
  }
}
```

#### Apply for Job

```http
POST /api/v1/jobs/{job_id}/apply
Authorization: Bearer {token}
```

Response:
```json
{
  "message": "Application submitted successfully"
}
```

#### Save Job

```http
POST /api/v1/jobs/{job_id}/save
Authorization: Bearer {token}
```

Response:
```json
{
  "message": "Job saved successfully"
}
```

### Employers

#### List Employers

```http
GET /api/v1/employers
Authorization: Bearer {token}
```

Query Parameters:
- `skip` (optional): Number of records to skip (default: 0)
- `limit` (optional): Maximum number of records to return (default: 100)

Response:
```json
[
  {
    "id": 1,
    "company_name": "Tech Corp",
    "description": "Technology company",
    "is_active": true,
    "created_at": "2023-01-01T00:00:00"
  }
]
```

#### Get Employer

```http
GET /api/v1/employers/{employer_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "id": 1,
  "company_name": "Tech Corp",
  "description": "Technology company",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "user_likes": [],
  "job_fairs": []
}
```

#### Create Employer

```http
POST /api/v1/employers
Authorization: Bearer {token}
Content-Type: application/json

{
  "company_name": "New Corp",
  "description": "New company description",
  "is_active": true
}
```

Response:
```json
{
  "id": 2,
  "company_name": "New Corp",
  "description": "New company description",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00"
}
```

### Job Fairs

#### List Job Fairs

```http
GET /api/v1/job_fairs
Authorization: Bearer {token}
```

Response:
```json
[
  {
    "id": 1,
    "fair_date": "2023-01-15T00:00:00",
    "description": "Winter Job Fair",
    "created_at": "2023-01-01T00:00:00"
  }
]
```

#### Get Job Fair

```http
GET /api/v1/job_fairs/{job_fair_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "id": 1,
  "fair_date": "2023-01-15T00:00:00",
  "description": "Winter Job Fair",
  "created_at": "2023-01-01T00:00:00",
  "breakout_sessions": [],
  "users": [],
  "employers": []
}
```

### Breakout Sessions

#### List Breakout Sessions

```http
GET /api/v1/breakout_sessions
Authorization: Bearer {token}
```

Response:
```json
[
  {
    "id": 1,
    "topic": "Resume Writing",
    "leader": "John Smith",
    "job_fair_id": 1,
    "is_active": true,
    "created_at": "2023-01-01T00:00:00"
  }
]
```

#### Get Breakout Session

```http
GET /api/v1/breakout_sessions/{session_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "id": 1,
  "topic": "Resume Writing",
  "leader": "John Smith",
  "job_fair_id": 1,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "job_fair": {
    "id": 1,
    "fair_date": "2023-01-15T00:00:00",
    "description": "Winter Job Fair"
  },
  "users": []
}
```

### USAJobs Integration

#### Search Jobs

```http
GET /api/v1/usajobs/search
Authorization: Bearer {token}
```

Query Parameters:
- `keyword` (optional): Keywords to search for
- `location` (optional): Location to search in
- `position_title` (optional): Position title to search for
- `pay_grade` (optional): Pay grade code (e.g., GS-12)
- `job_category` (optional): Job category code
- `hiring_path` (optional): Hiring path code
- `page` (optional): Page number (default: 1)
- `results_per_page` (optional): Results per page (default: 25, max: 500)

Response:
```json
{
  "jobs": [
    {
      "id": "123456",
      "position_title": "Software Developer",
      "position_uri": "https://www.usajobs.gov/job/123456",
      "position_location": [
        {
          "location_name": "Washington, DC",
          "country_code": "US"
        }
      ],
      "department_name": "Department of Veterans Affairs",
      "job_grade": [
        {
          "code": "GS-12"
        }
      ]
    }
  ],
  "total_jobs": 150,
  "current_page": 1,
  "total_pages": 6
}
```

#### Get Job Details

```http
GET /api/v1/usajobs/{job_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "id": "123456",
  "position_title": "Software Developer",
  "position_uri": "https://www.usajobs.gov/job/123456",
  "position_location": [
    {
      "location_name": "Washington, DC",
      "country_code": "US"
    }
  ],
  "department_name": "Department of Veterans Affairs",
  "organization_name": "Office of Information Technology",
  "job_summary": "Detailed job description...",
  "qualification_summary": "Qualification requirements...",
  "job_grade": [
    {
      "code": "GS-12"
    }
  ],
  "position_remuneration": [
    {
      "min_range": 87000,
      "max_range": 113000,
      "rate_interval_code": "Per Year"
    }
  ],
  "application_close_date": "2023-02-15T00:00:00"
}
```

### Vector Database

#### Health Check

```http
GET /api/v1/vectors/health/check
```

Response:
```json
{
  "status": "ok",
  "message": "MongoDB connection is healthy"
}
```

#### Create Vector

```http
POST /api/v1/vectors
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Job Embedding",
  "description": "Vector embedding for job search",
  "tags": ["job", "search"],
  "vector_data": [0.1, 0.2, 0.3, 0.4]
}
```

Response:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Job Embedding",
  "description": "Vector embedding for job search",
  "tags": ["job", "search"],
  "vector_data": [0.1, 0.2, 0.3, 0.4]
}
```

#### Get All Vectors

```http
GET /api/v1/vectors
Authorization: Bearer {token}
```

Response:
```json
[
  {
    "_id": "60d21b4667d0d8992e610c85",
    "title": "Job Embedding",
    "description": "Vector embedding for job search",
    "tags": ["job", "search"],
    "vector_data": [0.1, 0.2, 0.3, 0.4]
  }
]
```

#### Get Vector by ID

```http
GET /api/v1/vectors/{vector_id}
Authorization: Bearer {token}
```

Response:
```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Job Embedding",
  "description": "Vector embedding for job search",
  "tags": ["job", "search"],
  "vector_data": [0.1, 0.2, 0.3, 0.4]
}
```

## Error Handling

The API uses standard HTTP status codes:

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request parameters
- `401 Unauthorized`: Authentication required
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

Error responses follow this format:

```json
{
  "detail": "Error message describing the issue"
}
```

## Data Models

### User

```json
{
  "id": 1,
  "email": "user@example.com",
  "role": "USER | EMPLOYER | COUNSELOR | ADMIN",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "breakout_sessions": [],
  "employers": [],
  "job_fairs": [],
  "job_counselor": null,
  "veterans": [],
  "saved_jobs": [],
  "applied_jobs": []
}
```

### Job

```json
{
  "id": 1,
  "title": "Software Developer",
  "description": "Full-stack developer position",
  "employer_id": 1,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "employer": {
    "id": 1,
    "company_name": "Tech Corp",
    "description": "Technology company"
  },
  "applicants": [],
  "user_saves": []
}
```

### Employer

```json
{
  "id": 1,
  "company_name": "Tech Corp",
  "description": "Technology company",
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "user_likes": [],
  "job_fairs": []
}
```

### Job Fair

```json
{
  "id": 1,
  "fair_date": "2023-01-15T00:00:00",
  "description": "Winter Job Fair",
  "created_at": "2023-01-01T00:00:00",
  "breakout_sessions": [],
  "users": [],
  "employers": []
}
```

### Breakout Session

```json
{
  "id": 1,
  "topic": "Resume Writing",
  "leader": "John Smith",
  "job_fair_id": 1,
  "is_active": true,
  "created_at": "2023-01-01T00:00:00",
  "job_fair": {
    "id": 1,
    "fair_date": "2023-01-15T00:00:00",
    "description": "Winter Job Fair"
  },
  "users": []
}
```

### Vector

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "Job Embedding",
  "description": "Vector embedding for job search",
  "tags": ["job", "search"],
  "vector_data": [0.1, 0.2, 0.3, 0.4]
}
```

## Rate Limiting

[Document any rate limiting that applies]

## Webhook Integration

[Document webhooks if available]

## Best Practices

1. **Authentication**: Always store tokens securely and refresh them as needed.
2. **Error Handling**: Implement proper error handling for all API requests.
3. **Pagination**: Use pagination parameters when fetching large datasets.
4. **Caching**: Consider implementing caching for frequently accessed resources.
5. **Timeouts**: Set appropriate timeouts for API requests.

## SDK Examples

### JavaScript/TypeScript

```typescript
// Example using fetch
async function getJobs(token: string) {
  const response = await fetch('http://localhost:8000/api/v1/jobs', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }
  
  return await response.json();
}
```

### Python

```python
import requests

def get_jobs(token):
    headers = {
        'Authorization': f'Bearer {token}',
        'Content-Type': 'application/json'
    }
    
    response = requests.get('http://localhost:8000/api/v1/jobs', headers=headers)
    response.raise_for_status()
    
    return response.json()
```

## Support

For developer support, please contact [your support contact information].