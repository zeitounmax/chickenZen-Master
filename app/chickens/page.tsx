import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import ChickenList from './components/ChickenList';
import AddChickenForm from './components/AddChickenForm';

export default async function ChickensPage() {
  const chickens = await prisma.chicken.findMany({
    include: {
      _count: {
        select: { eggs: true }
      }
    }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-chinese-red">
        Gestion des Poules
      </h1>
      <AddChickenForm />
      <ChickenList chickens={chickens} />
    </div>
  );
}
