import React, { lazy, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation } from 'wouter';
import AppLayout from '@/components/AppLayout';
import PrivateRoute from '@/components/PrivateRoute';
import OnboardingGuard from '@/components/OnboardingGuard';
import { useAuth } from './contexts/AuthContext'; // Relative path for useAuth

// Lazy load pages
const NotFound = lazy(() => import('@/pages/not-found'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Devices = lazy(() => import('@/pages/Devices'));
const AddDevice = lazy(() => import('@/pages/AddDevice'));
const Mascotas = lazy(() => import('@/pages/Mascotas'));
const Sensors = lazy(() => import('@/pages/Sensors'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const Alerts = lazy(() => import('@/pages/Alerts'));
const Settings = lazy(() => import('@/pages/Settings'));
const Planes = lazy(() => import('@/pages/Planes'));
const Users = lazy(() => import('@/pages/Users'));
// Onboarding pages
const AddPetOnboarding = lazy(() => import('@/pages/onboarding/AddPetOnboarding'));
const LinkDeviceOnboarding = lazy(() => import('@/pages/onboarding/LinkDeviceOnboarding'));
const IndexOnboarding = lazy(() => import('@/pages/onboarding/IndexOnboarding'));

function PageLoader() {
  return <div className="flex items-center justify-center h-full min-h-[50vh]">Cargando...</div>;
}

export default function AppRouter() {
  const { user, loading } = useAuth();
  const [location] = useLocation();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading authentication...</div>;
  }

  // Define public and private routes
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location);

  if (!user && !isPublicRoute) {
    return <Redirect to="/login" />;
  }

  if (user && isPublicRoute) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* Onboarding Routes - these should not be wrapped by AppLayout */}
        <PrivateRoute path="/onboarding/add-pet" component={AddPetOnboarding} />
        <PrivateRoute path="/onboarding/link-device" component={LinkDeviceOnboarding} />
        <PrivateRoute path="/onboarding" component={IndexOnboarding} /> {/* Generic onboarding route */}

        <AppLayout>
          <OnboardingGuard>
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/devices" component={Devices} />
            <PrivateRoute path="/devices/add" component={AddDevice} />
            <PrivateRoute path="/mascotas" component={Mascotas} />
            <PrivateRoute path="/sensors" component={Sensors} />
            <PrivateRoute path="/analytics" component={Analytics} />
            <PrivateRoute path="/alerts" component={Alerts} />
            <PrivateRoute path="/settings" component={Settings} />
            <PrivateRoute path="/planes" component={Planes} />
            <PrivateRoute path="/users" component={Users} />
            {/* Redirect root to dashboard */}
            <Route path="/">
              <Redirect to="/dashboard" />
            </Route>
          </OnboardingGuard>
        </AppLayout>
        
        {/* Fallback for unknown routes */}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Suspense>
  );
}
