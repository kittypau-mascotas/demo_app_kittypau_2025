# Arquitectura del sistema

## Flujo canónico

1. El dispositivo IoT publica mensajes MQTT
2. AWS IoT Core autentica usando certificados X.509
3. Un Bridge Node.js persistente en EC2:
   - Valida
   - Normaliza
   - Persiste los datos
4. Los datos se guardan en Neon PostgreSQL
5. El Backend API expone datos filtrados por usuario
6. El Frontend consume la API autenticada

## Stack Tecnológico Frontend

*   **Framework:** React 18
*   **Lenguaje:** TypeScript
*   **Build Tool:** Vite
*   **Routing:** Wouter (centralizado con `router.tsx`)
*   **Styling:** Tailwind CSS + Shadcn/ui
*   **Estado (Server):** TanStack Query
*   **Autenticación:** Better Auth React (integrado en `AuthContext`)
*   **Formularios:** React Hook Form + Zod
*   **Gráficas:** Recharts
*   **Manejo de Errores:** Global ErrorBoundary, centralizado `logger` utility, `useToast` para feedback UX.

## Decisiones clave

- Vercel NO recibe MQTT
- El Bridge NO expone endpoints HTTP públicos
- Toda lectura de datos pasa por la API
- La base de datos es multi-tenant por diseño
- **Autenticación:** Better Auth React para el frontend, Neon Auth para el backend.
- **Ruteo:** Centralizado con `PrivateRoute` y `OnboardingGuard`.
- **Estados vacíos y errores:** Humanizados y accionables.
- **Optimización:** Lazy loading y code splitting para páginas.