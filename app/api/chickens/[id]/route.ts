import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const chicken = await prisma.chicken.findUnique({
      where: { id: params.id },
      include: {
        eggs: {
          orderBy: {
            layDate: 'desc'
          }
        }
      }
    });

    if (!chicken) {
      return NextResponse.json(
        { error: 'Chicken not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(chicken);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error fetching chicken' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const data = await request.json();
    const chicken = await prisma.chicken.update({
      where: { id: params.id },
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
      { error: 'Error updating chicken' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // Supprimer d'abord tous les œufs liés à cette poule
    await prisma.egg.deleteMany({
      where: { chickenId: params.id }
    });

    // Ensuite supprimer la poule
    await prisma.chicken.delete({
      where: { id: params.id }
    });

    return NextResponse.json({ success: true });
  } catch (_error) {
    console.error('Error deleting chicken:', _error);
    return NextResponse.json(
      { error: 'Error deleting chicken' },
      { status: 500 }
    );
  }
}
