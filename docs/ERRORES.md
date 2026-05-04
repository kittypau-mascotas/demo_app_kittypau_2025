# Registro de Errores y Soluciones - KittyPau

Este documento recopila los errores técnicos encontrados durante el desarrollo y sus respectivas soluciones para referencia futura.

## 📅 25/05/2024 - Migración de Auth y Configuración de Entorno

### 1. Error de Resolución de Módulos en Vercel Dev
**Error:**
```
Error: Cannot find module '@lib/db' imported from .../api/auth/me.ts
```
**Causa:**
Las Vercel Serverless Functions (ejecutadas por `vercel dev` o en producción) no resuelven automáticamente los alias de rutas definidos en `tsconfig.json` (como `@lib/*` o `@shared/*`) de la misma manera que Vite. Node.js nativo no entiende estos alias sin configuración adicional en tiempo de ejecución.

**Solución:**
Reemplazar los imports con alias por **rutas relativas** en todos los archivos dentro de `/api`.
*   Antes: `import { db } from "@lib/db";`
*   Después: `import { db } from "../../lib/db";`

### 2. Conflicto de Gestores de Paquetes (Yarn vs NPM)
**Error:**
```
"yarn" no se reconoce como un comando interno o externo...
```
al ejecutar `vercel dev`.

**Causa:**
La presencia de un archivo `yarn.lock` en la raíz del proyecto hizo que Vercel CLI asumiera que el proyecto usaba Yarn, intentando ejecutar comandos con él aunque no estuviera instalado.

**Solución:**
Eliminar el archivo `yarn.lock` para forzar a Vercel a usar `npm` (detectado por `package-lock.json`).

### 3. Nesting Inválido en React (Sidebar)
**Error:**
```
Warning: validateDOMNesting(...): <a> cannot appear as a descendant of <a>.
```
**Causa:**
En `Sidebar.tsx`, el componente `<Link>` de `wouter` ya renderiza un elemento `<a>`. Al colocar otro `<a>` o un elemento interactivo anidado incorrectamente dentro de él, se viola la especificación HTML.

**Solución:**
Eliminar la etiqueta `<a>` interna y aplicar las clases y eventos directamente al componente `<Link>` o al elemento contenedor permitido.

### 4. Errores de CORS en Desarrollo
**Error:**
```
Access-Control-Allow-Origin '*' is not allowed when credentials mode is 'include'
```
**Causa:**
El frontend en `localhost:5173` intentaba hacer fetch directamente a la URL de producción (`https://...vercel.app`). Los navegadores bloquean las cookies (credentials) en peticiones cross-origin si no están configuradas perfectamente.

**Solución:**
1.  Configurar el frontend para usar rutas relativas (ej. `/api/pets`).
2.  Usar `vercel dev` para servir tanto el frontend como el backend en `localhost:3000`, eliminando la necesidad de CORS en desarrollo.

### 5. Error 500 en Endpoints de API
**Error:** `500 Internal Server Error` en `/api/auth/me` o `/api/api/pets`.
**Causa:** Excepciones no controladas en el backend, a menudo debidas a problemas de conexión con la base de datos o consultas mal formadas tras cambios de esquema.
**Solución:** Implementar bloques `try/catch` robustos en los handlers de la API y verificar la integridad del esquema de base de datos (`shared/schema.ts`).

### 6. Error de Sintaxis en Script PowerShell
**Error:**
```
Falta la cadena en el terminador: ".
+ FullyQualifiedErrorId : TerminatorExpectedAtEndOfString
```
**Causa:**
Problemas de codificación de caracteres o caracteres invisibles al final del archivo `diagnostico_total.ps1`, posiblemente causados por la edición manual o diferencias de codificación (UTF-8 vs UTF-8 BOM) en Windows PowerShell.

**Solución:**
Reescribir la última línea del script para asegurar un final de archivo limpio y eliminar caracteres problemáticos.