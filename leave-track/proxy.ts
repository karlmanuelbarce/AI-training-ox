import { type NextRequest, NextResponse } from 'next/server';

const MOCK_ROLE_COOKIE = 'mock-role';

const publicPaths = ['/login', '/api/health', '/api/mock-login', '/api/jobs'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicPath = publicPaths.some(
    (path) => pathname === path || pathname.startsWith(path + '/')
  );

  const mockRole = request.cookies.get(MOCK_ROLE_COOKIE)?.value;

  if (!mockRole && !isPublicPath) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (mockRole && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  if (mockRole && !isPublicPath) {
    const response = NextResponse.next();
    response.headers.set('x-mock-role', mockRole);
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};
