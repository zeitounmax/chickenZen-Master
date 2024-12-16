import { Suspense } from 'react';
import { prisma } from '../lib/prisma';
import { startOfWeek, endOfWeek } from 'date-fns';
import DashboardStats from './components/DashboardStats';
import DashboardChart from './components/DashboardChart';
import RecentActivities from '../dashboard/components/RecentsActivities';

export default async function DashboardPage() {
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

  
  const topChickens = await prisma.chicken.findMany({
    include: {
      eggs: {
        where: {
          layDate: {
            gte: weekStart,
            lte: weekEnd,
          }
        },
        select: {
          layDate: true,
          weight: true,
        },
        orderBy: {
          layDate: 'desc',
        },
      },
    },
    orderBy: {
      eggs: {
        _count: 'desc',
      },
    },
    take: 5,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-[#DE2910]">
        Tableau de Bord
      </h1>

      <Suspense fallback={<div>Chargement des statistiques...</div>}>
        <DashboardStats
          totalChickens={totalChickens}
          weeklyEggs={weeklyEggs}
          activeChickens={activeChickens}
        />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Suspense fallback={<div>Chargement du graphique...</div>}>
          <DashboardChart 
            dailyStats={dailyStats.map(stat => ({
              ...stat,
              _sum: { weight: stat._sum.weight ?? 0 }
            }))}
          />
        </Suspense>

        <Suspense fallback={<div>Chargement du classement...</div>}>
          <RecentActivities topChickens={topChickens} />
        </Suspense>
      </div>
    </div>
  );
}