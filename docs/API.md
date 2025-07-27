# API Documentation

## Overview

The Eco Swachh API provides a comprehensive set of endpoints for waste management, user authentication, analytics, and real-time communication. All endpoints return JSON responses and use standard HTTP status codes.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

Most endpoints require authentication using NextAuth.js JWT tokens. Include the session token in your requests.

### Headers

```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

## Endpoints

### Authentication

#### POST `/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "aadhaarNumber": "123456789012"
}
```

**Response:**

```json
{
  "message": "user registered successfully"
}
```

**Status Codes:**

- `201` - User registered successfully
- `400` - Invalid input data
- `409` - User already exists
- `500` - Internal server error

#### POST `/auth/verify-account`

Verify user account with Aadhaar document.

**Request Body:**

```json
{
  "imageUrl": "https://example.com/aadhaar-image.jpg"
}
```

**Response:**

```json
{
  "matchesUserInput": true,
  "confidence": 0.95,
  "verificationStatus": "verified"
}
```

**Status Codes:**

- `200` - Verification successful
- `400` - Invalid image URL
- `401` - Unauthorized
- `403` - Verification failed
- `500` - Internal server error

### Waste Management

#### POST `/waste/report`

Report new waste with AI-powered classification.

**Request Body:**

```json
{
  "type": "plastic",
  "items": "water bottles, food containers",
  "weight": "2.5 kg",
  "location": "12.9716,77.5946",
  "imageUrl": "https://example.com/waste-image.jpg"
}
```

**Response:**

```json
{
  "message": "waste reported successfully",
  "reportId": "507f1f77bcf86cd799439011",
  "confidenceScore": 0.92,
  "rewards": 10
}
```

**Status Codes:**

- `201` - Waste reported successfully
- `400` - Invalid input data
- `401` - Unauthorized
- `500` - Internal server error

#### PATCH `/waste/collect`

Collect reported waste.

**Request Body:**

```json
{
  "reportId": "507f1f77bcf86cd799439011"
}
```

**Response:**

```json
{
  "message": "waste collection initiated",
  "collectorId": "507f1f77bcf86cd799439012",
  "status": "pending"
}
```

**Status Codes:**

- `200` - Collection initiated
- `400` - Invalid report ID
- `401` - Unauthorized
- `403` - Cannot collect own waste
- `404` - Report not found
- `500` - Internal server error

#### POST `/waste/collect/verify`

Verify waste collection with image.

**Request Body:**

```json
{
  "reportId": "507f1f77bcf86cd799439011",
  "collectedImageUrl": "https://example.com/collected-image.jpg"
}
```

**Response:**

```json
{
  "message": "waste collection verified",
  "status": "collected",
  "rewards": 50
}
```

**Status Codes:**

- `200` - Collection verified
- `400` - Invalid input
- `401` - Unauthorized
- `403` - Verification failed
- `404` - Report not found
- `500` - Internal server error

#### POST `/waste/dispose`

Get disposal method recommendations.

**Request Body:**

```json
{
  "reportId": "507f1f77bcf86cd799439011"
}
```

**Response:**

```json
{
  "isValid": true,
  "disposalMethod": "Recycle through authorized centers",
  "warning": "Ensure proper segregation before disposal",
  "environmentalImpact": "Low"
}
```

**Status Codes:**

- `200` - Disposal method retrieved
- `400` - Invalid report ID
- `401` - Unauthorized
- `404` - Report not found
- `500` - Internal server error

#### GET `/waste/report/get-reports`

Get paginated waste reports.

**Query Parameters:**

- `query` (optional): Search term
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 6)

**Response:**

```json
{
  "result": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "type": "plastic",
      "items": "water bottles",
      "weight": "2.5 kg",
      "location": "12.9716,77.5946",
      "status": "collected",
      "imageUrl": "https://example.com/image.jpg",
      "reporter": "507f1f77bcf86cd799439012",
      "collector": "507f1f77bcf86cd799439013",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "totalDocuments": 25,
  "currentPage": 1,
  "totalPages": 5
}
```

**Status Codes:**

- `200` - Reports retrieved successfully
- `401` - Unauthorized
- `500` - Internal server error

### Analytics

#### GET `/analytics/summary`

Get user analytics summary.

**Response:**

```json
{
  "reports": 15,
  "collections": 8,
  "rank": 5,
  "rewards": 450
}
```

**Status Codes:**

- `200` - Summary retrieved
- `401` - Unauthorized
- `500` - Internal server error

#### GET `/analytics/chart`

Get chart data for dashboard.

**Response:**

```json
[
  {
    "_id": "2024-01-15",
    "reports": 3,
    "collections": 2
  },
  {
    "_id": "2024-01-16",
    "reports": 5,
    "collections": 3
  }
]
```

**Status Codes:**

- `200` - Chart data retrieved
- `401` - Unauthorized
- `500` - Internal server error

#### GET `/analytics/insight`

Get AI-generated insights.

**Response:**

```json
{
  "insight": "You're in the top 10% of waste reporters! Keep up the great work.",
  "recommendations": [
    "Try collecting more waste to increase your rank",
    "Focus on plastic waste collection for better rewards"
  ],
  "performance": "excellent"
}
```

**Status Codes:**

- `200` - Insights retrieved
- `401` - Unauthorized
- `404` - No insights available
- `500` - Internal server error

### Leaderboard

#### GET `/leaderboard`

Get community leaderboard.

**Query Parameters:**

- `query` (optional): Search term for filtering users

**Response:**

```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "rewards": 1250,
    "rank": 1
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "rewards": 980,
    "rank": 2
  }
]
```

**Status Codes:**

- `200` - Leaderboard retrieved
- `401` - Unauthorized
- `500` - Internal server error

### Chat

#### POST `/chat`

Chat with AI assistant.

**Request Body:**

```json
{
  "messages": [
    {
      "role": "user",
      "content": "How should I dispose of plastic waste?"
    }
  ]
}
```

**Response:**

```json
{
  "role": "assistant",
  "content": "Plastic waste should be properly segregated and sent to authorized recycling centers. Here are the steps...",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

**Status Codes:**

- `200` - Response generated
- `400` - Invalid input
- `500` - Internal server error

### Email Services

#### POST `/emails/onboarding`

Send onboarding email to new users.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "id": "email_id_123",
  "status": "sent"
}
```

**Status Codes:**

- `201` - Email sent successfully
- `400` - Invalid input
- `500` - Internal server error

#### POST `/emails/success`

Send success email for verified accounts.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "id": "email_id_456",
  "status": "sent"
}
```

