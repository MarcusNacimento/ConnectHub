import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function SessionTimer({ tokenExp }) {
  const [timeLeft, setTimeLeft] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!tokenExp) return;

    const interval = setInterval(async () => {
      const now = Date.now();
      const diff = Math.max(0, tokenExp - now);
      setTimeLeft(diff);

      if (diff <= 0) {
        clearInterval(interval);

        await fetch('/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [tokenExp]);

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <div className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg text-sm z-50">
      Sessão expira em: {minutes}:{seconds.toString().padStart(2, '0')}
    </div>
  );
}
