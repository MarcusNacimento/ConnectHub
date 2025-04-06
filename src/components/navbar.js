import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const fetchUser = async () => {
    const res = await fetch('/api/auth/me');
    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST',
      credentials: 'include',
     });
    router.push('/login');
  };

  return (
    <nav className="bg-white shadow p-4 mb-8 flex justify-between items-center">
      <Link href="/">
        <span className="text-xl font-bold text-blue-600 cursor-pointer">ConnectHub</span>
      </Link>
      <div className="flex gap-4 items-center">
        {user && router.pathname !== '/favorites' && (
          <Link href="/favorites">
            <span className="text-yellow-500 font-medium cursor-pointer hover:underline">⭐ Meus Favoritos</span>
          </Link>
        )}
        {user && (
          <Link href="/my-ideas">
            <span className="text-blue-500 font-medium cursor-pointer hover:underline">📌 Minhas Ideias</span>
          </Link>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:underline"
          >
            Sair
          </button>
        )}
      </div>
    </nav>
  );
}
