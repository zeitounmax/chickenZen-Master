import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const eggs = await prisma.egg.findMany({
      include: {
        chicken: true
      },
      orderBy: {
        layDate: 'desc'
      }
    });
    return NextResponse.json(eggs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching eggs' },
      { status: 500 }
    );
  }
}
