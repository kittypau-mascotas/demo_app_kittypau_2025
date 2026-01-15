import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Ajusta esta interfaz según los datos reales de tu usuario
interface User {
  id: string; // better-auth uses string for user id
  email: string;
  name: string; // better-auth uses 'name' not 'fullName'
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void; // Logout no es asíncrono en el frontend
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        // 🔑 CRÍTICO: credentials: "include" es obligatorio para que viajen las cookies en Vercel
        // Usamos el endpoint de sesión de better-auth
        const res = await fetch("/auth/session", { credentials: "include" });

        if (res.ok) {
          const data: User = await res.json();
          // better-auth devuelve directamente el objeto de usuario
          setUser(data);
        } else {
          // Si no está OK, el usuario no está autenticado o la sesión expiró
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

  const logout = () => {
    // better-auth maneja el cierre de sesión en el backend con su propio middleware.
    // Aquí solo limpiamos el estado local.
    setUser(null);
    // Redirigir a la página de inicio o login después de cerrar sesión
    // window.location.href = "/login"; // o la ruta que desees
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
