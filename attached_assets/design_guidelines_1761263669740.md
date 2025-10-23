# KittyPaw IoT Pet Monitor - Design Guidelines

## Design Approach
**Reference-Based Cloning**: Replicate the exact visual design and UI patterns from the original KittyPaw project, maintaining all color schemes, typography, component styles, and layout structures.

## Color Palette

### Primary Colors
- **Coral Pink**: `#FF847C` - Primary actions, data cards, emphasis elements
- **Soft Peach**: `#EBB7AA` - Device cards, secondary elements, headings
- **Sage Green**: `#99B898` - Info cards, contact sections, success states
- **Dark Slate**: `#2A363B` - Primary text, navigation items, body content
- **Cream Background**: `#FFFAF7` - Main application background

### Status & Accent Colors
- **Active/Success**: `#99B898` (Sage Green)
- **Warning**: `#FECEAB` (Light Peach)
- **Error/Alert**: `#E84A5F` (Red)

### Usage Guidelines
- Coral Pink (#FF847C): Primary buttons, data visualization cards, active states
- Soft Peach (#EBB7AA): Device management cards, section headings, secondary buttons
- Sage Green (#99B898): Info sections, status indicators, contact forms
- Cream background throughout for soft, warm aesthetic

## Typography

### Font Families
- **Headings (H1-H3)**: 'Titan One', sans-serif - Bold, playful display font
- **Body Text**: 'Varela Round', sans-serif - Clean, rounded sans-serif
- **Load via**: Google Fonts CDN

### Type Scale
- **Main Title (.titulo)**: 40px, bold, #EBB7AA
- **Navigation Items (.nav-item)**: 20px, #2A363B
- **Headings**: #EBB7AA color for all h1-h3 elements
- **Body**: #2A363B for primary content

## Component Library

### Cards
**Card-Data** (Data Visualization)
- Background: #FF847C (Coral Pink)
- Text: #2A363B (Dark Slate)
- Border-radius: 8px (rounded-lg)
- Shadow: Medium elevation (shadow-md)

**Card-Device** (Device Management)
- Background: #EBB7AA (Soft Peach)
- Text: #2A363B
- Border-radius: 8px
- Shadow: Medium elevation

**Card-Info** (Information Sections)
- Background: #99B898 (Sage Green)
- Text: #2A363B
- Border-radius: 8px
- Shadow: Medium elevation

### Buttons
**Primary Button**
- Background: #FF847C (Coral Pink)
- Hover: #ff6b61 (darker coral)
- Text: White
- Border-radius: 6px (rounded-md)

**Secondary Button**
- Background: #EBB7AA (Soft Peach)
- Hover: #e9a08d (darker peach)
- Text: White
- Border-radius: 6px

### Status Indicators
- **Active**: Sage Green (#99B898) background
- **Warning**: Light Peach (#FECEAB) background
- **Error**: Red (#E84A5F) background

### Navigation Components
**Header/Navbar**
- Background: White
- Fixed positioning: top-0, left-0, right-0
- Z-index: 50
- Shadow: Medium (shadow-md)
- Height accounts for padding-top: 20 (pt-20) on body

**Sidebar**
- Desktop: Visible on screens ≥1024px
- Mobile: Drawer/overlay pattern
- Smooth toggle animations

**Mobile Navigation**
- Bottom-fixed navigation bar
- Visible only on mobile (<1024px)
- Icon-based navigation items

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 8** for consistent spacing
- Small gaps: p-2, m-2
- Medium gaps: p-4, m-4, gap-4
- Large gaps: p-8, m-8, gap-8
- Section padding: py-8 to py-12

### Container Strategy
- Main content: Container with mx-auto
- Padding: p-4 on mobile, lg:p-6 on desktop
- Max-width: Default Tailwind container widths

### Content Sections
**Section Backgrounds** (for landing/marketing areas)
- Prototipo section: #EBB7AA background
- Data section: #FF847C background
- Contact section: #99B898 background
- Padding: 40px 20px
- Border-radius: 8px
- Margin-bottom: 30px

### Grid Patterns
- **Device Grid**: 2-3 columns on desktop, 1 on mobile
- **Pet Cards**: Masonry or flexible grid layout
- **Analytics Charts**: Stacked on mobile, side-by-side on desktop

## Page Specifications

### Authentication Pages (Login/Register)
- Centered card layout on cream background
- Form inputs with rounded corners
- Primary coral pink submit buttons
- Clean, minimal design without header/sidebar

### Dashboard
- Widget grid layout with mixed card types
- Device status cards (peach background)
- Data visualization cards (coral background)
- Quick stats and metrics prominently displayed

### Devices Page
- Grid of device cards with status indicators
- Add device button with coral primary styling
- Device cards use peach (#EBB7AA) background

### Mascotas (Pets) Page
- Pet avatar components
- Card-based pet profiles
- Activity summaries per pet
- Add pet modal with form

### Analytics Page
- Chart components for activity, consumption, duration
- Coral (#FF847C) themed data visualization
- Time range selectors
- Legend and metric displays

### Alerts Page
- List of notification cards
- Color-coded by severity (success/warning/error)
- Timestamp and description for each alert

### Sensors Page
- Real-time data displays (mock data)
- Gauge/meter visualizations
- Status indicators for sensor health

### Settings Page
- Form sections for user preferences
- Toggle switches and select inputs
- Save button with primary coral styling

### Planes (Plans) Page
- Three-column pricing cards (Básico, Plus, Pro)
- Feature comparison lists
- Current plan indicator
- CTA buttons for each tier

### Users Page
- Table or card grid of user accounts
- Role badges and status indicators
- Action buttons for user management

### Add Device Page
- Step-by-step form process
- QR code placeholder/scanner UI
- Device type selection
- Success confirmation

## Images
**Icon Assets**: Use Heroicons or similar icon library via CDN for consistent iconography throughout the application

**Pet Avatars**: Circular placeholder images for pet profiles (can use placeholder services or custom cat/dog illustrations)

**Device Icons**: IoT device illustrations or icons for different device types (feeder, litter box, etc.)

**QR Code**: Placeholder QR code graphic in Add Device flow

**No Large Hero**: This is a dashboard application, not a marketing site, so no hero sections needed

## Responsive Behavior
- **Breakpoint**: 1024px (lg:) for desktop/mobile split
- **Mobile (<1024px)**: 
  - Sidebar hidden, accessible via hamburger menu
  - Bottom mobile navigation visible
  - Single column layouts
  - Smaller padding (p-4)
- **Desktop (≥1024px)**:
  - Sidebar always visible
  - Multi-column grids
  - Larger padding (p-6)
  - No mobile nav bar

## Interactive States
- **Loading**: Animated spinner with coral pink border
- **Empty States**: Friendly illustrations with coral accent
- **Hover**: Subtle color darkening on buttons and cards
- **Focus**: Visible focus rings for accessibility
- **Active**: Slightly darker background on pressed state

## Accessibility
- Maintain WCAG contrast ratios with dark slate text on light backgrounds
- All interactive elements keyboard accessible
- Proper semantic HTML with headings hierarchy
- Focus indicators on all interactive elements