import prisma from './prisma';
import { startOfWeek, endOfWeek } from 'date-fns';

export async function getStats() {
  const weekStart = startOfWeek(new Date());
  const weekEnd = endOfWeek(new Date());

  const [totalChickens, weeklyStats, topChickens] = await Promise.all([
    prisma.chicken.count(),
    
    prisma.egg.findMany({
      where: {
        layDate: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
      include: {
        chicken: true,
      },
    }),
    
    prisma.chicken.findMany({
      include: {
        eggs: {
          where: {
            layDate: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
        },
      },
      orderBy: {
        eggs: {
          _count: 'desc',
        },
      },
      take: 5,
    }),
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
      },
    },
  });

  return {
    totalChickens,
    weeklyStats,
    topChickens,
    dailyStats,
  };
}