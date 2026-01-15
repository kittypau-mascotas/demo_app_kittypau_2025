# Especificaciones del Proyecto KittyPau (Arquitectura Final)

Este documento detalla la arquitectura de backend, el modelo de datos, el contrato de la API y las consideraciones de integración frontend para la plataforma KittyPau. Se basa en una auditoría y refinamiento iterativo, asegurando una solución escalable, segura y adaptada a las necesidades reales del proyecto con AWS IoT, EC2, Neon y Vercel.

---

## 1. Contexto del Proyecto y Arquitectura (Resumen)

KittyPau es una plataforma IoT para mascotas.

**Arquitectura Implementada:**
*   **Dispositivo IoT**: ESP8266 / ESP32
*   **Broker MQTT**: AWS IoT Core
*   **Bridge (Backend IoT)**: EC2 Ubuntu + Node.js (pm2)
    *   Se suscribe a tópicos MQTT.
    *   Procesa mensajes de datos y estado.
    *   Guarda datos en Neon (PostgreSQL).
*   **Base de Datos**: Neon PostgreSQL
*   **Frontend**: Aplicación web (mockup, desplegada en Vercel)
*   **Autenticación**: Neon Auth como proveedor de identidad externo.

---

## 2. Modelo de Datos (PostgreSQL en Neon)

El modelo de datos ha sido diseñado para escalabilidad, eficiencia en el manejo de series temporales y una clara separación de la identidad del usuario, dispositivos y mascotas.

```sql
-- Esquema de Base de Datos para KittyPau v2 (PostgreSQL)

-- Primero, definimos un tipo ENUM para los eventos de dispositivo,
-- esto normaliza los datos y previene errores por typos.
CREATE TYPE device_event_type AS ENUM (
  'online',
  'offline',
  'reboot',
  'error',
  'low_battery',
  'sensor_error'
);

-- Tabla de usuarios, diseñada para integrarse con un proveedor de identidad externo como Neon Auth.
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    auth_user_id UUID UNIQUE NOT NULL, -- El UUID que provee el servicio de autenticación.
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de dispositivos IoT. El 'device_id' es la identidad física/lógica que el dispositivo usa en MQTT.
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    device_id VARCHAR(50) UNIQUE NOT NULL, -- Ej: "KPCL0033". Es la identidad principal en el mundo IoT.
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL DEFAULT 'Mi Dispositivo KittyPaw',
    status VARCHAR(50) DEFAULT 'offline', -- 'online', 'offline', 'error'. Refleja el último estado conocido.
    last_seen TIMESTAMPTZ, -- Se actualiza con cualquier comunicación del dispositivo.
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Tabla de mascotas. Cada mascota pertenece a un usuario y puede estar asociada a un dispositivo.
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    device_id INT UNIQUE, -- Una mascota puede estar asociada a UN dispositivo.
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50), -- Ej: "Gato", "Perro"
    breed VARCHAR(100),
    birth_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY(user_id) 
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_device
        FOREIGN KEY(device_id) 
        REFERENCES devices(id)
        ON DELETE SET NULL -- Si el dispositivo se borra, la mascota no se borra, solo se desvincula.
);

-- Tabla de eventos del dispositivo. Es un log de todo lo que no es una lectura de sensor.
CREATE TABLE device_events (
  id SERIAL PRIMARY KEY,
  device_id VARCHAR(50) NOT NULL, -- Referencia por el ID de MQTT, no por FK.
  event_type device_event_type NOT NULL,
  payload JSONB, -- Para guardar datos adicionales del evento si es necesario (ej: detalles de un error).
  ts TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de lecturas de sensores. Optimizada para un alto volumen de escritura (time-series data).
CREATE TABLE sensor_readings (
    ts TIMESTAMPTZ NOT NULL, -- Timestamp enviado por el dispositivo (o generado al recibir si no está disponible).
    received_at TIMESTAMPTZ DEFAULT NOW(), -- Timestamp de cuando el servidor recibe el dato. Para auditoría y latencia.
    device_id VARCHAR(50) NOT NULL, -- Referencia por el ID de MQTT, no por FK.
    temperature_celsius NUMERIC(5, 2),
    humidity_percent NUMERIC(5, 2),
    light_lux INT,
    weight_grams NUMERIC(8, 2),
    PRIMARY KEY (device_id, ts) -- Clave primaria compuesta para asegurar una única lectura por dispositivo y timestamp.
);

-- --- Índices para optimizar el rendimiento de las consultas ---

-- Índices en tablas de identidad
CREATE INDEX idx_users_auth_user_id ON users(auth_user_id);
CREATE INDEX idx_devices_user_id ON devices(user_id);
CREATE INDEX idx_pets_user_id ON pets(user_id);

-- Índices para las tablas de series temporales (las más importantes)
-- Permiten búsquedas rápidas de eventos por dispositivo y fecha.
CREATE INDEX idx_device_events_device_id_ts_desc ON device_events(device_id, ts DESC);

-- Permiten búsquedas rápidas de lecturas por dispositivo y fecha.
CREATE INDEX idx_sensor_readings_device_id_ts_desc ON sensor_readings(device_id, ts DESC);
```

