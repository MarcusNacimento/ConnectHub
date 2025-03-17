import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function CreateIdeaPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) {
        router.push('/login');
      }
    };
    checkAuth();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/ideas/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.error || 'Erro ao criar ideia');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Nova Ideia</h1>
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Criar
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}
