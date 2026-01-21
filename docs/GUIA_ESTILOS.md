# Guía de Estilo y Diseño de KittyPaw

Este documento sirve como referencia central para todos los aspectos visuales y de diseño de la aplicación KittyPaw. El objetivo es mantener una experiencia de usuario coherente, limpia y moderna en todos los dispositivos.

*Este es un documento vivo y se actualizará a medida que el sistema de diseño evolucione.*

---

## 1. Filosofía de Diseño

- **Claridad ante todo:** La información debe ser fácil de encontrar y comprender. Los datos son el corazón de la aplicación.
- **Moderno y Amigable:** La interfaz debe sentirse actual, utilizando animaciones sutiles y una paleta de colores agradables para crear una experiencia positiva.
- **Consistencia:** Los componentes y patrones de diseño deben ser reutilizables y consistentes en toda la aplicación.
- **Humanizado y Empático:** El lenguaje y las interacciones deben ser cálidos, amigables y centrados en el bienestar de la mascota y la tranquilidad del usuario.

---

## 2. Paleta de Colores

El sistema utiliza un esquema de colores basado en variables HSL, con soporte para modo Claro (Light) y Oscuro (Dark).

### Modo Claro (Light Mode)

| Nombre Variable       | Valor HSL                | Preview                                                                                   | Uso Principal                                     |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `--background`        | `30 12% 97%`             | <div style="width:50px;height:20px;background-color:hsl(30 12% 97%);border:1px solid #ccc;"></div> | Fondo principal de la aplicación.                 |
| `--foreground`        | `200 15% 15%`            | <div style="width:50px;height:20px;background-color:hsl(200 15% 15%);"></div>                    | Texto principal.                                  |
| `--card`              | `0 0% 100%`              | <div style="width:50px;height:20px;background-color:hsl(0 0% 100%);border:1px solid #ccc;"></div>  | Fondo de componentes tipo "tarjeta".            |
| `--primary`           | `6 100% 74%`             | <div style="width:50px;height:20px;background-color:hsl(6 100% 74%);"></div>                     | Botones principales, acentos, iconos activos.     |
| `--primary-foreground`| `0 0% 100%`              | <div style="width:50px;height:20px;background-color:hsl(0 0% 100%);border:1px solid #ccc;"></div>  | Texto sobre elementos con fondo `--primary`.      |
| `--secondary`         | `24 28% 86%`             | <div style="width:50px;height:20px;background-color:hsl(24 28% 86%);"></div>                     | Botones y elementos secundarios.                  |
| `--destructive`       | `354 70% 54%`            | <div style="width:50px;height:20px;background-color:hsl(354 70% 54%);"></div>                    | Acciones de peligro (borrar, eliminar).           |
| `--ring`              | `6 100% 74%`             | <div style="width:50px;height:20px;background-color:hsl(6 100% 74%);"></div>                     | Anillo de foco en elementos interactivos.         |

### Modo Oscuro (Dark Mode)

| Nombre Variable       | Valor HSL                | Preview                                                                                   | Uso Principal                                     |
| --------------------- | ------------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `--background`        | `200 8% 8%`              | <div style="width:50px;height:20px;background-color:hsl(200 8% 8%);"></div>                      | Fondo principal de la aplicación.                 |
| `--foreground`        | `30 10% 92%`             | <div style="width:50px;height:20px;background-color:hsl(30 10% 92%);"></div>                     | Texto principal.                                  |
| `--card`              | `200 7% 10%`             | <div style="width:50px;height:20px;background-color:hsl(200 7% 10%);"></div>                     | Fondo de componentes tipo "tarjeta".            |
| `--primary`           | `6 85% 62%`              | <div style="width:50px;height:20px;background-color:hsl(6 85% 62%);"></div>                      | Botones principales, acentos, iconos activos.     |
| `--primary-foreground`| `0 0% 100%`              | <div style="width:50px;height:20px;background-color:hsl(0 0% 100%);border:1px solid #ccc;"></div>  | Texto sobre elementos con fondo `--primary`.      |
| `--secondary`         | `200 8% 20%`             | <div style="width:50px;height:20px;background-color:hsl(200 8% 20%);"></div>                     | Botones y elementos secundarios.                  |
| `--destructive`       | `354 65% 58%`            | <div style="width:50px;height:20px;background-color:hsl(354 65% 58%);"></div>                    | Acciones de peligro (borrar, eliminar).           |
| `--ring`              | `6 85% 62%`              | <div style="width:50px;height:20px;background-color:hsl(6 85% 62%);"></div>                      | Anillo de foco en elementos interactivos.         |

---

## 3. Tipografía

Se utilizan dos fuentes principales importadas desde Google Fonts:

- **Fuente de Títulos (`--font-display`):** `'Titan One', sans-serif`
  - Uso: Para títulos principales (h1, h2) y logos. Aporta personalidad y un toque divertido.
  - Estilo: Gruesa, redondeada y llamativa.
- **Fuente de Cuerpo (`--font-sans`):** `'Varela Round', sans-serif`
  - Uso: Para todo el texto de la interfaz, incluyendo párrafos, etiquetas, menús y botones.
  - Estilo: Redondeada, limpia y muy legible en todos los tamaños.

### Jerarquía de Texto

- **Título Principal (`.titulo`):** 40px, bold, color `--primary`, font-family `Titan One`.
- **Títulos de Tarjeta (`CardTitle`):** 24px, bold, color `--primary`, font-family `Titan One`.
- **Texto de Navegación (`.nav-item`):** 20px, normal, color `--foreground`, font-family `Varela Round`.
- **Texto de Cuerpo:** 16px (base), normal, color `--foreground`, font-family `Varela Round`.
- **Descripciones/Texto Muted:** 14px, normal, color `--muted-foreground`, font-family `Varela Round`.

