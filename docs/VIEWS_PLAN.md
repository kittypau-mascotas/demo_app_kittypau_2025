# Plan de Vistas y Endpoints para KittyPaw

Este documento detalla las vistas existentes y propuestas para la aplicación KittyPaw, junto con sus rutas/endpoints asociados y las funcionalidades clave. El objetivo es asegurar un funcionamiento coherente y escalable de la aplicación.

---

## 1. Vistas Actuales

### 1.1. Login (client/src/pages/Login.tsx)
- **Propósito:** Permitir a los usuarios existentes acceder a la aplicación, incluyendo manejo de la sesión y perfil del usuario (ej. foto de perfil).
- **Ruta:** `/login`
- **Endpoint(s) Asociado(s):**
    - `POST /api/auth/login`: Autenticación de usuario con credenciales (email/contraseña).
    - `GET /api/auth/session`: Verificación de sesión activa (utilizado al cargar la app).
- **Funcionalidad Clave:**
    - Formulario de inicio de sesión (email, contraseña).
    - Redirección a `/register` para nuevos usuarios.
    - Manejo de errores de autenticación.
    - Integración con `AuthContext` para el estado de la sesión.

### 1.2. Register (client/src/pages/Register.tsx)
- **Propósito:** Permitir a nuevos usuarios crear una cuenta en la aplicación. Este es el primer paso en el flujo de incorporación de un nuevo usuario a la plataforma.
- **Ruta:** `/register`
- **Endpoint(s) Asociado(s):**
    - `POST /api/auth/register`: Creación de una nueva cuenta de usuario.
- **Funcionalidad Clave:**
    - Formulario de registro (nombre, email, contraseña).
    - Almacenamiento persistente de la cuenta de usuario, con los datos iniciales necesarios para el perfil, incluyendo la posibilidad de una foto de perfil.
    - Validación de datos de entrada.
    - Manejo de errores de registro (ej. email ya existente).
    - Redirección a `/login` o `/dashboard` tras el registro exitoso.

---

## 2. Vistas Propuestas y Mejoras

### 2.1. Dashboard (client/src/pages/Dashboard.tsx)
- **Propósito:** Vista principal del usuario, mostrando un resumen de la actividad de sus mascotas y dispositivos.
- **Ruta:** `/dashboard`
- **Endpoint(s) Asociado(s):**
    - `GET /api/devices`: Obtener una lista de dispositivos del usuario.
    - `GET /api/pets`: Obtener una lista de mascotas del usuario.
    - `GET /api/events/summary`: Resumen de eventos recientes (ej. alimentación, actividad).
    - `GET /api/sensors/readings/summary`: Datos agregados de sensores (ej. consumo de alimento, patrones de actividad).
- **Funcionalidad Clave:**
    - Widgets personalizables con información resumida.
    - Vistas rápidas de la salud de la mascota, niveles de alimento, estado de los dispositivos.
    - Navegación rápida a vistas detalladas (ej. perfil de mascota, detalles de dispositivo).

### 2.2. Dispositivos (client/src/pages/Devices.tsx)
- **Propósito:** Gestión y visualización detallada de los dispositivos del usuario.
- **Ruta:** `/devices`
- **Endpoint(s) Asociado(s):**
    - `GET /api/devices`: Obtener todos los dispositivos.
    - `GET /api/devices/{id}`: Obtener detalles de un dispositivo específico.
    - `POST /api/devices`: Registrar un nuevo dispositivo.
    - `PUT /api/devices/{id}`: Actualizar información del dispositivo.
    - `DELETE /api/devices/{id}`: Eliminar un dispositivo.
- **Funcionalidad Clave:**
    - Listado de dispositivos con su estado actual.
    - Opciones para añadir, editar o eliminar dispositivos.
    - Vínculo a la vista de configuración del dispositivo.

### 2.3. Añadir Dispositivo (client/src/pages/AddDevice.tsx)
- **Propósito:** Flujo para registrar nuevos dispositivos. Este proceso típicamente sigue al registro de usuario y de mascotas.
- **Ruta:** `/devices/add`
- **Endpoint(s) Asociado(s):**
    - `POST /api/devices`: Registrar un nuevo dispositivo.
