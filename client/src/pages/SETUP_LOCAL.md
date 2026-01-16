# Configuración Local

Guía para levantar el entorno de desarrollo en tu máquina.

## Requisitos

*   Node.js (LTS recomendado)
*   npm o pnpm
*   Acceso al repositorio

## Pasos

1.  **Instalar dependencias:**
    ```bash
    npm install
    # Si hay una carpeta client separada (monorepo híbrido):
    cd client && npm install && cd ..
    ```

2.  **Configurar variables de entorno:**
    *   Copia `.env.example` a `.env`.
    *   Rellena `DATABASE_URL`, `AUTH_SECRET`, etc.

3.  **Sincronizar base de datos (Schema):**
    ```bash
    npm run db:push
    ```

4.  **Iniciar servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    Esto iniciará tanto el frontend (Vite) como el backend (tsx watch) o la emulación de Vercel si usas `vercel dev`.