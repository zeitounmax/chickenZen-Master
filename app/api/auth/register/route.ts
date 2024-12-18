import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcryptjs';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email et mot de passe requis' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Cet email est déjà utilisé' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    });

    const token = await new SignJWT({ userId: user.id, email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secret);

    const response = NextResponse.json(
      { message: 'Inscription réussie' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24
    });

    return response;
  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json(
      { message: "Erreur lors de l'inscription" },
      { status: 500 }
    );
  }
}
