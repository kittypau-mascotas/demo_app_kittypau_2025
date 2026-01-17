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
type BetterAuthSession = ReturnType<typeof useSession>['session'];

// Extend the User type within the session to include activePetId
interface CustomSession extends BetterAuthSession {
  user?: {
    id: string;
    email: string;
    activePetId?: number; // Add activePetId to the user object
    // Add any other user-related fields from your backend
  };
}

// Define the type of the context
interface AuthContextType {
  session: CustomSession; // Use CustomSession
  isLoading: boolean;
  login: ReturnType<typeof useLogin>['login'];
  logout: ReturnType<typeof useLogout>['logout'];
  error: ReturnType<typeof useSession>['error'];
  setActivePet: (petId: number | null) => Promise<void>; // Function to set active pet
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

  const setActivePet = async (petId: number | null) => {
    try {
      const response = await fetch(`/api/pets/${petId}/activate`, { // Assuming this endpoint
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ activePetId: petId }),
      });
      if (!response.ok) {
        throw new Error('Failed to set active pet');
      }
      // Re-fetch session to update activePetId locally
      // Assuming useSession automatically refetches or we can trigger it.
      // For now, Better Auth's useSession doesn't provide a direct refetch method.
      // We might need to refresh the page or rely on polling if better-auth doesn't update session on its own
      setLocation(window.location.pathname); // Simple page refresh to re-fetch session
    } catch (err) {
      console.error('Error setting active pet:', err);
      // Handle error, e.g., with a toast notification
    }
  };

  const value = useMemo(() => ({
    session,
    isLoading,
    login,
    logout,
    error,
    setActivePet,
  }), [session, isLoading, login, logout, error, setActivePet]); // Include setActivePet in dependencies

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
