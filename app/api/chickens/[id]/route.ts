import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching chicken' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Error updating chicken' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
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
  } catch (error) {
    console.error('Error deleting chicken:', error);
    return NextResponse.json(
      { error: 'Error deleting chicken' },
      { status: 500 }
    );
  }
}
