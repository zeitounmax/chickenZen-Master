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
    const eggs = await prisma.egg.findMany({
      where: { chickenId: params.id },
      orderBy: { layDate: 'desc' }
    });
    return NextResponse.json(eggs);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error fetching eggs' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const data = await request.json();
    const egg = await prisma.egg.create({
      data: {
        chickenId: params.id,
        weight: data.weight,
        layDate: new Date(data.layDate || new Date()),
        notes: data.notes,
      }
    });
    return NextResponse.json(egg);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error creating egg' },
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
    const egg = await prisma.egg.update({
      where: { 
        id: data.id,
        chickenId: params.id 
      },
      data: {
        weight: data.weight,
        layDate: new Date(data.layDate),
        notes: data.notes,
      }
    });
    return NextResponse.json(egg);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error updating egg' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const url = new URL(request.url);
    const eggId = url.searchParams.get('eggId');
    
    if (!eggId) {
      return NextResponse.json(
        { error: 'Egg ID is required' },
        { status: 400 }
      );
    }

    await prisma.egg.delete({
      where: { 
        id: eggId,
        chickenId: params.id 
      }
    });
    return NextResponse.json({ success: true });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error deleting egg' },
      { status: 500 }
    );
  }
}
