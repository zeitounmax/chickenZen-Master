import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    // Récupérer toutes les poules avec leurs œufs
    const chickens = await prisma.chicken.findMany({
      include: {
        eggs: true
      }
    });

    // Calculer les statistiques globales
    const totalChickens = chickens.length;
    const totalEggs = chickens.reduce((sum, chicken) => sum + chicken.eggs.length, 0);
    
    // Calculer la moyenne des œufs par poule
    const averageEggsPerChicken = totalEggs / totalChickens || 0;

    // Calculer le poids moyen des œufs
    let totalWeight = 0;
    chickens.forEach(chicken => {
      chicken.eggs.forEach(egg => {
        totalWeight += egg.weight;
      });
    });
    const averageEggWeight = totalWeight / totalEggs || 0;

    // Trouver la meilleure pondeuse
    let bestLayer = null;
    let maxEggs = 0;
    chickens.forEach(chicken => {
      if (chicken.eggs.length > maxEggs) {
        maxEggs = chicken.eggs.length;
        bestLayer = {
          name: chicken.name,
          totalEggs: chicken.eggs.length
        };
      }
    });

    const stats = {
      totalChickens,
      totalEggs,
      averageEggsPerChicken: averageEggsPerChicken.toFixed(2),
      averageEggWeight: averageEggWeight.toFixed(2),
      bestLayer
    };

    return NextResponse.json(stats);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Error calculating statistics' },
      { status: 500 }
    );
  }
}
