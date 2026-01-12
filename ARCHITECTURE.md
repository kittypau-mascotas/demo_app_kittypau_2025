# Arquitectura del Proyecto KittyPau

Este documento describe la estructura y arquitectura del proyecto KittyPau, una aplicación web full-stack.

## Vista General

El proyecto sigue una arquitectura de monorepo que separa claramente el código del frontend, el backend y el código compartido.

-   **Frontend:** Una Single-Page Application (SPA) construida con React y Vite.
-   **Backend:** Un servidor de API construido con Express.js.
-   **Base de Datos:** Utiliza una base de datos PostgreSQL, con Drizzle ORM para la interacción.
-   **Código Compartido:** Lógica y tipos (especialmente schemas) que se usan tanto en el frontend como en el backend.

---

## Estructura de Carpetas

A continuación se detallan las responsabilidades de cada directorio principal:

### `/client`
Contiene todo el código fuente del frontend.

-   **/client/src/**: El corazón de la aplicación React.
    -   **/components**: Componentes de React reutilizables.
    -   **/contexts**: Proveedores de contexto de React (ej. `AuthContext`).
    -   **/hooks**: Hooks de React personalizados.
    -   **/lib**: Funciones de utilidad.
    -   **/pages**: Componentes que representan las páginas principales de la aplicación.
    -   **/services**: Lógica para comunicarse con la API del backend.
-   **/client/public/**: Assets estáticos (imágenes, favicons) que son servidos directamente por el servidor de desarrollo y copiados al directorio de build.
-   **client/index.html**: El punto de entrada HTML de la aplicación. Vite inyecta aquí los scripts y estilos.

### `/server`
Contiene todo el código fuente del backend.

-   **/middleware**: Middlewares de Express (ej. para autenticación).
-   **bridge.ts**: Lógica para la comunicación con dispositivos IoT (MQTT).
-   **db.ts**: Configuración de la conexión a la base de datos (Neon).
-   **index.ts**: El punto de entrada principal del servidor Express. Define las rutas y arranca el servidor.
-   **routes.ts**: Definición de los endpoints de la API.
-   **websocket.ts**: Lógica para el servidor de WebSockets.

### `/shared`
Contiene código que es utilizado tanto por el frontend (`/client`) como por el backend (`/server`).

-   **schema.ts**: Definiciones de schema de Drizzle ORM y Zod. Esto es crucial para mantener la consistencia de los datos entre el cliente y el servidor.

### `/dist`
Carpeta generada automáticamente por el proceso de build del frontend.

-   Contiene la versión optimizada y compilada de la aplicación React.
-   **Esta es la carpeta que Vercel despliega.**

### `/api`
Carpeta generada automáticamente por el proceso de build del backend.

-   Contiene el servidor Express empaquetado en un único archivo (`index.js`) listo para ser desplegado como una Serverless Function en Vercel.

### `/attached_assets`
Contiene assets adicionales (imágenes, etc.) que pueden ser utilizados en el código a través del alias `@assets` configurado en `vite.config.ts`.

### `/__archive_public`
Un archivo de un antiguo mockup o demo estático. **No se utiliza en la aplicación real** y está ignorado por Git.