- **Funcionalidad Clave:**
    - Formulario paso a paso para la configuración inicial del dispositivo (ej. nombre, tipo, vincular a mascota).
    - Permite vincular dispositivos específicos (ej. KPCL0033, KPCL0034) a una mascota existente.
    - Guía de configuración del dispositivo.

### 2.4. Mascotas (client/src/pages/Mascotas.tsx)
- **Propósito:** Gestión y visualización detallada de las mascotas del usuario. Tras el registro de usuario, el siguiente paso es añadir las mascotas.
- **Ruta:** `/mascotas`
- **Endpoint(s) Asociado(s):**
    - `GET /api/pets`: Obtener todas las mascotas.
    - `GET /api/pets/{id}`: Obtener detalles de una mascota específica.
    - `POST /api/pets`: Añadir una nueva mascota.
    - `PUT /api/pets/{id}`: Actualizar información de la mascota.
    - `DELETE /api/pets/{id}`: Eliminar una mascota.
- **Funcionalidad Clave:**
    - Formulario detallado para registrar mascotas (nombre, tipo, raza, fecha de nacimiento, etc.), incluyendo la subida de una foto para el avatar.
    - Listado de mascotas con su información básica y foto de perfil.
    - Opciones para añadir, editar o eliminar mascotas.
    - Vínculo a la vista de perfil detallado de la mascota.
    - Un usuario debe registrar al menos una mascota antes de poder vincular dispositivos.

### 2.5. Perfil de Mascota (Nueva Vista)
- **Propósito:** Vista detallada de una mascota específica, incluyendo historial de actividad, consumo, etc.
- **Ruta:** `/mascotas/{id}`
- **Endpoint(s) Asociado(s):**
    - `GET /api/pets/{id}`: Detalles de la mascota.
    - `GET /api/events/pet/{id}`: Historial de eventos de la mascota.
    - `GET /api/sensors/readings/pet/{id}/activity`: Datos de actividad de la mascota.
    - `GET /api/sensors/readings/pet/{id}/consumption`: Datos de consumo de la mascota.
- **Funcionalidad Clave:**
    - Gráficos de actividad y consumo.
    - Historial de eventos (alimentación, medicación, etc.).
    - Información de salud y bienestar.

### 2.6. Sensores (client/src/pages/Sensors.tsx)
- **Propósito:** Visualización de datos en tiempo real y históricos de los sensores.
- **Ruta:** `/sensors`
- **Endpoint(s) Asociado(s):**
    - `GET /api/sensors/readings`: Datos de todos los sensores.
    - `GET /api/sensors/readings/{device_id}`: Datos de sensores de un dispositivo específico.
    - `WS /api/ws/sensors`: Conexión WebSocket para datos en tiempo real.
- **Funcionalidad Clave:**
    - Gráficos interactivos de datos de sensores.
    - Vistas de datos en tiempo real (si aplica).
    - Opciones para filtrar datos por dispositivo, mascota, tipo de sensor y rango de tiempo.

### 2.7. Analíticas (client/src/pages/Analytics.tsx)
- **Propósito:** Análisis avanzado de datos y tendencias.
- **Ruta:** `/analytics`
- **Endpoint(s) Asociado(s):**
    - `GET /api/analytics/activity`: Reportes de actividad.
    - `GET /api/analytics/consumption`: Reportes de consumo.
    - `GET /api/analytics/health`: Reportes de salud general.
- **Funcionalidad Clave:**
    - Gráficos y tablas personalizables.
    - Generación de reportes.
    - Comparativa de datos entre periodos o mascotas.