---

## 3. Bridge EC2 (Manejo de Mensajes MQTT)

El bridge en EC2 es el responsable de escuchar los mensajes MQTT y persistir la información en la base de datos de Neon.

**Tópicos MQTT Suscritos:**
*   `kittypau/+/data`: Para mensajes de datos de sensores consolidados.
*   `kittypau/+/status`: Para mensajes de eventos de estado del dispositivo (online/offline/errores).

**Payloads Esperados (Validación Zod):**

**`deviceStatusPayloadSchema` (para `kittypau/{deviceId}/status`)**
```typescript
import { z } from 'zod';
export const deviceStatusPayloadSchema = z.object({
  status: z.enum([
    'online',
    'offline',
    'reboot',
    'error',
    'low_battery',
    'sensor_error'
  ]),
});
```

**`deviceDataPayloadSchema` (para `kittypau/{deviceId}/data`)**
```typescript
import { z } from 'zod';
export const deviceDataPayloadSchema = z.object({
  ts: z.string().datetime().optional(), // ISO 8601 format
  temp: z.number().optional(),
  hum: z.number().optional(),
  light: z.number().optional(),
  weight: z.number().optional(),
});
```

**Lógica de Procesamiento del Bridge:**

1.  **Recepción de Mensajes de Estado (`/status`):**
    *   Valida el payload con `deviceStatusPayloadSchema`.
    *   **Inserta** un nuevo registro en la tabla `device_events`.
    *   **Actualiza** el `status` y `last_seen` del dispositivo en la tabla `devices` (esta es la fuente de verdad del estado actual).

2.  **Recepción de Mensajes de Datos (`/data`):**
    *   Valida el payload con `deviceDataPayloadSchema`.
    *   **Inserta** un nuevo registro en la tabla `sensor_readings` con los valores de los sensores.
    *   Si el `ts` no viene en el payload, se usa `NOW()` del servidor.
    *   **Actualiza** el `last_seen` del dispositivo en la tabla `devices`.

---

## 4. Contrato Backend API (Vercel)

La API proporciona los endpoints necesarios para que el frontend interactúe de forma segura con los datos del usuario, dispositivos, mascotas y telemetría. Todos los endpoints están protegidos por el middleware `requireNeonAuth`.

**Principios de Seguridad Multi-Tenant:**
*   El middleware `requireNeonAuth` obtiene el `auth_user_id` del token de sesión de Neon Auth.
*   Todas las consultas a la base de datos filtran los resultados utilizando el `user_id` interno (`users.id`) asociado a ese `auth_user_id`.
*   Para rutas con `deviceId` en el parámetro (ej. `/api/devices/:deviceId/readings`), se realiza una verificación explícita de propiedad para asegurar que el `deviceId` solicitado pertenece al `user_id` autenticado.

### Endpoints Implementados:

**1. `GET /api/me`**
*   **Descripción**: Obtiene la información del usuario autenticado. Realiza aprovisionamiento "just-in-time" si el usuario no existe en la DB de la aplicación.
*   **Respuesta Exitosa (200 OK)**: Retorna un objeto `user` con `id`, `authUserId`, `email`, `fullName`.

**2. `POST /api/logout`**
*   **Descripción**: Invalida la sesión de Neon Auth y borra la cookie local.
*   **Respuesta Exitosa (200 OK)**: `{ success: true }`.

