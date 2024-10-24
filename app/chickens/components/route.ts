import { NextResponse } from 'next/server';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const chicken = await prisma.chicken.create({
      data: {
        name: data.name,
        breed: data.breed,
        birthDate: new Date(data.birthDate),
        description: data.description
      }
    });
    return NextResponse.json(chicken);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error creating chicken' },
      { status: 500 }
    );
  }
}

export async function GET() {
  
  try {
    const chickens = await prisma.chicken.findMany({
      include: {
        _count: {
          select: { eggs: true }
        }
      }
    });
    return NextResponse.json(chickens);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching chickens' },
      { status: 500 }
    );
  }
}