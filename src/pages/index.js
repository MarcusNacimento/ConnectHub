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
  const router = useRouter();

  const fetchIdeas = async () => {
    const res = await fetch('/api/ideas/list');
    const data = await res.json();
    setIdeas(data.ideas);
    setLoading(false);
  };

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchIdeas();
  }, []);

  const filteredIdeas = ideas.filter((idea) => {
    const matchesTitle = idea.title.toLowerCase().includes(searchTitle.toLowerCase());
    const matchesAuthor = idea.user_name.toLowerCase().includes(searchAuthor.toLowerCase());
    return matchesTitle && matchesAuthor;
  });

  const featuredIdea = filteredIdeas[0];
  const otherIdeas = filteredIdeas.slice(1);
  const latestIdeas = otherIdeas.slice(0, latestLimit);
  const popularIdeas = otherIdeas.filter(idea => idea.description.length > 50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />

      {/* HERO SECTION */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl p-10 mb-10 shadow-xl max-w-5xl mx-auto mt-6 transition hover:scale-[1.02]">
        <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Compartilhe suas ideias 💡</h2>
        {user ? (
          <p className="mb-2 text-lg">Bem-vindo de volta, <strong>{user.email}</strong> 👋</p>
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

        {/* FILTROS */}
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

        {/* IDEIA EM DESTAQUE */}
        {featuredIdea && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 mb-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <h3 className="text-2xl font-bold text-yellow-700 mb-2">🌟 Ideia em Destaque</h3>
            <h4 className="text-xl font-semibold text-yellow-800">{featuredIdea.title}</h4>
            <p className="text-gray-700 mt-2 leading-relaxed">{featuredIdea.description}</p>
            <p className="text-sm text-gray-600 mt-2">por {featuredIdea.user_name}</p>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Carregando ideias...</p>
        ) : (
          <>
            {/* ÚLTIMAS IDEIAS */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-700">🆕 Últimas ideias</h3>
                <select
                  value={latestLimit}
                  onChange={(e) => setLatestLimit(Number(e.target.value))}
                  className="border px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring focus:ring-blue-400"
                >
                  <option value={3}>Mostrar 3</option>
                  <option value={5}>Mostrar 5</option>
                  <option value={10}>Mostrar 10</option>
                </select>
              </div>
              <div className="grid gap-6">
                {latestIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-1 transition">
                    <h3 className="text-lg font-semibold mb-1 text-blue-700">{idea.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{idea.description}</p>
                    <p className="text-sm text-gray-500 mt-2">por {idea.user_name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* IDEIAS POPULARES */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-gray-700">🔥 Ideias populares</h3>
              <div className="grid gap-6">
                {popularIdeas.map((idea) => (
                  <div key={idea.id} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg hover:translate-y-1 transition">
                    <h3 className="text-lg font-semibold mb-1 text-blue-700">{idea.title}</h3>
                    <p className="text-gray-700 leading-relaxed">{idea.description}</p>
                    <p className="text-sm text-gray-500 mt-2">por {idea.user_name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
