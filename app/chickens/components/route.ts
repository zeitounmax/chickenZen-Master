import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    const chickens = await prisma.chicken.findMany({
      include: {
        eggs: true
      }
    });
    return NextResponse.json(chickens);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error fetching chickens' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const chicken = await prisma.chicken.create({
      data: {
        name: data.name,
        breed: data.breed,
        birthDate: new Date(data.birthDate),
        description: data.description,
      }
    });
    return NextResponse.json(chicken);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error creating chicken' },
      { status: 500 }
    );
  }
}
