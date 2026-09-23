---
name: bezel
description: Mobile design and engineering skill that refuses to write mobile AI-slop. Enforces tactile touch, edge-to-edge layouts, spring physics, native haptics, and strict render performance across React Native, Jetpack Compose, and SwiftUI.
---

# Bezel — Mobile Design & Engineering Skill

> **"Mobile is touched, not clicked. Mobile is held in hands, not viewed on a desk."**

Bezel is an opinionated design and engineering skill for AI coding assistants (Claude Code, Cursor, Codex, Antigravity) that eliminates **Mobile AI-Slop** — generic web apps trapped in mobile containers, rigid letterboxed screens, floating card fatigue, inline-style re-render churn, and lifeless touch interactions.

Bezel enforces **tactile touch**, **edge-to-edge fluid layouts**, **physics-driven springs**, **system haptics**, and **strict mobile performance**.

---

## The 4 Operating Verbs

| Invocation | Purpose | Execution |
|---|---|---|
| *(default)* / `bezel build <feature>` | Build a new mobile screen or component. | Follows the **Bezel Mobile Flow**. Detects genre, selects an archetype, locks tokens, ensures edge-to-edge insets, applies spring physics & haptics, checks quality gates, and stamps the pre-emit critique. |
| `bezel audit <target>` | Audit an existing mobile file for slop. | Scans target code against [Mobile Anti-Patterns](references/anti-patterns.md) and [60 Quality Gates](references/slop-test.md). Returns a ruthless, ranked punch list. **Does not edit.** See [Audit Protocol](references/verbs/audit.md). |
| `bezel redesign <target>` | Elevate existing mobile code in-place. | Preserves business logic, route handlers, state hooks, and copy intent; completely refactors the visual, tactile, and performance layer to the Bezel standard. See [Redesign Protocol](references/verbs/redesign.md). |
| `bezel study <screenshot>` | Extract mobile DNA from design reference. | Deconstructs a mobile screenshot into its screen archetype, surface hierarchy, touch ergonomics, and code architecture blueprint. See [Study Protocol](references/verbs/study.md). |

---

## The 6 Universal Mobile Disciplines

These disciplines hold across every verb, screen, and component:

1. **Pre-Emit Mobile Self-Critique (`T5 B5 P5 H4 G5 R5`):**
   Before emitting code, evaluate the output on six 1–5 axes: **T**actile Feeling, **B**elonging (OS integration), **P**erformance, **H**ierarchy, **G**esture/Physics, **R**estraint. Any score < 4 triggers an immediate revision pass. Stamp the score at the top of the file:
   `/* Bezel · pre-emit critique: T5 B5 P5 H4 G5 R5 */`. See [`references/slop-test.md`](references/slop-test.md).

2. **Edge-to-Edge & Safe Area Inset Precision:**
   Never box the screen between solid status bars and solid bottom pills. Backgrounds and scroll containers bleed behind the translucent status bar and home indicator. Insets (`useSafeAreaInsets`, `WindowInsets.safeDrawing`, `.safeAreaInset`) are applied strictly as padding for touch targets and readable text. See [`references/safe-areas-and-insets.md`](references/safe-areas-and-insets.md).

3. **Tactile Spring Physics & Native Haptics:**
   Every button and interactive element scales down slightly on press (`scale: 0.96` to `0.98`) using spring physics (stiffness ~300, damping ~15) and triggers instantaneous native haptic feedback (`Light` impact on press-in, `Selection` on tabs). See [`references/motion-and-gestures.md`](references/motion-and-gestures.md) and [`references/haptics-and-tactility.md`](references/haptics-and-tactility.md).

4. **Zero Inline Styles & Strict Render Performance:**
   No inline style objects (`style={{ ... }}`) causing garbage collection churn and dropped frames. In React Native, use `StyleSheet.create`. Wrap item callbacks in `useCallback`. In Compose, hoist state and ensure stable keys. In SwiftUI, maintain lightweight view bodies. See [`references/frameworks/react-native.md`](references/frameworks/react-native.md).

5. **Structural Skeletons over Naked Spinners:**
   Never render an isolated `ActivityIndicator` centered in a blank void. Loading states must render structural shimmer skeleton placeholders matching the exact typography line heights and layout geometry of incoming content. See [`references/components.md`](references/components.md) (C09).

6. **Anti-Card Slop & Grouped Surface Hierarchy:**
   Ban the generic white floating card with a blurry black drop shadow for repetitive lists. Use **Inset Grouped Tables** with subtle surface tones, hairline dividers (`0.5pt`), and high information density. See [`references/anti-patterns.md`](references/anti-patterns.md) and [`references/tokens-and-themes.md`](references/tokens-and-themes.md).

---

## Scope Routing: Screen vs Component

Before building, detect the scope of the brief:

