import { useState } from 'react';

interface AddEggFormProps {
  onClose: () => void;
  chickenId: string;
}

export default function AddEggForm({ onClose, chickenId }: AddEggFormProps) {
  const [weight, setWeight] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/chickens/${chickenId}/eggs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: parseFloat(weight),
          layDate: new Date(),
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add egg');
      }

      onClose();
      window.location.reload();
    } catch (error) {
      console.error('Error adding egg:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-chinese-red">
          Ajouter un œuf
          <span className="block text-sm font-normal text-chinese-gold">添加鸡蛋</span>
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Poids (en grammes)
            </label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-1 block w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-chinese-red rounded-md hover:bg-chinese-red/90 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Ajout...' : 'Ajouter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
