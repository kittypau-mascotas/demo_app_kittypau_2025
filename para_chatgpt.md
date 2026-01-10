# Documentación Detallada del Proyecto KittyPau IoT

Este documento proporciona una descripción exhaustiva del proyecto KittyPau, una plataforma IoT full-stack para el monitoreo de mascotas. Está diseñado para ser utilizado por desarrolladores o modelos de lenguaje para entender la arquitectura, características y estructura del código.

## 1. Descripción General y Características Principales

**KittyPau** es una aplicación web que permite a los usuarios monitorear dispositivos inteligentes para sus mascotas (como comederos automáticos).

- **Autenticación de Usuarios:** El sistema utiliza **Neon Auth** para gestionar el registro e inicio de sesión de usuarios. Los perfiles de usuario se crean automáticamente (just-in-time) en la base de datos de la aplicación la primera vez que inician sesión.
- **Dashboard Principal:** Una vez autenticados, los usuarios acceden a un panel de control que muestra información clave sobre sus mascotas y dispositivos.
- **Gestión de Dispositivos:** Los usuarios pueden registrar y ver el estado de sus dispositivos IoT. El estado (online/offline, último visto) se actualiza en tiempo real.
- **Gestión de Mascotas:** Permite a los usuarios crear perfiles para sus mascotas, asociándolos a un dispositivo específico.
- **Visualización de Datos de Sensores:** La plataforma ingiere, almacena y muestra datos históricos de los sensores de los dispositivos (ej. peso del alimento, temperatura, etc.) en gráficos.
- **Comunicación en Tiempo Real:** El frontend se comunica con el backend a través de **WebSockets** para recibir actualizaciones en vivo sobre el estado de los dispositivos y nuevos datos de sensores.
- **Backend Escalable:** El backend está diseñado como un monorepo que separa la lógica del cliente y del servidor, y está preparado para un despliegue serverless en Vercel.
- **Integración con IoT:** Un "puente" MQTT (alojado en el mismo servidor) se conecta a **AWS IoT Core** para escuchar los mensajes de los dispositivos físicos, procesarlos y guardarlos en la base de datos.

---

## 2. Estructura de Carpetas

El proyecto es un monorepo con una estructura clara que separa las responsabilidades:

```
/
├── client/         # Código fuente del Frontend (React + Vite)
│   ├── src/
│   │   ├── components/ # Componentes reutilizables de React (UI)
│   │   ├── contexts/   # Contextos de React (ej. AuthContext)
│   │   ├── hooks/      # Hooks personalizados (ej. use-websocket)
│   │   ├── lib/        # Librerías auxiliares (cliente de query, utils)
│   │   ├── pages/      # Componentes de página (Dashboard, Devices, etc.)
│   │   └── services/   # Lógica para llamar a la API del backend
│   └── index.html      # Punto de entrada HTML para Vite
├── server/         # Código fuente del Backend (Node.js + Express)
│   ├── middleware/   # Middlewares de Express (ej. requireNeonAuth)
│   ├── db.ts         # Configuración del cliente de base de datos (Drizzle)
│   ├── index.ts      # Punto de entrada principal del servidor Express
│   ├── mqtt.ts       # Lógica del cliente MQTT para AWS IoT
│   ├── routes.ts     # Definición de las rutas de la API REST
│   └── websocket.ts  # Lógica del servidor de WebSockets
├── shared/         # Código compartido entre cliente y servidor
│   └── schema.ts     # Esquema de la base de datos con Drizzle ORM
├── public/         # Archivos estáticos
├── docs/           # Documentación del proyecto
├── migrations/     # Migraciones de base de datos generadas por Drizzle Kit
├── .env.example    # Plantilla para variables de entorno
├── drizzle.config.ts # Configuración de Drizzle Kit
├── package.json    # Dependencias y scripts del proyecto
├── tsconfig.json   # Configuración de TypeScript
├── vercel.json     # Configuración de despliegue en Vercel
└── vite.config.ts  # Configuración de Vite para el frontend
```

---

## 3. Tecnologías y Dependencias Clave

- **Frontend:**
    - **Framework:** React 18
    - **Build Tool:** Vite
    - **UI Components:** `shadcn/ui` (construido sobre Radix UI y Tailwind CSS)
    - **Estilos:** Tailwind CSS
    - **Routing:** `wouter`
    - **Data Fetching/State:** `@tanstack/react-query`
    - **Gráficos:** `recharts`
    - **Formularios:** `react-hook-form` con `zod` para validación.

- **Backend:**
    - **Framework:** Express.js
    - **Lenguaje:** TypeScript (ejecutado con `tsx` en desarrollo)
    - **ORM:** Drizzle ORM (para interactuar con PostgreSQL)
    - **Base de Datos:** PostgreSQL (preparado para Neon)
    - **Autenticación:** `@neondatabase/serverless` y middleware propio para Neon Auth.
    - **Comunicación IoT:** `mqtt` (para conectar con AWS IoT Core)
    - **WebSockets:** `ws`