### When the brief is a Component (Single Element):
- **Signals:** Names a single UI control (*button, input, bottom sheet, chip, toggle, row, badge, floating pill*), target file is a single component file, or prompt says *"just the component"*.
- **Execution:**
  - Skip screen macrostructure.
  - Implement the **7-State Matrix**: Default, Pressed, Focused, Disabled, Loading/Skeleton, Error, Success.
  - Provide an exportable component plus a standalone multi-state preview harness (`<Component>.preview.tsx`).
  - Read [`references/components.md`](references/components.md).

### When the brief is a Screen (Full Page / Feature):
- Follow the **Full Bezel Screen Flow** below.

---

## The Full Bezel Screen Flow

```
Step 0: Pre-Flight & Memory Check (.bezel/log.json / design.md)
   ↓
Step 1: Genre Detection (G1–G4)
   ↓
Step 2: Screen Macrostructure Selection (MS01–MS10 with Diversification Rule)
   ↓
Step 3: Theme Route & Token Lockdown (Catalog Theme or Custom Vibe)
   ↓
Step 4: Edge-to-Edge & Keyboard Architecture
   ↓
Step 5: Tactile, Sensory & Icon Assembly (Springs, Haptics, Assets)
   ↓
Step 6: Pre-Emit Self-Critique & 60 Quality Gates Check
   ↓
Step 7: Code Emission, Memory Append & design.md Lock-In Offer
```

### Step 0 · Pre-Flight & Memory Check
1. **Check for `design.md`:** If present at the project root, it is the immutable source of truth for genre, theme, tokens, and spring physics.
2. **Read Project Memory (`.bezel/log.json`):** Check recently used macrostructures to ensure layout variety across the app. See [`references/combinatorial-engine.md`](references/combinatorial-engine.md).
3. **Scan Target Framework:** Detect React Native / Expo, Jetpack Compose, or SwiftUI.

### Step 1 · Genre Detection
Classify the project into one of the **4 Mobile Genres** from [`references/genres.md`](references/genres.md):
- **G1 · Tactile Utility / Tool** (Things 3, Linear, Flighty) — high density, hairlines, mono/tabular figures.
- **G2 · Editorial / Journal** (Apple Books, Substack) — display serif, warm paper/linen, calm status bar.
- **G3 · Atmospheric / Media** (Spotify, Apple Music, Arc) — Liquid Glass blurs, dark canvas, accent glow.
- **G4 · Expressive & Joyful** (Cash App, Duolingo, Family) — bouncy springs, rounded geometry, playful micro-interactions.

### Step 2 · Macrostructure Selection (Diversification Rule)
Pick one of the **10 Named Screen Archetypes** from [`references/macrostructures.md`](references/macrostructures.md), ensuring it does **not** duplicate the previous screen in `.bezel/log.json`:
- `MS01` · Sheet-Anchored Canvas (Apple Maps / Uber)
- `MS02` · Dynamic Collapsing Header & Large Title (iOS flagship)
- `MS03` · Tactile Action Feed (Threads / Linear mobile)
- `MS04` · Inset Grouped Inspector (iOS Settings / Apple Health)
- `MS05` · Segmented Paging Workbench (Robinhood / Strava)
- `MS06` · Media-First Edge Immersion (Airbnb / VSCO)
- `MS07` · Focused Stepper & Modal Sheet (Cash App / Apple Pay)
- `MS08` · Master-Detail Fluid Stack (Photos / App Store)
- `MS09` · Command Pill & Island Hub (Dynamic Island / Arc)
- `MS10` · Metric Specimen & Scrub Deck (Stocks / Health)

### Step 3 · Theme Route & Token Lockdown
Select a theme from the catalog in [`references/themes/`](references/themes/) or construct a custom token set adhering to the genre:
- **Catalog Themes:** `obsidian-pro`, `cupertino-titanium`, `paper-and-serif`, `nordic-pine`, `cyberpunk-amber`, `swiss-neo-grotesk`, `terracotta-clay`, `midnight-aurora`.
- Strictly forbid inline ad-hoc hex codes. All colors, spacings, radii, and typography must reference tokens. See [`references/tokens-and-themes.md`](references/tokens-and-themes.md).

### Step 4 · Edge-to-Edge & Keyboard Architecture
- Canvas background fills entire window.
- Insets applied strictly to scroll content padding and bottom action trays.
- Keyboard avoidance configured with `keyboardDismissMode="on-drag"` and docked CTAs. See [`references/safe-areas-and-insets.md`](references/safe-areas-and-insets.md).

