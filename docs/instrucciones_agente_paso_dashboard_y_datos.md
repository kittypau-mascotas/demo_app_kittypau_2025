# Instrucciones para el Agente – Integración de Usuario, Household y Datos Reales

## Contexto actual (NO repetir pasos previos)
- Neon Auth ya está integrado en frontend y backend.
- AuthContext funciona vía `/api/me` y `/api/logout`.
- Tabla `users` es **perfil**, no autenticación.
- Header ya fue actualizado para usar `user.name || user.email`.
- Dashboard y otras páginas aún usan **datos mock**.

El agente debe **continuar exactamente desde este punto**.

---

## OBJETIVO GENERAL
Conectar la UI autenticada con **datos reales**, estableciendo correctamente la relación:

`Neon Auth User → users → household → pets / devices / telemetry`

Sin romper JSX existente ni rediseñar componentes.

---

## PASO 1 – Definir ownership (CRÍTICO)

### 1.1 Decisión de modelo
Implementar el modelo:

**Un usuario = un household**

---

### 1.2 Backend – Esquema

Modificar `shared/schema.ts`:

- Añadir `householdId` a la tabla `users`
- Relación: `users.householdId → households.id`

Ejemplo conceptual:
```ts
householdId: integer("household_id").references(() => households.id)
```

---

### 1.3 Backend – /api/me (upsert lógico)

Modificar el endpoint `/api/me` para que:

1. Lea `req.neonUser`
2. Busque `users.id === neonUser.id`
3. Si **NO existe**:
   - Crear household
   - Crear user con:
     - id = neonUser.id
     - email, name
     - householdId recién creado
     - role = 'owner'
4. Retornar:

```json
{
  id,
  email,
  name,
  role,
  householdId
}
```

⚠️ Este endpoint es la **fuente de verdad del frontend**.

---

## PASO 2 – Seguridad de rutas

Aplicar `requireNeonAuth` a TODAS las rutas de datos:

- pets
- devices
- households
- telemetry

Ejemplo:
```ts
app.get('/api/pets', requireNeonAuth, ...)
```

⚠️ No implementar aún validación por household en SQL, solo protección básica.

---

## PASO 3 – Frontend: extender AuthContext

Modificar el tipo `User` en `AuthContext.tsx`:

```ts
export type User = {
  id: string;
  email: string;
  name?: string;
  role: string;
  householdId: number;
};
```

Asegurar que `/api/me` hydrate este objeto correctamente.

---

## PASO 4 – React Query: datos reales

### 4.1 Pets

- Crear hook `usePets()`
- GET `/api/pets?householdId={user.householdId}`
- Reemplazar mocks en:
  - Dashboard
  - Pets page

---

### 4.2 Devices

- Crear hook `useDevices()`
- GET `/api/devices?householdId={user.householdId}`
- Reemplazar mocks en Dashboard

---

## PASO 5 – Dashboard

Modificar **solo la lógica de datos**, NO JSX:

- Stats → contadores reales
- Lists → pets y devices reales
- Mantener placeholders si la API aún no existe

---

## PASO 6 – Telemetría (PREPARACIÓN)

NO implementar aún gráficos finales.

Solo:
- Definir endpoints REST de lectura:
  - `/api/sensor-readings`
  - `/api/consumption-events`
- Aceptar `deviceId` y `range`

Los gráficos se conectarán en el siguiente bloque.

---

## REGLAS DEL AGENTE (OBLIGATORIAS)

- ❌ No usar datos mock nuevos
- ❌ No tocar JSX salvo props
- ❌ No agregar auth duplicado
- ✅ Usar siempre `householdId`
- ✅ Mantener tipado estricto
- ✅ Un commit lógico por paso

---

## CRITERIO DE ÉXITO

El trabajo está correcto si:

- Un usuario nuevo entra → se crea household automáticamente
- Refrescar la página mantiene sesión
- Dashboard muestra datos reales (aunque vacíos)
- Ninguna ruta responde sin auth

---

**Fin de instrucciones.**

