# Mobile Tokens, Themes & Surface Hierarchy

In native mobile apps, color is not merely decorative; it establishes physical depth, communicates interactivity, and respects hardware capabilities like OLED power saving.

Bezel enforces locked design tokens, semantic naming, and layered surface elevation.

---

## 1. The Mobile Surface Elevation Ladder

Instead of arbitrary drop shadows, mobile depth is achieved through **Surface Elevation Layers**:

```
Layer 3: Floating Chrome (Capsules, Tooltips, Action Sheets)   → #2C2C2E (Dark) / #FFFFFF + Shadow (Light)
Layer 2: Inset Grouped Surface (Containers, Settings Blocks)   → #1C1C1E (Dark) / #FFFFFF (Light)
Layer 1: Canvas Background (Root Edge-to-Edge Canvas)         → #000000 or #0A0A0C (Dark) / #F2F2F7 (Light)
```

### Semantic Token Definition

```ts
export const BezelTokens = {
  colors: {
    // Canvas & Surfaces
    background: '#000000',           // Pure OLED black or #0A0A0C
    surfaceGrouped: '#1C1C1E',       // Inset grouped card/table surface
    surfaceElevated: '#2C2C2E',      // Modals, bottom sheets, floating pills
    surfaceInteractive: '#3A3A3C',   // Pressed or highlighted item state

    // Dividers & Hairlines
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.16)',

    // Typography Ink
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    textTertiary: '#636366',
    textInverse: '#000000',

    // Accents & System States
    accent: '#0A84FF',               // Tint / Brand primary
    accentMuted: 'rgba(10, 132, 255, 0.15)',
    success: '#30D158',
    warning: '#FFD60A',
    error: '#FF453A',
  },

  // 4pt Spacing Grid
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    giant: 48,
  },

  // Corner Radii
  radii: {
    xs: 4,
    sm: 8,
    md: 12,        // Inset grouped list containers
    lg: 16,        // Modals & sheets
    xl: 24,        // Floating action capsules
    full: 9999,    // Pills & avatar circles
  },
};
```

---

## 2. OLED Dark Mode Discipline

OLED displays turn off pixels completely for `#000000`, providing infinite contrast and substantial battery savings.

- **Root Canvas:** `#000000`.
- **Grouped Containers:** `#1C1C1E`.
- **Hairlines:** `0.5pt` with `8%` white opacity.
- **Never use muddy medium gray backgrounds** (`#333333`) as the root canvas.

---

## 3. Translucency & Native Blur Vibrancy

For navigation bars, floating command capsules, and modal backdrops, use native blur materials (`expo-blur`, `BlurView`, or SwiftUI `.ultraThinMaterial`):

```tsx
// React Native (expo-blur)
import { BlurView } from 'expo-blur';

<BlurView intensity={80} tint="dark" style={styles.floatingCapsule}>
  {/* Content */}
</BlurView>
```

When blur is not supported or performs poorly on low-end hardware, fallback to a solid elevated surface with high opacity (`rgba(28, 28, 30, 0.94)`).
