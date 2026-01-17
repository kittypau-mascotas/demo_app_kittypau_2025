# Documentación Interna - KittyPau

⚠️ **CONFIDENCIAL:** Este archivo contiene detalles de arquitectura interna y seguridad. No publicar.

## Arquitectura Completa

```mermaid
graph LR
    Device[Dispositivo IoT] -->|MQTT mTLS| AWS[AWS IoT Core]
    AWS -->|Sub| Bridge[Bridge MQTT (Node.js/EC2)]
    Bridge -->|Write| DB[(Neon PostgreSQL)]

    Frontend[Frontend Web (React/Vite)] -->|HTTPS| API[Backend API (Vercel Functions)]
    API -->|Read/Write| DB

    User[Usuario Final] -->|Accede vía Browser| Frontend
```

## Flujo de Datos IoT

1.  **Dispositivo:** Publica JSON a `kittypau/{deviceId}/data`.
2.  **AWS IoT:** Valida certificado X.509 y reenvía al Bridge.
3.  **Bridge (EC2):**
    *   Valida esquema Zod.
    *   Inserta en `sensor_readings`.
    *   Actualiza `last_seen` en `devices`.
4.  **API (Vercel):** Lee de `sensor_readings` filtrando por `userId` (ownership).

## Stack Tecnológico Detallado (Frontend)

*   **Framework:** React 18
*   **Lenguaje:** TypeScript
*   **Build Tool:** Vite
*   **Routing:** Wouter (centralizado con `router.tsx`, incluyendo `PrivateRoute` y `OnboardingGuard`)
*   **Styling:** Tailwind CSS + Shadcn/ui
*   **Estado (Server):** TanStack Query
*   **Autenticación:** Better Auth React (integrado en `AuthContext`)
*   **Formularios:** React Hook Form + Zod
*   **Gráficas:** Recharts
*   **Animaciones:** Framer Motion
*   **Iconos:** Lucide React
*   **Manejo de Errores:** Global ErrorBoundary, centralizado `logger` utility, `useToast` para feedback UX.
*   **Temas:** `next-themes` para gestión de modo claro/oscuro.

## Decisiones Técnicas

*   **Bridge en EC2:** Necesario para mantener conexión MQTT persistente (Vercel no soporta esto).
*   **Neon Auth:** Se usa como proveedor de identidad base, pero la lógica de sesión la maneja Better Auth.
*   **Ownership:** Validación estricta `where userId = session.userId` en cada query.
*   **Ruteo Frontend:** Centralizado con `AppRouter` y `PrivateRoute` para protección de rutas, `OnboardingGuard` para flujo de bienvenida.
*   **Manejo de Errores Frontend:** Implementación de `ErrorBoundary` global y utilidad `logger` para un seguimiento centralizado.
*   **Componentes Reutilizables:** Uso de `shadcn/ui` y componentes custom (e.g., `HeroCard`, `PetAvatar`, `StatWidget`) para consistencia y eficiencia.

## Roadmap

*   [ ] Alertas en tiempo real (WebSockets/SSE).
*   [ ] Integración con IA para análisis de comportamiento.
*   [ ] App móvil nativa.
*   [ ] Mejoras en la UI de configuración (tamaño de texto, animaciones).
*   [ ] Implementación de APIs para exportación de datos y eliminación de cuenta.
*   [ ] Integración completa de telemetría y analytics (gráfico de temperatura/humedad).
```
I will perform this `write_file` operation now.