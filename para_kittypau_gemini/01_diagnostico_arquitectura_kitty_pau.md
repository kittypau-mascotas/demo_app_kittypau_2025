# Diagnóstico Integral del Proyecto KittyPau

## Objetivo
Este documento diagnostica el estado actual del proyecto KittyPau (Frontend + Backend + IoT + DB) y explica **por qué hoy no estás viendo datos reflejados en Neon ni en Vercel**, aun cuando el mockup funciona.

---
## Arquitectura Objetivo (Fuente de Verdad)
**Esta arquitectura NO se cambia** (confirmada previamente):

1. **IoT (ESP32/ESP8266)**
   → AWS IoT Core (MQTT, X.509)
2. **Bridge IoT (Node.js en EC2)**
   - Se suscribe a MQTT
   - Valida / normaliza datos
   - Inserta en Neon (Postgres)
3. **Base de Datos (Neon)**
   - Multi‑tenant (user → device → telemetry)
4. **Backend API (Vercel)**
   - Auth (Neon Auth)
   - API REST segura
5. **Frontend (Vercel)**
   - React + Vite
   - Consume API

---
## Diagnóstico Actual

### 1️⃣ Confusión de roles (PROBLEMA PRINCIPAL)
Actualmente estás ejecutando **todo junto**:
- Frontend
- Backend API
- Bridge MQTT

👉 Esto **no puede funcionar correctamente en Vercel**, porque:
- Vercel **no mantiene procesos persistentes**
- MQTT requiere conexión viva

✔️ El Bridge **debe vivir SOLO en EC2**
✔️ Vercel solo puede alojar **API REST + Frontend**

---
### 2️⃣ Por qué ves `Unauthorized`

Ruta:
```
GET /api/me → requireNeonAuth
```

Esto falla porque:
- El navegador **no tiene sesión Neon Auth activa**
- No hay flujo completo de login aún conectado

No es error de código → es **flujo incompleto**

---
### 3️⃣ Error `DATABASE_URL is not set`

Causa:
- `.env` **no se estaba cargando**

Solución aplicada correctamente:
- `import 'dotenv/config'`

✔️ Esto ya quedó bien

---
### 4️⃣ Error EADDRINUSE :3000

Significa:
- Ya hay **un backend corriendo en 3000**
- Intentas levantar otro

✔️ No es grave
✔️ Solo se debe ejecutar **una vez**

---
## Estado real del sistema hoy

| Capa | Estado |
|----|----|
| Neon DB | ✅ OK |
| Tablas | ✅ OK |
| Backend API local | ⚠️ Mezclado |
| Frontend | ⚠️ No autenticado |
| Auth | ❌ Incompleto |
| Bridge IoT | ❌ No separado |

---
## Conclusión clave

❌ El problema **NO es el mockup**
❌ NO es Drizzle
❌ NO es Neon

✔️ El problema es **orden y separación de responsabilidades**

En los siguientes documentos se explica **cómo arreglarlo sin romper nada visual**.

