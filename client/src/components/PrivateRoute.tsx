import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';

interface PrivateRouteProps {
  component: React.ComponentType;
}

export default function PrivateRoute({ component: Component }: PrivateRouteProps) {
  // El contexto provee `user` y `loading`. `isAuthenticated` no existe directamente.
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  // Derivamos el estado de autenticación de la existencia del objeto `user`.
  const isAuthenticated = !!user;

  useEffect(() => {
    // Si no estamos cargando y el usuario NO está autenticado, redirigir al login.
    if (!loading && !isAuthenticated) {
      // Usamos la URL de Neon Auth directamente para asegurar que el usuario
      // siempre vaya a la vista de login correcta.
      // Opcionalmente, podrías tener una ruta /login que renderice <AuthView />
      window.location.href = '/';
    }
  }, [isAuthenticated, loading, setLocation]);

  // Si la sesión está cargando O si el usuario aún no está autenticado
  // (y la redirección está a punto de ocurrir), muestra el spinner.
  // Esto previene el pantallazo blanco al no retornar `null`.
  if (loading || !isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Si está autenticado, renderiza el componente solicitado.
  return <Component />;
}
