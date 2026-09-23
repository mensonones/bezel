# Theme · Nordic Pine

- **Genre:** G2 · Editorial & Calm Utility
- **Mood:** Organic calm, Scandinavian woodwork, evergreen serenity.
- **Reference Apps:** Oura Ring, Hedonometer, Oak Meditation, Endel.

```ts
export const NordicPineTheme = {
  name: 'nordic-pine',
  genre: 'editorial',
  colors: {
    background: '#0B1512',           // Deep Pine Shadow
    surfaceGrouped: '#13231E',       // Evergreen container
    surfaceElevated: '#1D332C',      // Elevated cards/sheets
    surfaceInteractive: '#27443B',   // Pressed surface
    borderSubtle: 'rgba(164, 204, 185, 0.10)',
    borderMedium: 'rgba(164, 204, 185, 0.20)',
    textPrimary: '#E8F3EE',          // Pale Birch White
    textSecondary: '#8CAE9F',        // Muted Sage
    textTertiary: '#516E61',
    accent: '#52B788',               // Fresh Sprout Green
    accentMuted: 'rgba(82, 183, 136, 0.15)',
    destructive: '#E76F51',
  },
  typography: {
    displayFamily: 'System',
    bodyFamily: 'System',
    titleWeight: '600',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 22, stiffness: 260, mass: 0.9 },
    sheet: { damping: 26, stiffness: 190, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 8, md: 14, lg: 20, full: 9999 },
};
```
