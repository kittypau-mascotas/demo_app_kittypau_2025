# KittyPau 🐾

Plataforma IoT end-to-end para monitoreo de datos (telemetría) con enfoque multi-tenant y seguridad por diseño.

## Stack principal

- Dispositivos IoT: ESP8266 / ESP32
- Broker MQTT: AWS IoT Core (certificados X.509)
- Bridge de ingestión: Node.js persistente en EC2
- Base de datos: Neon (PostgreSQL)
- Backend API: Vercel (Node / TypeScript)
- Frontend: Vercel (Vite + React)

## Flujo general

Dispositivo → AWS IoT Core → Bridge EC2 → Neon DB → API Vercel → Frontend

## Desarrollo local

```bash
npm install
npm run dev
```

## Variables de entorno

Revisar .env.example y configurar las variables necesarias.