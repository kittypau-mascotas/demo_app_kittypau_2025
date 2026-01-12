# Checklist de Producción

Esta es una lista de verificación con puntos clave a revisar antes, durante y después de desplegar la aplicación en un entorno de producción.

---

### 1. Configuración y Entorno

-   [ ] **Variables de Entorno:**
    -   [ ] Todas las claves de API, secretos y URLs de bases de datos están configuradas en el entorno de producción de Vercel.
    -   [ ] No hay secretos ni claves hardcodeadas en el código.
    -   [ ] El archivo `.env.example` está actualizado con todas las variables requeridas.
    -   [ ] La variable `NODE_ENV` está establecida en `production`.

-   [ ] **Base de Datos:**
    -   [ ] La base de datos de producción (Neon) está configurada con credenciales seguras.
    -   [ ] Se ha configurado una estrategia de backups automáticos para la base de datos.
    -   [ ] Las migraciones de la base de datos (`drizzle-kit`) se han aplicado correctamente.

-   [ ] **Dependencias:**
    -   [ ] Todas las dependencias de `npm` están fijadas a versiones específicas (`package-lock.json`) para evitar builds no deterministas.
    -   [ ] Se han auditado las dependencias en busca de vulnerabilidades conocidas (`npm audit`).

### 2. Seguridad

-   [ ] **Autenticación y Autorización:**
    -   [ ] Las rutas de la API están protegidas con middleware de autenticación (`requireNeonAuth`).
    -   [ ] Las contraseñas y otros datos sensibles se manejan de forma segura (hashing).
    -   [ ] Se han configurado límites de tasa (rate limiting) en la API para prevenir abusos.

-   [ ] **Headers de Seguridad:**
    -   [ ] La aplicación utiliza headers de seguridad recomendados (CSP, X-Content-Type-Options, etc.) para mitigar ataques como XSS.

-   [ ] **Manejo de Errores:**
    -   [ ] Los mensajes de error en producción no exponen información sensible (stack traces, etc.).

### 3. Build y Despliegue

-   [ ] **Proceso de Build:**
    -   [ ] El script `npm run build` se completa sin errores.
    -   [ ] El código está minificado y optimizado para producción.

-   [ ] **Configuración de Vercel:**
    -   [ ] El dominio personalizado está configurado correctamente.
    -   [ ] El certificado SSL está activo y se renueva automáticamente.
    -   [ ] La configuración en `vercel.json` es correcta y apunta al directorio `dist`.

### 4. Monitoreo y Logging

-   [ ] **Logging:**
    -   [ ] El servidor registra información útil para la depuración de errores en producción.
    -   [ ] Se utiliza un servicio de logging centralizado (como el Log Drains de Vercel) para agregar y analizar logs.
    -   [ ] No se registran datos sensibles del usuario (contraseñas, PII).

-   [ ] **Monitoreo:**
    -   [ ] Se ha configurado un sistema de monitoreo de uptime y rendimiento (ej. Vercel Analytics, Sentry, New Relic).
    -   [ ] Se han configurado alertas para notificar al equipo sobre errores críticos o caídas del servicio.

### 5. Post-Lanzamiento

-   [ ] **Verificación Manual:**
    -   [ ] Se ha verificado que todas las funcionalidades críticas (registro, login, alimentación) funcionan en el entorno de producción.
    -   [ ] Se ha probado la aplicación en diferentes navegadores y dispositivos.

-   [ ] **Plan de Rollback:**
    -   [ ] Existe un plan para revertir a una versión anterior del despliegue en caso de un error grave. Vercel facilita esto a través de su historial de despliegues.
