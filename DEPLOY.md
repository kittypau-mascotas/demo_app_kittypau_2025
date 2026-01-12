# Guía de Despliegue

Este documento explica cómo construir y desplegar el proyecto KittyPau en Vercel.

## Requisitos Previos

1.  **Node.js y npm:** Asegúrate de tener Node.js (versión 18 o superior) y npm instalados.
2.  **Cuenta de Vercel:** Necesitas una cuenta de Vercel y tener el CLI de Vercel instalado si deseas desplegar desde tu terminal.
3.  **Variables de Entorno:** El proyecto requiere variables de entorno para conectarse a la base de datos (Neon) y otros servicios. Debes tener un archivo `.env` configurado a partir del `.env.example`. Estas variables también deben estar configuradas en el "Environment Variables" de tu proyecto en Vercel.

---

## Proceso de Build

El proyecto se construye usando el script `build` definido en `package.json`.

```bash
npm run build
```

Este comando ejecuta dos tareas principales en secuencia:

1.  **`vite build`**:
    *   Construye el frontend de React.
    *   Toma el código fuente de la carpeta `/client`.
    *   Genera una versión optimizada y estática en la carpeta `/dist`.

2.  **`esbuild server/index.ts ...`**:
    *   Construye el backend de Express.
    *   Toma el código fuente de `/server` y lo empaqueta en un único archivo.
    *   Genera el archivo `/api/index.js`, que está listo para ser desplegado como una Vercel Serverless Function.

## Despliegue en Vercel

El despliegue en Vercel está configurado a través del archivo `vercel.json`.

### Configuración de `vercel.json`

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/index.js" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

-   **`"use": "@vercel/static-build"`**: Le dice a Vercel que use el script `build` de `package.json` para construir el proyecto.
-   **`"distDir": "dist"`**: **(Importante)** Especifica que el resultado del build estático (el frontend) se encuentra en la carpeta `/dist`. Vercel servirá estos archivos.
-   **`"rewrites"`**:
    -   Las solicitudes a `/api/...` se redirigen a la función serverless del backend.
    -   Todas las demás solicitudes se redirigen a `index.html`, permitiendo que el enrutamiento del lado del cliente de React funcione correctamente.

### Pasos para Desplegar

1.  **Conectar el Repositorio a Vercel:**
    *   En tu dashboard de Vercel, crea un nuevo proyecto e importa tu repositorio de Git.

2.  **Configurar el Proyecto:**
    *   Vercel detectará automáticamente que es un proyecto de Vite y debería seleccionar la configuración correcta.
    *   Asegúrate de que el "Build Command" sea `npm run build` (o déjalo en blanco si Vercel lo infiere correctamente).
    *   Asegúrate de que el "Output Directory" sea `dist` (o déjalo en blanco si Vercel lo infiere correctamente).
    *   Agrega tus variables de entorno en la configuración del proyecto.

3.  **Desplegar:**
    *   Vercel desplegará automáticamente cada vez que hagas un `push` a la rama principal (o la rama que hayas configurado).
    *   También puedes iniciar un despliegue manualmente desde el dashboard de Vercel o usando el CLI de Vercel con el comando `vercel --prod`.
