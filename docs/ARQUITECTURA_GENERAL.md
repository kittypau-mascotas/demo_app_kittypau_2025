# Arquitectura General del Proyecto KittyPau

Este documento describe la arquitectura técnica integral de la plataforma KittyPau, desde el dispositivo físico de hardware hasta la interfaz de usuario final.

## Flujo de Datos End-to-End

El sistema KittyPau está diseñado como una plataforma IoT desacoplada y escalable que sigue el siguiente flujo de información:

1.  **Dispositivo IoT (Hardware)**: Un microcontrolador (como ESP8266 o ESP32) equipado con sensores captura datos del entorno o del comportamiento de la mascota. Este dispositivo se conecta de forma segura a la nube de AWS.
    
2.  **AWS IoT Core (Ingesta de Datos)**: Actúa como el *message broker* en la nube. Los dispositivos se autentican mediante certificados de seguridad X.509 únicos y publican telemetría en *topics* MQTT específicos para cada dispositivo (`kittypau/{deviceId}/telemetry`).
    
3.  **Bridge MQTT (Procesamiento en EC2)**: Un servicio persistente de Node.js, alojado en una instancia de AWS EC2, se suscribe a los *topics* de AWS IoT Core. Su función es crucial:
    *   **Escuchar** de forma continua los mensajes MQTT.
    *   **Validar y normalizar** los datos recibidos.
    *   **Enriquecer** los datos con información adicional (ej. timestamps, IDs).
    *   **Persistir** la información procesada en la base de datos PostgreSQL.
    
4.  **Neon Database (Almacenamiento)**: Una base de datos PostgreSQL Serverless que almacena todos los datos de la plataforma. Está diseñada con un modelo multi-tenant, asegurando que los datos de un usuario solo sean accesibles por ese usuario.
    
5.  **Backend API (Lógica de Negocio)**: Un conjunto de Vercel Serverless Functions escritas en TypeScript. Exponen una API RESTful que el frontend consume. Estas funciones se conectan a la base de datos Neon para leer o modificar datos, siempre aplicando estrictas reglas de negocio y seguridad.
    
6.  **Frontend Web (Interfaz de Usuario)**: Una aplicación de página única (SPA) desarrollada con Vite, React 18 y TypeScript. Utiliza Tailwind CSS y Shadcn/ui para un diseño moderno y responsive. La gestión del estado del servidor se realiza con TanStack Query, y la autenticación a través de Better Auth React. Se despliega en Vercel y se sirve globalmente a través de su CDN. Los usuarios interactúan con esta interfaz para ver los datos de sus mascotas, gestionar dispositivos y configurar alertas.
    
7.  **Usuario Autenticado**: El usuario final que accede a la plataforma a través de un navegador web. La autenticación se gestiona a través de un sistema de cookies seguras y rutas protegidas en el frontend (`PrivateRoute`, `OnboardingGuard`).

## Diagrama Conceptual

```mermaid
graph LR
    Device[Dispositivo IoT] -->|MQTT mTLS| AWS[AWS IoT Core]
    AWS -->|Sub| Bridge[Bridge MQTT (Node.js/EC2)]
    Bridge -->|Write| DB[(Neon PostgreSQL)]

    Frontend[Frontend Web (React/Vite)] -->|HTTPS| API[Backend API (Vercel Functions)]
    API -->|Read/Write| DB

    User[Usuario Final] -->|Accede vía Browser| Frontend
```

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

## Patrones de Arquitectura Frontend

*   **Feature-based Architecture:** Organización por dominios funcionales (e.g., `features/pets`, `features/devices`).
*   **Global Providers:** `AuthProvider`, `QueryClientProvider`, `ThemeProvider` gestionan el estado global.
*   **Centralized Router:** Lógica de ruteo y guards encapsulada para una gestión de flujo de usuario clara.
*   **Client API Layer:** Capa dedicada para comunicación con el backend, evitando llamadas `fetch` directas en componentes.
*   **Logging:** `logger` utility para un logging estructurado y centralizado.
```
I will perform this `write_file` operation now.