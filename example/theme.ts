/**
 * Bezel design tokens.
 *
 * A single source of truth so every demo screen reads as one system:
 * a 4pt spacing rhythm, a restrained ink-on-near-black palette, one
 * accent per genre, and spring configs tuned for finger-follows-glass
 * motion (never linear, never a default 300ms ease).
 */
import { Platform } from 'react-native';
import type { WithSpringConfig } from 'react-native-reanimated';

export const color = {
  // surfaces
  bg: '#0B0B0F',
  surface: '#141419',
  surfaceHi: '#1C1C24',
  hairline: 'rgba(255,255,255,0.08)',
  hairlineStrong: 'rgba(255,255,255,0.14)',

  // ink
  ink: '#F5F4F0',
  inkMuted: '#A0A0AC',
  inkFaint: '#6B6B78',

  // accents (one per genre keeps the range legible)
  periwinkle: '#7AA2F7', // G1 tactile utility
  mint: '#7EE0B8', // positive / confirm
  amber: '#F5C871', // G4 expressive
  coral: '#FF6B6B', // destructive / slop-warn
  ember: '#FF8A5B', // G3 atmospheric
  violet: '#C4A7FF',
} as const;

/** 4pt rhythm. */
export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
} as const;

/**
 * Tabular figures. Money and codes must never reflow width as digits
 * change — that shimmy is a top slop tell (H in the T/B/P/H/G/R rubric).
 */
export const mono = Platform.select({
  ios: 'Menlo',
  android: 'monospace',
  default: 'monospace',
}) as string;

export const type = {
  // system font, but weight + tracking do the work
  display: { fontSize: 34, fontWeight: '700' as const, letterSpacing: -0.5 },
  title: { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  headline: { fontSize: 17, fontWeight: '600' as const, letterSpacing: -0.2 },
  body: { fontSize: 15, fontWeight: '500' as const, letterSpacing: 0 },
  caption: { fontSize: 13, fontWeight: '500' as const, letterSpacing: 0.1 },
  overline: { fontSize: 11, fontWeight: '700' as const, letterSpacing: 1.2 },
} as const;

/** Springs — the only motion vocabulary the demos use. */
export const spring = {
  /** snappy UI response (button press, toggle) */
  snappy: { damping: 18, stiffness: 320, mass: 0.9 } as WithSpringConfig,
  /** gentle settle (sheets, cards) */
  gentle: { damping: 22, stiffness: 180, mass: 1 } as WithSpringConfig,
  /** bouncy reward (celebration) */
  bouncy: { damping: 10, stiffness: 220, mass: 0.8 } as WithSpringConfig,
} as const;

export const duration = {
  fast: 140,
  base: 220,
} as const;
