# Day 1: Wire Real Authentication

## Context
Day 0 uses mock cookie sessions. Day 1 replaces this with a real auth provider (Supabase Auth, NextAuth, etc.).

## Steps
1. Install auth provider package
2. Configure auth provider in `lib/auth.ts`
3. Update `proxy.ts` to use real session
4. Remove mock auth endpoints
5. Update login page to use real auth
6. Test auth flow end-to-end

## Validation
- [ ] Login redirects to real provider
- [ ] Session persists across page reloads
- [ ] Logout clears session
- [ ] Protected routes redirect to login
- [ ] User role is correctly assigned
