import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken');

    if (!token) {
      return NextResponse.json({ message: 'Non authentifié' }, { status: 401 });
    }

    const { payload } = await jwtVerify(token.value, secret);

    if (!payload.email) {
      throw new Error('Token invalide');
    }

    return NextResponse.json({ 
      message: 'Authentifié',
      user: { email: payload.email }
    }, { status: 200 });
  } catch (error) {
    console.error('Erreur de vérification du token:', error);
    return NextResponse.json({ message: 'Token invalide' }, { status: 401 });
  }
}
