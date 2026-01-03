# API Integration Guide

## Overview

This document describes the API integration between the FME Frontend (fme-clone) and the FME Backend (fme-backend).

## Configuration

### Environment Variables

Create a `.env` file in the frontend root with:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

### API Configuration

The API client is configured in `src/config/api.config.ts` with:
- Axios instance with base URL and headers
- Request interceptor for JWT token injection
- Response interceptor for token refresh
- Token storage utilities

## Available API Services

### 1. Authentication (`auth.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/signin` | Sign in with email/password |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/me` | Get current user profile |
| PUT | `/auth/profile` | Update user profile |
| PUT | `/auth/change-password` | Change password |

### 2. Banners (`banner.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/banners` | Get all banners |
| GET | `/banners/active` | Get active banners only |
| GET | `/banners/:id` | Get banner by ID |
| POST | `/banners` | Create banner (Admin) |
| PUT | `/banners/:id` | Update banner (Admin) |
| DELETE | `/banners/:id` | Delete banner (Admin) |

### 3. News (`news.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/news` | Get all news |
| GET | `/news/:id` | Get news by ID |
| GET | `/news/category/:category` | Get news by category |
| GET | `/news/trending` | Get trending news |
| POST | `/news` | Create news (Admin) |
| PUT | `/news/:id` | Update news (Admin) |
| DELETE | `/news/:id` | Delete news (Admin) |

### 4. Programs (`program.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/programs` | Get all programs |
| GET | `/programs/:id` | Get program by ID |
| GET | `/programs/code/:code` | Get program by code |
| GET | `/programs/type/:type` | Get programs by type |
| POST | `/programs` | Create program (Admin) |
| PUT | `/programs/:id` | Update program (Admin) |
| DELETE | `/programs/:id` | Delete program (Admin) |

### 5. Schedules (`schedule.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/schedules` | Get all schedules |
| GET | `/schedules/:id` | Get schedule by ID |
| GET | `/schedules/date/:date` | Get schedules by date |
| GET | `/schedules/range` | Get schedules by date range |
| GET | `/schedules/student/:email` | Get schedules by student |
| POST | `/schedules` | Create schedule (Admin) |
| PUT | `/schedules/:id` | Update schedule (Admin) |
| PUT | `/schedules/:id/confirm` | Confirm schedule (Admin) |
| DELETE | `/schedules/:id` | Delete schedule (Admin) |

### 6. Duty Reports (`dutyReport.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/reports` | Get all reports |
| GET | `/reports/:id` | Get report by ID |
| GET | `/reports/student/:email` | Get reports by student |
| GET | `/reports/schedule/:scheduleId` | Get reports by schedule |
| GET | `/reports/filter` | Get filtered reports |
| POST | `/reports` | Create report |
| PUT | `/reports/:id` | Update report |
| PUT | `/reports/:id/status` | Update report status (Admin) |
| DELETE | `/reports/:id` | Delete report |

### 7. Admin Users (`adminUser.service.ts`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users` | Get all users (Admin) |
| GET | `/admin/users/:id` | Get user by ID (Admin) |
| PUT | `/admin/users/:id/deactivate` | Deactivate user (Admin) |
| PUT | `/admin/users/:id/activate` | Activate user (Admin) |

## React Query Hooks

All API services have corresponding React Query hooks for easy data fetching and mutations.

### Usage Examples

#### Fetching Data

```tsx
import { useBanners, useNews, useSchedules } from '@/hooks';

const MyComponent = () => {
  const { data: banners, isLoading, error } = useBanners();
  
  if (isLoading) return <Loading />;
  if (error) return <Error message={error.message} />;
  
  return (
    <div>
      {banners?.data?.map(banner => (
        <BannerItem key={banner.id} banner={banner} />
      ))}
    </div>
  );
};
```

#### Mutations

```tsx
import { useCreateBanner, useDeleteBanner } from '@/hooks';

const BannerManager = () => {
  const createBanner = useCreateBanner({
    onSuccess: () => {
      toast.success('Banner created!');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleCreate = (data: BannerRequest) => {
    createBanner.mutate(data);
  };

  return (/* ... */);
};
```

#### Authentication

```tsx
import { useSignIn, useCurrentUser, useSignOut } from '@/hooks';

const LoginForm = () => {
  const signIn = useSignIn({
    onSuccess: (data) => {
      if (data.success) {
        navigate('/');
      }
    }
  });

  const handleSubmit = (email: string, password: string) => {
    signIn.mutate({ email, password });
  };

  return (/* ... */);
};
```

## Type Definitions

All TypeScript interfaces are defined in `src/types/api.types.ts`:

- `ApiResponse<T>` - Generic API response wrapper
- `UserDTO` - User data
- `AuthResponse` - Authentication response with tokens
- `BannerDTO`, `BannerRequest` - Banner types
- `NewsDTO`, `NewsRequest` - News types
- `ProgramDTO`, `ProgramRequest` - Program types
- `ScheduleDTO`, `ScheduleRequest` - Schedule types
- `DutyReportDTO`, `DutyReportRequest` - Duty report types

## Token Management

Tokens are automatically:
- Stored in localStorage after login
- Added to request headers via interceptor
- Refreshed when expired (401 response)
- Cleared on logout

## Running the Backend

Before using the API, ensure the backend is running:

```bash
cd fme-backend
./gradlew bootRun
```

The API will be available at `http://localhost:8080/api`.

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- `http://localhost:3000`

## Error Handling

All API calls return responses in the format:

```json
{
  "success": true/false,
  "message": "Success message or error description",
  "data": { /* Response data */ },
  "timestamp": "2025-01-03T10:00:00"
}
```

Handle errors in your components:

```tsx
const { data, error, isError } = useNews();

if (isError) {
  console.error('API Error:', error.message);
}
```
