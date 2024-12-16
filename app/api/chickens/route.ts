import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getUserFromToken } from '@/app/lib/auth';

export async function GET() {
  try {
    const chickens = await prisma.chicken.findMany({
      include: {
        _count: {
          select: { eggs: true }
        },
        eggs: {
          orderBy: {
            layDate: 'desc'
          },
          take: 1,
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

export async function POST(request: Request) {
  try {
    const { userId } = await getUserFromToken();
    const data = await request.json();
    
    if (!data.name || !data.birthDate) {
      return NextResponse.json(
        { message: 'Le nom et la date de naissance sont requis' },
        { status: 400 }
      );
    }

    const birthDate = new Date(data.birthDate);
    if (isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { message: 'Format de date invalide' },
        { status: 400 }
      );
    }

    const chicken = await prisma.chicken.create({
      data: {
        name: data.name,
        breed: data.breed || '',
        birthDate: birthDate,
        description: data.description || '',
        userId: userId
      }
    });

    return NextResponse.json({ 
      message: 'Poule créée avec succès',
      chicken 
    }, { 
      status: 201 
    });

  } catch (error) {
    console.error('Erreur serveur:', error);
    return NextResponse.json(
      { message: 'Erreur lors de la création de la poule' },
      { status: 500 }
    );
  }
}
