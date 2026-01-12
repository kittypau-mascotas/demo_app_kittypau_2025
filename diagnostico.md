## FASE 1 y 2: Diagnóstico y Validación

### Mapa del Proyecto

#### APP REAL (Aplicación Principal)
Esta es la aplicación full-stack (React + Express) que debe ser desplegada en producción.

*   **Carpetas Clave:**
    *   `client/`: Código fuente del frontend (React).
    *   `server/`: Código fuente del backend (Express API).
    *   `shared/`: Código compartido entre `client` y `server`.
    *   `dist/`: Carpeta de salida para el build del frontend (generada por Vite).
    *   `api/`: Carpeta de salida para el build del backend (generada por esbuild).

*   **Puntos de Entrada:**
    *   **Frontend:** `client/index.html` (que carga `client/src/main.tsx`).
    *   **Backend:** `server/index.ts`.

*   **Assets y Dependencias:**
    *   Los assets estáticos (imágenes, etc.) se encuentran en `client/public/`.
    *   El directorio `attached_assets/` también se utiliza a través de un alias (`@assets`) en la configuración de Vite.
    *   Todas las dependencias de `npm` están en el `package.json` raíz.

#### MOCKUP / DEMO (Sitio Estático)
Este es un build estático que Vercel está desplegando actualmente por error. No es la aplicación real.

*   **Carpetas Clave:**
    *   `public/`: Contiene la totalidad del mockup, incluyendo un `index.html` y una carpeta `assets/` con JS/CSS pre-compilados.

*   **Conflicto Principal:**
    *   El archivo `vercel.json` está configurado para desplegar el contenido de `public/` como si fuera el resultado del build (`"distDir": "public"`), ignorando por completo el build real de la aplicación que se genera en la carpeta `dist/`.

### Validación de Recursos Compartidos

*   **¿La app real y el mockup comparten código?**
    *   **No.** No comparten componentes, hooks, estilos ni lógica. El mockup (`public/`) es un producto ya compilado, mientras que la app real reside como código fuente en `client/` y `server/`.

*   **¿Comparten assets?**
    *   **Sí, pero de forma redundante.** Las imágenes en `public/` son una copia de las que existen en `client/public/`. La app real solo necesita los archivos de `client/public/`.

### Conclusión del Diagnóstico

*   La **app real** está compuesta por `client/`, `server/`, `shared/` y `attached_assets/`.
*   El **mockup** es la carpeta `public/`.
*   **Se pueden separar sin riesgo.** La app real no tiene dependencias del mockup (`public/`).

## FASE 3 — PROPUESTA DE SEPARACIÓN (Plan de Acción)

A continuación, se presenta el plan para corregir el despliegue. **No ejecutaré estos pasos hasta recibir confirmación.**

1.  **Archivar el Mockup:**
    *   Renombrar la carpeta `public/` a `__archive_public/`. Esto la desactiva inmediatamente sin borrarla, permitiendo una fácil reversión si fuera necesario.

2.  **Limpiar el Directorio de Assets del Cliente:**
    *   El contenido de `client/public/` ya es correcto y no necesita cambios, ya que contiene los assets que la aplicación real necesita. No hay necesidad de mover nada aquí.

3.  **Corregir la Configuración de Vercel:**
    *   Modificar `vercel.json` para que apunte al directorio de salida correcto. El cambio clave es:
        *   Cambiar `"distDir": "public"` por `"distDir": "dist"`.

4.  **Añadir el Directorio Archivado al `.gitignore`:**
    *   Añadir la línea `__archive_public/` al archivo `.gitignore` para asegurar que la carpeta archivada no se incluya en futuros commits.

### Verificación del Plan

*   **¿Funcionarán `client` + `server`?** Sí. La comunicación entre ellos no se ve afectada, ya que el cambio solo afecta al proceso de build y despliegue del frontend.
*   **¿Habrá imports rotos?** No. La app real (`client`) no importa nada desde la carpeta `public/`.
*   **¿Qué desplegará Vercel?** Después de estos cambios, Vercel utilizará el script `build` de `package.json`, tomará el resultado de la carpeta `dist/` (que es el frontend de React compilado) y lo desplegará correctamente junto con la API de la carpeta `api/`.

Este plan aísla la app real, limpia la estructura del proyecto y corrige la configuración de despliegue para que Vercel sirva la aplicación correcta.