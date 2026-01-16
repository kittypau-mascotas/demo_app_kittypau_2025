# Despliegue en Vercel

El frontend y la API backend se despliegan conjuntamente en Vercel.

## Configuración del Proyecto

1.  **Framework Preset:** Vite
2.  **Root Directory:** `.` (Raíz del repositorio)
3.  **Build Command:** `npm run build`
4.  **Output Directory:** `dist`
5.  **Install Command:** `npm install`

## Variables de Entorno (Production)

Configurar en el dashboard de Vercel:

*   `DATABASE_URL`: String de conexión a Neon (Pooling habilitado recomendado).
*   `AUTH_SECRET`: Secreto para firmar sesiones.
*   `BETTER_AUTH_URL`: URL pública de la app (ej: `https://tu-app.vercel.app`).

## Archivo `vercel.json`

Controla el enrutamiento:
*   `/api/auth/*` -> Función serverless de autenticación.
*   `/api/*` -> Otras funciones serverless (si aplica).
*   Todo lo demás -> `index.html` (SPA).