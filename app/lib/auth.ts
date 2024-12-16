import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key'
);

export async function getUserFromToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  
  if (!token) {
    throw new Error('Non authentifié');
  }

  const verified = await jwtVerify(token, secret);
  return verified.payload as { userId: string, email: string };
} 