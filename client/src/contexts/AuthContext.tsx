import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Ajusta esta interfaz según los datos reales de tu usuario
interface User {
  id: number;
  authUserId: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // 🔑 CRÍTICO: credentials: "include" es obligatorio para que viajen las cookies en Vercel
        const res = await fetch("/api/me", { credentials: "include" });

        if (res.ok) {
          const data = await res.json();
          // Tu backend devuelve { user: { ... } }
          setUser(data.user);
        } else if (res.status === 401) {
          // 🛑 401 explícito: No hay sesión o expiró.
          // Esto rompe el bucle de "Loading..."
          setUser(null);
        } else {
          // Otros errores (500, etc.)
          console.error("Error verificando sesión:", res.status);
          setUser(null);
        }
      } catch (error) {
        console.error("Error de red al verificar sesión:", error);
        setUser(null);
      } finally {
        // ✅ SIEMPRE desactivar loading, pase lo que pase
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/logout", { method: "POST", credentials: "include" });
      setUser(null);
      // Opcional: window.location.href = "/";
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
