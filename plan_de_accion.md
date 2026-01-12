# Plan de Acción para la Corrección y Mejora de KittyPau

Este documento detalla los pasos a seguir para solucionar los problemas de seguridad, arquitectura y rendimiento identificados en el archivo `diagnostico.md`.

---

### **Paso 1: Seguridad Crítica del Backend (API Multi-Tenant)**

**Objetivo:** Sellar la brecha de seguridad que permite a los usuarios acceder a datos ajenos.

*   **[ ] 1.1: Aplicar Middleware de Autenticación:**
    *   **Archivo:** `server/routes.ts`
    *   **Acción:** Importar el middleware `requireNeonAuth` y aplicarlo a todas las rutas bajo `/api/*` que manejan datos sensibles.

*   **[ ] 1.2: Refactorizar Consultas de la API para ser Multi-Tenant:**
    *   **Archivos:** `server/routes.ts`.
    *   **Acción:** Modificar cada endpoint para que, además de sus parámetros, siempre filtre las consultas a la base de datos por el `user.id` del usuario autenticado. Esto debe hacerse para `pets`, `devices`, `telemetry`, etc.

---

### **Paso 2: Adaptación y Robustecimiento del Frontend**

**Objetivo:** Asegurar que el frontend pueda manejar la nueva API segura y ofrezca un flujo de usuario coherente.

*   **[ ] 2.1: Implementar Manejo de Errores de Autenticación:**
    *   **Archivo:** `client/src/services/api.ts`
    *   **Acción:** Modificar las funciones de `fetch` para que detecten respuestas con código de estado `401 Unauthorized`.

*   **[ ] 2.2: Crear Flujo de Cierre de Sesión Automático:**
    *   **Archivo:** `client/src/contexts/AuthContext.tsx`
    *   **Acción:** Crear una función `logout`. Cuando el servicio `api.ts` detecte un error `401`, debe invocar esta función para limpiar el estado de autenticación y redirigir al usuario a la página `/login`.

---

### **Paso 3: Optimización de la Base de Datos**

**Objetivo:** Mejorar el rendimiento de las consultas y la flexibilidad del esquema de datos.

*   **[ ] 3.1: Añadir Índices a la Base de Datos:**
    *   **Archivo:** `shared/schema.ts`
    *   **Acción:** Añadir la directiva `.index()` a las columnas que funcionan como claves foráneas (`user_id`, `pet_id`, `device_id`) para acelerar las búsquedas.

*   **[ ] 3.2: (Opcional, Recomendado) Refactorizar Relación Dispositivo-Usuario:**
    *   **Archivo:** `shared/schema.ts`
    *   **Acción:** Añadir una columna `user_id` a la tabla `devices` y permitir que `pet_id` sea opcional (`.nullable()`).

*   **[ ] 3.3: Generar y Aplicar la Migración:**
    *   **Acción (CLI):** Ejecutar los comandos de Drizzle Kit (`generate` y `push`/`migrate`) para aplicar los cambios del schema a la base de datos de Neon.

---

### **Paso 4: Implementación de Endpoints Faltantes**

**Objetivo:** Añadir la funcionalidad necesaria para completar el flujo de usuario.

*   **[ ] 4.1: Crear Endpoint para Asociación de Dispositivos:**
    *   **Archivo:** `server/routes.ts`
    *   **Acción:** Crear una ruta `POST /api/devices/associate` que permita a un usuario vincular un número de serie de un dispositivo a su cuenta.

*   **[ ] 4.2: Crear Endpoint de Resumen para el Dashboard:**
    *   **Archivo:** `server/routes.ts`
    *   **Acción:** Crear una ruta `GET /api/dashboard` que devuelva un conjunto de datos agregados (mascotas, estado de dispositivos, últimas alertas) para el usuario autenticado, optimizando la carga inicial del dashboard.
