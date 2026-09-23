# Theme · Obsidian Pro

- **Genre:** G1 · Tactile Utility / Tool
- **Mood:** Professional, mechanical, high-density, terminal-sharp.
- **Reference Apps:** Linear Mobile, Raycast Companion, Flighty Pro.

```ts
export const ObsidianProTheme = {
  name: 'obsidian-pro',
  genre: 'tactile-utility',
  colors: {
    background: '#000000',           // Pure OLED True Black
    surfaceGrouped: '#121214',       // Inset container surface
    surfaceElevated: '#1C1C1F',      // Sheets, floating capsules
    surfaceInteractive: '#27272B',   // Pressed row / button state
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderMedium: 'rgba(255, 255, 255, 0.16)',
    textPrimary: '#FFFFFF',
    textSecondary: '#8A8A93',
    textTertiary: '#52525B',
    accent: '#0A84FF',               // Electric Cobalt
    accentMuted: 'rgba(10, 132, 255, 0.12)',
    destructive: '#FF453A',
  },
  typography: {
    displayFamily: 'System',         // SF Pro / Roboto
    bodyFamily: 'System',
    titleWeight: '700',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 18, stiffness: 350, mass: 0.7 },
    sheet: { damping: 24, stiffness: 240, mass: 1.0 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 6, md: 10, lg: 14, full: 9999 },
};
```
