"use client";
import { useState } from 'react';
import AddEggForm from './AddEggForm';

interface TopChicken {
  id: string;
  name: string;
  eggs: Array<{ weight: number }>;
}

interface RecentActivitiesProps {
  topChickens: TopChicken[];
}

export default function RecentActivities({ topChickens }: RecentActivitiesProps) {
  const [selectedChicken, setSelectedChicken] = useState<string | null>(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-bold text-chinese-red mb-4">Top Meilleures Pondeuses</h2>
      <div className="space-y-4">
        {topChickens.map((chicken, index) => (
          <div
            key={chicken.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                {index + 1}
              </div>
              <div>
                <p className="font-medium text-gray-900">{chicken.name}</p>
                <p className="text-sm text-gray-500">
                  {chicken.eggs.length} œufs cette semaine
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {chicken.eggs.reduce((sum, egg) => sum + egg.weight, 0)}g
                </p>
              </div>
              <button
                onClick={() => setSelectedChicken(chicken.id)}
                className="px-3 py-1 text-sm bg-[#DE2910] text-white rounded-md hover:bg-[#BE1900]"
              >
                + Œuf
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedChicken && (
        <AddEggForm
          chickenId={selectedChicken}
          onClose={() => setSelectedChicken(null)}
        />
      )}
    </div>
  );
}
