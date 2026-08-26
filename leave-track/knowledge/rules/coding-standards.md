# Coding Standards

## TypeScript
- Use strict TypeScript (`strict: true` in tsconfig)
- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable properties
- No `any` — use `unknown` and narrow
- Use branded types for IDs: `type UserId = string & { readonly __brand: 'UserId' }`

## React/Next.js
- Use Server Components by default
- Add `"use client"` only when needed (interactivity, browser APIs)
- Colocate component files in `components/features/[feature]/`
- Use `app/` directory structure for routing
- Prefer composition over prop drilling

## Error Handling
- All API responses: `{ success: false, error: { code, message } }`
- Use `createErrorResponse()` helper from `lib/errors.ts`
- Log errors with structured logger, not `console.log`
- Use AppError class for application errors

## Database
- Use Supabase client with connection pooling
- Always filter `is_deleted = false` for leave_requests
- Enforce `manager_id` filter in queries, not application logic
- Use transactions for multi-step operations

## Testing
- Write unit tests for utilities and helpers
- Write integration tests for API routes
- Use React Testing Library for component tests
- Aim for 80% coverage on critical paths

## Accessibility
- Use semantic HTML elements
- Add ARIA labels for interactive elements
- Ensure keyboard navigation works
- Maintain WCAG AA contrast ratios
