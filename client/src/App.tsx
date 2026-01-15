import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // Import useAuth
import AppLayout from '@/components/AppLayout';
import PrivateRoute from '@/components/PrivateRoute';
import { WelcomeModal } from '@/components/WelcomeModal';
import { WebSocketProvider } from '@/hooks/use-websocket'; // Import WebSocketProvider

import NotFound from '@/pages/not-found';
import Login from '@/pages/Login'; // Import Login
import Register from '@/pages/Register'; // Import Register
import Dashboard from '@/pages/Dashboard';
import Devices from '@/pages/Devices';
import AddDevice from '@/pages/AddDevice';
import Mascotas from '@/pages/Mascotas';
import Sensors from '@/pages/Sensors';
import Analytics from '@/pages/Analytics';
import Alerts from '@/pages/Alerts';
import Settings from '@/pages/Settings';
import Planes from '@/pages/Planes';
import Users from '@/pages/Users';


// Componente para capturar errores de renderizado (Error Boundary)
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
          <p className="font-bold">Error cargando componente:</p>
          <pre className="mt-2 whitespace-pre-wrap text-xs">{this.state.error?.message || JSON.stringify(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function Router() {
  const [, setLocation] = useLocation(); // Get setLocation for programmatic navigation

  useEffect(() => {
    // If authenticated user lands on root, redirect to dashboard
    if (window.location.pathname === '/') {
      setLocation('/dashboard', { replace: true });
    }
  }, [setLocation]);

  return (
    <AppLayout>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <PrivateRoute component={Dashboard} />
        </Route>
        <Route path="/devices">
          <PrivateRoute component={Devices} />
        </Route>
        <Route path="/devices/add">
          <PrivateRoute component={AddDevice} />
        </Route>
        <Route path="/mascotas">
          <PrivateRoute component={Mascotas} />
        </Route>
        <Route path="/sensors">
          <PrivateRoute component={Sensors} />
        </Route>
        <Route path="/analytics">
          <PrivateRoute component={Analytics} />
        </Route>
        <Route path="/alerts">
          <PrivateRoute component={Alerts} />
        </Route>
        <Route path="/settings">
          <PrivateRoute component={Settings} />
        </Route>
        <Route path="/planes">
          <PrivateRoute component={Planes} />
        </Route>
        <Route path="/users">
          <PrivateRoute component={Users} />
        </Route>
        {/* Fallback for unknown routes */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </AppLayout>
  );
}

function App() {
  const [isWelcomeModalOpen, setIsWelcomeModalOpen] = useState(false);
  const { user, loading } = useAuth(); // Use the auth context
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Show the modal only if the user is not on a public page,
    // and prevent it from showing on every navigation.
    // Only show if not authenticated yet and not loading.
    if (!loading && !user) { // Only show modal if not authenticated
      const hasVisitedBefore = sessionStorage.getItem('hasVisitedKittyPauDemo');
      
      if (!hasVisitedBefore) {
        const timer = setTimeout(() => {
          setIsWelcomeModalOpen(true);
          sessionStorage.setItem('hasVisitedKittyPauDemo', 'true');
        }, 2000); // 2 seconds

        return () => clearTimeout(timer);
      }
    }
  }, [loading, user]); // Re-run effect when loading or user status changes

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading authentication...</div>; // Simple loading state
  }

  if (!user) {
    // If not authenticated, redirect to the login page
    if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
      setLocation("/login", { replace: true });
    }
    return null; // Don't render anything while redirecting or on login/register pages
  }

  return (
    <TooltipProvider>
        <WebSocketProvider url={import.meta.env.VITE_WS_URL}> {/* Add WebSocketProvider */}
          <WelcomeModal isOpen={isWelcomeModalOpen} onOpenChange={setIsWelcomeModalOpen} />
          <Router />
          <Toaster />
        </WebSocketProvider>
    </TooltipProvider>
  );
}

export default App;

