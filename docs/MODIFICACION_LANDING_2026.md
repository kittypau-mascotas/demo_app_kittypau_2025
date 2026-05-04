# Guía de Modificación: Landing Page KittyPau 2026

Este documento detalla los pasos técnicos y de contenido para actualizar la landing page de KittyPau, asegurando consistencia con la `GUIA_ESTILOS.md` y los objetivos de negocio de 2026.

---

## Paso 1: Configuración Global y Tipografía
Antes de tocar los componentes, debemos asegurar que las bases visuales sean correctas en el archivo de estilos globales.

1.  **Fuentes:** Asegurar que `Titan One` (titulares) y `Varela Round` (cuerpo) estén cargadas en el proyecto.
2.  **Tokens HSL:** Verificar en `client/src/index.css` o `globals.css`:
    -   `--primary: 12 62% 79%;` (Rosa suave característico).
    -   `--primary-foreground: 0 0% 100%;` (Blanco puro para contraste).
    -   `--background: 12 100% 98%;` (Blanco cálido).
    -   `--radius: 1rem;` (Equivalente a `rounded-2xl`).

---

## Paso 2: Arquitectura de Rutas (Landing como Home)
Actualmente, la raíz `/` suele redirigir al login. Para la landing:
1.  Modificar el router principal (generalmente en `App.tsx`) para que el path `/` renderice el nuevo componente `LandingPage.tsx`.
2.  Asegurar que el `OnboardingGuard` no bloquee la vista pública de la landing.

---

## Paso 3: Implementación de Secciones (Estructura de Conversión)

### 3.1. Navbar (Navegación y Salida)
- **Logo:** Texto "KittyPau" con clase `font-brand` (Titan One).
- **Efecto:** Usar `sticky top-0`, `bg-background/80` y `backdrop-blur-md`.
- **Botón:** Clase `bg-primary text-primary-foreground rounded-2xl` para el botón "Iniciar Sesión".

### 3.2. Hero Section (Propuesta de Valor)
- **Layout:** 2 columnas en desktop (Texto a la izquierda, imagen a la derecha).
- **Título:** "Monitoreo inteligente para tu mascota" (Clase `text-4xl md:text-6xl font-brand`).
- **Subtítulo:** Frase empática sobre el bienestar y la actuación preventiva (Varela Round).
- **Imagen:** Composición de `bandida.png` integrada con una silueta o foto de un ESP32.
- **CTAs:** Botón principal "Empieza ahora" -> `/login`.

### 3.3. Características (Evidencia Técnica Real)
Implementar un grid de 4 tarjetas (`rounded-2xl shadow-md`):
1.  **Monitoreo Ambiental:** Temperatura/Humedad (Icono `Thermometer`).
2.  **Control de Alimentación:** Uso de `weightGrams` (Icono `Utensils`).
3.  **Estado IoT:** Batería y Wi-Fi (Icono `Wifi`).
4.  **Prevención Dinámica:** Análisis de comportamiento (Icono `Activity`).

### 3.4. Dashboard Preview (Prueba de Producto)
- **Objetivo:** Mostrar que el sistema es real.
- **Acción:** Crear una sección que simule la interfaz de la App usando versiones simplificadas de:
    -   `ActivityChart` (con datos dummy coherentes).
    -   `ConsumptionChart` (curvas suaves `monotone`).
- **Nota:** Dado que el repo usa `Chart.js`, mantener el estilo visual de la app interna para no generar falsa expectativa.

### 3.5. Cómo Funciona (El IoT Flow)
Visualizar el flujo técnico de forma sencilla:
1.  **Conecta:** (Hardware ESP32).
2.  **Vincula:** (App Web / Perfil Mascota).
3.  **Monitorea:** (Dashboard en tiempo real).
*Copy sugerido:* "ESP32 -> Broker -> Bridge -> API -> Dashboard".

### 3.6. Planes (Ruta Comercial)
Diseñar dos cards comparativas:
- **Plan Gratuito (Plan A):** Enfoque en adopción (1 dispositivo, lectura básica).
- **Plan Premium (Plan B):** Enfoque en control (Historial extendido, alertas, analítica).
- **CTA:** "Ver detalles" o "Iniciar Sesión".

---

## Paso 4: Footer y Confianza
- **Contacto:** `mailto:kittypau.mascotas@gmail.com`.
- **Legal:** Links placeholder a "Privacidad" y "Soporte".
- **Cierre:** "© 2026 KittyPau - Con amor para tus mascotas".

---

## Paso 5: Optimización SEO y Accesibilidad
1.  **Meta Tags:** Actualizar el `<title>` y `<meta name="description">` en `index.html`.
2.  **Imágenes:** Añadir `alt="Foto de Bandida - Mascota KittyPau"` y `loading="lazy"` a las ilustraciones.
3.  **Semántica:** Usar etiquetas `<header>`, `<main>`, `<section>` y `<footer>` correctamente.

---

## Resumen de Estilos Clave (Tailwind)

| Elemento | Clases Sugeridas |
| :--- | :--- |
| **Contenedor** | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| **Titulares** | `font-brand text-primary-foreground tracking-tight` |
| **Cuerpo** | `font-sans text-foreground/90 leading-relaxed` |
| **Cards** | `bg-card rounded-2xl shadow-md border border-primary/10` |
| **Botón Pro** | `bg-primary text-primary-foreground px-8 py-3 rounded-2xl hover:scale-105 transition-transform` |

---
*Nota: Esta especificación se alinea con la visión de Mauro de presentar un producto robusto, conectado y centrado en el bienestar animal para el ciclo 2026.*