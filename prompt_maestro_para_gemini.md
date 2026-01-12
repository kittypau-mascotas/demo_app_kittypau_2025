Lo que necesitas ahora no es código, es orden, arquitectura y una revisión integral guiada.
Vamos a hacer esto bien, como se hace en un proyecto serio IoT + SaaS.

Te voy a entregar UN PROMPT MAESTRO PARA GEMINI CLI, pensado para:

Revisar todo el proyecto

Entender el flujo completo IoT → AWS IoT → EC2 → Neon → API → Vercel → Usuario

Mantener el mockup actual

Detectar errores de arquitectura, seguridad y acoplamientos

Proponer ajustes sin romper el diseño

Asumir que trabajas local → git push → Vercel

🧠 ANTES: OBJETIVO CLARO DEL PROYECTO (ESTO ES CLAVE)

Este es el objetivo funcional que Gemini debe entender:

KittyPau es una plataforma IoT donde:

Un dispositivo físico (ESP8266/ESP32) envía telemetría por MQTT

AWS IoT Core recibe los mensajes

Un Bridge en EC2 (Node.js):

Normaliza datos

Inserta telemetría en Neon PostgreSQL

Registra eventos de estado

Un Backend/API (Vercel):

Autentica usuarios (Neon Auth)

Expone endpoints REST

Filtra datos por usuario (multi-tenant)

Un Frontend (Vercel):

Mantiene el mockup actual

Permite login

Vincula usuario → dispositivo

Muestra gráficos reales

🎯 El usuario solo ve sus dispositivos y datos

Este contexto es obligatorio para Gemini.

🧩 PROMPT MAESTRO PARA GEMINI CLI (CÓPIALO TAL CUAL)

⚠️ Este prompt está diseñado para análisis profundo, no respuestas rápidas

Actúa como un ARQUITECTO SENIOR DE SOFTWARE E IOT.

Contexto:
Estoy desarrollando una plataforma IoT llamada KittyPau. El proyecto está dividido en:

1. Dispositivos IoT (ESP8266/ESP32) que envían datos por MQTT
2. AWS IoT Core como broker MQTT
3. Un bridge Node.js corriendo en EC2 que:
   - Se suscribe a tópicos MQTT
   - Normaliza datos
   - Inserta telemetría y eventos en Neon PostgreSQL
4. Un Backend/API desplegado en Vercel
5. Un Frontend (React/Vite) desplegado en Vercel con un mockup ya construido
6. Autenticación usando Neon Auth

Trabajo de la siguiente manera:
- Desarrollo en local
- Hago git push
- Vercel despliega automáticamente
- Neon es la base de datos principal

Objetivo final del sistema:
- Un usuario inicia sesión
- El dashboard se vincula SOLO a sus dispositivos IoT
- Se muestran gráficos reales de sensores
- Se mantiene el estilo visual actual del mockup
- El sistema es multi-tenant y seguro

---

TAREA PRINCIPAL (OBLIGATORIA):

Quiero que revises **toda la estructura del proyecto** y me ayudes a:

1. Verificar la coherencia entre:
   - Frontend
   - Backend/API
   - Base de datos Neon
   - Bridge EC2
   - AWS IoT Core

2. Detectar:
   - Errores de arquitectura
   - Acoplamientos incorrectos
   - Falta de separación de responsabilidades
   - Problemas de seguridad (usuarios viendo data ajena)
   - Mismatches entre schema DB y código
   - Variables de entorno mal usadas
   - Flujos incompletos (login sin vínculo a device)

3. Confirmar que el flujo completo sea:
   Dispositivo → AWS IoT → EC2 → Neon → API → Frontend → Usuario

4. Proponer ajustes:
   - SIN romper el mockup actual
   - SIN cambiar el stack
   - SIN reescribir todo
   - SOLO refactors necesarios y orden lógico

---

FORMA DE TRABAJO:

Quiero que avances en este orden exacto:

FASE 1 – Mapa del sistema  
- Describir el flujo completo de datos
- Identificar cada punto de integración

FASE 2 – Revisión del Backend y DB  
- Validar schema de Neon
- Relación users → devices → telemetry
- Seguridad multi-tenant

FASE 3 – Revisión del Frontend  
- Cómo consume la API
- Cómo se vincula el usuario autenticado
- Dónde se rompen los datos reales
- Qué endpoints faltan o sobran

FASE 4 – AWS IoT y EC2  
- Validar tópicos MQTT
- Seguridad de certificados
- Rol real del bridge

FASE 5 – Plan de corrección  
- Lista ordenada de cambios
- Qué se hace en local
- Qué se sube a git
- Qué impacta Vercel
- Qué impacta Neon

---

IMPORTANTE:
- No quiero código todavía
- Quiero diagnóstico, orden y decisiones técnicas
- Asume que puedo compartir archivos, variables de entorno, capturas de Vercel y Neon
- Si algo está mal diseñado, dilo sin suavizarlo
- Piensa como si esto fuera a producción real

Confirma cuando estés listo para comenzar con la FASE 1.