# Guía Definitiva – IoT, MQTT y Bridge (KittyPau)

## Objetivo
Integrar IoT **sin romper Vercel** y reflejar datos en gráficos.

---
## Regla de Oro

❌ Vercel **NO puede** manejar MQTT

✔️ El Bridge MQTT vive **solo en EC2**

---
## Flujo Correcto

ESP32 → AWS IoT Core → **Bridge EC2** → Neon → API → Frontend

---
## Bridge (EC2)

Responsabilidades únicas:
- Subscribirse a:
```
kittypau/{deviceId}/data/sensors
```
- Validar payload
- Insertar en Neon

NO:
- Auth
- Frontend
- WebSockets

---
## Asociación Usuario ↔ Dispositivo

1. Usuario crea dispositivo desde Frontend
2. Se guarda:
```
user_id + device_id (string MQTT)
```
3. Bridge inserta telemetría con `device_id`
4. Backend valida ownership

---
## Por qué tu proyecto antiguo funcionaba

De los docs antiguos se rescata:
- Formularios claros
- Asociación explícita usuario ↔ dispositivo
- Firmware simple

Eso se **reintegra conceptualmente**, NO copiando código

---
## Estado Final Esperado

| Elemento | Estado |
|---|---|
| ESP32 | Publica |
| EC2 | Persiste |
| Neon | Datos |
| API | Filtra |
| Frontend | Grafica |

---
## Conclusión

Tu proyecto **sí es viable**

Solo necesita:
1. Separación
2. Auth completo
3. Orden

Nada del mockup se rompe.

