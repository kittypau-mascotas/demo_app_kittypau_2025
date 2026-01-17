# KittyPau 🐾

Plataforma IoT inteligente para el cuidado y monitoreo de mascotas.

## 🚀 Características Principales

*   **Monitoreo en Tiempo Real**: Visualiza datos de sensores (temperatura, humedad, peso, actividad) con actualizaciones automáticas y gráficas interactivas.
*   **Gestión Multi-Mascota y Multi-Dispositivo**: Administra múltiples mascotas y sensores IoT desde un dashboard centralizado.
*   **Onboarding Guiado**: Flujo de bienvenida intuitivo para configurar mascotas y dispositivos.
*   **Perfiles Detallados**: Páginas dedicadas para cada mascota y dispositivo con información, historial y opciones de edición/eliminación.
*   **Multi-Usuario Seguro**: Cada usuario solo accede a sus propios datos y dispositivos, con un robusto sistema de autenticación.
*   **Alertas Inteligentes**: Configura notificaciones basadas en patrones de comportamiento y estados del dispositivo (requiere backend).
*   **Configuración Avanzada**: Gestión de cuenta, preferencias de interfaz, privacidad y soporte.

## 🛠 Stack Tecnológico

### Frontend
*   **Framework**: React 18
*   **Lenguaje**: TypeScript
*   **Build Tool**: Vite
*   **Routing**: Wouter (centralizado con `AppRouter`, `PrivateRoute`, `OnboardingGuard`)
*   **UI/Styling**: Tailwind CSS + Shadcn/ui
*   **Estado (Server)**: TanStack Query
*   **Autenticación**: Better Auth React
*   **Formularios**: React Hook Form + Zod
*   **Gráficas**: Recharts
*   **Manejo de Errores**: Global ErrorBoundary, utilidad `logger`
*   **Temas**: `next-themes` (modo claro/oscuro)

### Backend
*   **Runtime**: Node.js 20 (Vercel Serverless Functions)
*   **Framework**: Express-like via Vercel Functions
*   **Base de Datos**: PostgreSQL (Neon.tech)
*   **ORM**: Drizzle ORM
*   **Autenticación**: Better Auth (Neon Auth)

### Infraestructura
*   **Hosting Frontend/API**: Vercel
*   **Message Broker**: AWS IoT Core
*   **Bridge Service**: EC2 (Node.js) para conexión MQTT persistente
*   **Base de Datos**: Neon PostgreSQL Serverless

## 🚀 Despliegue Rápido

### Prerrequisitos
*   Node.js 18+
*   Cuentas en [Vercel](https://vercel.com), [AWS](https://aws.amazon.com), [Neon](https://neon.tech)

### Pasos Locales
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/kittypau.git
cd kittypau

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (ej. VITE_API_URL, AWS_IOT_ENDPOINT, etc.)
cp .env.example .env
# Editar .env con tus credenciales. Asegúrate de que `VITE_API_URL` apunte a tu backend.

# 4. Iniciar desarrollo
npm run dev

# Para un despliegue completo, asegúrate de configurar las variables de entorno en Vercel y AWS EC2.
```
