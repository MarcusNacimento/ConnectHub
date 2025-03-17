import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/navbar';

export default function EditIdeaPage() {
  const router = useRouter();
  const { id } = router.query;
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

  useEffect(() => {
    if (!id) return;
    const fetchIdea = async () => {
      const res = await fetch('/api/ideas/list');
      const data = await res.json();
      const idea = data.ideas.find((idea) => idea.id == id);
      if (idea) {
        setTitle(idea.title);
        setDescription(idea.description);
      }
    };
    fetchIdea();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/ideas/edit?id=${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    });

    if (res.ok) {
      router.push('/');
    } else {
      const data = await res.json();
      setError(data.error || 'Erro ao atualizar ideia');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Navbar />

      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Ideia</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
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
            Atualizar
          </button>
        </form>
        {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      </div>
    </div>
  );
}
