import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUser({ id: userId });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}