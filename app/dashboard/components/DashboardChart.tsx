'use client';

interface DailyStatsProps {
  dailyStats: Array<{
    layDate: Date;
    _count: { id: number };
    _sum: { weight: number };
  }>;
}

export default function DashboardChart({ dailyStats }: DailyStatsProps) {
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-red-100">
      <h2 className="text-xl font-bold text-chinese-red mb-4">Production Hebdomadaire</h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr>
              {days.map(day => (
                <th key={day} className="p-2 text-center border-b border-gray-200">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {days.map((day, index) => {
                const dayStats = dailyStats[index] || { _count: { id: 0 }, _sum: { weight: 0 } };
                return (
                  <td key={day} className="p-2 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-chinese-red">
                        {dayStats._count.id}
                      </span>
                      <span className="text-sm text-gray-500">
                        {dayStats._sum.weight}g
                      </span>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Statistiques totales */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Total Œufs</h3>
          <p className="text-2xl font-bold text-chinese-red">
            {dailyStats.reduce((sum, day) => sum + day._count.id, 0)}
          </p>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-600">Poids Total</h3>
          <p className="text-2xl font-bold text-chinese-gold">
            {dailyStats.reduce((sum, day) => sum + (day._sum.weight || 0), 0)}g
          </p>
        </div>
      </div>

      {/* Moyennes */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-gray-600">Moyenne par Jour</h3>
          <p className="text-xl font-bold text-gray-800">
            {Math.round(dailyStats.reduce((sum, day) => sum + day._count.id, 0) / days.length)} œufs
          </p>
        </div>
        <div className="p-4 rounded-lg border border-red-100">
          <h3 className="text-sm font-medium text-gray-600">Poids Moyen/Œuf</h3>
          <p className="text-xl font-bold text-gray-800">
            {Math.round(
              dailyStats.reduce((sum, day) => sum + (day._sum.weight || 0), 0) /
              dailyStats.reduce((sum, day) => sum + day._count.id, 0)
            )}g
          </p>
        </div>
      </div>
    </div>
  );
}