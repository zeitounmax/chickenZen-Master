'use client';

import { useEffect, useState } from 'react';

interface Ranking {
  chickenId: string;
  chickenName: string;
  totalEggs: number;
  totalWeight: number;
  averageWeight: number;
}

export default function RankingList() {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('week');

  const fetchRankings = async (selectedPeriod: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/ranking?period=${selectedPeriod}`);
      const data = await response.json();
      setRankings(data);
    } catch (error) {
      console.error('Erreur lors du chargement du classement:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankings(period);

    const handlePeriodChange = (event: Event) => {
      const newPeriod = (event as CustomEvent).detail;
      setPeriod(newPeriod);
      fetchRankings(newPeriod);
    };

    window.addEventListener('periodChange', handlePeriodChange);
    return () => window.removeEventListener('periodChange', handlePeriodChange);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="text-chinese-red">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Position</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nom</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Nombre d&apos;œufs</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Poids total (g)</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Poids moyen (g)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {rankings.map((ranking, index) => (
            <tr key={ranking.chickenId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`
                    font-bold text-lg
                    ${index === 0 ? 'text-chinese-gold' : ''}
                    ${index === 1 ? 'text-gray-400' : ''}
                    ${index === 2 ? 'text-[#CD7F32]' : ''}
                  `}>
                    {index + 1}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="font-medium text-chinese-red">{ranking.chickenName}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{ranking.totalEggs}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ranking.totalWeight.toFixed(1)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{ranking.averageWeight.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
