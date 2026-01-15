# Instrucciones para el Agente – Telemetría, Gráficos y Enlaces de Datos

Este documento define **paso a paso y sin ambigüedades** qué debe hacer el agente a partir del estado actual del proyecto KittyPau. Sigue este orden **estrictamente**. No improvises ni refactorices fuera de lo indicado.

---

## CONTEXTO ACTUAL (NO MODIFICAR)

- Autenticación: **Neon Auth funcionando (frontend-first)**.
- AuthContext:
  - Obtiene el usuario desde `/api/me`.
  - `User` incluye: `id`, `email`, `name`, `role`, `householdId`.
- Backend:
  - Todas las rutas de datos protegidas con `requireNeonAuth`.
  - Modelo: **Un usuario = un household**.
- React Query ya está configurado.
- `apiService` ya tiene:
  - `getPets`
  - `getDevices`
  - `getSensorReadings`
  - `getConsumptionEvents`

---

## OBJETIVO DE ESTA FASE

Reemplazar **todos los mocks** por datos reales y conectar:

- Dashboard
- Analytics.tsx
- Sensors.tsx

con **telemetría real desde la API**, usando React Query y sin alterar el JSX estructural existente.

---

## PASO 0 – Prerrequisitos (CRÍTICO - PREVENCIÓN DE ERRORES)

Antes de iniciar la integración de gráficos, verificar la integridad del esquema:
1.  **Alinear `shared/schema.ts`**: Asegurar que los campos de telemetría (temp, hum, weight, etc.) estén definidos en el schema de Drizzle.
2.  **Tipos de Datos**: Revisar que los IDs se manejen consistentemente (string vs number) para evitar errores de tipo en las consultas (`eq(pets.id, ...)`).
3.  **Validación**: Consultar `errores.md` si surgen problemas de inserción o tipos.

---

## PASO 1 – Hooks de datos (OBLIGATORIO)

### 1.1 Crear hook `useSensorReadings`

**Archivo:**
```
client/src/hooks/data/useSensorReadings.ts
```

**Responsabilidad:**
- Obtener lecturas de sensores por `deviceId` y rango de fechas (`start`, `end`).
- Usar `apiService.getSensorReadings`.

**Reglas:**
- Usar `useQuery`.
- `queryKey` debe incluir `deviceId`, `start`, `end`.
- El hook NO debe manejar UI.

---

### 1.2 Crear hook `useConsumptionEvents`

**Archivo:**
```
client/src/hooks/data/useConsumptionEvents.ts
```

**Responsabilidad:**
- Obtener eventos de consumo por `deviceId`.
- Usar `apiService.getConsumptionEvents`.

**Reglas:**
- Misma estructura que `useSensorReadings`.
- `enabled: !!deviceId`.

---

## PASO 2 – Analytics.tsx

### Objetivo

Reemplazar datos simulados por **eventos de consumo reales**.

### Instrucciones

1. Importar `useConsumptionEvents`.
2. Obtener `deviceId`:
   - Puede ser el primer device del household (MVP).
3. Usar los datos para:
   - Gráficos de consumo
   - Totales
   - Promedios

### Restricciones

- ❌ NO cambiar layout JSX.
- ❌ NO crear nuevos componentes visuales.
- ✅ Solo cambiar la fuente de datos.

---

## PASO 3 – Sensors.tsx

### Objetivo

Mostrar lecturas reales de sensores (temperatura, humedad, etc.).

### Instrucciones

1. Importar `useSensorReadings`.
2. Usar `deviceId` activo.
3. Mapear lecturas a:
   - Tabla
   - Cards
   - Gráficos existentes

### Estados

- `isLoading` → skeleton o texto
- `error` → mensaje simple

---

## PASO 4 – Dashboard.tsx (Gráficos)

### Objetivo

Alimentar los gráficos del dashboard con telemetría real.

### Instrucciones

1. Reutilizar:
   - `usePets`
   - `useDevices`
   - `useSensorReadings`
2. Calcular métricas:
   - Cantidad de mascotas
   - Dispositivos activos
   - Última lectura
3. Reemplazar constantes mock.

### Regla crítica

🚫 **NO CAMBIAR JSX**

Solo:
- Variables
- Hooks
- Datos

---

## PASO 5 – Validaciones

Antes de finalizar:

- `npm run build` debe pasar.
- No debe haber:
  - imports no usados
  - tipos `any`
  - errores TS

---

## PASO 6 – Convenciones

- Todos los hooks van en `client/src/hooks/data`.
- No usar `fetch` directo en componentes.
- Todo acceso HTTP pasa por `apiService`.

---

## DEFINICIÓN DE ÉXITO

✔ Dashboard muestra datos reales
✔ Analytics muestra consumo real
✔ Sensors muestra telemetría real
✔ Sin mocks
✔ Sin romper UI

---

**Si un dato no existe aún en backend, retornar arrays vacíos, NO inventar mocks.**

Este documento es la única fuente de verdad para esta fase.
