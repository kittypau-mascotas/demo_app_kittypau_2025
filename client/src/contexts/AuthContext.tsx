import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createAuthClient, useSession, useLogin, useLogout } from 'better-auth/react';
import { useLocation } from 'wouter'; // To redirect after login/logout if not handled by better-auth

// Initialize Better Auth client
// Ensure VITE_API_URL is correctly set in your .env file
const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  basePath: '/api/auth', // This should match your backend API auth routes
});

// Define the type of session
// Better Auth's useSession hook returns a session object or null
// with a `user` property if authenticated.
type Session = ReturnType<typeof useSession>['session'];

// Define the type of the context
interface AuthContextType {
  session: Session;
  isLoading: boolean;
  login: ReturnType<typeof useLogin>['login'];
  logout: ReturnType<typeof useLogout>['logout'];
  error: ReturnType<typeof useSession>['error'];
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { session, isLoading, error } = useSession(authClient);
  const { login } = useLogin(authClient);
  const { logout } = useLogout(authClient);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Optionally handle redirection after logout
    if (!session && !isLoading && !error && window.location.pathname !== '/login') {
      setLocation('/login');
    }
    // Optionally handle redirection after successful login if needed,
    // though typically the login function itself handles this.
  }, [session, isLoading, error, setLocation]);

  const value = useMemo(() => ({
    session,
    isLoading,
    login,
    logout,
    error,
  }), [session, isLoading, login, logout, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to consume the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
