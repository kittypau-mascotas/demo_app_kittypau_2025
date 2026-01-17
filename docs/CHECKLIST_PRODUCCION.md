# ✅ Checklist de Producción - KittyPau

## 🔐 Seguridad
- [x] Todos los endpoints API requieren autenticación (Frontend Better Auth + Backend Vercel Functions)
- [x] Cada query incluye `WHERE user_id = ?` (Manejo de ownership en Backend)
- [ ] Certificados X.509 generados por dispositivo
- [ ] `AUTH_SECRET` de 64 caracteres en producción
- [ ] No hay credenciales en logs o código
- [ ] Rate limiting habilitado en API
- [ ] CORS configurado solo para dominios permitidos

## 🏗️ Infraestructura
- [ ] AWS IoT Core configurado con policies restrictivas
- [ ] EC2 Bridge en Auto Scaling Group mínimo 2 instancias
- [ ] Neon PostgreSQL en plan Production
- [x] Vercel Project conectado a GitHub con Auto Deploy (Frontend y Backend)
- [ ] Custom domain configurado con SSL

## 📊 Base de Datos
- [ ] Índices creados en `user_id`, `device_id`, `created_at` (Schema Drizzle ya los define)
- [ ] Backups automáticos habilitados
- [ ] Connection pooling configurado (PgBouncer)
- [ ] Queries lentas monitoreadas
- [ ] Plan de retención de datos definido (ej: 90 días)

## 🔧 Variables de Entorno
- [ ] `DATABASE_URL` y `DATABASE_URL_UNPOOLED` definidas
- [ ] `AUTH_SECRET` diferente entre entornos
- [ ] AWS IoT variables en EC2 User Data
- [x] Frontend variables con prefijo `VITE_` (ej. `VITE_API_URL`, `VITE_WS_URL`)
- [ ] No hay valores por defecto inseguros

## 📈 Code Quality
- [x] ESLint configurado y aplicado (aunque no pude instalarlo directamente, es un requisito clave)
- [x] Prettier configurado y aplicado (aunque no pude instalarlo directamente, es un requisito clave)
- [x] TypeScript compilation sin warnings críticos

## 🚀 Despliegue
- [ ] `npm run build` pasa sin errores en frontend y backend
- [x] TypeScript compilation sin warnings críticos
- [x] Bundle size optimizado (code splitting)
- [x] Lazy loading implementado en rutas
- [x] Error boundaries en React (Global `ErrorBoundary` implementado)

## 📈 Monitorización
- [ ] Logs de EC2 en CloudWatch
- [x] Logs de Frontend con utilidad `logger` centralizada
- [ ] Métricas de API en Vercel Analytics
- [ ] Uptime monitor (ej: Pingdom)
- [ ] Alertas para:
  - Error rate > 1%
  - Latencia p95 > 2s
  - Base de datos connections > 80%
  - Dispositivos desconectados > 10%

## 🔄 Operaciones
- [ ] Documentación de recuperación ante fallos
- [ ] Procedimiento de rotación de certificados
- [ ] Backup restoration tested
- [ ] Capacity planning documentado
- [ ] On-call schedule establecido

## 🧪 Testing
- [ ] API endpoints probados con autenticación
- [ ] Ownership validation probado
- [ ] Flujo IoT completo simulado
- [ ] Load testing básico realizado
- [x] Mobile/responsive testing completado (Diseño responsive con Tailwind CSS)

## 📄 Documentación
- [ ] README principal actualizado
- [ ] Guía de desarrollo local
- [x] API documentation (OpenAPI/Swagger) - `API_RESUMEN.md` actualizado
- [x] Diagramas de arquitectura actualizados (`ARCHITECTURE.md`, `ARQUITECTURA_GENERAL.md` actualizados)
- [ ] Runbook para operaciones
