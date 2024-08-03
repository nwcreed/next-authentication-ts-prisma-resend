// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth'; // Ajustez le chemin selon la structure de votre projet

export async function middleware(req: NextRequest) {
  const session = await auth(req); // Passez la requête au middleware d'authentification

  if (!session?.user?.email && req.nextUrl.pathname === '/dashboard') {
    // Redirige vers la page de connexion si non authentifié
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Permet à la requête de continuer si l'utilisateur est authentifié ou si ce n'est pas la route /dashboard
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login/:path*'], // Applique le middleware uniquement aux routes spécifiées
};
