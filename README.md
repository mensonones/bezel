# Bezel 📱

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frameworks](https://img.shields.io/badge/platforms-React%20Native%20%7C%20Expo%20%7C%20Compose%20%7C%20SwiftUI-success)](#multi-framework-support)
[![Inspired by Hallmark](https://img.shields.io/badge/inspired%20by-nutlope%2Fhallmark-purple)](https://github.com/nutlope/hallmark)

> **A mobile design and engineering skill that refuses to write mobile AI-slop.**
> Built specifically for the native mobile ecosystem: **React Native / Expo**, **Jetpack Compose**, and **SwiftUI**.

Inspired by [nutlope/hallmark](https://github.com/nutlope/hallmark), Bezel replicates the anti-AI-slop design skill methodology, combinatorial structural engine, and quality gates, re-engineered from the ground up for **touchscreens, physical hardware, 120Hz refresh budgets, and cutting-edge 2025/2026 mobile design trends**.

---

## The Problem: Mobile AI-Slop

LLMs write terrible mobile code. They treat touch devices like miniature desktop websites:

- ❌ **The Boxed Viewport:** Letterboxing the screen between an opaque status bar and a solid navigation pill instead of bleeding backgrounds edge-to-edge.
- ❌ **Floating Card Slop:** Wrapping every repetitive list row in an isolated white card with a generic blurry black drop shadow (`shadowOpacity: 0.1, shadowRadius: 8`), inducing card fatigue.
- ❌ **The Naked Centered Spinner:** Dropping an isolated `ActivityIndicator` in the middle of a blank void instead of structural layout-matching skeletons.
- ❌ **Keyboard Blindness:** Placing text inputs that get buried under the software keyboard, with no scroll dismissal and no docked CTAs.
- ❌ **Frozen Touch & Missing Haptics:** Buttons that flash opacity abruptly with zero spring depression (`scale: 0.96`) and zero native haptic feedback.
- ❌ **Inline Style Spaghetti:** `style={{ ... }}` causing frame drops, bridge churn, and garbage collection freezes on 120Hz displays.
- ❌ **Dynamic Type Clipping:** Fixed container heights (`height: 48`) that truncate text when users scale accessibility fonts.
- ❌ **Repetitive Amnesia:** Emitting the exact same generic centered layout for every screen in the same application.

---

## The Solution: Bezel

**Bezel** transforms AI coding agents (Claude Code, Cursor, Codex, Antigravity) into Senior Mobile Engineers and Interface Designers.

It enforces **tactile touch**, **edge-to-edge fluid layouts**, **physics-driven springs**, **system haptics**, **multi-sensory earcons**, **portable design systems**, and **strict mobile performance**.

```
┌─────────────────────────────────────────────────────────────────┐
│                 The 6 Universal Mobile Disciplines              │
│                                                                 │
│  1. Pre-Emit Critique (T5 B5 P5 H4 G5 R5)                       │
│  2. Edge-to-Edge & Safe Area Inset Precision                    │
│  3. Tactile Spring Physics & Native Haptics                     │
│  4. Zero Inline Styles & Strict Render Performance              │
│  5. Structural Skeletons over Naked Spinners                    │
│  6. Anti-Card Slop & Inset Grouped Hierarchy                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Proof: Slop vs. Craft Benchmark

How do you know Bezel actually works? We tested the exact same prompt with a standard LLM vs Bezel:

> *"Build a mobile money transfer screen with recipient selection, amount entry, and transfer confirmation."*

| Metric | Standard LLM (Mobile Slop) ❌ | Bezel Standard ✨ |
|---|---|---|
| **Critique Score** | `T1 B2 P1 H2 G5 R2` (Fail) | `T5 B5 P5 H5 G5 R5` (100% Pass) |
| **Quality Gates** | 8 / 60 Passed (52 Violations) | **60 / 60 Passed (0 Violations)** |
| **Inline Styles** | 18 inline style objects (`style={{ ... }}`) | **Zero** (`StyleSheet.create`) |
| **Status Bar** | Hardcoded letterboxing (`paddingTop: 45`) | Full edge-to-edge bleed (`useSafeAreaInsets`) |
| **Touch Feedback** | Flat `TouchableOpacity` (opacity: 0.2) | Spring scale (`0.96`) + native Light haptics |
| **Action Trigger** | Accidental single-tap button | **`A02 · Slide to Confirm`** with haptic lock |

- 📊 **Full Shootout & Analysis:** See [`BENCHMARK.md`](BENCHMARK.md).
- 🤖 **Automated Audit CLI:** Run `npm run audit ./example/bezel-transfer.tsx`.
- 📱 **Interactive App Demo:** Run `cd example && npm start` to touch and compare on your phone.

---

## Installation

### Option 1: Install as an Agent Skill (Recommended)

Install Bezel into your AI coding assistant (Cursor, Claude Code, Codex, Antigravity, Cline) via the `skills` CLI:

```bash
# Add to current mobile project (interactive)
npx skills add mensonones/bezel

# Add globally across all projects on your machine
npx skills add mensonones/bezel -g

# Add to specific AI agents directly (e.g. Cursor & Claude Code)
npx skills add mensonones/bezel --agent cursor claude-code

# Install non-interactively to all detected agents
npx skills add mensonones/bezel --all

# Or install from local cloned repository
npx skills add .
```

### Option 2: Direct System Prompt / `.cursorrules`

If your tool does not support skills, copy the contents of [`bezel.md`](bezel.md) and paste it into:
- Your project's `.cursorrules` or `.windsurfrules` file
- Claude Code project memory (`CLAUDE.md`) or system instructions
- Antigravity / ChatGPT custom system prompt

---

## The 4 Operating Verbs

| Command | Action | Description |
|---|---|---|
| **`bezel build [feature]`** *(or default)* | Build New Screen / Component | Detects genre, chooses a named mobile macrostructure (MS01–MS10), locks tokens, configures safe areas, applies tactile springs/haptics, and stamps the pre-emit critique. |
| **`bezel audit [file]`** | Ruthless Slop Audit | Scans existing code against the [Mobile Anti-Patterns](skills/bezel/references/anti-patterns.md) and [60 Quality Gates](skills/bezel/references/slop-test.md). Produces a ranked punch list. **Does not edit.** |
| **`bezel redesign [component]`** | In-Place Elevation | Preserves all business logic, queries, state hooks, and copy intent; completely rewires the visual, tactile, inset, and performance layers to the Bezel standard. |
| **`bezel study [screenshot]`** | Mobile DNA Extraction | Deconstructs a screenshot of a world-class mobile app into its screen archetype, inset strategy, surface hierarchy, and code architecture blueprint. |

---

## The 4 Mobile Genres

Bezel organizes all mobile experiences into **4 distinct physical genres**:

1. **G1 · Tactile Utility / Tool** *(Things 3, Linear Mobile, Flighty)* — High information density, 0.5pt hairlines, tabular numbers, mechanical haptics, OLED black.
2. **G2 · Editorial / Journal** *(Apple Books, Substack, Kinfolk)* — High-contrast display serif typography (New York, Fraunces), warm paper/linen tones, generous breathing room.
3. **G3 · Atmospheric / Media** *(Spotify, Apple Music, Arc Search)* — Liquid Glass blur vibrancies, dark canvas, radiant accent glow, immersive media focus.
4. **G4 · Expressive & Joyful** *(Cash App, Duolingo, Family)* — Bouncy spring curves, friendly rounded geometry, joyful micro-interactions, rich celebration haptics.

See [`skills/bezel/references/genres.md`](skills/bezel/references/genres.md).

---

## Catalog of Native Themes

Bezel includes a built-in catalog of **8 named native mobile themes**:

| Theme | Genre | Anchor | Vibe |
|---|---|---|---|
| **`obsidian-pro`** | Tactile Utility | Electric Cobalt (`#0A84FF`) | OLED True Black (`#000000`), terminal-sharp, high density |
| **`cupertino-titanium`** | Atmospheric | Natural Titanium (`#D4AF37`) | Native iOS blur materials, SF Pro, Apple hardware fidelity |
| **`paper-and-serif`** | Editorial | Oxblood / Saddle Brown | Warm unbleached paper (`#F9F7F1`), New York serif, book ink |
| **`nordic-pine`** | Editorial | Sprout Green (`#52B788`) | Deep evergreen (`#0B1512`), muted sage, organic calm |
| **`cyberpunk-amber`** | Tactile Utility | Phosphor Amber (`#FFB703`) | Pitch black, monospaced hardware type, Teenage Engineering |
| **`swiss-neo-grotesk`** | Modern Minimal | Swiss Red (`#E63946`) | Stark high-contrast monochrome, bold grotesque sans, zero radii |
| **`terracotta-clay`** | Expressive | Terracotta Clay (`#C85A32`) | Warm desert sand, soft pillowed corners, ceramic smoothness |
| **`midnight-aurora`** | Atmospheric | Radiant Cyan (`#00F0FF`) | Liquid Glass, deep northern night, glowing neon polar aurora |

Explore the theme specifications in [`skills/bezel/references/themes/`](skills/bezel/references/themes/).

---

## 10 Named Mobile Screen Macrostructures (MS01–MS10)

Bezel prevents structural monotony through a diverse catalog of named screen archetypes:

- **`MS01` · Sheet-Anchored Canvas:** Full-bleed interactive canvas (Map, camera, workspace) behind translucent chrome + draggable 3-detent bottom sheet (Apple Maps / Uber).
- **`MS02` · Dynamic Collapsing Large Title:** Bold `34pt` header that fluidly collapses into an inline navigation bar upon scroll (iOS flagship).
- **`MS03` · Tactile Action Feed:** Edge-to-edge content stream with hairline dividers, pull-to-refresh haptic tick, and swipe-action rows (Threads / Linear).
- **`MS04` · Inset Grouped Inspector:** Standardized rows inside rounded island containers (`12pt` radius), leading icon badges, and trailing chevrons (iOS Settings / Apple Health).
- **`MS05` · Segmented Paging Workbench:** Haptic segmented pill slider at top or bottom with synchronized horizontal swiper views (Robinhood / Strava).
- **`MS06` · Media-First Edge Immersion:** Full-bleed photography or looping video behind transparent status bar, overlaid frosted glass pill controls, bottom gradient scrim, floating action capsule (Airbnb / VSCO).
- **`MS07` · Focused Stepper & Modal Sheet:** Grab-handle sheet modal with progressive steps and a primary action button docked flush above the software keyboard (Cash App / Apple Pay).
- **`MS08` · Master-Detail Fluid Stack:** Grid cards that spring open into full-screen views via shared element transitions, dismissible with an interactive drag-down gesture.
- **`MS09` · Command Pill & Island Hub:** Minimal content canvas paired with a bottom-floating dynamic frosted command pill that auto-retracts on downward scroll.
- **`MS10` · Metric Specimen & Scrub Deck:** Tabular hero metric (`fontVariant: ['tabular-nums']`) paired with an interactive scrubbable chart that fires micro-haptic ticks across data points.

See [`skills/bezel/references/macrostructures.md`](skills/bezel/references/macrostructures.md).

---

## Combinatorial Engine & Project Memory (`.bezel/log.json`)

To prevent AI repetition within the same project, Bezel tracks screen generation history in `.bezel/log.json`.

The **Diversification Rule** mandates that consecutive screens in the same app **never** reuse the same macrostructure, while maintaining strict token consistency with the established theme or `design.md`.

See [`skills/bezel/references/combinatorial-engine.md`](skills/bezel/references/combinatorial-engine.md).

---

## Portable `design.md` (System Lock-In)

Say **`lock the system`** or **`give me a design.md`** after any build to export a portable, locked design system specification into `design.md` at your project root.

Subsequent Bezel runs detect this file and automatically defer to its locked genre, theme, tokens, spring curves, and haptic mappings.

See [`skills/bezel/references/design-md.md`](skills/bezel/references/design-md.md).

---

## 2025/2026 Mobile Innovations

Bezel incorporates the cutting edge of mobile craft:

- **Liquid Glass Materials:** Specular translucency that adapts to scrolling content and lighting.
- **Dynamic Island & Live Activities:** Background state architectures (Compact, Minimal, Expanded) for ongoing processes. See [`skills/bezel/references/live-activities.md`](skills/bezel/references/live-activities.md).
- **Audio-Haptic Pairing (Earcons):** Sensation engineering pairing micro-haptic taps with subtle acoustic clicks for mechanical realism. See [`skills/bezel/references/assets.md`](skills/bezel/references/assets.md).
- **Touch-First Microcopy:** Active verbs, 3-beat empty states, actionable error messages, and honest copy. See [`skills/bezel/references/copy.md`](skills/bezel/references/copy.md).

---

## Pre-Emit Mobile Self-Critique & 60 Quality Gates

Every screen or component generated by Bezel evaluates itself across **6 axes (scored 1 to 5)** and stamps the critique header at the top of the file:

```ts
/* Bezel · pre-emit critique: T5 B5 P5 H4 G5 R5 */
```

- **`T` — Tactile Feeling:** Micro-scale spring press (`scale: 0.96`), native haptic pulses on touch-down.
- **`B` — Belonging:** Transparent status bar, edge-to-edge bleed, safe area padding, native platform idioms.
- **`P` — Performance:** Zero inline styles, stable callbacks, UI-thread animations, no bridge/recomposition churn.
- **`H` — Hierarchy:** Inset grouped tables, hairline dividers (`0.5pt`), 4pt grid, clear typography.
- **`G` — Gesture & Physics:** Spring motion (mass, damping, stiffness), velocity-aware sheet dismissal.
- **`R` — Restraint:** Anti-slop purity, honest copy (no fabricated metrics), no fake drawn OS chrome.

Outputs are verified against **60 numbered quality gates** detailed in [`skills/bezel/references/slop-test.md`](skills/bezel/references/slop-test.md).

---

## Advanced Motion Physics & Gestures

Bezel treats touchscreens as physical surfaces with momentum, elasticity, and friction:

- **Inertial Projection:** Predicts destination detents using finger velocity at release ($\text{projected} = \text{current} + \frac{\text{velocity}}{1 - d}$).
- **Rubber-Banding (Logarithmic Resistance):** Applies non-linear elasticity when dragging past boundaries ($f(x) = \frac{x \cdot d \cdot c}{d + c \cdot x}$).
- **Dual Spring Models:** Supports both Apple intuitive `{ duration: 0.45, bounce: 0.18 }` and physical `{ stiffness: 300, damping: 15, mass: 0.8 }`.

See [`skills/bezel/references/motion-and-gestures.md`](skills/bezel/references/motion-and-gestures.md).

---

## Granular Component Blueprints

Bezel includes modular, production-ready component blueprints under [`skills/bezel/references/components/`](skills/bezel/references/components/):

- **[A02 · Slide to Confirm](skills/bezel/references/components/A02-slide-to-confirm.md):** Friction slider for high-stakes actions with rubber-band threshold and haptic lock.
- **[D03 · High-Velocity Keypad](skills/bezel/references/components/D03-currency-keypad.md):** Auto-scaling tabular currency display with mechanical 3×4 touch keypad.
- **[M01 · Inertial Bottom Sheet](skills/bezel/references/components/M01-inertial-bottom-sheet.md):** 3-detent velocity-aware sheet with interruptible pan gesture.
- **[L02 · Swipeable Action Row](skills/bezel/references/components/L02-swipeable-row.md):** Progressive resistance, revealable actions, and full-swipe direct execution.
- **[D02 · OTP Passcode Input](skills/bezel/references/components/D02-otp-keypad.md):** 6-cell passcode with autofill capture and micro-wiggle error shake.

---

## Real-World Case Studies

Bezel codifies design engineering lessons from top-tier apps:

- **[Flighty](skills/bezel/references/cases/flighty.md):** Information density, pure OLED black (`#000000`), Live Activities, Dynamic Island, zero card slop.
- **[Things 3](skills/bezel/references/cases/things-3.md):** The Magic Plus Button, tactile spring-loaded checkboxes, delayed strike-through reward.
- **[Crouton](skills/bezel/references/cases/crouton.md):** Hands-free glanceability, 1-meter typography, focused stepper sheets (Apple Design Award).
- **[Cash App](skills/bezel/references/cases/cash-app.md):** Full-screen number entry, slide-to-confirm friction, instant sensory feedback.
- **[Family Wallet](skills/bezel/references/cases/family-wallet.md):** Playful tactile craft, custom rubber-banding, audio-haptic earcons.

---

## Performance & 120Hz ProMotion Engineering

- **8.33ms Frame Budget:** Never run layout animation calculations on the JavaScript thread. Use Reanimated UI-thread worklets (`'worklet'`).
- **React Native New Architecture:** Fabric synchronous C++ layout and Bridgeless JSI memory pointers.
- **Jetpack Compose:** Strong Skipping Mode, `@Immutable` models, and `derivedStateOf` scroll throttling.
- **SwiftUI:** iOS 17+ `@Observable` macro eliminating redraw cascades.

See [`skills/bezel/references/performance.md`](skills/bezel/references/performance.md).

---

## Multi-Framework Support

Bezel includes idiomatic reference implementations for all major modern mobile frameworks:

- **React Native & Expo:** [`skills/bezel/references/frameworks/react-native.md`](skills/bezel/references/frameworks/react-native.md)
  *(StyleSheet, Reanimated 3, Gesture Handler 2, react-native-safe-area-context, expo-haptics, FlashList)*
- **Jetpack Compose:** [`skills/bezel/references/frameworks/compose.md`](skills/bezel/references/frameworks/compose.md)
  *(Modifiers, WindowInsets.safeDrawing, Animatable springs, LocalHapticFeedback, LazyColumn)*
- **SwiftUI:** [`skills/bezel/references/frameworks/swiftui.md`](skills/bezel/references/frameworks/swiftui.md)
  *(safeAreaInset, withAnimation springs, SensoryFeedback, InsetGrouped List)*

---

## Project Structure

```
bezel/
├── README.md                                 # Full documentation & showcase
├── bezel.md                                  # Bundled single-file system prompt
└── skills/
    └── bezel/
        ├── SKILL.md                          # Main skill entrypoint
        └── references/
            ├── anti-patterns.md              # 11 Named mobile AI-slop tells
            ├── slop-test.md                  # Pre-emit rubric + 60 Quality Gates
            ├── combinatorial-engine.md       # .bezel/log.json project memory
            ├── design-md.md                  # Portable design.md lock-in spec
            ├── genres.md                     # The 4 Mobile Genres (G1–G4)
            ├── themes/                       # Catalog of 8 named native themes
            │   ├── obsidian-pro.md
            │   ├── cupertino-titanium.md
            │   ├── paper-and-serif.md
            │   ├── nordic-pine.md
            │   ├── cyberpunk-amber.md
            │   ├── swiss-neo-grotesk.md
            │   ├── terracotta-clay.md
            │   └── midnight-aurora.md
            ├── cases/                        # Real-world case studies
            │   ├── flighty.md
            │   ├── things-3.md
            │   ├── crouton.md
            │   ├── cash-app.md
            │   └── family-wallet.md
            ├── macrostructures.md            # MS01–MS10 Mobile screen archetypes
            ├── components.md                 # C01–C10 Cookbook & 7-state matrix
            ├── components/                   # Granular component blueprints
            │   ├── A02-slide-to-confirm.md
            │   ├── D02-otp-keypad.md
            │   ├── D03-currency-keypad.md
            │   ├── L02-swipeable-row.md
            │   └── M01-inertial-bottom-sheet.md
            ├── motion-and-gestures.md        # Inertial projection & rubber-banding
            ├── haptics-and-tactility.md      # Sensory feedback mapping
            ├── safe-areas-and-insets.md      # Glass-to-glass bleed & insets
            ├── live-activities.md            # Dynamic Island & Live Activities
            ├── assets.md                     # Iconography & audio-haptic earcons
            ├── copy.md                       # Touch-first microcopy & voice
            ├── typography.md                 # 4pt type scale & Dynamic Type
            ├── tokens-and-themes.md          # Surface ladder & OLED true black
            ├── performance.md                # 120Hz ProMotion & frame pacing
            ├── frameworks/
            │   ├── react-native.md           # React Native / Expo guide
            │   ├── compose.md                # Jetpack Compose guide
            │   └── swiftui.md                # SwiftUI guide
            └── verbs/
                ├── audit.md                  # `bezel audit` protocol
                ├── redesign.md               # `bezel redesign` protocol
                └── study.md                  # `bezel study` protocol
```

---

## Acknowledgments

Bezel is directly inspired by [nutlope/hallmark](https://github.com/nutlope/hallmark) by [Hassan El Mghari](https://github.com/nutlope), which established the pioneering anti-AI-slop design skill methodology for the web. Bezel adapts, deepens, and transforms these foundational disciplines for the unique physical realities of the mobile native ecosystem.

---

## License

[MIT](LICENSE) © Emerson Vieira
