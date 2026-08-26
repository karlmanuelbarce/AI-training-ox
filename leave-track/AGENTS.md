# LeaveTrack — Project Rules

## Project Description
LeaveTrack is an employee leave management system built with Next.js 16 and Supabase Postgres. It enables employees to submit leave requests, managers to approve/reject them, and HR admins to audit the process.

## Stack Summary
- **Frontend/Backend:** Next.js 16 (App Router), TypeScript
- **Database:** Postgres via Supabase
- **Auth:** Mock cookie sessions (Day 0), real provider wired Day 1
- **Deployment:** Vercel (app), Supabase (managed Postgres)

## Coding Standards

### TypeScript
- Use strict TypeScript (`strict: true` in tsconfig)
- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable properties
- No `any` — use `unknown` and narrow

### React/Next.js
- Use Server Components by default
- Add `"use client"` only when needed (interactivity, browser APIs)
- Colocate component files in `components/features/[feature]/`
- Use `app/` directory structure for routing

### Error Handling
- All API responses: `{ success: false, error: { code, message } }`
- Use `createErrorResponse()` helper from `lib/errors.ts`
- Log errors with structured logger, not `console.log`

### Database
- Use Supabase client with connection pooling
- Always filter `is_deleted = false` for leave_requests
- Enforce `manager_id` filter in queries, not application logic

## Security Rules
- Session cookie: httpOnly, 8h expiry, path=/
- Never hard-delete `leave_requests` — soft delete only
- Manager-scoped endpoints must filter by `manager_id` in query
- No secrets in client-side code — use `NEXT_PUBLIC_` prefix only for public vars

## Git Conventions
- Branch naming: `feat/`, `fix/`, `chore/`
- Commit messages: Conventional Commits (`feat:`, `fix:`, etc.)
- PR reviews required before merge
- No direct commits to `main`

## Quality Gates
- TypeScript compilation must pass
- ESLint must pass with no errors
- All pages must be responsive at 375px, 768px, 1024px, 1440px
- Accessibility: WCAG AA contrast, keyboard navigation
