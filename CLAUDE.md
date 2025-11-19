# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A professional CV website with a full-featured Content Management System (CMS) built with Next.js 15, TypeScript, Vercel Postgres, and Drizzle ORM. The site features a public CV website and a secure admin back office at `/nadia/backoffice` for managing all content.

**Tech Stack:**
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Framer Motion
- **Database**: Vercel Postgres (PostgreSQL) with Drizzle ORM
- **Authentication**: JWT with bcrypt password hashing
- **Storage**: Vercel Blob Storage for file uploads
- **Email**: Resend API for contact form
- **Deployment**: Vercel (serverless)

## Development Commands

### Running the Application
```bash
npm run dev              # Start development server with Turbopack
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Testing Commands
```bash
npm run test:e2e                # Run all E2E tests (Playwright)
npm run test:e2e:ui             # Run tests with Playwright UI
npm run test:e2e:headed         # Run tests in headed mode (visible browser)
npm run test:e2e:debug          # Debug tests with Playwright Inspector
npm run test:e2e:report         # Show test report
npm run test:e2e:chromium       # Run tests in Chromium only (faster)
npm run test:e2e:mobile         # Run tests in mobile viewport
```

**Important Testing Notes:**
- Tests require `.env.test` file with test database credentials
- Tests use Playwright and are configured in `playwright.config.ts`
- Test files are in `e2e/` directory
- Dev server auto-starts before tests run

### Database Operations
```bash
# Initialize database (creates tables and admin user)
# Visit: http://localhost:3000/api/init-db

# Run migrations manually
bun scripts/runMigration.mjs

