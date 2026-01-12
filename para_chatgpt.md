PROMPT PARA GEMINITREE (VS CODE)

Contexto del proyecto (LEE CON ATENCIÓN):
Este repositorio contiene dos aplicaciones mezcladas:

Una aplicación real en producción (Frontend + API) conectada a Neon, Auth y Vercel.

Uno o más mockups / demos / landing pages que NO deben desplegarse en Vercel.

El problema actual es que Vercel está desplegando el mockup, no la app real.

Objetivo final:
Que Vercel despliegue únicamente la app real, sin mocks, sin demos, sin código muerto, y sin romper dependencias compartidas.

🟢 FASE 1 — DIAGNÓSTICO (NO MODIFICAR CÓDIGO)

Tu primera tarea es SOLO diagnosticar. No edites ni borres nada todavía.

Identifica con precisión:

Cuál es la app real

Cuáles son mockups / demos / landing

Para cada una, determina:

Qué carpetas usa

Qué entry points usa (main.tsx, index.html, etc.)

Qué dependencias comparte con otras partes del repo

Qué componentes, hooks, estilos o assets son compartidos

Genera un mapa claro:

APP REAL:
  - carpetas:
  - rutas:
  - dependencias:
  - assets compartidos:

MOCKUP / DEMO:
  - carpetas:
  - rutas:
  - dependencias:
  - assets compartidos:


⚠️ No asumas nada. Confirma leyendo imports reales.

🟢 FASE 2 — VALIDACIÓN DE COMPARTICIÓN DE RECURSOS

Antes de separar:

Verifica si el mockup y la app real comparten:

componentes UI

estilos globales (CSS / Tailwind)

hooks

servicios

assets (imágenes, íconos, fuentes)

Marca explícitamente:

Recursos que NO se pueden mover sin romper la app real

Recursos que sí pueden aislarse

⚠️ Si un recurso es compartido, NO lo muevas todavía. Solo documéntalo.

🟢 FASE 3 — PROPUESTA DE SEPARACIÓN (SIN EJECUTAR)

Propón (NO ejecutes aún):

Qué carpetas deben:

permanecer activas

moverse a un directorio de archivo (ej: /__archive__)

añadirse a .gitignore

Qué cambios mínimos necesita Vercel para:

desplegar solo la app real

ignorar completamente el mockup

Verifica que:

/client + /server funcionen de forma independiente

No haya imports rotos

Entrega esta fase como un plan paso a paso, no como código.

🟢 FASE 4 — PREPARACIÓN PARA EJECUCIÓN (PERO NO EJECUTES)

Cuando el diagnóstico esté completo:

Confirma explícitamente:

“La app real puede desplegarse sola sin dependencias del mockup”

Lista exactamente:

Qué carpetas irán a .gitignore

Qué carpetas se eliminarán del build de Vercel

Qué queda como fuente de verdad

⚠️ NO realices cambios hasta que el usuario confirme.

🔴 REGLAS ESTRICTAS

❌ No borres código

❌ No muevas carpetas sin confirmación

❌ No modifiques Vercel config aún

❌ No refactorices por “mejora”

✅ Diagnóstico primero

✅ Explicaciones claras

✅ Mapas y listas explícitas

✅ DEFINICIÓN DE ÉXITO

El trabajo se considera correcto cuando:

Está 100% claro qué se despliega en Vercel

Está claro qué es mockup y qué no

La app real queda aislada, limpia y controlada

El usuario puede ejecutar la separación con seguridad

🧠 POR QUÉ ESTE PROMPT ES IMPORTANTE

Este prompt:

Evita que Gemini “optimice” sin permiso

Evita romper imports compartidos

Te devuelve control total del proyecto

Te deja listo para producción real

Cuando Gemini termine esa FASE 1–3, no hagas nada más.
Vuelves acá, me pegas el diagnóstico, y yo te ayudo a:

✔️ Confirmar
✔️ Separar
✔️ Limpiar
✔️ Dejar Vercel 100% correcto

Si quieres, después también podemos crear:

DEPLOY.md

ARCHITECTURE.md

checklist de producción