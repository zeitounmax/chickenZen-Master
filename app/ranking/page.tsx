import RankingList from './components/RankingList';
import RankingFilter from './components/RankingFilter';

export default function RankingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-chinese-red">
        Classement
      </h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        <RankingFilter />
        <RankingList />
      </div>
    </div>
  );
}
