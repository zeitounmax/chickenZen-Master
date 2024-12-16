import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/dashboard', '/chickens', '/ranking'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!token) {
      const url = new URL('/', request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/chickens/:path*', '/ranking/:path*'],
};
