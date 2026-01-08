# KittyPau - Sistema IoT de Cuidado de Mascotas

## Descripción del Proyecto
KittyPau es una aplicación web completa para el monitoreo y control de dispositivos IoT diseñados para el cuidado de mascotas. Permite a los usuarios gestionar comederos automáticos, bebederos, areneros inteligentes, cámaras y rastreadores GPS para sus mascotas.

## Características Principales

### Autenticación
- **Página de Login Rediseñada**: Layout de 2 columnas
  - Columna izquierda: Formulario de login con validación
  - Columna derecha: Branding con logo, nombre de la marca y carrusel de imágenes
- Registro de usuarios
- Protección de rutas privadas

### Dashboard
- Vista general del estado de las mascotas
- Widgets con estadísticas clave
- Tarjetas de mascotas con información de alimentación y agua
- Gráficos de actividad y consumo

### Gestión de Dispositivos
- Lista de todos los dispositivos IoT
- Estado en tiempo real (activo, advertencia, error)
- Niveles de batería
- Agregar nuevos dispositivos con QR

### Mascotas
- Perfiles de mascotas con avatar
- Información detallada (raza, edad, peso)
- Estado de salud
- Modal para agregar nuevas mascotas

### Analíticas
- Gráficos de actividad
- Consumo de alimentos
- Duración de uso de dispositivos
- Selector de rango de tiempo

### Alertas
- Notificaciones de batería baja
- Dispositivos desconectados
- Niveles bajos de comida/agua
- Clasificación por severidad (info, advertencia, error)

### Sensores
- Datos en tiempo real de temperatura
- Niveles de humedad
- Estado de batería
- Última actualización

### Configuración
- Perfil de usuario
- Preferencias de notificaciones
- Alertas por email
- Modo oscuro (preparado)

### Planes
- Plan Básico (gratuito)
- Plan Plus ($9.99/mes)
- Plan Pro ($19.99/mes)
- Comparación de características

### Gestión de Usuarios
- Lista de usuarios del sistema
- Roles (Administrador, Usuario, Solo Lectura)
- Estados activo/inactivo

## Esquema de Colores

### Colores Principales
- **Coral Pink (#FF847C)**: Botones primarios, datos, énfasis
- **Soft Peach (#EBB7AA)**: Tarjetas de dispositivos, elementos secundarios
- **Sage Green (#99B898)**: Tarjetas de información, estados activos
- **Cream Background (#FFFAF7)**: Fondo principal de la aplicación

### Estados
- **Activo**: Verde sage (#99B898)
- **Advertencia**: Naranja claro (#FECEAB)
- **Error**: Rojo (#E84A5F)

## Tipografía
- **Display/Títulos**: 'Titan One' - Fuente bold y juguetona
- **Texto del cuerpo**: 'Varela Round' - Sans-serif limpia y redondeada

## Estructura del Proyecto

### Frontend (`client/src/`)
```
pages/
  - Login.tsx (Nueva página con layout de 2 columnas)
  - Register.tsx
  - Dashboard.tsx
  - Devices.tsx
  - AddDevice.tsx
  - Mascotas.tsx
  - Analytics.tsx
  - Alerts.tsx
  - Sensors.tsx
  - Settings.tsx
  - Planes.tsx
  - Users.tsx

components/
  - BrandCarousel.tsx (Carrusel de imágenes para login)
  - AppLayout.tsx (Layout principal con header y sidebar)
  - Header.tsx
  - Sidebar.tsx
  - MobileNav.tsx
  - ActivityChart.tsx
  - ConsumptionChart.tsx
  - DurationChart.tsx
  - DeviceCard.tsx
  - DeviceStatus.tsx
  - PetAvatar.tsx
  - StatWidget.tsx
  - AddPetModal.tsx
  - PrivateRoute.tsx
  - ui/ (Componentes de Shadcn)

contexts/
  - AuthContext.tsx (Gestión de autenticación - mock)

lib/
  - queryClient.ts (Configuración de React Query)
  - utils.ts (Utilidades)
```

### Backend (`server/`)
```
- index.ts (Servidor Express)
- routes.ts (Rutas API - pendiente de implementación)
- storage.ts (Interfaz de almacenamiento)
- vite.ts (Configuración de Vite)
```

### Shared (`shared/`)
```
- schema.ts (Esquemas de Drizzle y Zod)
```

## Datos Mock
La aplicación actualmente utiliza datos simulados (mock) para demostración:
- Autenticación simulada con localStorage
- Datos de dispositivos hardcodeados
- Información de mascotas de ejemplo
- Alertas y sensores simulados

**Nota**: Todos los archivos con datos mock están marcados con comentarios `//todo: remove mock functionality`

## Tecnologías Utilizadas
- **Frontend**: React 18, TypeScript, Wouter (routing)
- **UI**: Shadcn/ui, Tailwind CSS, Radix UI
- **Estado**: React Query (TanStack Query v5)
- **Forms**: React Hook Form con Zod validation
- **Charts**: Recharts
- **Icons**: Lucide React
- **Backend**: Express.js, TypeScript
- **Base de Datos**: PostgreSQL con Drizzle ORM (preparado)

## Comandos Disponibles
```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Construye la aplicación para producción
npm run start    # Inicia el servidor de producción
npm run check    # Verifica los tipos de TypeScript
npm run db:push  # Aplica cambios del schema a la base de datos
```

## Próximos Pasos Sugeridos
1. Implementar backend real con API endpoints
2. Conectar con base de datos PostgreSQL
3. Integrar con dispositivos IoT reales
4. Implementar autenticación real (JWT o sesiones)
5. Agregar WebSockets para datos en tiempo real
6. Implementar modo oscuro completo
7. Agregar tests end-to-end

## Navegación de la Aplicación
- `/` o `/login` - Página de login (2 columnas con carrusel)
- `/register` - Registro de usuarios
- `/dashboard` - Dashboard principal (requiere autenticación)
- `/devices` - Lista de dispositivos
- `/devices/add` - Agregar nuevo dispositivo
- `/mascotas` - Gestión de mascotas
- `/analytics` - Gráficos y analíticas
- `/alerts` - Sistema de alertas
- `/sensors` - Datos de sensores
- `/settings` - Configuración
- `/planes` - Planes de suscripción
- `/users` - Gestión de usuarios

## Diseño Responsive
- Desktop (≥1024px): Sidebar visible, navegación completa
- Tablet/Mobile (<1024px): Sidebar oculto (drawer), navegación inferior

## Características de Seguridad
- Rutas protegidas con PrivateRoute
- Validación de formularios con Zod
- Preparado para gestión de sesiones con express-session
- Preparado para hash de contraseñas
