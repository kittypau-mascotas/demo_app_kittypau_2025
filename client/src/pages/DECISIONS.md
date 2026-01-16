# Registro de Decisiones de Arquitectura (ADR)

## 1. Separación de Ingestión y API
*   **Decisión:** Usar un Bridge persistente en EC2 para MQTT y Vercel Serverless para la API HTTP.
*   **Por qué:** Vercel (Serverless) no mantiene conexiones persistentes necesarias para suscripciones MQTT. EC2 es ideal para procesos de larga duración.

## 2. Base de Datos Única
*   **Decisión:** Usar Neon PostgreSQL como fuente de verdad única.
*   **Por qué:** Simplifica la arquitectura. El Bridge escribe, la API lee. Neon escala bien y ofrece branchs para desarrollo.

## 3. Autenticación con Better Auth
*   **Decisión:** Reemplazar soluciones custom o Auth.js por Better Auth.
*   **Por qué:** Moderno, type-safe, soporte nativo para plugins y fácil integración con esquemas Drizzle existentes.

## 4. Monorepo Híbrido
*   **Decisión:** Mantener frontend y backend en el mismo repo pero con `tsconfig` separados.
*   **Por qué:** Comparte tipos (`shared/schema.ts`) fácilmente entre front y back sin la complejidad de herramientas de monorepo pesadas (Nx, Turborepo) para este tamaño de proyecto.