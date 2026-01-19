import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { createAuthClient } from 'better-auth/react';
import { useLocation } from 'wouter'; // To redirect after login/logout if not handled by better-auth
import { logger } from '@/lib/logger'; // Import logger

// Initialize Better Auth client
// Ensure VITE_API_URL is correctly set in your .env file
const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  basePath: '/api/auth', // This should match your backend API auth routes
});

type AuthClient = typeof authClient;

// Define the type of session
// Better Auth's useSession hook returns a session object or null
// with a `user` property if authenticated.
type SessionResult = ReturnType<AuthClient['useSession']>;
type SessionData = SessionResult['data']; // { session: ..., user: ... } | null

// Extend the User type within the session to include activePetId
// We define CustomSession to match the shape of 'data' returned by useSession
interface CustomSession {
  session: NonNullable<SessionData>['session'];
  user: NonNullable<SessionData>['user'] & {
    activePetId?: number;
  };
}

// Define the type of the context
interface AuthContextType {
  session: CustomSession | null; // Use CustomSession
  isLoading: boolean;
  signIn: AuthClient['signIn'];
  signOut: AuthClient['signOut'];
  error: SessionResult['error'];
  setActivePet: (petId: number | null) => Promise<void>; // Function to set active pet
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth Provider Component
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, isPending, error } = authClient.useSession();
  const session = data as CustomSession | null; // Cast data to our CustomSession type
  
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Optionally handle redirection after logout
    if (!session && !isPending && !error && window.location.pathname !== '/login') {
      logger.info('User logged out or session expired. Redirecting to login.', { context: 'AuthContext' });
      setLocation('/login');
    }
    if (error) {
      logger.error('Authentication error:', { context: 'AuthContext', payload: error });
    }
    // Optionally handle redirection after successful login if needed,
    // though typically the login function itself handles this.
  }, [session, isPending, error, setLocation]);

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
    } catch (err: any) {
      logger.error('Error setting active pet:', { context: 'AuthContext', payload: err });
      // Handle error, e.g., with a toast notification
    }
  };

  const value = useMemo(() => ({
    session,
    isLoading: isPending,
    signIn: authClient.signIn,
    signOut: authClient.signOut,
    error,
    setActivePet,
  }), [session, isPending, error, setActivePet]); // Include setActivePet in dependencies

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
