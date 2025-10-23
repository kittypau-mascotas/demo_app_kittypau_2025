# Design Guidelines: KittyPaw Login Page Redesign

## Design Approach: Split-Screen Authentication Pattern

**Selected Approach**: Hybrid approach combining Material Design's form principles with modern split-screen authentication patterns inspired by platforms like Notion, Linear, and Slack.

**Justification**: Login pages require optimal usability (clear form design) while providing an opportunity for brand storytelling through visual elements. The two-column layout creates a balanced experience between function and brand identity.

## Layout System

### Grid Structure
- Full viewport height layout (100vh) with no header
- Two equal columns on desktop (50/50 split using `grid-cols-2`)
- Responsive behavior:
  - Desktop (lg:): Side-by-side columns
  - Tablet/Mobile: Stack vertically with login form first
- No container constraints - full bleed layout

### Spacing Primitives
Primary spacing units: **4, 6, 8, 12, 16** (Tailwind units)
- Form elements: `space-y-6` between fields
- Section padding: `p-12` or `p-16` for desktop
- Mobile padding: `p-6` or `p-8`
- Button spacing: `mt-8`
- Carousel padding from edges: `p-8` or `p-12`

## Typography

### Font Stack
**Primary Font**: Inter or DM Sans (Google Fonts)
**Weights**: 400 (Regular), 500 (Medium), 600 (Semi-Bold)

### Hierarchy
- Brand name: `text-4xl` or `text-5xl`, `font-semibold`
- Login heading: `text-3xl`, `font-semibold`
- Form labels: `text-sm`, `font-medium`
- Input text: `text-base`, `font-normal`
- Button text: `text-base`, `font-medium`
- Helper text: `text-sm`, `font-normal`

## Component Specifications

### Left Column: Login Form
**Layout**:
- Center vertically and horizontally
- Max width: `max-w-md` (448px)
- Padding from edges: `px-8` minimum

**Components**:
1. **Heading Section**
   - Main heading: "Iniciar Sesión" or "Bienvenido"
   - Subtitle with helpful context (e.g., "Ingresa tus credenciales para continuar")
   - Spacing: `space-y-2`

2. **Form Elements**
   - Email/Username input with label
   - Password input with label and visibility toggle
   - "Recordarme" checkbox
   - "¿Olvidaste tu contraseña?" link (aligned right)
   - Primary CTA button (full width)
   - Secondary text: "¿No tienes cuenta? Regístrate" (centered below)
   - Form spacing: `space-y-6`

3. **Input Styling**
   - Height: `h-12` or `h-14`
   - Padding: `px-4`
   - Border radius: `rounded-lg`
   - Border width: `border` (1px)
   - Focus state with ring: `focus:ring-2`

4. **Button Styling**
   - Height: `h-12` or `h-14`
   - Padding: `px-6`
   - Border radius: `rounded-lg`
   - Font weight: `font-medium`
   - Full width: `w-full`
   - Built-in hover/active states

### Right Column: Brand Showcase
**Layout**:
- Center content vertically
- Padding: `p-12` or `p-16`
- Flex column with centered alignment

**Components** (top to bottom):
1. **Brand Logo**
   - Size: `w-16 h-16` to `w-24 h-24`
   - Centered: `mx-auto`
   - Margin bottom: `mb-6` or `mb-8`

2. **Brand Name**
   - "KittyPaw" text
   - Typography: `text-4xl` or `text-5xl`, `font-semibold`
   - Centered: `text-center`
   - Margin bottom: `mb-12`

3. **Image Carousel**
   - Container: `rounded-2xl` or `rounded-3xl` for modern feel
   - Aspect ratio: 16:9 or 4:3
   - Width: Full width of column with padding
   - Height: Auto or fixed (e.g., `h-96`)
   - Carousel controls: Dots navigation at bottom, arrows optional
   - Transition: Smooth fade or slide (duration: 500-700ms)
   - Auto-play: 4-5 second intervals

4. **Carousel Implementation**
   - Use libraries like Swiper or Embla Carousel via CDN
   - Lazy loading for images
   - Touch/swipe enabled for mobile
   - Keyboard navigation support

## Images

### Carousel Images
**Placement**: Right column, below brand name
**Specifications**:
- High-quality brand imagery showcasing KittyPaw's identity
- Suggested themes: Product shots, happy customers/pets, lifestyle imagery, app screenshots
- Dimensions: Minimum 1200x800px
- Format: WebP with JPG fallback
- Optimization: Compressed for web
- Count: 3-5 images for optimal carousel experience

**Image Treatment**:
- Subtle border radius matching carousel container
- No filters or overlays needed unless brand requires it
- Maintain consistent aspect ratios across all carousel images

## Accessibility

### Form Accessibility
- All inputs have associated labels (not just placeholders)
- Proper ARIA labels for password visibility toggle
- Error states clearly communicated with icons and text
- Focus indicators meet WCAG 2.1 AA standards
- Keyboard navigation fully supported

### Carousel Accessibility
- ARIA labels for carousel controls
- Pause functionality for auto-play
- Keyboard controls (arrow keys)
- Screen reader announcements for slide changes

## Responsive Behavior

### Breakpoints
- Mobile (<768px): Single column, login first, then brand section
- Tablet (768px-1024px): Consider maintaining two columns or stacking based on content
- Desktop (>1024px): Side-by-side 50/50 split

### Mobile Optimizations
- Login form: Full width with `px-6` padding
- Brand section: Reduced padding `p-6`
- Logo: Smaller size `w-12 h-12`
- Brand name: `text-3xl`
- Carousel: Full width with reduced height
- Maintain vertical spacing consistency with `space-y-8`

## Design Principles

1. **Balance**: Equal visual weight between functional (login) and emotional (brand) elements
2. **Clarity**: Form elements prioritize usability - clear labels, proper spacing, obvious CTAs
3. **Brand Presence**: Right column serves as brand immersion without distracting from login task
4. **Simplicity**: No unnecessary animations or decorative elements that slow task completion
5. **Trust**: Professional, polished appearance builds confidence in security

## Animation Guidelines

**Minimal Approach**:
- Carousel transitions only (smooth, not distracting)
- Subtle focus states on inputs
- Button hover states (built-in)
- NO page load animations
- NO decorative background animations
- NO floating/parallax effects