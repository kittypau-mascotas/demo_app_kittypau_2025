```markdown
# ✅ Checklist de Producción - KittyPau

## 🔐 Seguridad
- [ ] Todos los endpoints API requieren autenticación
- [ ] Cada query incluye `WHERE user_id = ?`
- [ ] Certificados X.509 generados por dispositivo
- [ ] `AUTH_SECRET` de 64 caracteres en producción
- [ ] No hay credenciales en logs o código
- [ ] Rate limiting habilitado en API
- [ ] CORS configurado solo para dominios permitidos

## 🏗️ Infraestructura
- [ ] AWS IoT Core configurado con policies restrictivas
- [ ] EC2 Bridge en Auto Scaling Group mínimo 2 instancias
- [ ] Neon PostgreSQL en plan Production
- [ ] Vercel Project conectado a GitHub con Auto Deploy
- [ ] Custom domain configurado con SSL

## 📊 Base de Datos
- [ ] Índices creados en `user_id`, `device_id`, `created_at`
- [ ] Backups automáticos habilitados
- [ ] Connection pooling configurado (PgBouncer)
- [ ] Queries lentas monitoreadas
- [ ] Plan de retención de datos definido (ej: 90 días)

## 🔧 Variables de Entorno
- [ ] `DATABASE_URL` y `DATABASE_URL_UNPOOLED` definidas
- [ ] `AUTH_SECRET` diferente entre entornos
- [ ] AWS IoT variables en EC2 User Data
- [ ] Frontend variables con prefijo `VITE_`
- [ ] No hay valores por defecto inseguros

## 🚀 Despliegue
- [ ] `npm run build` pasa sin errores en frontend y backend
- [ ] TypeScript compilation sin warnings críticos
- [ ] Bundle size optimizado (code splitting)
- [ ] Lazy loading implementado en rutas
- [ ] Error boundaries en React

## 📈 Monitorización
- [ ] Logs de EC2 en CloudWatch
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
- [ ] Mobile/responsive testing completado

## 📄 Documentación
- [ ] README principal actualizado
- [ ] Guía de desarrollo local
- [ ] API documentation (OpenAPI/Swagger)
- [ ] Diagramas de arquitectura actualizados
- [ ] Runbook para operaciones