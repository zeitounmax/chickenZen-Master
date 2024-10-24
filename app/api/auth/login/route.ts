import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

const defaultEmail = process.env.DEFAULT_USER_EMAIL;
const defaultPassword = process.env.DEFAULT_USER_PASSWORD;

const users = [
  {
    email: defaultEmail,
    password: defaultPassword
  }
];

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log('Tentative de connexion:', { 
      providedEmail: email,
      expectedEmail: defaultEmail,
      passwordMatch: password === defaultPassword 
    });

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    if (!defaultEmail || !defaultPassword) {
      console.error('Variables d\'environnement manquantes:', {
        DEFAULT_USER_EMAIL: defaultEmail,
        DEFAULT_USER_PASSWORD: !!defaultPassword
      });
      return NextResponse.json(
        { message: 'Erreur de configuration du serveur' },
        { status: 500 }
      );
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return NextResponse.json(
        { message: 'Email ou mot de passe incorrect' },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json(
      { message: 'Connexion réussie' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 heures
    });

    return response;
  } catch (_error) {
    console.error('Erreur de connexion:', _error);
    return NextResponse.json(
      { message: 'Erreur lors de la connexion' },
      { status: 500 }
    );
  }
}