**3. `GET /api/devices`**
*   **Descripción**: Lista todos los dispositivos asociados al usuario autenticado. La respuesta está optimizada para incluir la marca de tiempo del último evento para cada dispositivo, reduciendo llamadas adicionales del frontend.
*   **Respuesta Exitosa (200 OK)**: Array de objetos `Device` con `id`, `deviceId`, `name`, `status`, `lastSeen`, `lastEventAt`.

**4. `GET /api/pets`**
*   **Descripción**: Lista todas las mascotas asociadas al usuario autenticado. Incluye el `deviceIdentifier` (el string `device_id` de MQTT) si la mascota está vinculada a un dispositivo.
*   **Respuesta Exitosa (200 OK)**: Array de objetos `Pet` con `id`, `name`, `species`, `breed`, `birthDate`, `deviceId` (nuestro ID interno), `deviceIdentifier` (string de MQTT).

**5. `GET /api/devices/:deviceId/readings`**
*   **Descripción**: Obtiene el historial de lecturas de sensores para un `deviceId` específico. Requiere que el dispositivo sea propiedad del usuario.
*   **Parámetros de URL**: `:deviceId` (string, ej: "KPCL0033").
*   **Parámetros de Query**: `start_date` (ISO 8601, opcional), `end_date` (ISO 8601, opcional).
*   **Respuesta Exitosa (200 OK)**: Array de objetos `SensorReading` con `ts`, `receivedAt`, `deviceId`, `temperatureCelsius`, `humidityPercent`, `lightLux`, `weightGrams`.

**6. `GET /api/devices/:deviceId/events`**
*   **Descripción**: Obtiene el historial de eventos del dispositivo para un `deviceId` específico. Requiere que el dispositivo sea propiedad del usuario.
*   **Parámetros de URL**: `:deviceId` (string, ej: "KPCL0033").
*   **Parámetros de Query**: `start_date` (ISO 8601, opcional), `end_date` (ISO 8601, opcional), `limit` (numérico, opcional).
*   **Respuesta Exitosa (200 OK)**: Array de objetos `DeviceEvent` con `id`, `deviceId`, `eventType`, `payload`, `ts`.

---

## 5. Consideraciones para el Frontend

### Lógica de Visualización del Estado del Dispositivo:

Para una interfaz de usuario dinámica y confiable, se recomienda la siguiente lógica de presentación del estado:

1.  **"🟢 Online"**:
    *   `device.status` es `'online'` **AND** `device.lastSeen` es hace menos de 2 minutos.

2.  **"🔴 Offline"**:
    *   `device.status` es `'offline'` **OR** `device.lastSeen` es hace más de 5 minutos (para detectar inactividad incluso si el último estado reportado fue 'online').

3.  **"🟡 Error" / "⚠️ Alerta"**:
    *   `device.status` es `'error'` **OR** el `lastEventAt` del dispositivo indica un evento de tipo `'sensor_error'` o `'low_battery'` reciente.

### Interfaz de Gráficos (Requerimientos Específicos):

Cada gráfico en el dashboard debe funcionar como un componente independiente que incluya:

1.  **Selector de Dispositivo (`Device_ID`)**:
    *   Permite al usuario cambiar qué dispositivo se visualiza en ese gráfico específico.
    *   Debe listar los dispositivos disponibles para el usuario (obtenidos de `/api/devices`).

2.  **Filtro Temporal (Día y Hora)**:
    *   Controles para definir `start_date` y `end_date` con precisión de fecha y hora.
    *   Estos valores se pasan directamente a los parámetros de la API `/api/devices/:deviceId/readings`.

### Recomendaciones Adicionales:

*   **Caching de Datos**: Utilizar librerías como React Query (`@tanstack/react-query`) para la gestión inteligente de los datos, caching y sincronización con el servidor.
*   **Rangos de Fechas**: Implementar siempre selectores de rango de fechas para las consultas de telemetría (`/readings`, `/events`) para evitar sobrecargar el backend y mejorar el rendimiento de la UI.
*   **Polling Estratégico**: Considerar el polling ligero (ej. cada 30-60 segundos) para el estado de los dispositivos activos en la vista principal, utilizando los endpoints `/api/devices` o `/api/devices/:deviceId/events?limit=1`.

---

Este documento sirve como la fuente de verdad para la implementación del proyecto KittyPau.