# Note: Requires POSTGRES_URL in .env.local
```

## Architecture

### Route Structure

**Public Routes:**
- `/` - Main CV website (home page with all sections)
- `/api/*` - API endpoints (serverless functions)

**Admin Routes:**
- `/nadia` - Login page
- `/nadia/backoffice` - Full CMS back office interface

### Key Architectural Patterns

**1. Database Schema (src/lib/db/schema.ts)**
- **Three tables**: `users`, `content`, `content_backups`
- **Single Active Content Model**: Only one `content` row with `isActive: true`
- **Automatic Versioning**: Content version increments on each update
- **Auto-Backup System**: Before each content update, previous version is saved to `content_backups`

**2. Authentication Flow (src/lib/api.ts, src/app/api/auth/)**
- JWT access tokens (24h expiry) and refresh tokens (7d expiry)
- Tokens stored in localStorage
- Automatic token refresh on 401 responses via `ApiClient` class
- Token validation middleware in protected API routes
- Admin credentials set via environment variables

**3. Content Management**
- Content stored as JSONB for complex structures (experiences, skills, stats)
- Context provider (`TextContentContext.tsx`) manages content state
- Live preview in back office shows changes before saving
- All content editable through single back office page

**4. API Client Pattern (src/lib/api.ts)**
- Centralized `ApiClient` class with automatic token handling
- `TokenStorage` utility for localStorage operations
- Typed API responses with `AuthResponse` and `ContentResponse` interfaces
- Automatic retry with refreshed token on 401 errors

**5. File Upload Strategy**
- Images uploaded to Vercel Blob Storage via `/api/upload`
- Returns public URL for storage in database
- Protected route requiring authentication
- Used for profile images and CV/resume uploads

### Database Connection Pattern

**Lazy Initialization** (src/lib/db/connection.ts):
- Connection created only when needed (prevents build-time errors)
- Uses Proxy pattern to defer connection until first query
- Single connection instance reused across requests
- `initializeDatabase()` function creates tables with `IF NOT EXISTS` (safe to re-run)

### Content Sections

The `content` table stores all CV sections:
- **Hero**: Title, subtitle, description, image, stats array, CTA buttons
- **Loading Screen**: First name, last name, tagline (for initial animation)
- **About**: Bio, approach items array, impact metrics array, quote
- **Experience**: Array of job positions with achievements
- **Skills**: Categories array, proficiency levels, certifications, tools, soft skills
- **Achievements**: Metrics and milestones array
- **Contact**: Email, LinkedIn, phone, availability, contact form labels/placeholders

## Important Implementation Details

### Adding New Content Fields

When adding a new content field, update all of these:

1. **Database schema** (`src/lib/db/schema.ts`): Add field to `content` table
2. **Database initialization** (`src/lib/db/connection.ts`): Add field to `initializeDatabase()` SQL
3. **Content context** (`src/lib/TextContentContext.tsx`): Add to interface and default values
4. **Back office UI** (`src/app/nadia/backoffice/page.tsx`): Add input field to appropriate section
5. **Migration file** (`migrations/`): Create SQL file with `ALTER TABLE` statement
6. **Component usage**: Update relevant component if field needs to be displayed

### Protected API Routes Pattern

All admin API routes follow this pattern:
```typescript
// 1. Extract and verify JWT token from Authorization header
const authHeader = request.headers.get('authorization');
const token = authHeader?.replace('Bearer ', '');

// 2. Verify token with jwt.verify()
const decoded = jwt.verify(token, JWT_SECRET);

// 3. Perform operation with userId from decoded token
// 4. Return JSON response with { success, data?, message? }
```

### Environment Variables

Required environment variables (see `.env.example`):
- `POSTGRES_URL` - Database connection string (Vercel Postgres)
- `BLOB_READ_WRITE_TOKEN` - Vercel Blob Storage token
- `JWT_SECRET` - Secret for access tokens
- `REFRESH_TOKEN_SECRET` - Secret for refresh tokens
- `ADMIN_USERNAME` - Admin login username
- `ADMIN_PASSWORD` - Admin login password (hashed with bcrypt on initialization)
- `RESEND_API_KEY` - (Optional) For contact form emails
- `CONTACT_EMAIL_FROM` - (Optional) Email sender address
- `CONTACT_EMAIL_TO` - (Optional) Email recipient address

## Testing Strategy

**E2E Tests with Playwright:**
- Tests located in `e2e/` directory
- Helper functions in `e2e/helpers/` for auth and back office operations
- Tests cover: authentication, content management, contact form
- Uses separate `.env.test` configuration
- Auto-starts dev server before running tests

**Key Test Files:**
- `e2e/auth.spec.ts` - Login/logout flows
- `e2e/content-management.spec.ts` - Content CRUD operations
- `e2e/contact-form.spec.ts` - Contact form submission
- `e2e/helpers/auth.ts` - Reusable auth utilities
- `e2e/helpers/backoffice.ts` - Reusable back office utilities

## Common Development Patterns

### Updating Content via Back Office

The back office (`/nadia/backoffice/page.tsx`) is a single large component that:
1. Fetches content on mount using `contentApi.getContent()`
2. Stores in local state for editing
3. Shows live preview of changes
4. Saves to API with `contentApi.updateContent()` which creates backup first

### Adding New API Endpoints

Follow Next.js App Router conventions:
- Create `src/app/api/[endpoint]/route.ts`
- Export named functions: `GET`, `POST`, `PUT`, `DELETE`
- Use `NextRequest` and `NextResponse` types
- Return JSON with consistent format: `{ success: boolean, data?: any, message?: string }`

### Database Migrations

Migration pattern:
1. Create file in `migrations/` directory
2. Use `IF NOT EXISTS` or `IF EXISTS` for safety
3. Include rollback logic if needed
4. Run with `bun scripts/runMigration.mjs`
5. Safe to re-run (idempotent)

## Security Considerations

- All passwords hashed with bcrypt (12 rounds)
- JWT tokens expire (24h access, 7d refresh)
- Protected routes verify tokens on every request
- SQL injection prevented by Drizzle ORM parameterized queries
- File uploads authenticated and validated
- CORS and security headers configured in Next.js

## Key Dependencies

- **next** (15.5.4) - Framework
- **drizzle-orm** - Type-safe ORM
- **postgres** - PostgreSQL client
- **@vercel/blob** - File storage
- **@vercel/postgres** - Managed database
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **framer-motion** - Animations
- **resend** - Email service
- **@playwright/test** - E2E testing

## Documentation

Comprehensive documentation available in `docs/`:
- `GETTING_STARTED.md` - Local setup (start here)
- `DEVELOPER_GUIDE.md` - Full architecture and development guide
- `API_REFERENCE.md` - API endpoint documentation
- `TESTING.md` - Testing guide
- `VERCEL_DEPLOYMENT.md` - Production deployment
- `CUSTOMIZATION.md` - Customization options
- `CONTACT_FORM_SETUP.md` - Email setup with Resend

## Notes for AI Assistants

- When modifying database schema, always update all 6 locations listed in "Adding New Content Fields"
- The admin route is `/nadia` (customizable, but don't change without updating all references)
- Use `npm` for commands (package manager agnostic, but npm scripts work everywhere)
- Lazy database connection prevents build-time errors - maintain this pattern
- Single active content row pattern is intentional - don't create multiple content rows
- Back office is intentionally a single large component for simpler state management
- Always preserve the backup system when modifying content updates