**Status Codes:**

- `201` - Email sent successfully
- `400` - Invalid input
- `500` - Internal server error

#### POST `/emails/subscribe`

Subscribe to newsletter.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "id": "email_id_789",
  "status": "subscribed"
}
```

**Status Codes:**

- `201` - Subscription successful
- `400` - Invalid email
- `500` - Internal server error

### File Upload

#### POST `/uploadthing`

Upload files (images, documents).

**Request Body:**

```json
{
  "file": "base64_encoded_file_or_file_object"
}
```

**Response:**

```json
{
  "url": "https://uploadthing.com/f/abc123",
  "key": "abc123",
  "size": 1024000
}
```

**Status Codes:**

- `200` - File uploaded successfully
- `400` - Invalid file
- `413` - File too large
- `500` - Internal server error

## Error Handling

### Error Response Format

```json
{
  "error": "Error message description",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Input validation failed
- `AUTHENTICATION_ERROR` - Authentication required
- `AUTHORIZATION_ERROR` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `RATE_LIMIT_EXCEEDED` - Too many requests
- `INTERNAL_SERVER_ERROR` - Server error

## Rate Limiting

API endpoints are rate-limited to prevent abuse:

- **Authentication endpoints**: 5 requests per minute
- **Waste reporting**: 10 requests per minute
- **Chat API**: 20 requests per minute
- **General endpoints**: 100 requests per minute

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642234567
```

## Pagination

Endpoints that return lists support pagination:

**Query Parameters:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

**Response Headers:**

```
X-Total-Count: 150
X-Page-Count: 15
X-Current-Page: 1
X-Per-Page: 10
```

## Webhooks

### Available Webhooks

- `waste.reported` - Triggered when waste is reported
- `waste.collected` - Triggered when waste is collected
- `user.registered` - Triggered when user registers
- `user.verified` - Triggered when user verifies account

### Webhook Payload

```json
{
  "event": "waste.reported",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "reportId": "507f1f77bcf86cd799439011",
    "userId": "507f1f77bcf86cd799439012",
    "wasteType": "plastic"
  }
}
```

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install eco-swachh-sdk
```

```javascript
import { EcoSwachhAPI } from "eco-swachh-sdk";

const api = new EcoSwachhAPI({
  baseURL: "https://api.ecoswachh.com",
  token: "your-jwt-token",
});

// Report waste
const report = await api.waste.report({
  type: "plastic",
  items: "water bottles",
  weight: "2.5 kg",
  location: "12.9716,77.5946",
  imageUrl: "https://example.com/image.jpg",
});
```

### Python

```bash
pip install eco-swachh-python
```

```python
from eco_swachh import EcoSwachhAPI

api = EcoSwachhAPI(
    base_url='https://api.ecoswachh.com',
    token='your-jwt-token'
)

# Report waste
report = api.waste.report(
    type='plastic',
    items='water bottles',
    weight='2.5 kg',
    location='12.9716,77.5946',
    image_url='https://example.com/image.jpg'
)
```

## Testing

### Test Environment

Use the test environment for development:

```
Base URL: https://test-api.ecoswachh.com
```

### Test Credentials

```json
{
  "email": "test@ecoswachh.com",
  "password": "testpassword123"
}
```

## Support

For API support and questions:

- **Documentation**: [API Docs](https://docs.ecoswachh.com)
- **SDK Documentation**: [SDK Docs](https://sdk.ecoswachh.com)
- **Support Email**: api-support@ecoswachh.com
- **Status Page**: [API Status](https://status.ecoswachh.com)

---

**Note**: This API documentation is versioned. Check the version header in responses for compatibility information.
