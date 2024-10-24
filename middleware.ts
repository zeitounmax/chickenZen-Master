import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes qui nécessitent une authentification
const protectedRoutes = ['/dashboard', '/chickens', '/ranking'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken');
  const { pathname } = request.nextUrl;

  // Vérifier si la route actuelle nécessite une authentification
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    // Si pas de token, rediriger vers la page d'accueil
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
