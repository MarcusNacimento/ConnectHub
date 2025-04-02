import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';

export default function IdeaPage() {
  const router = useRouter();
  const { id } = router.query;
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchIdea = async () => {
      try {
        const res = await fetch(`/api/ideas/${id}`);
        const data = await res.json();
        setIdea(data.idea);
      } catch (err) {
        console.error('Erro ao buscar ideia:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="max-w-3xl mx-auto p-6 mt-10 bg-white rounded-xl shadow-md">
        {loading ? (
          <p className="text-center text-gray-600">Carregando ideia...</p>
        ) : !idea ? (
          <p className="text-center text-red-600">Ideia não encontrada.</p>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-blue-700 mb-4">{idea.title}</h1>
            <p className="text-gray-800 whitespace-pre-line leading-relaxed mb-4">{idea.description}</p>
            <p className="text-sm text-gray-500 mb-6">Por {idea.user_name}</p>
          </>
        )}
      </div>
    </div>
  );
}
