// Mock AuthContext
import React, { createContext, useContext, useMemo } from 'react';

// 1. Defino el tipo de sesión que espero (puede ser null)
type Session = {
  user: {
    id: string;
    email: string;
    // Agrega cualquier otro campo que venga del proveedor de Auth
  };
} | null;

// 2. Defino el tipo del contexto
interface AuthContextType {
  session: Session;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
}

// 3. Creo el contexto con un valor inicial undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 4. Props del Provider
interface AuthProviderProps {
  children: React.ReactNode;
}

// 5. Mock del Provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Simulamos una sesión de usuario y un estado de carga
  const mockSession: Session = {
    user: { id: "user_mock_123", email: "test@example.com" },
  };

  const value = useMemo(() => ({
    session: mockSession,
    isLoading: false,
    login: () => console.log("Mock login..."),
    logout: () => console.log("Mock logout..."),
  }), []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 6. Hook para consumir el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};