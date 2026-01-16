# Guía de Estilo y Diseño de KittyPaw

Este documento sirve como referencia central para todos los aspectos visuales y de diseño de la aplicación KittyPaw. El objetivo es mantener una experiencia de usuario coherente, limpia y moderna en todos los dispositivos.

*Este es un documento vivo y se actualizará a medida que el sistema de diseño evolucione.*

---

## 1. Filosofía de Diseño

- **Claridad ante todo:** La información debe ser fácil de encontrar y comprender. Los datos son el corazón de la aplicación.
- **Moderno y Amigable:** La interfaz debe sentirse actual, utilizando animaciones sutiles y una paleta de colores agradables para crear una experiencia positiva.
- **Consistencia:** Los componentes y patrones de diseño deben ser reutilizables y consistentes en toda la aplicación.

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
  - Contenido: Incluye el título de la página actual, un campo de búsqueda y el avatar del usuario.
- **Área de Contenido:**
  - Ocupa el espacio restante, con un padding general para separar el contenido de los bordes.

---

## 5. Gráficos y Visualización de Datos

La visualización de datos es una característica clave. Se utiliza la librería **Recharts**.

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

## 6. Assets Gráficos y Recomendaciones

Debido a limitaciones de las herramientas, no fue posible mover los archivos de imagen automáticamente. Las siguientes imágenes deben ser movidas a la carpeta `graficas/` para una mejor organización del proyecto.

**Imágenes a mover:**
- `client/public/bandida.jpg`
- `client/public/bruno.jpg`
- `client/public/favicon.png`
- `client/public/kitty-logo.jpg`
- `client/public/kitty-logo.svg`

**Acción recomendada:**
Puedes mover estos archivos manualmente y luego actualizar sus rutas en el código. Por ejemplo, en `Login.tsx`, cambiar `/kitty-logo.jpg` a `/graficas/kitty-logo.jpg`.

Una vez movidos, este directorio (`graficas/`) contendrá todos los recursos visuales estáticos del proyecto.