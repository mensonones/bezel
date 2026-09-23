# design.md — Opt-in Portable Mobile Design System

Loaded by [`SKILL.md`](../SKILL.md) Step 6 **ONLY** when the user explicitly asks Bezel to lock the current build's design system into a portable file. The default build verb does NOT auto-emit `design.md`. The user iterates freely until they are satisfied, then asks to lock it.

This file is **also** loaded by [`study.md`](verbs/study.md) when the user — after a successful `study` diagnosis of a mobile app screenshot — asks for the extracted DNA to be emitted as a portable design system.

---

## Triggers (Phrase-Only)

Fire ONLY when the user says one of:

- *"lock the system"* / *"lock the design system"* / *"lock the DNA"* / *"lock this DNA"*
- *"give me a design.md"* / *"write a design.md"* / *"export this as a design.md"*
- *"extract this to a design system"* / *"extract the tokens"* / *"extract the DNA"*
- *"make this portable"* / *"make the DNA portable"*
- *"I want to use this design in another mobile app"*

For standard feature builds, audits, and free iteration on screens, skip emitting this file.

---

## The Two Emission Paths

| | **Default Build Path** (Lock the System) | **Study Verb Path** (Lock the DNA) |
|---|---|---|
| **Trigger Context** | After at least one mobile screen build the user has reviewed and approved. | After a successful `bezel study` screenshot diagnosis. |
| **Source of Tokens** | The active build's in-memory token state and typography. | The studied screenshot's extracted visual and tactile DNA. |
| **Provenance** | Omitted (the system is the user's own app). | Required — records source image, date, and confidence note. |
| **Notes Block** | Optional — architectural decisions worth preserving. | Required — lists anti-patterns to NOT carry over from the reference. |

---

## Scope & No-Overwrite Policy

- **Screen builds only.** Skip on component-scope (a single button or row is too small to define a system).
- **No-overwrite policy:** If `design.md` already exists at the project root, do NOT overwrite it blindly. Refresh its `## Exports` section and emit:
  > *"design.md detected at root — preserved existing tokens, updated component exports."*
- **Future Runs:** When `design.md` exists at the project root, every subsequent Bezel run (`build`, `redesign`) reads it first as the single source of truth.

---

## Standard Format (~45 Lines)

Write the file at the project root as `design.md` (or `DESIGN.md` if matching repo casing):

````markdown
# Design — <App Name>

Locked mobile design system. Future Bezel runs read this file first; screens defer
to it. Amend intentionally — this file is the rule.

## System
- Genre · <tactile-utility / editorial / atmospheric / expressive>
- Archetype · <MS01–MS10>
- Theme · <catalog: NAME · or · custom (vibe: "<4–8 words>")>
- Target Framework · <react-native / compose / swiftui>

## Tokens
```ts
export const Tokens = {
  colors: {
    background: '#000000',           // Canvas base (OLED True Black)
    surfaceGrouped: '#1C1C1E',       // Inset grouped containers
    surfaceElevated: '#2C2C2E',      // Modals, sheets, floating capsules
    surfaceInteractive: '#3A3A3C',   // Pressed states
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    textPrimary: '#FFFFFF',
    textSecondary: '#8E8E93',
    textTertiary: '#636366',
    accent: '<HEX>',                 // Single anchor hue
    accentMuted: '<RGBA>',
    destructive: '#FF453A',
  },
  spacing: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48],
  radii: { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 },
};
```

## Typography
- Display / Large Title · <SF Pro Display / New York / Custom> · Weight 700
- Body / UI · <SF Pro Text / Roboto / System> · Weight 400 & 600
- Tabular figures · Enforced for currencies, timers, and counter metrics

## Motion & Tactility
- Spring Presets · Tactile Press: `{ damping: 15, stiffness: 300, mass: 0.8 }`
- Sheet Snap · `{ damping: 22, stiffness: 220, mass: 1.0 }`
- Haptic Mapping · Tap: `Light` · Tab Switch: `Selection` · Dismiss: `Medium`

## Iconography & Voice
- Icon Kit · <SF Symbols 6 / Lucide Mobile / Material Symbols Expressive>
- Voice · <terse-utility / calm-editorial / punchy-playful>
- Button Verbs · Active imperative, max 3 words (e.g. "Transfer funds", "Save draft")
````
