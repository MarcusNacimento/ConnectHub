import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-blue-600 cursor-pointer" onClick={() => router.push('/')}>
        ConnectHub
      </h1>
      <div className="text-right">
        {user ? (
          <>
            <p className="text-sm mb-1">Logado como <strong>{user.email}</strong></p>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Sair
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push('/login')}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
