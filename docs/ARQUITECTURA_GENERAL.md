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
    
6.  **Frontend Web (Interfaz de Usuario)**: Una aplicación de página única (SPA) desarrollada con Vite, React 18 y TypeScript. Utiliza Tailwind CSS y Shadcn/ui. La gestión del estado del servidor se realiza con TanStack Query, y la autenticación a través de un **sistema propio de email/contraseña con cookies HttpOnly**. Se despliega en Vercel.
    
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
*   **Routing:** Wouter (Ligero, basado en hooks, usado en `App.tsx` y `Sidebar.tsx`)
*   **Styling:** Tailwind CSS + Shadcn/ui
*   **Estado (Server):** TanStack Query
*   **Autenticación:** Sistema propio de email/contraseña con hooks (`useSession`, `useSignOut`) y cookies HttpOnly.
*   **Formularios:** React `useState` (Controlados manualmente) / React Hook Form (Planificado para formularios complejos)
*   **Tiempo Real:** WebSockets nativos (`useWebSocket` hook) para actualizaciones en vivo.
*   **Gráficas:** Recharts
*   **Animaciones:** Framer Motion
*   **Iconos:** Lucide React
*   **Manejo de Errores:** Global ErrorBoundary, centralizado `logger` utility, `useToast` para feedback UX.
*   **Temas:** `next-themes` para gestión de modo claro/oscuro.

## Patrones de Arquitectura Frontend

*   **Feature-based Architecture:** Organización por dominios funcionales (e.g., `features/pets`, `features/devices`).
*   **Global Providers:** `AuthProvider`, `QueryClientProvider`, `ThemeProvider` gestionan el estado global.
*   **Centralized Router:** Lógica de ruteo y guards encapsulada para una gestión de flujo de usuario clara.
*   **Client API Layer:** Capa dedicada para comunicación con el backend, utilizando `fetch` con `credentials: 'include'`.
*   **Shared Utilities:** Funciones comunes (como `api-utils`) movidas a `lib/` para mejor organización y resolución de rutas.
*   **Logging:** `logger` utility para un logging estructurado y centralizado.

## Esquema de Base de Datos (SQL Inferido)

A continuación se detalla el esquema relacional utilizado por la API, basado en las interfaces de TypeScript y el uso en el frontend.

### Tabla `users`
Almacena la información de autenticación y perfil base.
```sql
CREATE TABLE users ( -- Corresponde a shared/schema.ts
  id SERIAL PRIMARY KEY,
  auth_user_id TEXT NOT NULL UNIQUE, -- ID de usuario de autenticación externa (si aplica)
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password TEXT, -- Hash de la contraseña (gestionado por auth propio)
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Tabla `pets`
Entidad central de la aplicación.
```sql
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  species TEXT NOT NULL, -- 'Gato' | 'Perro'
  breed TEXT,
  birth_date DATE,
  photo_url TEXT,
  device_id TEXT -- Vinculación lógica con dispositivo
);
```

### Tabla `devices`
Hardware físico registrado en la plataforma.
```sql
CREATE TABLE devices (
  id SERIAL PRIMARY KEY,
  device_id TEXT NOT NULL UNIQUE, -- ID físico (ej. KPCL0001)
  name TEXT NOT NULL,
  device_type TEXT,
  firmware_version TEXT,
  last_seen TIMESTAMP WITH TIME ZONE,
  battery_level INTEGER,
  status TEXT -- 'active' | 'offline' | 'warning' | 'error'
);
```

### Tabla `sensor_readings` (Telemetría)
Series temporales de datos.
```sql
CREATE TABLE sensor_readings (
  id SERIAL PRIMARY KEY,
  device_id TEXT REFERENCES devices(device_id),
  ts TIMESTAMP WITH TIME ZONE NOT NULL,
  temperature NUMERIC,
  humidity NUMERIC,
  weight_grams NUMERIC,
  battery_level INTEGER,
  activity_level INTEGER -- Métrica derivada
);
```
```
I will perform this `write_file` operation now.