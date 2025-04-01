import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar';

export default function HomePage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [latestLimit, setLatestLimit] = useState(5);
  const [activeTab, setActiveTab] = useState('latest');
  const router = useRouter();

  const fetchIdeas = async () => {
    try {
      const res = await fetch('/api/ideas/list', {
        credentials: 'include',
      });
      const data = await res.json();
      setIdeas(data.ideas || []);
    } catch (err) {
      console.error('Erro ao buscar ideias:', err);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Erro ao buscar usuário:', err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchIdeas();
  }, []);

  const handleLike = async (id) => {
    await fetch('/api/ideas/like', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ideaId: id }),
      credentials: 'include',
    });
    fetchIdeas();
  };

  const handleFavorite = async (id) => {
    await fetch('/api/ideas/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ideaId: id }),
      credentials: 'include',
    });
    fetchIdeas();
  };

  const filteredIdeas = (ideas || []).filter((idea) => {
    const matchesTitle = idea.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAuthor = idea.user_name.toLowerCase().includes(searchAuthor.toLowerCase());
    return matchesTitle && matchesAuthor;
  });

  const latestIdeas = filteredIdeas.slice(0, latestLimit);
  const popularIdeas = [...filteredIdeas]
    .filter((idea) => (idea.likes || 0) > 0)
    .sort((a, b) => (b.likes || 0) - (a.likes || 0))
    .slice(0, 5);
  const favoriteIdeas = filteredIdeas.filter((idea) => idea.favorited_by?.includes(user?.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 mb-10 shadow-xl max-w-5xl mx-auto mt-6 transition hover:scale-[1.02]">
        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Compartilhe suas ideias 💡</h2>
        {user ? (
          <p className="mb-2 text-lg">Bem-vindo de volta, <strong>{user.name}</strong> 👋</p>
        ) : (
          <p className="mb-2 text-lg">Junte-se à comunidade e compartilhe suas ideias!</p>
        )}
        <p className="mb-5 text-lg max-w-2xl leading-relaxed">
          Transforme pensamentos em projetos reais. No ConnectHub, você publica ideias e colabora com outros inovadores!
        </p>
        <p className="text-sm mt-4 opacity-90">
          🌟 Já temos <strong>{ideas.length}</strong> ideias postadas na comunidade!
        </p>
        {!user ? (
          <button
            onClick={() => router.push('/login')}
            className="mt-5 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition hover:scale-105 shadow-md"
          >
            Comece agora
          </button>
        ) : (
          <button
            onClick={() => router.push('/create-idea')}
            className="mt-5 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition hover:scale-105 shadow-md"
          >
            Criar nova ideia
          </button>
        )}
      </div>

      <main className="max-w-5xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 tracking-wide">Ideias da Comunidade 💡</h2>

        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="🔍 Buscar por título..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <input
            type="text"
            placeholder="🔍 Buscar por autor..."
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-3">
            <button
              onClick={() => setActiveTab('latest')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === 'latest' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              🆕 Últimas ideias
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`px-4 py-2 rounded-lg font-semibold ${
                activeTab === 'favorites' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              ⭐ Favoritas
            </button>
          </div>

          {activeTab === 'latest' && (
            <select
              value={latestLimit}
              onChange={(e) => setLatestLimit(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-400"
            >
              <option value={3}>Mostrar 3</option>
              <option value={5}>Mostrar 5</option>
              <option value={10}>Mostrar 10</option>
            </select>
          )}

          {activeTab === 'favorites' && (
            <select
              value={latestLimit}
              onChange={(e) => setLatestLimit(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring focus:ring-yellow-400"
            >
              <option value={3}>Mostrar 3</option>
              <option value={5}>Mostrar 5</option>
              <option value={10}>Mostrar 10</option>
            </select>
          )}
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Carregando ideias...</p>
        ) : (
          <div className="grid gap-6">
            {(activeTab === 'latest' ? latestIdeas : favoriteIdeas.slice(0, latestLimit)).map((idea) => (
              <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-1 transition relative">
                <h3 className="text-lg font-semibold mb-1 text-blue-700">{idea.title}</h3>
                <p className="text-gray-700 leading-relaxed">{idea.description}</p>
                <p className="text-sm text-gray-500 mt-2">por {idea.user_name}</p>

                {user && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => handleLike(idea.id)}
                      className="flex items-center gap-1 text-red-600 hover:scale-105 transition"
                    >
                      ❤️ {idea.likes || 0}
                    </button>
                    <button
                      onClick={() => handleFavorite(idea.id)}
                      className="hover:scale-105 transition"
                    >
                      {idea.favorited_by?.includes(user.id) ? '⭐' : '☆'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
