# Mobile Screen Macrostructures (MS01–MS10)

Structural variety is the core antidote to AI slop. An AI assistant without macrostructures emits the exact same layout for every mobile screen: a centered header, a static list of white cards, and a big blue button at the bottom.

Bezel uses a catalog of **10 Named Mobile Screen Macrostructures**. When building a new screen, select the archetype that aligns with the user's domain and interaction model, or rotate through them to maintain structural diversity.

---

## Catalog of Screen Archetypes

```
┌─────────────────────────────────────────────────────────────────┐
│ MS01 · Sheet-Anchored Canvas       MS06 · Media-First Immersion │
│ MS02 · Dynamic Collapsing Header   MS07 · Focused Stepper Sheet │
│ MS03 · Tactile Action Feed         MS08 · Master-Detail Stack   │
│ MS04 · Inset Grouped Inspector     MS09 · Command Pill Hub      │
│ MS05 · Segmented Paging Workbench  MS10 · Metric Specimen Deck  │
└─────────────────────────────────────────────────────────────────┘
```

---

### MS01 · Sheet-Anchored Canvas
- **Vibe:** Spatial, exploratory, utility-focused.
- **Reference Apps:** Apple Maps, Uber, Find My, Citymapper.
- **Anatomy:**
  - **Background Layer:** Full-bleed interactive canvas (Map, 3D viewport, Camera feed, or real-time Canvas) that receives touches behind translucent status bars.
  - **Foreground Layer:** Draggable, velocity-aware **Snap-Detent Bottom Sheet** with 3 distinct detents:
    1. *Collapsed Pill (15% height):* Summary chip or quick search trigger.
    2. *Half Sheet (45% height):* Key metadata, primary selection chips, nearby items.
    3. *Expanded List (90% height):* Full scrollable details with sticky header.
  - **Floating Peripheral Controls:** Floating compass, location re-center pill, or layer toggle anchored to top-right with spring press states.

---

### MS02 · Dynamic Collapsing Header & Large Title
- **Vibe:** Editorial, authoritative, native OS flagship feel.
- **Reference Apps:** Apple Music, Apple Podcasts, iOS Files, App Store today view.
- **Anatomy:**
  - **Scroll Container:** Native scroll view whose `contentOffsetY` drives animated header transformations.
  - **Expanded State:** Bold, oversized title (`34pt` Heavy) with subtitle metadata and category pill, sitting below the navigation bar.
  - **Collapsed State:** Fluidly interpolates down into an inline, centered navigation title (`17pt` SemiBold) with hairline bottom border, accompanied by an inline accessory action.
  - **Sticky Search Bar:** Search bar that tucks under the navigation bar and collapses on upward scroll.

---

### MS03 · Tactile Action Feed & Stream
- **Vibe:** Dynamic, social, rapid discovery, finger-friendly.
- **Reference Apps:** Threads, Linear Mobile, GitHub Mobile activity, X/Twitter.
- **Anatomy:**
  - **Edge-to-Edge List:** Content extends full screen width.
  - **Hairline Dividers:** Zero floating card boxes; separation achieved via `0.5pt` hairline borders and subtle inset indentation.
  - **Gesture Interactions:** Pull-to-refresh with haptic threshold tick; swipe left on row for instant archive/flag; swipe right to pin.
  - **Action Ribbons:** Inline compact action buttons (Like, Reply, Share, Star) with instantaneous micro-spring bounce and light haptic click.

---

### MS04 · Inset Grouped Settings & Inspector
- **Vibe:** Clean, organized, rigorous system hierarchy.
- **Reference Apps:** iOS Settings, Apple Health, Telegram settings, Things 3.
- **Anatomy:**
  - **Background:** Secondary grouped canvas background (`#F2F2F7` light / `#000000` or `#1C1C1E` dark).
  - **Sections:** Inset containers (`marginHorizontal: 16`) with rounded corners (`12pt` radius) and elevated surface fill.
  - **Section Headers & Footers:** Uppercase small callout labels (`13pt` Regular, muted text) with generous top spacing.
  - **Rows:** Standardized `44pt` to `56pt` row height, leading icon glyph in a rounded colored square badge, bold title, trailing subtitle/badge, and chevron indicator. Internal hairline divider indented past the icon.

---

