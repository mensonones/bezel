# Theme · Midnight Aurora

- **Genre:** G3 · Atmospheric / Media
- **Mood:** Liquid Glass, deep northern night, glowing neon polar aurora.
- **Reference Apps:** Spotify, Apple Music, Arc Search, Luma.

```ts
export const MidnightAuroraTheme = {
  name: 'midnight-aurora',
  genre: 'atmospheric',
  colors: {
    background: '#070814',           // Deep Cosmic Midnight
    surfaceGrouped: '#101226',       // Semi-translucent container
    surfaceElevated: '#181B38',      // Liquid glass sheet
    surfaceInteractive: '#242854',   // Active state
    borderSubtle: 'rgba(120, 140, 255, 0.12)',
    borderMedium: 'rgba(120, 140, 255, 0.25)',
    textPrimary: '#F0F2FF',
    textSecondary: '#8B92C4',
    textTertiary: '#505680',
    accent: '#00F0FF',               // Radiant Cyan / Aurora Violet
    accentSecondary: '#A855F7',
    accentMuted: 'rgba(0, 240, 255, 0.15)',
    destructive: '#FF2A6D',
  },
  blur: {
    intensity: 88,
    tint: 'dark',
  },
  typography: {
    displayFamily: 'System',
    bodyFamily: 'System',
    titleWeight: '800',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 16, stiffness: 280, mass: 0.8 },
    sheet: { damping: 22, stiffness: 210, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 8, md: 14, lg: 20, full: 9999 },
};
```
