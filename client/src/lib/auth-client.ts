import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Tipos de usuario
export interface User {
  id: string;
  email: string;
  name: string;
}

// Hook para obtener la sesión actual
export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: async (): Promise<{ user: User | null }> => {
      const res = await fetch('/api/auth/me');
      if (!res.ok) return { user: null };
      return res.json();
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });
}

// Hook para cerrar sesión
export function useSignOut() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
    },
    onSuccess: () => {
      queryClient.setQueryData(['session'], { user: null });
      window.location.href = '/login';
    },
  });
}