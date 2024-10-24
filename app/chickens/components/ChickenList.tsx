'use client';

import { useState } from 'react';
import { Chicken } from '@prisma/client';
import { Edit, Trash2, Plus } from 'lucide-react';
import AddEggForm from '@/app/dashboard/components/AddEggForm';

interface ChickenListProps {
  chickens: (Chicken & {
    _count: {
      eggs: number;
    };
  })[];
}

export default function ChickenList({ chickens }: ChickenListProps) {
  const [selectedChicken, setSelectedChicken] = useState<string | null>(null);
  const [editingChicken, setEditingChicken] = useState<Chicken | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette poule ?')) {
      return;
    }

    try {
      const response = await fetch(`/api/chickens/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chicken');
      }

      window.location.reload();
    } catch (error) {
      console.error('Error deleting chicken:', error);
    }
  };

  const handleUpdate = async (chicken: Chicken) => {
    try {
      const response = await fetch(`/api/chickens/${chicken.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: chicken.name,
          breed: chicken.breed,
          birthDate: chicken.birthDate,
          description: chicken.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update chicken');
      }

      setEditingChicken(null);
      window.location.reload();
    } catch (error) {
      console.error('Error updating chicken:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {chickens.map((chicken) => (
        <div key={chicken.id} className="bg-white rounded-lg shadow-lg p-6">
          {editingChicken?.id === chicken.id ? (
            <div className="space-y-4">
              <input
                type="text"
                value={editingChicken.name}
                onChange={(e) => setEditingChicken({ ...editingChicken, name: e.target.value })}
                className="w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
                placeholder="Nom"
              />
              <input
                type="text"
                value={editingChicken.breed || ''}
                onChange={(e) => setEditingChicken({ ...editingChicken, breed: e.target.value })}
                className="w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
                placeholder="Race"
              />
              <input
                type="date"
                value={new Date(editingChicken.birthDate).toISOString().split('T')[0]}
                onChange={(e) => setEditingChicken({ 
                  ...editingChicken, 
                  birthDate: new Date(e.target.value) 
                })}
                className="w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
              />
              <textarea
                value={editingChicken.description || ''}
                onChange={(e) => setEditingChicken({ 
                  ...editingChicken, 
                  description: e.target.value 
                })}
                className="w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
                placeholder="Description"
                rows={3}
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUpdate(editingChicken)}
                  className="flex-1 bg-chinese-red text-white px-4 py-2 rounded hover:bg-chinese-red/90 transition-colors"
                >
                  Sauvegarder
                </button>
                <button
                  onClick={() => setEditingChicken(null)}
                  className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-chinese-red">{chicken.name}</h3>
                  <p className="text-gray-600">{chicken.breed}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingChicken(chicken)}
                    className="p-2 text-gray-600 hover:text-chinese-gold transition-colors"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(chicken.id)}
                    className="p-2 text-gray-600 hover:text-chinese-red transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Née le: {new Date(chicken.birthDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  Œufs pondus: {chicken._count.eggs}
                </p>
                {chicken.description && (
                  <p className="text-sm text-gray-600 mt-2">{chicken.description}</p>
                )}
              </div>

              <button
                onClick={() => setSelectedChicken(chicken.id)}
                className="mt-4 w-full flex items-center justify-center space-x-2 bg-chinese-gold/20 text-chinese-red px-4 py-2 rounded-md hover:bg-chinese-gold/30 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un œuf</span>
              </button>
            </>
          )}
        </div>
      ))}

      {selectedChicken && (
        <AddEggForm
          chickenId={selectedChicken}
          onClose={() => setSelectedChicken(null)}
        />
      )}
    </div>
  );
}