### 2.8. Alertas (client/src/pages/Alerts.tsx)
- **Propósito:** Gestión y visualización de notificaciones y alertas.
- **Ruta:** `/alerts`
- **Endpoint(s) Asociado(s):**
    - `GET /api/alerts`: Obtener todas las alertas del usuario.
    - `PUT /api/alerts/{id}/read`: Marcar alerta como leída.
    - `DELETE /api/alerts/{id}`: Eliminar alerta.
    - `POST /api/alerts/rules`: Configurar reglas de alerta (ej. nivel bajo de alimento).
- **Funcionalidad Clave:**
    - Listado de alertas (nuevas, leídas, archivadas).
    - Configuración de umbrales y tipos de alertas.
    - Notificaciones en la aplicación.

### 2.9. Configuración (client/src/pages/Settings.tsx)
- **Propósito:** Configuración de la cuenta del usuario y preferencias de la aplicación.
- **Ruta:** `/settings`
- **Endpoint(s) Asociado(s):**
    - `GET /api/users/{id}`: Obtener perfil de usuario.
    - `PUT /api/users/{id}`: Actualizar perfil de usuario (incluyendo foto de perfil).
    - `PUT /api/users/{id}/password`: Cambiar contraseña.
    - `PUT /api/users/{id}/notifications`: Actualizar preferencias de notificación.
- **Funcionalidad Clave:**
    - Edición de perfil (nombre, email, gestión de la foto de perfil).
    - Cambio de contraseña.
    - Preferencias de notificación.
    - Configuración de tema (claro/oscuro).

### 2.10. Planes (client/src/pages/Planes.tsx)
- **Propósito:** Gestión de la suscripción y visualización de planes disponibles.
- **Ruta:** `/planes`
- **Endpoint(s) Asociado(s):**
    - `GET /api/subscriptions`: Obtener estado de suscripción actual.
    - `GET /api/plans`: Obtener planes de suscripción disponibles.
    - `POST /api/subscriptions/checkout`: Proceso de checkout para nuevos planes.
    - `PUT /api/subscriptions/cancel`: Cancelar suscripción.
- **Funcionalidad Clave:**
    - Mostrar el plan actual del usuario.
    - Opciones para actualizar o cancelar el plan.
    - Comparativa de características de los diferentes planes.

### 2.11. Usuarios (client/src/pages/Users.tsx)
- **Propósito:** Gestión de usuarios (para roles de administrador o equipos).
- **Ruta:** `/users`
- **Endpoint(s) Asociado(s):**
    - `GET /api/users`: Obtener lista de usuarios.
    - `POST /api/users`: Crear nuevo usuario.
    - `PUT /api/users/{id}`: Actualizar datos de usuario.
    - `DELETE /api/users/{id}`: Eliminar usuario.
- **Funcionalidad Clave:**
    - Listado de usuarios, roles y permisos.
    - Creación/edición/eliminación de usuarios.
    - Gestión de roles y permisos.

### 2.12. Vista 404 (client/src/pages/not-found.tsx)
- **Propósito:** Mostrar una página cuando la ruta no existe.
- **Ruta:** Cualquier ruta no definida.
- **Endpoint(s) Asociado(s):** Ninguno directo.
- **Funcionalidad Clave:**
    - Mensaje de "Página no encontrada".
    - Enlace de regreso al dashboard o página de inicio.

---

## 3. Endpoints de API Adicionales (Resumen)

Además de los endpoints específicos de las vistas, se necesitarán otros endpoints auxiliares:

-   `GET /api/health`: Endpoint de salud para verificación de estado del servicio.
-   `GET /api/events`: Endpoints generales para eventos (filtrado, paginación).
-   `GET /api/sensors/readings`: Endpoints generales para lecturas de sensores (filtrado, paginación).
-   `WS /api/ws/notifications`: WebSocket para notificaciones en tiempo real.

---

## 4. Consideraciones Generales

