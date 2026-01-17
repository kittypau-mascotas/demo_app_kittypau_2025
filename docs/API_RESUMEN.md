# Resumen de la API

La API es RESTful y se ejecuta en funciones serverless.

## Autenticación

*   **Base:** `/api/auth`
*   **Librería:** Better Auth
*   **Endpoints:**
    *   `POST /api/auth/signup`: Registro de nuevos usuarios.
    *   `POST /api/auth/signin`: Inicio de sesión de usuarios.
    *   `POST /api/auth/signout`: Cierre de sesión del usuario.
    *   `GET /api/auth/session`: Obtiene la sesión actual del usuario.
    *   `POST /api/auth/change-password`: Permite al usuario cambiar su contraseña.
    *   `GET /api/auth/sessions`: Lista las sesiones activas del usuario.

## Dispositivos

*   `GET /api/devices`: Lista todos los dispositivos del usuario autenticado.
*   `POST /api/devices`: Registra un nuevo dispositivo.
*   `GET /api/devices/:id`: Obtiene los detalles de un dispositivo específico.
*   `PUT /api/devices/:id`: Actualiza la información de un dispositivo.
*   `DELETE /api/devices/:id`: Elimina un dispositivo.
*   `GET /api/devices/:id/events`: Historial de eventos de un dispositivo.

## Mascotas

*   `GET /api/pets`: Lista todas las mascotas del usuario.
*   `POST /api/pets`: Crea una nueva mascota.
*   `GET /api/pets/:id`: Obtiene los detalles de una mascota específica.
*   `PUT /api/pets/:id`: Actualiza la información de una mascota.
*   `DELETE /api/pets/:id`: Elimina una mascota.
*   `POST /api/pets/:id/activate`: Establece una mascota como activa para el usuario.
*   `GET /api/pets/:id/sensor-readings`: Obtiene las lecturas de sensores para una mascota específica.

## Onboarding

*   `GET /api/onboarding/status`: Obtiene el estado actual del proceso de onboarding del usuario.
*   `POST /api/onboarding/update-status`: Actualiza el estado del proceso de onboarding (ej. `hasPets`, `hasDevices`).

## Dashboard

*   `GET /api/dashboard/summary`: Proporciona un resumen consolidado de KPIs, última telemetría y alertas activas para el dashboard.

## Telemetría

*   `GET /api/telemetry`: Obtiene datos de telemetría filtrados por mascota, dispositivo, rango de tiempo y métrica.

## Usuarios

*   `GET /api/user/export-data`: Exporta todos los datos del usuario.
*   `DELETE /api/user/delete-account`: Elimina la cuenta del usuario y todos sus datos asociados.

## Seguridad

*   Todos los endpoints privados validan la sesión.
*   Se verifica estrictamente que el recurso solicitado pertenezca al `userId` de la sesión.
*   No se exponen IDs internos secuenciales si es posible evitarlo (uso de UUIDs o validación estricta).