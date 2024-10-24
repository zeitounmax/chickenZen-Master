import { Egg } from 'lucide-react';

interface DashboardStatsProps {
  totalChickens: number;
  weeklyEggs: number;
  activeChickens: number;
}

export default function DashboardStats({ 
  totalChickens,
  weeklyEggs,
  activeChickens
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-red-100 rounded-full">
            <span className="text-2xl">🐔</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Poules</p>
            <p className="text-2xl font-bold text-[#DE2910]">{totalChickens}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-amber-100 rounded-full">
            <Egg className="w-6 h-6 text-[#FFDE00]" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Œufs cette semaine</p>
            <p className="text-2xl font-bold text-[#FFDE00]">{weeklyEggs}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <span className="text-2xl">🏆</span>
          </div>
          <div>
            <p className="text-sm text-gray-600">Poules actives</p>
            <p className="text-2xl font-bold text-[#00A86B]">{activeChickens}</p>
          </div>
        </div>
      </div>
    </div>
  );
}