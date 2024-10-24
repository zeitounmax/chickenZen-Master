"use client";
import { useRouter } from 'next/navigation';
import { Feather, Egg, Award } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
       
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-chinese-red mb-4">
            ChickZen 
            <span className="block text-2xl text-amber-600">混合鸡禅师</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Harmonisez votre élevage de poules avec sagesse et précision
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div 
            onClick={() => router.push('/dashboard')}
            className="group cursor-pointer bg-white rounded-xl shadow-md p-8 border border-red-100 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <Feather className="w-12 h-12 text-chinese-red mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-chinese-red mb-2">Tableau de Bord</h2>
            <p className="text-gray-600">Visualisez les performances de votre élevage en un coup d'œil</p>
          </div>

          <div 
            onClick={() => router.push('/chickens')}
            className="group cursor-pointer bg-white rounded-xl shadow-md p-8 border border-red-100 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <Egg className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-chinese-red mb-2">Mes Poules</h2>
            <p className="text-gray-600">Gérez votre poulailler et suivez la production d'œufs</p>
          </div>

          <div 
            onClick={() => router.push('/ranking')}
            className="group cursor-pointer bg-white rounded-xl shadow-md p-8 border border-red-100 hover:shadow-lg transition-all hover:-translate-y-1"
          >
            <Award className="w-12 h-12 text-amber-600 mb-4 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold text-chinese-red mb-2">Classement</h2>
            <p className="text-gray-600">Découvrez vos meilleures pondeuses de la semaine</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 italic">
            "La patience est la clé de l'harmonie avec vos poules" - <span className="text-chinese-red">鸡禅师</span>
          </p>
        </div>
      </div>
    </div>
  );
}
