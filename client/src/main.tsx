import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </AuthProvider>
);