### Step 5 · Tactile, Sensory & Icon Assembly
- Wrap pressables with `TactilePressable` (`scale: 0.96` + `impactAsync(Light)`).
- Wire sheet drag-to-dismiss velocity thresholds (> 600pt/s or > 30% displacement).
- Apply tabular figures (`tabular-nums`) to all counters, timers, and currency amounts.
- Use vector glyphs from SF Symbols 5/6, Lucide, or Material Symbols with accessible 44×44pt hit targets. See [`references/assets.md`](references/assets.md).
- Apply touch-first mobile microcopy rules (active verbs, 3-beat empty states, honest copy). See [`references/copy.md`](references/copy.md).

### Step 6 · Pre-Emit Gate Check
Verify against the [60 Quality Gates](references/slop-test.md). If any gate fails, fix it immediately.

### Step 7 · Emission & Project Memory Append
1. Output clean, production-grade code stamped with:
   ```ts
   /* Bezel · pre-emit critique: T5 B5 P5 H4 G5 R5 */
   ```
2. Append the build record to `.bezel/log.json`.
3. If `design.md` does not yet exist at root, append a quiet offer:
   > *System portable? Say `lock the system` to extract this build's tokens + voice into a `design.md`.*

---

## Detailed Reference Index

- **Foundations & Quality:**
  - [Mobile Anti-Patterns](references/anti-patterns.md) — 11 named mobile AI-slop tells and their fixes.
  - [Slop Test & 60 Quality Gates](references/slop-test.md) — Pre-emit critique rubric and complete validation checklist.
  - [The Combinatorial Engine & Project Memory](references/combinatorial-engine.md) — `.bezel/log.json` rotation protocol.
  - [design.md Specification](references/design-md.md) — Opt-in portable mobile design system.
- **Genres & Themes:**
  - [The 4 Mobile Genres](references/genres.md) — Tactile Utility, Editorial, Atmospheric, Expressive.
  - [Theme Catalog](references/themes/) — 8 named native themes (`obsidian-pro`, `cupertino-titanium`, `paper-and-serif`, etc.).
  - [Tokens & Surface Hierarchy](references/tokens-and-themes.md) — OLED black, 3-layer surface ladder, Liquid Glass vibrancy.
- **Layout & Structure:**
  - [Mobile Screen Macrostructures](references/macrostructures.md) — Specifications for MS01–MS10.
  - [Safe Areas & Edge-to-Edge Insets](references/safe-areas-and-insets.md) — Glass-to-glass bleed and keyboard avoidance.
  - [Live Activities & Dynamic Island](references/live-activities.md) — Background glanceables and Island presentations.
- **Sensory & Components:**
  - [Component Cookbook & 7 States](references/components.md) — C01–C10 archetypes and 7-state matrix.
  - [Granular Component Blueprints](references/components/) — Production blueprints:
    - [A02 · Slide to Confirm](references/components/A02-slide-to-confirm.md)
    - [D03 · High-Velocity Currency Keypad](references/components/D03-currency-keypad.md)
    - [M01 · Inertial Bottom Sheet](references/components/M01-inertial-bottom-sheet.md)
    - [L02 · Swipeable Action Row](references/components/L02-swipeable-row.md)
    - [D02 · OTP Passcode Input](references/components/D02-otp-keypad.md)
  - [Motion, Physics & Gestures](references/motion-and-gestures.md) — Inertial projection, rubber-banding, spring presets.
  - [Haptics & Tactility Matrix](references/haptics-and-tactility.md) — Sensory mapping for mobile touches.
  - [Assets, Iconography & Audio-Haptics](references/assets.md) — SF Symbols, Lucide, touch targets, and earcons.
  - [Mobile Microcopy & Voice](references/copy.md) — 3-word button verbs, 3-beat empty states, error recovery.
  - [Typography & Font Scaling](references/typography.md) — 4pt type scale, Dynamic Type resilience, tabular numbers.
- **Performance & Framework Guides:**
  - [Performance & 120Hz ProMotion](references/performance.md) — Frame budget, Fabric/Bridgeless, Strong Skipping, @Observable.
  - [React Native & Expo](references/frameworks/react-native.md)
  - [Jetpack Compose](references/frameworks/compose.md)
  - [SwiftUI](references/frameworks/swiftui.md)
- **Real-World Case Studies:**
  - [Flighty](references/cases/flighty.md) — Information density, Live Activities, Dynamic Island, OLED true black.
  - [Things 3](references/cases/things-3.md) — Tactile craft, Magic Plus Button, completion checkboxes.
  - [Crouton](references/cases/crouton.md) — 1-meter glanceability, focused stepper sheets (Apple Design Award).
  - [Cash App](references/cases/cash-app.md) — High-velocity keypad, slide-to-confirm friction.
  - [Family Wallet](references/cases/family-wallet.md) — Playful tactile craft, rubber-banding, audio-haptics.
- **Operating Verbs:**
  - [Audit Protocol](references/verbs/audit.md)
  - [Redesign Protocol](references/verbs/redesign.md)
  - [Study Protocol](references/verbs/study.md)
