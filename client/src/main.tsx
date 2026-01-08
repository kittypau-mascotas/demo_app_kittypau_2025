import { createRoot } from "react-dom/client";
import { NeonAuthUIProvider } from "@neondatabase/neon-js";
import App from "./App";
import "./index.css";

const authUrl = import.meta.env.VITE_NEON_AUTH_URL;
if (!authUrl) {
  throw new Error("VITE_NEON_AUTH_URL is not defined in your .env file.");
}

createRoot(document.getElementById("root")!).render(
  <NeonAuthUIProvider authUrl={authUrl}>
    <App />
  </NeonAuthUIProvider>
);
