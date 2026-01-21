# Changelog

## [Unreleased] - 2024-05-25

### Añadido
- **Autenticación Propia:** Implementación completa de sistema de login y registro usando `bcrypt` para hashing de contraseñas y cookies `HttpOnly` para gestión de sesiones.
- **Endpoints de API:**
    - `POST /api/auth/login`: Iniciar sesión.
    - `POST /api/auth/register`: Registro de nuevos usuarios.
    - `POST /api/auth/logout`: Cerrar sesión.
    - `GET /api/auth/me`: Obtener usuario actual.
    - `GET /api/health`: Verificación de estado del sistema.
- **Documentación:** Nuevo archivo `docs/ERRORES.md` para registro de incidencias.

### Cambiado
- **Estructura de API:** Se eliminó el monolito `api/index.ts` en favor de archivos individuales en `api/` para mejor organización y cumplimiento de prácticas serverless.
- **Base de Datos:** Actualización del esquema (`shared/schema.ts`) para eliminar tablas obsoletas de `better-auth` y agregar campos `password`, `firmwareVersion` y `batteryLevel`.
- **Frontend:**
    - Reemplazo de `better-auth/react` por hooks personalizados `useSession` y `useSignOut` en `client/src/lib/auth-client.ts`.
    - Actualización de `Sidebar.tsx` y `Header.tsx` para usar el nuevo sistema de auth.
    - Corrección de rutas absolutas a relativas en `client/src/lib/api.ts` para compatibilidad con `vercel dev`.

### Corregido
- **Entorno Local:** Solucionado conflicto de `yarn.lock` y configuración de `vercel dev` para desarrollo local unificado.
- **Tipado:** Corrección de múltiples errores de TypeScript relacionados con propiedades faltantes en el esquema de base de datos.
- **Imports:** Cambio de alias (`@lib`, `@shared`) a rutas relativas en el backend para compatibilidad con el entorno de ejecución de Vercel.
- **UI:** Corrección de anidamiento inválido de etiquetas `<a>` en el Sidebar.
- **Script de Diagnóstico:** Solucionado error de sintaxis en `diagnostico_total.ps1` relacionado con la codificación de caracteres al final del archivo.