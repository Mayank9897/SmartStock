---
name: SmartStock Identity
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#515f74'
  on-secondary: '#ffffff'
  secondary-container: '#d5e3fd'
  on-secondary-container: '#57657b'
  tertiary: '#a43a3a'
  on-tertiary: '#ffffff'
  tertiary-container: '#fc7c78'
  on-tertiary-container: '#711419'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d5e3fd'
  secondary-fixed-dim: '#b9c7e0'
  on-secondary-fixed: '#0d1c2f'
  on-secondary-fixed-variant: '#3a485c'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3af'
  on-tertiary-fixed: '#410005'
  on-tertiary-fixed-variant: '#842225'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  data-mono:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: -0.01em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  caption:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-2xs: 0.125rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-base: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 3rem
---

## Brand & Style

This design system delivers an operational, high-clarity enterprise SaaS aesthetic engineered for inventory and sales operations. The target audience comprises operations directors, inventory managers, and SMB owners who require dense, actionable information without visual noise.

The design philosophy adheres to modern, disciplined functionalism:
- **Clarity over ornamentation:** Eliminate decorative gradients, unnecessary backdrops, and artificial layering in favor of structural grid alignment, crisp slate borders, and purposeful contrast.
- **Operational confidence:** Emerald green is leveraged intentionally as a primary brand accent and operational signal (healthy status, confirmed inventory, positive margins), rather than as a broad wash.
- **Density and structure:** Micro-interactions, tight type baselines, and consistent container geometry communicate industrial reliability and precise bookkeeping.

## Colors

The palette balances clean cool slate neutrals with vivid, legible functional accents.

### Color Tokens & Roles
- **Primary Accent (`#10B981`)**: Key interactive triggers, positive deltas, active filters, primary navigation states, and confirmed actions. Darkens to `#059669` on hover and `#047857` on active press.
- **Secondary / Slate Core (`#334155`)**: Subdued secondary interactions, table column headers, and structural icons.
- **Neutral / Canvas Layers**:
  - Main App Background: `#F8FAFC`
  - Structural Canvas / Secondary Surface: `#F1F5F9`
  - Elevated Surface / Data Cards: `#FFFFFF`
  - Subtle Borders & Separators: `#E2E8F0`
- **Text & Content Hierarchy**:
  - Headings / Primary Metrics: `#0F172A`
  - Body Text / Standard Data: `#334155`
  - Secondary Labels / Metadata: `#64748B`
  - Disabled / Placeholder: `#94A3B8`
- **Status & Feedback Signals**:
  - Success / In Stock: Text `#047857`, Background `#D1FAE5`, Border `#A7F3D0`
  - Warning / Low Stock: Text `#B45309`, Background `#FEF3C7`, Border `#FDE68A`
  - Danger / Out of Stock / Unpaid: Text `#B91C1C`, Background `#FEE2E2`, Border `#FECACA`
  - Informational / Pending: Text `#1D4ED8`, Background `#DBEAFE`, Border `#BFDBFE`

## Typography

The type system is built on a single, highly calibrated sans-serif face (Inter) configured to maximize horizontal density and vertical rhythm across tabular data, numeric summaries, and administrative control panels.

### Implementation Guidelines
- **Tabular Figures:** All numerical tables, pricing metrics, SKU counts, and timestamps must use OpenType tabular figure settings (`font-feature-settings: "tnum"`).
- **Metric Headers:** KPI card values use `headline-lg` or `display-lg` with weight 700 to establish an immediate focal anchor.
- **Labels and Table Headers:** Uppercase treatment is reserved exclusively for table headers and micro-tags using `caption` with `letter-spacing: 0.05em` and muted color (`#64748B`).

## Layout & Spacing

The layout is built on a structured 12-column responsive fluid grid operating over an 8px base spacing grid (with a strict 4px half-step for micro controls and inline badges).

### Viewport Breakpoints & Grids
- **Desktop (1280px+)**: 12-column layout, 24px outer margins, 20px gutters. Global sidebar fixed at 240px or collapsed to 64px.
- **Tablet (768px – 1279px)**: 8-column layout, 20px outer margins, 16px gutters. Collapsible rail navigation.
- **Mobile (< 768px)**: 4-column layout, 16px outer margins, 12px gutters. Data tables shift to stacked card lists or horizontally scrollable frozen-column tables.

