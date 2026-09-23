# Theme · Cyberpunk Amber

- **Genre:** G1 · Tactile Utility / Hardware Specimen
- **Mood:** Retro-futuristic, cathode ray tube, Teenage Engineering, hardware synthesis.
- **Reference Apps:** OP-1 companion, Ableton Note, Citizen Calculator, Bloomberg Terminal mobile.

```ts
export const CyberpunkAmberTheme = {
  name: 'cyberpunk-amber',
  genre: 'tactile-utility',
  colors: {
    background: '#050505',           // Abyss Black
    surfaceGrouped: '#121008',       // Amber-tinted dark surface
    surfaceElevated: '#1F1A0B',      // Elevated console
    surfaceInteractive: '#2E2710',   // Keypress active
    borderSubtle: 'rgba(255, 170, 0, 0.15)',
    borderMedium: 'rgba(255, 170, 0, 0.30)',
    textPrimary: '#FFB703',          // Glowing Phosphor Amber
    textSecondary: '#C79000',
    textTertiary: '#7A5800',
    accent: '#FB8500',               // Radiant Orange
    accentMuted: 'rgba(251, 133, 0, 0.15)',
    destructive: '#D90429',
  },
  typography: {
    displayFamily: 'Space Mono',     // Monospaced Hardware Type
    bodyFamily: 'System',
    titleWeight: '700',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 15, stiffness: 380, mass: 0.6 },
    sheet: { damping: 20, stiffness: 260, mass: 0.9 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 2, md: 4, lg: 8, full: 9999 }, // Sharp, industrial corners
};
```