- **Despliegue y Build:**
    - **Hosting:** Vercel (configurado en `vercel.json`)
    - **Bundler de Backend:** `esbuild` (para empaquetar el servidor para un entorno serverless)
    - **Migrations:** `drizzle-kit`

---

## 4. Esquema de la Base de Datos (`shared/schema.ts`)

La base de datos se define usando Drizzle ORM. Las tablas principales son:

- **`users`**: Almacena el perfil de los usuarios.
    - `id` (serial, PK): ID interno.
    - `authUserId` (uuid): ID del usuario en Neon Auth.
    - `email` (varchar): Email del usuario.
    - `fullName` (varchar): Nombre del usuario.

- **`devices`**: Representa los dispositivos físicos IoT.
    - `id` (serial, PK): ID interno.
    - `deviceId` (varchar, unique): ID único del dispositivo físico (usado en MQTT).
    - `userId` (integer, FK a `users`): Propietario del dispositivo.
    - `name` (varchar): Nombre asignado por el usuario.
    - `status` (varchar): 'online', 'offline', etc.
    - `lastSeen` (timestamp): Última vez que se recibió un mensaje del dispositivo.

- **`pets`**: Perfiles de las mascotas.
    - `id` (serial, PK): ID interno.
    - `userId` (integer, FK a `users`): Propietario de la mascota.
    - `deviceId` (integer, FK a `devices`): Dispositivo asociado a la mascota.
    - `name`, `species`, `breed`, `birthDate`.

- **`device_events`**: Log de eventos importantes del dispositivo (conexión, errores, etc.).
    - `deviceId` (varchar): ID del dispositivo físico.
    - `eventType` (enum): Tipo de evento ('online', 'offline', 'error').
    - `ts` (timestamp): Momento del evento.

- **`sensor_readings`**: Timeseries de datos de los sensores.
    - `ts` (timestamp): Timestamp de la lectura (enviado por el dispositivo).
    - `deviceId` (varchar): ID del dispositivo físico.
    - `temperatureCelsius`, `humidityPercent`, `lightLux`, `weightGrams`, etc.

---

## 5. Flujo de Datos y API

### Flujo de Datos IoT (MQTT -> DB -> WebSocket)

1.  Un dispositivo físico (ESP32) publica datos de sensores o eventos de estado en un topic de **AWS IoT Core** (ej. `kittypau/device-123/data/sensors`).
2.  El backend (`server/mqtt.ts`) está suscrito a estos topics (ej. `kittypau/+/data/sensors`).
3.  Al recibir un mensaje, el backend lo parsea y lo inserta en la tabla correspondiente (`sensor_readings` o `device_events`) usando Drizzle.
4.  Después de insertar los datos, el backend utiliza el servidor de **WebSockets** (`server/websocket.ts`) para transmitir el nuevo dato a todos los clientes de frontend conectados.
5.  El frontend (`hooks/use-websocket.tsx`) recibe el mensaje y actualiza el estado global de React Query, lo que provoca una actualización en la UI sin necesidad de que el usuario recargue la página.

### API REST (`server/routes.ts`)

El backend expone una API REST para operaciones que no son en tiempo real:

- `GET /api/me`: Devuelve el perfil del usuario autenticado. Protegido por el middleware `requireNeonAuth`.
- `POST /api/logout`: Cierra la sesión del usuario en Neon Auth.
- `GET /api/devices`: Devuelve la lista de dispositivos del usuario, incluyendo la fecha del último evento.
- `GET /api/pets`: Devuelve la lista de mascotas del usuario.
- `GET /api/devices/:deviceId/readings`: Devuelve un rango de lecturas de sensores para un dispositivo específico. Acepta query params `start_date` y `end_date`.
- `GET /api/devices/:deviceId/events`: Devuelve un historial de eventos para un dispositivo.

---

## 6. Variables de Entorno (`.env.example`)

El sistema requiere la configuración de las siguientes variables para funcionar:

- **`DATABASE_URL`**: La URL de conexión a la base de datos PostgreSQL de Neon. Esencial para Drizzle y el funcionamiento del backend.
- **`NEON_AUTH_URL`**: La URL del servicio de autenticación de Neon, necesaria para la validación de sesiones.
- **`AWS_IOT_ENDPOINT`**, `AWS_REGION` y rutas a los certificados (`AWS_IOT_*_PATH`): Credenciales para que el cliente MQTT del backend se conecte a AWS IoT Core.
- **`PORT`**: Puerto en el que corre el servidor Node.js en desarrollo (por defecto 3000).
- **`VITE_API_URL`**: URL del backend para que el frontend realice las llamadas a la API (en desarrollo `http://localhost:3000/api`).
- **`VITE_WS_URL`**: URL del servidor de WebSockets para el frontend (en desarrollo `ws://localhost:3000/ws`).
- **`VITE_NEON_AUTH_URL`**: Misma que `NEON_AUTH_URL` pero expuesta al cliente a través de Vite.
