import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function MyIdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    } else {
      router.push('/login');
    }
  };

  const fetchMyIdeas = async () => {
    const res = await fetch('/api/ideas/list');
    const data = await res.json();
    const userId = user?.id;
    const mine = data.ideas.filter((idea) => idea.user_id === userId);
    setIdeas(mine);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await fetch(`/api/ideas/delete?id=${id}`, { method: 'DELETE' });
    fetchMyIdeas();
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchMyIdeas();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 tracking-wide">Minhas ideias 📌</h2>
          <button
            onClick={() => router.push('/create-idea')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Criar Ideia
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Carregando ideias...</p>
        ) : ideas.length === 0 ? (
          <p className="text-center text-gray-500">Você ainda não criou nenhuma ideia.</p>
        ) : (
          <div className="grid gap-6">
            {ideas.map((idea) => (
              <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h3 className="text-lg font-semibold mb-1 text-blue-700">{idea.title}</h3>
                <p className="text-gray-700 leading-relaxed">{idea.description}</p>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => router.push(`/edit-idea/${idea.id}`)}
                    className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(idea.id)}
                    className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
