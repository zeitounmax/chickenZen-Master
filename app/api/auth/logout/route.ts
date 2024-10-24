import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { message: 'Déconnexion réussie' },
    { status: 200 }
  );

  response.cookies.set({
    name: 'authToken',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
}
