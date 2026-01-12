# Guía Funcional – Auth, Frontend y Vercel (KittyPau)

## Objetivo
Lograr que:
- Un usuario **se registre / inicie sesión**
- Vea **solo sus datos**
- Todo funcione **deployado en Vercel**

---
## Flujo Correcto de Usuario

1. Usuario entra a `demo-app-kittypau.vercel.app`
2. Neon Auth maneja:
   - Login
   - Cookies de sesión
3. Frontend llama:
```
GET /api/me
```
4. Backend:
   - Valida sesión
   - Crea usuario si no existe
5. El resto de endpoints ya funcionan

---
## Qué archivos SON CLAVE (Frontend)

### `/client/src/services/api.ts`
- Axios con `baseURL`
- Usa cookies automáticamente
- Interceptor 401 → redirect `/login`

✔️ Correcto (no tocar)

---
### `/client/src/contexts/AuthContext.tsx`
Debe:
- Llamar a `/api/me` al cargar
- Guardar usuario en contexto

Si `Unauthorized` → usuario no logueado

---
### `/client/src/hooks/data/*`
Ejemplo correcto:
```ts
useQuery({
  queryKey: ['sensorReadings', deviceId],
  queryFn: () => api.get(`/api/devices/${deviceId}/readings`)
})
```

⚠️ IMPORTANTE:
- `deviceId` **es string MQTT**, no number

---
## Qué NO hace el Frontend

❌ NO habla MQTT
❌ NO escribe DB directo
❌ NO valida ownership

---
## Vercel – Reglas

✔️ Frontend + API juntos
✔️ `.env` cargado en dashboard
❌ MQTT prohibido
❌ procesos persistentes prohibidos

---
## Resultado esperado

| Acción | Resultado |
|---|---|
| Login | Cookie activa |
| Dashboard | Datos del usuario |
| Gráficos | Desde Neon |

---
## Conclusión

Si Auth funciona → **todo el frontend revive sin cambiar estilos**

