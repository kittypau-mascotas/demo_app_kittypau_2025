# Instrucciones para el Agente — Integración de Datos Reales en Dashboard

## Contexto actual (NO repetir pasos ya hechos)
- Autenticación Neon **completada** (frontend-first con AuthView + backend `/api/me`).
- Arquitectura decidida: **Un usuario = un household**.
- `users.householdId` existe y `/api/me` devuelve `{ id, email, name, role, householdId }`.
- Todas las rutas de datos están protegidas con `requireNeonAuth`.
- API client (`apiService`) tiene `getPets`, `getDevices`.
- Hooks **ya creados**: `usePets()` y `useDevices()` (React Query).

## Objetivo de este paso
Conectar **Dashboard** a datos reales **sin alterar el JSX estructural**, reemplazando mocks por hooks y manejando estados de carga/error.

---

## PASO A — Reglas estrictas
1. ❌ **No modificar JSX** (estructura, layout, componentes visuales).
2. ✅ Solo cambiar **fuentes de datos**, imports y variables.
3. ❌ No crear nuevos endpoints.
4. ✅ Usar **exclusivamente** `usePets()` y `useDevices()`.
5. ❌ No acceder directo a `apiService` desde el componente.

---

## PASO B — Dashboard.tsx (cambios permitidos)

### 1) Imports
Agregar **sin eliminar otros imports**:
```ts
import { usePets } from '@/hooks/data/usePets';
import { useDevices } from '@/hooks/data/useDevices';
```

### 2) Reemplazo de datos mock
Localizar arrays mock (ej.: `mockPets`, `mockDevices`) y **NO borrarlos**, solo dejar de usarlos.

Crear variables nuevas:
```ts
const { data: pets = [], isLoading: petsLoading, error: petsError } = usePets();
const { data: devices = [], isLoading: devicesLoading, error: devicesError } = useDevices();
```

### 3) Estados de carga / error (mínimo)
Antes del `return` principal:
```ts
if (petsLoading || devicesLoading) return <div>Cargando datos...</div>;
if (petsError || devicesError) return <div>Error cargando datos</div>;
```

### 4) Sustituciones internas (SIN tocar JSX)
- `mockPets.length` → `pets.length`
- `mockDevices.length` → `devices.length`
- Map de listas:
  - `mockPets.map(...)` → `pets.map(...)`
  - `mockDevices.map(...)` → `devices.map(...)`

⚠️ **No cambiar props ni estructura de componentes hijos**.

---

## PASO C — Verificaciones obligatorias
El agente debe confirmar:
- [ ] Dashboard renderiza sin errores TS
- [ ] Con usuario nuevo se crea household automáticamente
- [ ] `pets` y `devices` llegan filtrados por `householdId`
- [ ] Logout limpia sesión y redirige correctamente
- [ ] No hay llamadas a endpoints sin auth

---

## PASO D — Qué NO hacer
- ❌ No agregar lógica MQTT aquí
- ❌ No tocar gráficos aún
- ❌ No modificar `AppLayout` ni `Header`

---

## Resultado esperado
Dashboard funcional con datos reales, misma UI, sin mocks, listo para integrar telemetría en el siguiente paso.

**Cuando este paso termine, detenerse.**
El siguiente bloque será: *Telemetría + endpoints REST + gráficos*.

