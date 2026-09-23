# The Bezel Mobile Slop Test & Quality Gates

Before emitting any mobile code, Bezel runs a strict pre-emit self-critique and validates output against **60 numbered quality check gates**.

If any check fails or any score on the 6 axes is below 4, the output is rejected and revised before the user sees it.

---

## Part 1 · Pre-Emit Mobile Self-Critique

Every generated screen or component must begin with a self-critique comment block:

```ts
/* Bezel · pre-emit critique: T5 B5 P5 H4 G5 R5 */
```

### The 6 Evaluation Axes (Score 1 to 5):

1. **`T` — Tactile Feeling (Touch & Haptics)**
   - *5:* Every pressable scales on touch (`scale: 0.96`), triggers appropriate haptic impulses, and feels springy.
   - *1:* Dead buttons, static opacity flashes, zero haptics.

2. **`B` — Belonging (OS & Hardware Integration)**
   - *5:* Edge-to-edge transparent status bars, safe areas respected for content, native feel, respects platform conventions (iOS vs Android).
   - *1:* Boxed letterboxing, hardcoded paddings ignoring notches and home bars.

3. **`P` — Performance & Render Rigor**
   - *5:* Zero inline style objects, stable memoized callbacks, animations on UI thread (Reanimated / native driver), no bridge churn.
   - *1:* `style={{ ... }}` everywhere, anonymous functions in list items, JS-thread layout thrashing.

4. **`H` — Hierarchy & Spatial Composition**
   - *5:* Clear typographic hierarchy, high information density without clutter, grouped table surfaces, hairline borders.
   - *1:* Monotonous floating cards with generic blur shadows, arbitrary spacing.

5. **`G` — Gesture & Fluid Physics**
   - *5:* Natural gesture dismissal, velocity-aware snap detents, interruptible spring animations.
   - *1:* Abrupt linear transitions, non-draggable full-screen modals, frozen dialogs.

6. **`R` — Restraint (Anti-Slop Cleanliness)**
   - *5:* Honest UI without fake drawn chrome, purposeful components tailored to the user's domain, honest copy.
   - *1:* Generic 5-tab bar clone, fake battery/notch drawings, purple gradient hero slop.

---

## Part 2 · The 60 Mobile Quality Gates

### Section A: Architecture, Edge-to-Edge & Insets (Gates 1–10)

- **Gate 1:** Status bar must never be boxed with a hard opaque background band. Backgrounds bleed behind the status bar.
- **Gate 2:** Home indicator area (bottom inset) must not have an abrupt solid pill cutoff; content or surface backgrounds extend to the physical bottom.
- **Gate 3:** Insets are applied strictly via `useSafeAreaInsets()` (RN) or `WindowInsets.safeDrawing` (Compose) or `.safeAreaInset()` (SwiftUI).
- **Gate 4:** Horizontal padding respects the physical gutter: `16pt` on standard devices, `20pt` on plus-sized devices.
- **Gate 5:** Root scroll views must include content inset padding for bottom navigation or sticky bottom bars so the last item is never hidden.
- **Gate 6:** No fake drawn OS chrome (fake notches, fake battery icons, fake Wi-Fi bars).
- **Gate 7:** Landscape and split-screen orientations must not crash or clip primary action triggers.
- **Gate 8:** Modals and bottom sheets must respect top safe areas and avoid colliding with the hardware camera island.
- **Gate 9:** Keyboard avoidance is implemented on all screens with text inputs.
- **Gate 10:** Scrollable views set `keyboardDismissMode="on-drag"` (RN) or equivalent to dismiss the keyboard naturally when scrolling.

### Section B: Touch Ergonomics & Targets (Gates 11–18)

- **Gate 11:** Minimum touch target size for every interactive element is **44 × 44pt** (iOS) / **48 × 48dp** (Android), using `hitSlop` if visual element is smaller.
- **Gate 12:** Primary destructive actions are separated from primary confirmation actions to prevent accidental thumb taps.
- **Gate 13:** Thumb reachability: primary call-to-action buttons sit in the lower 40% of the screen ("thumb zone").
- **Gate 14:** Secondary dismiss buttons or back buttons in the navigation bar have at least 12pt padding around touch boundaries.
- **Gate 15:** List rows have full-width touch areas, not just the text label inside the row.
- **Gate 16:** Switch controls and toggles are wrapped in an accessible tap target.
- **Gate 17:** Interactive elements have at least 8pt clearance between adjacent touch boundaries.
- **Gate 18:** Edge swipe navigation (back swipe from left edge on iOS) is never hijacked or blocked by nested horizontal scrollviews without explicit gesture coordination.

### Section C: Tactility & Haptic Feedback (Gates 19–25)

