'use client';

import { useState } from 'react';

export default function RankingFilter() {
  const [period, setPeriod] = useState('week');

  const handlePeriodChange = (newPeriod: string) => {
    setPeriod(newPeriod);
    window.dispatchEvent(new CustomEvent('periodChange', { detail: newPeriod }));
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <button
          onClick={() => handlePeriodChange('week')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            period === 'week'
              ? 'bg-chinese-red text-white'
              : 'bg-gray-100 hover:bg-chinese-gold/20 text-gray-700'
          }`}
        >
          Cette semaine
        </button>
        <button
          onClick={() => handlePeriodChange('month')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            period === 'month'
              ? 'bg-chinese-red text-white'
              : 'bg-gray-100 hover:bg-chinese-gold/20 text-gray-700'
          }`}
        >
          Ce mois
        </button>
        <button
          onClick={() => handlePeriodChange('year')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            period === 'year'
              ? 'bg-chinese-red text-white'
              : 'bg-gray-100 hover:bg-chinese-gold/20 text-gray-700'
          }`}
        >
          Cette année
        </button>
      </div>
    </div>
  );
}
