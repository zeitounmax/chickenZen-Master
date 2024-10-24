'use client';

import { useState } from 'react';

export default function AddChickenForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    birthDate: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/chickens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create chicken');
      }

      setFormData({
        name: '',
        breed: '',
        birthDate: '',
        description: ''
      });
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      console.error('Error creating chicken:', error);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full bg-chinese-red text-white px-4 py-3 rounded-lg hover:bg-chinese-red/90 transition-colors flex items-center justify-center space-x-2"
      >
        <span>Ajouter une nouvelle poule</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
          required
        />
      </div>

      <div>
        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
          Race
        </label>
        <input
          type="text"
          id="breed"
          value={formData.breed}
          onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
          className="mt-1 w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
        />
      </div>

      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">
          Date de naissance
        </label>
        <input
          type="date"
          id="birthDate"
          value={formData.birthDate}
          onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
          className="mt-1 w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 w-full p-2 border rounded focus:border-chinese-red focus:ring-1 focus:ring-chinese-red"
          rows={3}
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-chinese-red text-white px-4 py-2 rounded hover:bg-chinese-red/90 transition-colors"
        >
          Ajouter
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="flex-1 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
