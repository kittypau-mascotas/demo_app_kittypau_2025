import React from 'react';
import { Switch, Route, Redirect } from "wouter";
import PrivateRoute from './components/PrivateRoute';
import AppLayout from './components/AppLayout';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/not-found';

// Private Pages
import Dashboard from './pages/Dashboard';
import Devices from './pages/Devices';
import AddDevice from './pages/AddDevice';
import DeviceDetail from './pages/DeviceDetail';
import Mascotas from './pages/Mascotas';
import PetDetail from './pages/PetDetail';
import Analytics from './pages/Analytics';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';

// This component wraps a page with the main layout and protects it.
const PrivatePage = ({ component }: { component: React.ComponentType<any> }) => (
  <AppLayout>
    <PrivateRoute component={component} />
  </AppLayout>
);

const AppRouter = () => {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Private Routes */}
      <Route path="/dashboard">
        <PrivatePage component={Dashboard} />
      </Route>
      <Route path="/devices">
        <PrivatePage component={Devices} />
      </Route>
      <Route path="/devices/add">
        <PrivatePage component={AddDevice} />
      </Route>
      <Route path="/devices/:id">
        <PrivatePage component={DeviceDetail} />
      </Route>
      <Route path="/mascotas">
        <PrivatePage component={Mascotas} />
      </Route>
      <Route path="/mascotas/:id">
        <PrivatePage component={PetDetail} />
      </Route>
      <Route path="/analytics" component={() => <PrivatePage component={Analytics} />} />
      <Route path="/alerts" component={() => <PrivatePage component={Alerts} />} />
      <Route path="/settings" component={() => <PrivatePage component={Settings} />} />

      {/* Redirect root to dashboard */}
      <Route path="/"><Redirect to="/dashboard" /></Route>

      {/* 404 Route */}
      <Route><NotFound /></Route>
    </Switch>
  );
};

export default AppRouter;