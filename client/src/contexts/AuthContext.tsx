import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: { username: string; email: string } | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  //todo: remove mock functionality
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem('kitty_auth');
    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setUser(authData);
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    //todo: remove mock functionality - this simulates authentication
    console.log('Login triggered', { username, password });
    const mockUser = { username, email: `${username}@kittypaw.com` };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('kitty_auth', JSON.stringify(mockUser));
    return true;
  };

  const register = async (username: string, email: string, password: string) => {
    //todo: remove mock functionality - this simulates registration
    console.log('Register triggered', { username, email, password });
    const mockUser = { username, email };
    setUser(mockUser);
    setIsAuthenticated(true);
    localStorage.setItem('kitty_auth', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    console.log('Logout triggered');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('kitty_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
