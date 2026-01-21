# PASO 1: Verificación de Entorno y Servicios

Antes de ejecutar el proyecto, asegúrate de que los siguientes servicios y configuraciones estén correctos.

## 1. Neon (Base de Datos)
- [ ] **Acceso:** Verifica que puedes acceder al dashboard de Neon.
- [ ] **Proyecto:** Confirma que el proyecto `kittypau` (o el nombre que uses) existe.
- [ ] **Connection String:**
    - Ve a "Dashboard" > "Connection Details".
    - Copia la cadena de conexión (debe empezar con `postgres://...`).
    - Asegúrate de que esta cadena esté en tu archivo `.env` local como `DATABASE_URL`.
- [ ] **Tablas:** Verifica que las tablas `users`, `devices`, `pets`, `sensor_readings`, `device_events` y `alert_settings` existan. Si no, ejecuta `npm run db:push`.

## 2. Vercel (Despliegue y Backend)
- [ ] **Proyecto:** Asegúrate de tener el proyecto creado en Vercel y vinculado a tu repositorio de GitHub.
- [ ] **Variables de Entorno:**
    - Ve a "Settings" > "Environment Variables".
    - Asegúrate de que `DATABASE_URL` esté configurada con la misma cadena de conexión de Neon (para producción).
    - Verifica otras variables como `AUTH_SECRET` si aplica.
- [ ] **Despliegues:** Revisa la pestaña "Deployments" para ver si el último despliegue fue exitoso o si hay errores de build.

## 3. Entorno Local
- [ ] **Node.js:** Verifica que tienes Node.js instalado (`node -v`). Se recomienda v18 o superior.
- [ ] **Dependencias:** Asegúrate de haber ejecutado `npm install` recientemente.
- [ ] **Archivo .env:**
    - Debe existir en la raíz del proyecto.
    - Debe contener `DATABASE_URL=...` (tu conexión a Neon).
    - Opcional: `VITE_API_URL` si necesitas apuntar a un backend específico (aunque para `vercel dev` no suele ser necesario).
- [ ] **Vercel CLI:**
    - Instala si no lo tienes: `npm install -g vercel`.
    - Inicia sesión: `vercel login`.
    - Vincula el proyecto: `vercel link`.

## 4. Ejecución
Para desarrollar localmente con la API serverless funcionando:
1.  Abre una terminal en la raíz del proyecto.
2.  Ejecuta: `vercel dev`
3.  Abre `http://localhost:3000` en tu navegador.

---

**Si encuentras problemas, ejecuta el script de diagnóstico `diagnostico_total.ps1` y comparte el resultado.**