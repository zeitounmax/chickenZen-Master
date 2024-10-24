import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Récupérer la période depuis les paramètres de requête
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || 'week';

    const chickens = await prisma.chicken.findMany({
      include: {
        eggs: {
          where: period === 'week' ? {
            layDate: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
            }
          } : undefined
        }
      }
    });

    // Calculer les statistiques pour chaque poule
    const rankings = chickens.map(chicken => {
      const totalEggs = chicken.eggs.length;
      const averageWeight = chicken.eggs.reduce((sum, egg) => sum + egg.weight, 0) / totalEggs || 0;
      
      // Calculer la fréquence de ponte (œufs par jour)
      let layingFrequency = 0;
      if (totalEggs > 0) {
        const firstEggDate = new Date(Math.min(...chicken.eggs.map(egg => egg.layDate.getTime())));
        const lastEggDate = new Date(Math.max(...chicken.eggs.map(egg => egg.layDate.getTime())));
        const daysDiff = (lastEggDate.getTime() - firstEggDate.getTime()) / (1000 * 60 * 60 * 24);
        layingFrequency = totalEggs / (daysDiff + 1); // +1 pour inclure le premier jour
      }

      // Calculer le score total
      const weightScore = averageWeight * 10; // Pondération du poids moyen
      const frequencyScore = layingFrequency * 100; // Pondération de la fréquence
      const totalScore = weightScore + frequencyScore;

      return {
        id: chicken.id,
        name: chicken.name,
        breed: chicken.breed,
        stats: {
          totalEggs,
          averageWeight: averageWeight.toFixed(2),
          layingFrequency: layingFrequency.toFixed(3),
          score: totalScore.toFixed(2)
        }
      };
    });

    // Trier par score
    rankings.sort((a, b) => parseFloat(b.stats.score) - parseFloat(a.stats.score));

    return NextResponse.json(rankings);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error calculating rankings' },
      { status: 500 }
    );
  }
}
