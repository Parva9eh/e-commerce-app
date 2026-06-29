import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders } from '@/lib/security-headers';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isApiRoute = request.nextUrl.pathname.startsWith('/api/');

  applySecurityHeaders(response, {
    isApiRoute,
    isProduction: process.env.NODE_ENV === 'production',
  });

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)'],
};