### Density & Spacing Rules
- **Component Padding:** Standard cards use `1.25rem` (20px) internal padding. Compact metric cards and table rows use `0.75rem` vertical spacing to optimize viewport information capacity.
- **Data Tables:** Row heights are standardized to 40px (compact) and 48px (default), preserving legibility while presenting at least 15 visible rows above typical desktop fold lines.

## Elevation & Depth

This system avoids expressive drop shadows and heavy multi-layer blurs. Depth is communicated through structural layering, crisp 1px borders, and ultra-subtle ambient diffusions.

### Elevation Levels
- **Level 0 (Flat Surface)**: The default background (`#F8FAFC`). No shadow, no outline.
- **Level 1 (Cards, KPI Containers, Table Blocks)**: Background `#FFFFFF`, 1px solid border `#E2E8F0`, and an ambient shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hover States, Active Filter Menus, Select Dropdowns)**: Background `#FFFFFF`, 1px solid border `#CBD5E1`, shadow: `0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -2px rgba(15, 23, 42, 0.04)`.
- **Level 3 (Modals, Slide-over Drawers)**: Background `#FFFFFF`, 1px solid border `#CBD5E1`, shadow: `0 12px 24px -4px rgba(15, 23, 42, 0.1), 0 4px 8px -2px rgba(15, 23, 42, 0.05)`. Backing scrim: `#0F172A` at 40% opacity.

## Shapes

The shape architecture reinforces a systematic, precise enterprise look by utilizing controlled, small border radii (Soft, level `1`):

- **Default Controls (`0.25rem` / 4px)**: Buttons, text inputs, segmented pills, table rows, and inner action icons.
- **Containers & Panels (`0.5rem` / 8px)**: Dashboard KPI cards, data table wrappers, modal containers, and alert banners (`rounded-lg`).
- **Status Pills & Counters (`9999px`)**: Full pill shape reserved strictly for categorical status indicators (In Stock, Low Stock, Paid, Pending) and numeric badge counters to distinguish operational status from interactive button controls.

## Components

### Buttons
- **Primary**: Background `#10B981`, text `#FFFFFF`, font-weight 500, radius 4px, height 36px (default) or 32px (compact). Hover: `#059669`. Focus: ring 2px `#10B981` with 2px offset `#FFFFFF`.
- **Secondary**: Background `#FFFFFF`, border 1px solid `#CBD5E1`, text `#334155`. Hover: background `#F8FAFC`, border `#94A3B8`.
- **Tertiary / Ghost**: Transparent background, text `#64748B`. Hover: background `#F1F5F9`, text `#0F172A`.

### Status Badges & Pills
- Always styled with full-rounded geometry (`border-radius: 9999px`), 2px horizontal padding, 6px font size `12px`, font-weight 500.
- **In Stock / Paid**: `#D1FAE5` background, `#047857` text, `#A7F3D0` border.
- **Low Stock**: `#FEF3C7` background, `#B45309` text, `#FDE68A` border.
- **Out of Stock**: `#FEE2E2` background, `#B91C1C` text, `#FECACA` border.
- **Pending**: `#DBEAFE` background, `#1D4ED8` text, `#BFDBFE` border.

### Metric KPI Cards
- White surface (`#FFFFFF`), border 1px `#E2E8F0`, padding 16px to 20px, radius 8px.
- Structure: Muted small label (`12px`, `#64748B`, uppercase tracking) at the top, primary metric display (`24px` bold, `#0F172A`) center, and an inline status delta indicator at the bottom (+12% vs last month with `#059669` and arrow icon).

### Data Tables
- Header: `#F8FAFC` background, 36px height, text `11px` bold `#64748B`, border-bottom 1px solid `#E2E8F0`.
- Cells: Text `13px` `#334155`, numeric cells right-aligned with `data-mono` styling, border-bottom 1px solid `#F1F5F9`.
- Row interaction: Hover background `#F8FAFC` across entire row. Selected row `#ECFDF5` with left accent line 2px `#10B981`.

### Inputs & Controls
- Form Inputs: Background `#FFFFFF`, border 1px solid `#CBD5E1`, radius 4px, height 36px, font size 14px. Focus state: border `#10B981`, box-shadow `0 0 0 1px #10B981`.
- Checkboxes: 16x16px, radius 4px, border 1px `#CBD5E1`. Checked state: `#10B981` background with white checkmark icon.
- Radio Buttons: 16x16px circle. Selected state: 5px solid `#10B981` dot on white background.