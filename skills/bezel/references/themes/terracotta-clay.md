# Theme · Terracotta Clay

- **Genre:** G4 · Expressive & Joyful
- **Mood:** Warm earth, sun-baked clay, friendly ceramic tactile smoothness.
- **Reference Apps:** Headspace, Family, AllTrails, Notion Calendar.

```ts
export const TerracottaClayTheme = {
  name: 'terracotta-clay',
  genre: 'expressive',
  colors: {
    background: '#FAF6F0',           // Warm Alabaster Sand
    surfaceGrouped: '#FFFFFF',
    surfaceElevated: '#FFFFFF',
    surfaceInteractive: '#F0E8DC',
    borderSubtle: 'rgba(180, 83, 40, 0.08)',
    borderMedium: 'rgba(180, 83, 40, 0.18)',
    textPrimary: '#2D201A',          // Deep Espresso
    textSecondary: '#7A6258',
    textTertiary: '#B29E96',
    accent: '#C85A32',               // Terracotta Clay
    accentMuted: 'rgba(200, 90, 50, 0.12)',
    destructive: '#D62828',
  },
  typography: {
    displayFamily: 'SF Pro Rounded',
    bodyFamily: 'System',
    titleWeight: '700',
    tabularFigures: false,
  },
  springs: {
    press: { damping: 14, stiffness: 290, mass: 0.8 },
    sheet: { damping: 20, stiffness: 200, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 10, md: 16, lg: 22, full: 9999 }, // Friendly, pillowed corners
};
```
