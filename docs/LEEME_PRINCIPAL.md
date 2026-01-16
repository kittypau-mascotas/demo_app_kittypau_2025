# KittyPau 🐾

Plataforma IoT inteligente para el cuidado y monitoreo de mascotas.

## 🚀 Características Principales

* **Monitoreo en Tiempo Real**: Visualiza datos de sensores (temperatura, humedad, peso) con actualizaciones automáticas.
* **Gestión Multi-Dispositivo**: Administra múltiples sensores IoT desde un dashboard centralizado.
* **Multi-Usuario Seguro**: Cada usuario solo accede a sus propios datos y dispositivos.
* **Alertas Inteligentes**: Configura notificaciones basadas en patrones de comportamiento.

## 🛠 Stack Tecnológico

### Frontend
* **Framework**: React 18 + TypeScript
* **Build Tool**: Vite
* **UI**: Tailwind CSS + Shadcn/ui
* **Estado**: React Query + Zustand

### Backend
* **Runtime**: Node.js 20 (Serverless Functions)
* **Framework**: Express-like via Vercel Functions
* **Base de Datos**: PostgreSQL (Neon.tech)
* **ORM**: Drizzle ORM
* **Autenticación**: Better Auth

### Infraestructura
* **Hosting Frontend/API**: Vercel
* **Message Broker**: AWS IoT Core
* **Bridge Service**: EC2 (Node.js)
* **Base de Datos**: Neon PostgreSQL Serverless

## 🚀 Despliegue Rápido

### Prerrequisitos
* Node.js 18+
* Cuentas en [Vercel](https://vercel.com), [AWS](https://aws.amazon.com), [Neon](https://neon.tech)

### Pasos Locales
```bash
# 1. Clonar repositorio
git clone https://github.com/tu-usuario/kittypau.git
cd kittypau

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Iniciar desarrollo
npm run dev