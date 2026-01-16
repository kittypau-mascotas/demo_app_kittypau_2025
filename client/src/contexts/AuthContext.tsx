import React from 'react';

export function useAuth() {
  return { user: null, loading: false, logout: () => {} };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
