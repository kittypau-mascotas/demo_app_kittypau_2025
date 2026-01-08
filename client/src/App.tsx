import { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import { queryClient } from './lib/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { AuthProvider, useAuth } from '@/contexts/AuthContext'; // Import useAuth
import AppLayout from '@/components/AppLayout';
import PrivateRoute from '@/components/PrivateRoute';
import { WelcomeModal } from '@/components/WelcomeModal';
import { WebSocketProvider } from '@/hooks/use-websocket'; // Import WebSocketProvider

import NotFound from '@/pages/not-found';
// Login and Register are now handled by AuthView, so they are not directly routed here.
// import Login from '@/pages/Login';
// import Register from '@/pages/Register';
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
import { AuthView } from '@neondatabase/neon-js'; // Import AuthView

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
    return <div>Loading authentication...</div>; // Simple loading state
  }

  if (!user) {
    // If not authenticated, render the Neon Auth UI
    return <AuthView />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
          <WebSocketProvider url={import.meta.env.VITE_WS_URL}> {/* Add WebSocketProvider */}
            <WelcomeModal isOpen={isWelcomeModalOpen} onOpenChange={setIsWelcomeModalOpen} />
            <Router />
            <Toaster />
          </WebSocketProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
