# Project Structure

This project follows a feature-based architecture for better scalability and maintainability.

## Directory Structure

```
src/
├── assets/              # Static assets (images, fonts, etc.)
├── components/          # Shared/reusable components
│   ├── common/         # Common UI components (ThemeToggle, etc.)
│   └── layout/         # Layout components (Header, Footer, etc.)
├── constants/          # Application constants
│   ├── routes.ts       # Route paths
│   ├── storage.ts      # LocalStorage keys
│   └── index.ts        # Barrel export
├── dataSources/        # Mock data and static content
│   ├── banner.ts
│   ├── menu.ts
│   ├── news.ts
│   └── programs.ts
├── features/           # Feature-based modules (future organization)
│   ├── home/
│   ├── auth/
│   ├── admin/
│   └── calendar/
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx
│   └── useTheme.ts
├── services/           # Business logic and API services
│   ├── storage.service.ts
│   └── index.ts
├── types/              # TypeScript type definitions
│   ├── auth.ts
│   ├── duty.ts
│   ├── content.ts
│   └── index.ts
├── utils/              # Utility functions (future)
├── views/              # Page-level components (current structure)
│   ├── Admin/
│   ├── Auth/
│   └── Home/
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles

```

## Architecture Principles

### 1. **Separation of Concerns**

- **Components**: Pure UI components without business logic
- **Hooks**: Reusable stateful logic
- **Services**: Business logic and data management
- **Types**: Centralized type definitions

### 2. **Feature-based Organization** (Recommended for scaling)

Each feature module should contain:

```
features/feature-name/
├── components/      # Feature-specific components
├── hooks/          # Feature-specific hooks
├── services/       # Feature-specific logic
├── types/          # Feature-specific types
└── index.tsx       # Feature entry point
```

### 3. **Import Paths**

Use absolute imports with `@/` alias:

```typescript
import { ROUTES } from "@/constants";
import { User } from "@/types";
import { storageService } from "@/services";
```

## Current vs. Recommended Structure

### Current (views-based)

```
views/
├── Home/
│   ├── components/
│   └── index.tsx
├── Auth/
└── Admin/
```

### Recommended (feature-based)

```
features/
├── home/
│   ├── components/
│   ├── hooks/
│   └── index.tsx
├── auth/
└── admin/
```

## Migration Guide

To migrate to the feature-based structure:

1. Move `views/Home` → `features/home`
2. Move `views/Auth` → `features/auth`
3. Move `views/Admin` → `features/admin`
4. Update imports throughout the codebase
5. Co-locate feature-specific logic with components

## Best Practices

1. **Keep components small and focused**
2. **Extract reusable logic into hooks**
3. **Use TypeScript types for better type safety**
4. **Centralize constants and configurations**
5. **Use barrel exports (index.ts) for cleaner imports**
6. **Follow naming conventions**:
   - Components: PascalCase
   - Hooks: camelCase with 'use' prefix
   - Services: camelCase with '.service' suffix
   - Types: PascalCase with 'Type' or 'Interface' suffix
