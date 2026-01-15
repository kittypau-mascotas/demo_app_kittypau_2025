Perfecto. Aquí tienes un prompt único, fuerte y definitivo, pensado para que el modelo actúe como arquitecto senior, revise TODO el proyecto y lo deje funcionando en Vercel con login visible y operativo, sin parches ni soluciones parciales.

Puedes copiarlo tal cual y pegarlo en Gemini / ChatGPT / Claude.

🧠 PROMPT DEFINITIVO – SOLUCIÓN TOTAL LOGIN + VERCEL + BETTER AUTH

Actúa como Arquitecto Senior Full-Stack (Node.js + React + Vercel + Better Auth + Neon).

Tengo una aplicación monorepo desplegada en Vercel con:

Frontend: React + Vite (SPA)

Backend: Express en serverless

Auth: Better Auth con Neon (Postgres)

DB: Neon

🚨 PROBLEMAS ACTUALES

/login devuelve 404 en Vercel o carga el HTML pero no funciona la auth.

/auth/session devuelve 404 o 401.

/api/me devuelve 500 o 401.

Se usó incorrectamente auth.requireAuth() (NO existe).

Hubo confusión entre Neon Auth UI y Better Auth headless.

El frontend no detecta sesión aunque el usuario exista en Neon.

Vercel no sirve correctamente el SPA.

🎯 OBJETIVO FINAL

Ver /login funcionando en producción

Poder loguearse

Que /auth/session funcione

Que /api/me devuelva el usuario autenticado

Sin errores TypeScript

Sin dependencias incorrectas

Arquitectura limpia y correcta

🧩 CONTEXTO TÉCNICO (OBLIGATORIO)

Better Auth NO expone requireAuth

La sesión se obtiene con:

auth.api.getSession({ headers })


Express NO inyecta req.user

Vercel necesita rewrite SPA

Neon Auth NO es una API REST pública

📂 QUÉ DEBES HACER

Auditar TODO el proyecto:

server/index.ts

server/auth/neonAuth.ts

server/routes.ts

middlewares

vercel.json

package.json

frontend auth flow

Corregir arquitectura de auth:

Usar auth.handler

Crear middleware requireAuth manual

Tipar correctamente Express

Arreglar Vercel:

SPA rewrite correcto

API routing correcto

Build & output correctos

Arreglar Frontend:

/login visible

Formularios propios

AuthContext usando /auth/session

Manejo correcto de cookies

Eliminar dependencias incorrectas:

@neondatabase/auth

@neondatabase/auth-ui

AuthView

📤 FORMATO DE RESPUESTA (MUY IMPORTANTE)

Responde en este orden:

Diagnóstico raíz (qué estaba mal y por qué)

Arquitectura final correcta (diagrama textual)

Cambios exactos por archivo (con código)

vercel.json final

Checklist final para producción

No des sugerencias vagas.
No omitas código.
No propongas alternativas.

🔥 El resultado debe dejar el proyecto FUNCIONANDO EN VERCEL CON LOGIN VISIBLE.

Comienza.

✅ Qué este prompt logra

✔ Obliga al modelo a entender Better Auth correctamente
✔ Fuerza solución completa, no parches
✔ Ataca frontend + backend + Vercel
✔ Evita repetir el error requireAuth()
✔ Ideal para cerrar el problema definitivamente

Si quieres, en el próximo mensaje puedo:

Adaptarlo 100% a Gemini

O convertirlo en checklist de implementación paso a paso

O auditar contigo el vercel.json final línea por línea

Estás muy cerca de cerrar este bug 👊🐾