---

## 4. Layout y Menús

El layout principal de la aplicación (`AppLayout.tsx`) se compone de:

- **Sidebar (Barra Lateral):**
  - Posición: Fija a la izquierda en la vista de escritorio.
  - Comportamiento: Contiene la navegación principal. Se oculta en vistas móviles y es reemplazada por `MobileNav`.
- **Header (Encabezado):**
  - Posición: Fijo en la parte superior del área de contenido.
  - Contenido: Incluye el selector de mascota activa, información del usuario y botón de cerrar sesión.
- **Área de Contenido:**
  - Ocupa el espacio restante, con un padding general para separar el contenido de los bordes.

---

## 5. Componentes de UI Globales

### Cards (Elemento Central)
- **Características:** Bordes `rounded-2xl`, sombra `shadow-md` con efecto `hover:shadow-lg transition-all duration-200` para un sutil efecto de elevación.
- **Tipos:** Status Card, Metric Card, Action Card, Alert Card.

### Avatares (PetAvatar)
- **Características:** Muestra la foto de la mascota o sus iniciales como fallback. Incluye `aria-label` para accesibilidad.

### StatWidgets (client/src/components/StatWidget.tsx)
- **Características:** Presentan métricas clave con iconos, valores, descripción y un `statusVariant` para colores semánticos (ok, warning, alert, default), permitiendo una rápida comprensión del estado.
- **Implementación:** `client/src/components/StatWidget.tsx`
- **Uso:** Dashboard y detalles de dispositivos para mostrar batería, temperatura, etc.

### LastReadingWidget
- **Características:** Tarjeta especializada para mostrar la última lectura de telemetría (Temperatura/Humedad) con indicadores visuales de estado (colores de fondo según umbrales).
- **Uso:** Dashboard principal.

### Mensajes de Estado (Vacío/Error)
- **Características:** Mensajes humanizados, centrados en la mascota y con llamadas a la acción claras (CTAs). Utilizan `useToast` para feedback de errores de forma no intrusiva.

### Logger
- **Características:** Utilidad centralizada para el registro de información, advertencias y errores en el frontend, con contexto y payload para depuración.

### ErrorBoundary
- **Características:** Componente React para capturar errores de UI a nivel global y mostrar un mensaje amigable al usuario con opción de recargar la aplicación, mejorando la robustez.

---

## 6. Gráficos y Visualización de Datos

La visualización de datos es una característica clave. Se utiliza la librería **Recharts**.

### Componentes de Gráficos Específicos

1.  **ActivityChart (`client/src/components/ActivityChart.tsx`)**:
    -   Visualiza eventos de actividad agrupados por hora (24h) o día (7d).
    -   Usa `BarChart` con barras redondeadas (`radius={[4, 4, 0, 0]}`).
2.  **ConsumptionChart (`client/src/components/ConsumptionChart.tsx`)**:
    -   Visualiza el consumo de alimento en gramos.
    -   Usa `LineChart` con curvas suaves (`type="monotone"`).

### Estilo General del Gráfico

- **Fondo:** Los gráficos se presentan dentro de componentes `Card` para mantener la consistencia.
- **Cuadrícula (`CartesianGrid`):**
  - Estilo: Punteada (`strokeDasharray="3 3"`).
  - Color: Opacidad muy baja (`opacity={0.3}`) para que no compita con los datos.
- **Líneas (`Line`):**
  - Tipo: Curva (`type="monotone"`) para una apariencia suave y fluida.
  - Grosor: `2px`.
  - Colores: Utilizan las variables de color `--chart-*`. Por ejemplo, `--chart-1` para la primera serie de datos, `--chart-3` para la segunda, etc.

### Animación y Movimiento

La interactividad y el movimiento son cruciales para que los datos se sientan vivos.

- **Animación de Carga:**
  - **Comportamiento:** Por defecto, las líneas de los gráficos (`<Line>`) se animan al aparecer, dibujándose progresivamente desde la izquierda hacia laderecha hasta alcanzar su forma final. Esto proporciona un feedback visual inmediato de que el componente ha cargado.
  - **Sensación:** Fluida y natural.
- **Tooltips (Información al pasar el cursor):**
  - **Comportamiento:** Al pasar el cursor sobre un punto del gráfico, un `Tooltip` aparece con un suave efecto de **fade-in** (desvanecimiento de entrada). Contiene la información detallada de ese punto de datos. Al retirar el cursor, desaparece con un **fade-out**.
  - **Estilo:** El tooltip sigue el estilo general de los componentes `Card`, con fondo y texto definidos por el tema (claro/oscuro).
- **Hover sobre la Leyenda (`Legend`):**
  - **Comportamiento:** Al pasar el cursor sobre un elemento de la leyenda (ej: "Bandida (Gato)"), la línea correspondiente en el gráfico se vuelve más gruesa o más opaca, mientras que las otras líneas se atenúan. Esto ayuda al usuario a enfocarse en una serie de datos específica.

---

## 7. Assets Gráficos y Recomendaciones

**Estado:** Completado (Requiere movimiento manual de archivos y actualización de rutas).

**Imágenes movidas:**
- `client/public/graficas/bandida.jpg` (Mascota de ejemplo)
- `client/public/graficas/bruno.jpg` (Mascota de ejemplo)
- `client/public/graficas/favicon.png` (Favicon de la aplicación)
- `client/public/graficas/kitty-logo.jpg` (Logo principal de la aplicación)
- `client/public/graficas/kitty-logo.svg` (Logo principal de la aplicación)

**Acción realizada:**
Se han movido los archivos especificados a la carpeta `graficas/` dentro de `client/public/` y se han actualizado sus rutas en el código fuente.
```
I will perform this `write_file` operation now.