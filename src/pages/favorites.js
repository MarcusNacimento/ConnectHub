import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function FavoritesPage() {
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

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/api/ideas/list', { credentials: 'include' });
      const data = await res.json();
      const userId = user?.id;
  
      const favorites = (data.ideas || []).filter((idea) =>
        (idea.favorited_by || []).includes(userId)
      );
  
      setIdeas(favorites);
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <main className="max-w-4xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-wide">⭐ Minhas ideias favoritas</h2>

        {loading ? (
          <p className="text-center text-gray-600">Carregando favoritos...</p>
        ) : ideas.length === 0 ? (
          <p className="text-center text-gray-500">Você ainda não favoritou nenhuma ideia.</p>
        ) : (
          <div className="grid gap-6">
           {ideas.map((idea) => (
  <div
    key={idea.id}
    className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition relative"
  >
    <h3 className="text-lg font-semibold mb-1 text-blue-700">{idea.title}</h3>

    <p className="text-gray-700 leading-relaxed line-clamp-4">{idea.description}</p>

    <p className="text-sm text-gray-500 mt-2">por {idea.user_name}</p>

    <div className="flex gap-4 mt-4 flex-wrap">
      {idea.user_id === user?.id && (
        <>
          <button
            onClick={() => router.push(`/edit-idea/${idea.id}`)}
            className="text-sm bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
          >
            Editar
          </button>
          <button
            onClick={async () => {
              const confirmDelete = window.confirm('Deseja mesmo apagar esta ideia?');
              if (confirmDelete) {
                await fetch(`/api/ideas/delete?id=${idea.id}`, {
                  method: 'DELETE',
                  credentials: 'include',
                });
                fetchFavorites(); 
               }
            }}
            className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Excluir
          </button>
        </>
      )}
    </div>
  </div>
))}
          </div>
        )}
      </main>
    </div>
  );
}
