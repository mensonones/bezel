# Theme · Swiss Neo-Grotesk

- **Genre:** G1 · Tactile Utility & Modern Minimal
- **Mood:** Stark, objective, International Typographic Style, high contrast.
- **Reference Apps:** Braun calculator, Muji to Relax, Uniqlo calendar, Minimalist timer.

```ts
export const SwissNeoGroteskTheme = {
  name: 'swiss-neo-grotesk',
  genre: 'tactile-utility',
  colors: {
    background: '#FFFFFF',
    surfaceGrouped: '#F4F4F4',
    surfaceElevated: '#FFFFFF',
    surfaceInteractive: '#E5E5E5',
    borderSubtle: '#000000',         // Crisp solid hairline border
    borderMedium: '#000000',
    textPrimary: '#000000',
    textSecondary: '#666666',
    textTertiary: '#999999',
    accent: '#E63946',               // Swiss Red
    accentMuted: 'rgba(230, 57, 70, 0.12)',
    destructive: '#E63946',
  },
  typography: {
    displayFamily: 'Helvetica Neue',
    bodyFamily: 'Helvetica Neue',
    titleWeight: '800',              // Bold, stark title
    tabularFigures: true,
  },
  springs: {
    press: { damping: 16, stiffness: 320, mass: 0.8 },
    sheet: { damping: 22, stiffness: 220, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 0, md: 0, lg: 0, full: 9999 }, // Brutalist zero-radius geometry
};
```