### MS05 · Segmented Paging Workbench
- **Vibe:** Multi-mode productivity, dense workspace, analytical.
- **Reference Apps:** Robinhood, Strava analytics, Jira Mobile, Figma Mobile.
- **Anatomy:**
  - **Header:** Sticky top section with title and quick global status indicator.
  - **Segmented Control:** Tactile pill switcher with spring-sliding selection indicator. Each switch triggers an immediate `selectionAsync` haptic tick.
  - **Horizontal Paging:** Synchronized swiper allowing smooth one-finger swipe between views without layout jitter.
  - **Content Area:** Paged views optimized for high information density.

---

### MS06 · Media-First Edge Immersion
- **Vibe:** Cinematic, experiential, visceral visual impact.
- **Reference Apps:** Airbnb, VSCO, Spotify now playing, Apple TV.
- **Anatomy:**
  - **Hero Media Bleed:** High-resolution photography or ambient looping video running behind the transparent status bar all the way to mid-screen or full-screen.
  - **Overlaid Frosted Pill Controls:** Back button and bookmark/share buttons rendered as blurred translucent circles (`BlurView` with `50%` radius).
  - **Bottom Gradient Scrim:** Subtle dark gradient scrim ensuring white typography is 100% legible over any background image.
  - **Floating Dock:** Pinned translucent glass action capsule anchored to bottom safe area with single high-contrast primary CTA.

---

### MS07 · Focused Stepper & Modal Sheet
- **Vibe:** Deliberate, frictionless transactional flow, zero distraction.
- **Reference Apps:** Cash App send, Revolut transfer, Apple Pay sheet, Linear issue creator.
- **Anatomy:**
  - **Presentation:** Form sheet modal with visible grab handle pill (`36 × 5pt`, rounded).
  - **Progress Stepper:** Subtle step dots or animated progress hairline at top.
  - **Content Core:** Large focused input fields with clear placeholders and auto-focus.
  - **Keyboard-Attached Action Dock:** Primary action button sits directly atop the software keyboard without gap, floating smoothly as the keyboard animates up and down.

---

### MS08 · Master-Detail Stack with Shared Element
- **Vibe:** Fluid, continuous, high-craft transitions.
- **Reference Apps:** Photos, App Store App of the Day cards, Arc Search.
- **Anatomy:**
  - **Master View:** Grid or list of preview tiles.
  - **Interaction:** Tapping a card springs open into the full screen, preserving the card's image and typography positions (Shared Element Transition).
  - **Dismiss Gesture:** Swiping down anywhere on the screen scales the view down interactively (`scale: 0.9` -> `0.85`), fading out the backdrop and returning to the exact grid card coordinate.

---

### MS09 · Command Pill & Floating Island Hub
- **Vibe:** Modern minimalist, one-handed ergonomic supremacy, fluid tools.
- **Reference Apps:** Dynamic Island interactions, Arc Mobile, Raycast companion, Perplexity mobile.
- **Anatomy:**
  - **Screen Content:** Clean reading or browsing canvas with full vertical span.
  - **Bottom Command Capsule:** Floating rounded pill (`48pt` height, `24pt` radius) centered horizontally with 16pt bottom margin.
  - **Capsule Structure:** Frosted glass material containing search trigger, core action glyph, and context menu trigger.
  - **Behavior:** On upward scroll, capsule stays fixed; on rapid downward scroll, capsule retracts 80% with spring transition to maximize reading space.

---

### MS10 · Metric Specimen & Scrub Deck
- **Vibe:** Precision, financial, quantitative confidence.
- **Reference Apps:** Apple Stocks, Coinbase, Withings Health, WHOOP.
- **Anatomy:**
  - **Hero Metric:** Giant tabular figure display (`40pt` Bold) with live delta pill (`+3.4%`). Tabular numbers ensure zero horizontal jitter during live value changes.
  - **Interactive Scrub Area:** Vector chart or sparkline that responds to pan gesture. As the finger scrubs across data points, a vertical hairline follows the finger and triggers a micro-haptic tick on each sample point.
  - **Timeframe Selector:** Horizontal pill row (`1D`, `1W`, `1M`, `1Y`, `ALL`) with smooth spring indicator transition.
  - **Dense Breakdown List:** Inset grouped rows detailing key sub-metrics with strict typographic alignment.
