# Theme · Cupertino Titanium

- **Genre:** G3 · Atmospheric / Media & Native Flagship
- **Mood:** Industrial luxury, machined metal, frosted glass vibrancy, Apple hardware fidelity.
- **Reference Apps:** Apple Music, Apple Podcasts, iOS Camera, Measure.

```ts
export const CupertinoTitaniumTheme = {
  name: 'cupertino-titanium',
  genre: 'atmospheric',
  colors: {
    background: '#0B0B0C',
    surfaceGrouped: '#1C1C1E',
    surfaceElevated: '#2C2C2E',
    surfaceInteractive: '#3A3A3C',
    borderSubtle: 'rgba(255, 255, 255, 0.10)',
    borderMedium: 'rgba(255, 255, 255, 0.20)',
    textPrimary: '#F5F5F7',
    textSecondary: '#98989D',
    textTertiary: '#636366',
    accent: '#D4AF37',               // Natural Warm Titanium / Gold
    accentMuted: 'rgba(212, 175, 55, 0.15)',
    destructive: '#FF3B30',
  },
  blur: {
    intensity: 85,
    tint: 'dark',
  },
  typography: {
    displayFamily: 'SF Pro Display',
    bodyFamily: 'SF Pro Text',
    titleWeight: '700',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 16, stiffness: 300, mass: 0.8 },
    sheet: { damping: 22, stiffness: 220, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 8, md: 12, lg: 16, full: 9999 },
};
```
