# Instrucciones exactas para integrar Neon Auth sin romper la app (Kittypau)

## OBJETIVO
Integrar **Neon Auth** como sistema único de autenticación, **sin cambiar el diseño existente**, usando los formularios actuales de Login y Registro, y vinculando usuarios autenticados con la base de datos Neon para mascotas, dispositivos IoT y telemetría.

---

## PRINCIPIOS CLAVE (NO ROMPER)
- ❌ NO usar bcrypt
- ❌ NO usar passport
- ❌ NO manejar contraseñas localmente
- ❌ NO crear auth custom
- ❌ NO usar projectId
- ✅ Usar **Neon Auth (Better Auth)** como fuente única de identidad
- ✅ Mantener UI existente (Login / Register)
- ✅ Usar `user.id` de Neon Auth como ID global

---

## VARIABLES DE ENTORNO
### Frontend (Vercel y local)
```env
VITE_NEON_AUTH_URL=https://<tu-endpoint>.neonauth.<region>.aws.neon.tech/<db>/auth
```

### Backend (ya existente)
```env
DATABASE_URL=postgresql://...
```

---

## PASO 1 — Provider global (OBLIGATORIO)
Archivo: `client/src/main.tsx`

```ts
import { createRoot } from "react-dom/client";
import { NeonAuthUIProvider } from "@neondatabase/neon-js";
import App from "./App";
import "./index.css";

const authUrl = import.meta.env.VITE_NEON_AUTH_URL;
if (!authUrl) throw new Error("VITE_NEON_AUTH_URL no definido");

createRoot(document.getElementById("root")!).render(
  <NeonAuthUIProvider authUrl={authUrl}>
    <App />
  </NeonAuthUIProvider>
);
```

❗ No usar projectId.  
❗ No inventar configuraciones extra.

---

## PASO 2 — AuthContext (NÚCLEO DEL SISTEMA)
Archivo: `client/src/contexts/AuthContext.tsx`

### Responsabilidad
- Centralizar auth
- Exponer `user`
- Conectar Login / Register existentes con Neon Auth

### Reglas
- NO lógica fake
- NO estado mock
- USAR hooks de Neon Auth

### Estructura mínima esperada
```ts
interface AuthContextType {
  user: NeonUser | null;
  loading: boolean;
  login(email: string, password: string): Promise<void>;
  register(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
```

---

## PASO 3 — Login.tsx y Register.tsx
### REGLA ABSOLUTA
❌ NO cambiar HTML ni estilos  
❌ NO reescribir formularios  

Solo deben:
- llamar a `login()`
- llamar a `register()`

Ejemplo:
```ts
const { login } = useAuth();
await login(email, password);
```

---

## PASO 4 — MODELO DE USUARIO EN DB
### Importante
Neon Auth gestiona credenciales.
La DB solo guarda **perfil**.

### users table (conceptual)
```sql
users (
  id TEXT PRIMARY KEY, -- Neon Auth user.id
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
)
```

### Inserción segura
```sql
INSERT INTO users (id, email)
VALUES ($1, $2)
ON CONFLICT (id) DO NOTHING;
```

---

## PASO 5 — Flujo correcto (OBLIGATORIO)
1. Usuario se loguea (Neon Auth)
2. Frontend obtiene `user.id`
3. Backend:
   - crea perfil si no existe
4. Ese `user.id` se usa para:
   - mascotas
   - dispositivos
   - telemetría
   - gráficos

---

## PASO 6 — Asociación IoT
```text
User
 └── Mascota
      └── Plato / Dispositivo IoT
           └── Telemetría
```

- `device_id` se asocia a `user_id`
- Nunca al revés

---

## ERRORES PROHIBIDOS
🚫 projectId  
🚫 bcrypt  
🚫 passport  
🚫 JWT manual  
🚫 Auth duplicado  
🚫 Refactor UI  

---

## RESULTADO FINAL ESPERADO
- Un solo login
- Un solo user.id global
- Datos limpios
- Escalable
- Seguro
- Sin rehacer frontend

---

## SI EL AGENTE DUDA
> **La fuente de verdad es Neon Auth, no la DB.**  
> La DB solo refleja perfiles y relaciones.

