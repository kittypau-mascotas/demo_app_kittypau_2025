# Modelo de datos

## Entidades principales

### User
- id
- email
- created_at

### Device
- id
- user_id
- device_name
- created_at

### Telemetry
- id
- device_id
- temperature
- humidity
- weight
- created_at

## Relaciones

User 1─∞ Device  
Device 1─∞ Telemetry  

## Reglas

- Toda telemetría pertenece a un device
- Todo device pertenece a un usuario
- Nunca se consulta telemetría sin validar ownership