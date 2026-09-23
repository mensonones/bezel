# Theme · Paper & Serif

- **Genre:** G2 · Editorial / Journal
- **Mood:** Tactile paper, literary authority, timeless print elegance.
- **Reference Apps:** Apple Books, Substack, Kinfolk, Readwise.

```ts
export const PaperAndSerifTheme = {
  name: 'paper-and-serif',
  genre: 'editorial',
  colors: {
    // Light Mode (Default for print feel)
    background: '#F9F7F1',           // Warm unbleached paper
    surfaceGrouped: '#FFFFFF',       // Crisp white page insert
    surfaceElevated: '#FFFFFF',
    surfaceInteractive: '#EDE9DE',
    borderSubtle: 'rgba(40, 36, 32, 0.08)',
    borderMedium: 'rgba(40, 36, 32, 0.16)',
    textPrimary: '#1E1B18',          // Deep charcoal book ink
    textSecondary: '#6B655D',
    textTertiary: '#9E978E',
    accent: '#8B4513',               // Saddle Brown / Oxblood
    accentMuted: 'rgba(139, 69, 19, 0.10)',
    destructive: '#B22222',
  },
  typography: {
    displayFamily: 'New York',       // Editorial Serif
    bodyFamily: 'Charter',
    titleWeight: '700',
    tabularFigures: true,
  },
  springs: {
    press: { damping: 20, stiffness: 250, mass: 0.9 },
    sheet: { damping: 26, stiffness: 180, mass: 1.1 },
  },
  haptics: {
    tap: 'Light',
    toggle: 'Selection',
    success: 'Success',
  },
  radii: { sm: 4, md: 8, lg: 12, full: 9999 },
};
```
