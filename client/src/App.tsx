import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Importación de Páginas
import LandingPage from "@/pages/LandingPage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Mascotas from "@/pages/Mascotas";
import PetDetail from "@/pages/PetDetail";
import Devices from "@/pages/Devices";
import AddDevice from "@/pages/AddDevice";
import Sensors from "@/pages/Sensors";
import Analytics from "@/pages/Analytics";
import Alerts from "@/pages/Alerts";
import Planes from "@/pages/Planes";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      {/* Ruta Raíz: Landing Page Comercial 2026 */}
      <Route path="/" component={LandingPage} />

      {/* Rutas de Autenticación */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />

      {/* Rutas de la Aplicación (Protegidas) */}
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/mascotas" component={Mascotas} />
      <Route path="/mascotas/:id" component={PetDetail} />
      <Route path="/devices" component={Devices} />
      <Route path="/devices/add" component={AddDevice} />
      <Route path="/sensors" component={Sensors} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/alerts" component={Alerts} />
      <Route path="/planes" component={Planes} />
      <Route path="/settings" component={Settings} />

      {/* Fallback: 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}