-   **Autenticación y Autorización:** Todas las rutas privadas requerirán autenticación de usuario. Se implementará un sistema de roles y permisos para las vistas administrativas (ej. `Users`).
-   **Validación de Datos:** Todos los endpoints de `POST` y `PUT` deben incluir validación robusta de datos.
-   **Manejo de Errores:** Implementación consistente de manejo de errores y mensajes amigables para el usuario.
-   **Estado de Carga:** Indicadores de carga visibles para el usuario en operaciones asíncronas.
-   **Responsive Design:** Todas las vistas deben ser completamente responsivas y adaptarse a diferentes tamaños de pantalla.
-   **Notificaciones:** Utilización del componente `Toaster` para feedback de acciones de usuario.
-   **Contextos:** Uso de `AuthContext` para la gestión de autenticación y posiblemente otros contextos para datos globales (ej. `WebSocketProvider`).
-   **Optimización:** Lazy loading para las páginas para mejorar el rendimiento inicial de la aplicación.
-   **Asociación y Consistencia de Datos:** Es fundamental que toda la información (usuario, datos de la mascota, datos del dispositivo, y los datos de los sensores) quede correctamente asociada a la cuenta del usuario y vinculada entre sí para garantizar la integridad y coherencia de los datos en toda la aplicación.

---

## 5. Complementos para un Plan Perfecto

Para hacer este plan aún más robusto y accionable, se podrían considerar los siguientes aspectos adicionales:

### 5.1. Bocetos UI/UX o Wireframes Conceptuales
-   Para cada vista clave, describir brevemente los elementos principales de la interfaz de usuario y su disposición. Esto puede ser en forma de texto, o idealmente, con enlaces a wireframes o maquetas simples.
-   **Ejemplo:** Para "Dashboard", describir la ubicación de los widgets de resumen, gráficos principales y enlaces de navegación rápida.

### 5.2. Estrategia de Gestión de Estado por Vista
-   Detallar cómo se manejará el estado local y global para las vistas más complejas.
-   Especificar qué datos se obtendrán de la API, cómo se almacenarán (e.g., React Context, Redux, Zustand) y cómo se propagarán a los componentes.

### 5.3. Desglose de Componentes (Alto Nivel)
-   Para cada vista, listar los componentes principales que la compondrán (e.g., para "Dashboard": `SummaryWidget`, `ActivityChart`, `DeviceStatusCard`). Esto facilita la asignación de tareas y el desarrollo paralelo.

### 5.4. Escenarios de Manejo de Errores
-   Para cada interacción con endpoints dentro de una vista, describir los escenarios de error comunes (e.g., fallos de red, errores de validación, acceso no autorizado) y cómo la interfaz de usuario debería responder a ellos (e.g., mensajes de error, redirecciones, elementos deshabilitados).

### 5.5. Estrategia de Internacionalización (i18n)
-   Si la aplicación necesita soportar múltiples idiomas, definir cómo se manejará el contenido de texto en cada vista para su traducción (e.g., uso de claves, herramientas de i18n).

### 5.6. Consideraciones de Rendimiento
-   Para vistas con uso intensivo de datos (como "Analíticas" o "Sensores"), detallar estrategias para optimizar el rendimiento (e.g., paginación, carga perezosa de datos, "debouncing" en entradas de usuario, virtualización de listas).

### 5.7. Aspectos de Seguridad por Vista
-   Más allá de la autenticación general, identificar implicaciones de seguridad específicas para la visualización de datos sensibles o acciones dentro de una vista (e.g., acceso basado en roles a ciertas configuraciones, sanitización de entradas).

### 5.8. Estrategia de Pruebas por Vista
-   Describir brevemente cómo se probará la funcionalidad y la interfaz de usuario de cada vista (e.g., pruebas unitarias para componentes, pruebas de integración para el flujo de datos, pruebas de extremo a extremo para los "user journeys").

### 5.9. Dependencias (Librerías/Frameworks Frontend)
-   Listar cualquier librería frontend o framework de UI específico que se utilizará intensivamente o se integrará en ciertas vistas (e.g., una librería específica para selectores de fecha, un editor de texto enriquecido).

### 5.10. Directrices de Accesibilidad (a11y)
-   Para elementos interactivos críticos, mencionar la adhesión a estándares de accesibilidad (e.g., navegación por teclado, atributos ARIA, contraste de colores).

