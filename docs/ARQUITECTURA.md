# Arquitectura del sistema

## Flujo canónico

1. El dispositivo IoT publica mensajes MQTT
2. AWS IoT Core autentica usando certificados X.509
3. Un Bridge Node.js persistente en EC2:
   - Valida
   - Normaliza
   - Persiste los datos
4. Los datos se guardan en Neon PostgreSQL
5. El Backend API expone datos filtrados por usuario
6. El Frontend consume la API autenticada

## Decisiones clave

- Vercel NO recibe MQTT
- El Bridge NO expone endpoints HTTP públicos
- Toda lectura de datos pasa por la API
- La base de datos es multi-tenant por diseño