- **Gate 19:** Every button scales down slightly upon press (`transform: [{ scale: 0.96–0.98 }]`).
- **Gate 20:** Press feedback triggers instantly on touch-down (`onPressIn`), not deferred to touch-up (`onPress`).
- **Gate 21:** Button tap triggers `Light` impact haptic feedback.
- **Gate 22:** Segmented tab or filter toggle triggers `Selection` haptic feedback.
- **Gate 23:** Destructive confirmation or error state triggers `NotificationError` / `Heavy` haptic feedback.
- **Gate 24:** Pull-to-refresh detent threshold fires a distinct haptic tick when the threshold is crossed.
- **Gate 25:** Haptic triggers are wrapped in safety guards that degrade gracefully on devices or platforms without vibration hardware.

### Section D: Motion, Physics & Gestures (Gates 26–32)

- **Gate 27:** Zero linear (`cubic-bezier` / `Easing.linear`) easing for UI transitions. All spatial animations use physical springs (mass, stiffness, damping).
- **Gate 28:** Bottom sheets and drawers support drag-to-dismiss with velocity calculation.
- **Gate 29:** Gestures are interruptible: tapping or dragging during an in-flight spring animation takes immediate physical control without visual stutter.
- **Gate 30:** Modals feature an interactive swipe-down gesture accompanied by an interactive dimming backdrop.
- **Gate 31:** Shared element transitions maintain aspect ratio and prevent font distortion during expansion.
- **Gate 32:** Scroll-to-top on status bar tap is preserved on iOS.

### Section E: Render Performance & Code Rigor (Gates 33–40)

- **Gate 33:** **Zero inline style objects.** All React Native styling must use `StyleSheet.create` or strict memoized token maps.
- **Gate 34:** In Jetpack Compose, no unstable lambda allocations inside `LazyColumn` items; state is hoisted cleanly.
- **Gate 35:** In SwiftUI, view body computations must remain lightweight without heavy synchronous business logic.
- **Gate 36:** Long lists utilize virtualized components (`FlashList`, `FlatList` with `getItemLayout`, `LazyColumn`, `LazyVStack`).
- **Gate 37:** Images specify explicit aspect ratios or bounding boxes to prevent layout popping.
- **Gate 38:** Complex animations run exclusively on the UI / Render thread (Reanimated worklets, Compose Animatable, SwiftUI withAnimation).
- **Gate 39:** Event handlers passed to list items are wrapped with `useCallback` to prevent item re-render cascades.
- **Gate 40:** Colors and metrics reference locked tokens from the theme system, never ad-hoc magic values.

### Section F: Spacing & Typography (Gates 41–47)

- **Gate 41:** All margins, paddings, and dimensions strictly adhere to the 4pt grid (`4, 8, 12, 16, 20, 24, 32, 40, 48, 64`).
- **Gate 42:** Typography uses system-native type scales (SF Pro on iOS, Roboto on Android) or properly loaded custom font families.
- **Gate 43:** Tabular numbers (`fontVariant: ['tabular-nums']` or `tnum`) are enforced for currencies, counters, timers, and metrics.
- **Gate 44:** Text containers never use rigid fixed heights that clip copy under system accessibility font scaling (Dynamic Type).
- **Gate 45:** Heading typography avoids artificial italic slop (`fontStyle: 'italic'` on headers is banned).
- **Gate 46:** Text contrast strictly complies with WCAG AA (minimum 4.5:1 for body copy, 3:1 for large display titles).
- **Gate 47:** Line heights are explicitly proportional to font sizes (typically 1.25× to 1.35× on mobile body copy).

### Section G: States, Skeletons & Resilience (Gates 48–54)

- **Gate 48:** No isolated centered spinners on blank screens. Loading states render structural shimmer skeletons matching real content layout.
- **Gate 49:** Interactive components ship with all 7 mobile states: Default, Pressed, Focused, Disabled, Loading/Skeleton, Error, Success.
- **Gate 50:** Empty states feature purposeful graphic iconography or illustrative context, concise guidance, and a direct primary action button.
- **Gate 51:** Error states provide actionable retry buttons and clear recovery paths, not raw exception strings.
- **Gate 52:** Network mutation buttons display inline loading spinners or disabled states while requests are in-flight to prevent duplicate submissions.
- **Gate 53:** Refreshing data via pull-to-refresh maintains current scroll position and does not jump unexpectedly.
- **Gate 54:** Offline states or network drops are conveyed with a non-blocking toast or banner, preserving existing cached UI.

### Section H: Anti-Slop Integrity & Craft (Gates 55–60)

- **Gate 55:** Banned: Wrapping every list item in an isolated floating card with a blurry black shadow. Use inset grouped lists with hairlines.
- **Gate 56:** Banned: Generic 5-tab bar clone when unnecessary for the app's core user journey.
- **Gate 57:** Banned: Pure harsh `#000000` text on pure `#ffffff` backgrounds or vice versa, except when explicitly targeting OLED dark mode surfaces.
- **Gate 58:** Banned: Web-style scrollbars displayed on mobile list views (`showsVerticalScrollIndicator={false}` unless essential).
- **Gate 59:** Honest copy: No fake fabricated metrics ("10x faster", "trusted by 50,000 teams") unless explicitly supplied in the user's brief.
- **Gate 60:** Token lock: Every color, spacing, radius, and font family must trace back to the established design system tokens.
