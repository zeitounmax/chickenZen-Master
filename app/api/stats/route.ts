import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { startOfWeek, endOfWeek } from 'date-fns';

export async function GET() {
  try {
    const weekStart = startOfWeek(new Date());
    const weekEnd = endOfWeek(new Date());

    const [totalChickens, weeklyEggs, activeChickens] = await Promise.all([
      prisma.chicken.count(),
      prisma.egg.count({
        where: {
          layDate: {
            gte: weekStart,
            lte: weekEnd,
          }
        }
      }),
      prisma.chicken.count({
        where: {
          eggs: {
            some: {
              layDate: {
                gte: weekStart,
                lte: weekEnd,
              }
            }
          }
        }
      })
    ]);

    const dailyStats = await prisma.egg.groupBy({
      by: ['layDate'],
      _count: {
        id: true,
      },
      _sum: {
        weight: true,
      },
      where: {
        layDate: {
          gte: weekStart,
          lte: weekEnd,
        }
      },
      orderBy: {
        layDate: 'asc',
      }
    });

    return NextResponse.json({
      totalChickens,
      weeklyEggs,
      activeChickens,
      dailyStats
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error fetching stats' },
      { status: 500 }
    );
  }
}
