import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { UserRole, Session } from '@/types';

const MOCK_ROLE_COOKIE = 'mock-role';
const MOCK_USER_COOKIE = 'mock-user-id';
const SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours

export async function getMockSession(): Promise<Session | null> {
  if (process.env.MOCK_AUTH_ENABLED !== 'true') {
    return null;
  }

  const cookieStore = await cookies();
  const role = cookieStore.get(MOCK_ROLE_COOKIE)?.value;
  const userId = cookieStore.get(MOCK_USER_COOKIE)?.value;

  if (!role || !isValidRole(role) || !userId) {
    return null;
  }

  return {
    userId,
    role: role as UserRole,
  };
}

export async function setMockSession(role: UserRole, userId: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(MOCK_ROLE_COOKIE, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000,
  });
  cookieStore.set(MOCK_USER_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000,
  });
}

export async function clearMockSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(MOCK_ROLE_COOKIE);
  cookieStore.delete(MOCK_USER_COOKIE);
}

export function createMockLoginResponse(role: UserRole, userId: string): NextResponse {
  const response = NextResponse.json({ success: true, data: { role } });
  response.cookies.set(MOCK_ROLE_COOKIE, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000,
  });
  response.cookies.set(MOCK_USER_COOKIE, userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_DURATION / 1000,
  });
  return response;
}

export function redirectIfUnauthenticated(
  request: NextRequest,
  session: Session | null
): NextResponse | null {
  const publicPaths = ['/login', '/api/health', '/api/mock-login'];
  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path
  );

  if (!session && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (session && request.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return null;
}

function isValidRole(role: string): boolean {
  return ['employee', 'manager', 'hr_admin'].includes(role);
}
