# Resumen de la API

La API es RESTful y se ejecuta en funciones serverless.

## Autenticación

*   **Base:** `/api/auth`
*   **Librería:** Better Auth
*   **Endpoints:** `/api/auth/signin`, `/api/auth/signout`, `/api/auth/session`, etc.

## Dispositivos

*   `GET /api/devices`: Lista dispositivos del usuario autenticado.
*   `GET /api/devices/:id/events`: Historial de eventos de un dispositivo.

## Mascotas

*   `GET /api/pets`: Lista mascotas del usuario.

## Seguridad

*   Todos los endpoints privados validan la sesión.
*   Se verifica estrictamente que el recurso solicitado pertenezca al `userId` de la sesión.
*   No se exponen IDs internos secuenciales si es posible evitarlo (uso de UUIDs o validación estricta).
