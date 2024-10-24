import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

interface Egg {
  weight: number;
  layDate: Date;
}

interface ChickenRanking {
  chickenId: string;
  chickenName: string;
  totalEggs: number;
  totalWeight: number;
  averageWeight: number;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week';
    
    let startDate: Date, endDate: Date;
    const now = new Date();

    switch (period) {
      case 'month':
        startDate = startOfMonth(now);
        endDate = endOfMonth(now);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        break;
      default: // week
        startDate = startOfWeek(now);
        endDate = endOfWeek(now);
    }

    const rankings = await prisma.chicken.findMany({
      select: {
        id: true,
        name: true,
        eggs: {
          where: {
            layDate: {
              gte: startDate,
              lte: endDate
            }
          },
          select: {
            weight: true,
            layDate: true
          }
        }
      }
    });

    const formattedRankings: ChickenRanking[] = rankings
      .map(chicken => ({
        chickenId: chicken.id,
        chickenName: chicken.name,
        totalEggs: chicken.eggs.length,
        totalWeight: chicken.eggs.reduce((sum: number, egg: Egg) => sum + egg.weight, 0),
        averageWeight: chicken.eggs.length > 0 
          ? chicken.eggs.reduce((sum: number, egg: Egg) => sum + egg.weight, 0) / chicken.eggs.length 
          : 0
      }))
      .sort((a, b) => b.totalEggs - a.totalEggs);

    return NextResponse.json(formattedRankings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error calculating rankings' },
      { status: 500 }
    );
  }
}
