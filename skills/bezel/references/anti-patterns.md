# Mobile Anti-Patterns — The Named Tells

The `bezel audit` verb flags these anti-patterns by name. Every one of these is a dead giveaway of AI-generated mobile code — code written by an LLM treating a touch device like a desktop browser wrapped in a phone frame.

Seeing one is a warning; seeing two in the same screen or component confirms **Mobile AI-Slop**.

---

## 1. The Boxed Viewport (Letterbox Slop)

### The Tell
The screen is rigidly sandwiched between a solid-color status bar at the top and a solid-color navigation bar or home pill background at the bottom. The content stops abruptly at the inset boundaries.

### Why it reads as AI-Slop
Desktop web thinking. Mobile devices are physical slabs of glass where display panels curve around hardware corners, dynamic islands, camera notches, and home indicator bars. True native apps let background colors, maps, imagery, and blur materials bleed all the way to the physical glass edges, applying insets strictly to touch targets and readable text.

### The Fix
- Configure status and navigation bars as transparent / translucent.
- Let root backgrounds and scroll containers flow edge-to-edge (`edges: ['top', 'bottom']`).
- Apply `SafeAreaInsets` (or `WindowInsets.safeDrawing`) exclusively as padding or content insets for interactive elements and typography.

---

## 2. Floating Card Slop (The Universal White Card)

### The Tell
Every list item, setting, or data row is wrapped in an individual white rounded card with a generic blurry black drop shadow (`shadowColor: '#000'`, `shadowOpacity: 0.1`, `shadowRadius: 8`, `elevation: 4`), separated by 12px or 16px vertical margins.

### Why it reads as AI-Slop
Web dashboard templates from 2017. Native mobile screens are narrow (typically 360–430pt wide). Stacking isolated cards with outer horizontal margins wastes 32pt+ of precious horizontal screen estate and creates unnecessary visual clutter ("card fatigue").

### The Fix
- Prefer **Inset Grouped Tables** (like iOS Settings or Apple Health): group related items into a single container with a subtle background surface (`surfaceGrouped`), separated internally by hairline dividers (`StyleSheet.hairlineWidth` or `0.5dp`).
- Use tonal separation or surface elevation levels instead of artificial blurry shadows.
- Reserve standalone cards for distinct, hero-level preview units (e.g., boarding passes, media players), never for standard repetitive lists.

---

## 3. The Naked Centered Spinner

### The Tell
When fetching or loading data, the screen renders an empty white or dark view with an isolated, centered `ActivityIndicator` (React Native) or `CircularProgressIndicator` (Compose) spinning in the void.

### Why it reads as AI-Slop
Lazy state handling. Centered spinners cause an abrupt content pop when data arrives, forcing the user's eyes to readjust to sudden layout shifts (high CLS on mobile).

### The Fix
- Implement **Structural Skeleton Loaders** that accurately mimic the geometry, typography line heights, and padding of the incoming content.
- Use a subtle shimmer wave or low-contrast opacity pulse.
- When background refetching occurs, maintain the existing UI and show a non-intrusive indicator (such as a slim status bar pulse or pull-to-refresh spinner).

---

## 4. Keyboard Blindness

### The Tell
Text inputs placed in the lower half of the screen get completely covered by the software keyboard when focused. The user types blindly, cannot see submit buttons, or cannot dismiss the keyboard without tapping an unrelated button.

### Why it reads as AI-Slop
LLMs lack physical bodies; they don't test on real touchscreens where the virtual keyboard consumes 40% to 55% of the screen height.

### The Fix
- Wrap forms in `KeyboardAvoidingView` with correct `behavior={Platform.OS === 'ios' ? 'padding' : undefined}` or Jetpack Compose's `imePadding()`.
- Enable keyboard dismissal on scroll: `keyboardDismissMode="on-drag"` or `keyboardShouldPersistTaps="handled"`.
- Dock primary action buttons directly above the keyboard tray (`KeyboardToolbar` / sticky accessory view) during active input.

---

## 5. Frozen Touch & Missing Tactility

### The Tell
Buttons and list items that either have zero feedback when touched, or use default `TouchableOpacity` that suddenly flashes down to `opacity: 0.2` like a broken lightbulb. No micro-scale, no spring physics, and zero haptic pulses.

### Why it reads as AI-Slop
Touchscreens lack physical tactile switches. Without subtle physical feedback, the interface feels dead, unresponsive, and synthetic.

### The Fix
- Every pressable element must implement a **tactile spring transform**: scale down slightly on press (`scale: 0.96` to `0.98`) using spring physics (stiffness ~300, damping ~20).
- Trigger native haptic feedback on touch:
  - Button tap: `Haptics.impactAsync(ImpactFeedbackStyle.Light)`.
  - Toggle / segmented switch: `Haptics.selectionAsync()`.
  - Destructive / error: `Haptics.notificationAsync(NotificationFeedbackType.Error)`.

---

## 6. Inline Style Spaghetti & Bridge Churn

### The Tell
```tsx
// React Native Anti-Pattern
<View style={{ flex: 1, padding: 16, backgroundColor: isDark ? '#121212' : '#ffffff' }}>
  <TouchableOpacity onPress={() => handleSelect(item.id)} style={{ flexDirection: 'row', alignItems: 'center' }}>
```
Inline object literals inside JSX props, anonymous arrow functions in render props or list items, and recalculating layout geometry on every render pass.

### Why it reads as AI-Slop
The LLM writes React Native like quick JSX web snippets. In mobile engines (Hermes, JavaScriptCore, or Compose recomposition), creating new object references on every 60/120fps frame destroys garbage collection pauses and causes dropped frames.

### The Fix
- In React Native: Always use `StyleSheet.create` for static styles, or memoized theme hooks. Extract callbacks with `useCallback` when passed to child components or list items.
- In Compose: Hoist state, use `remember` for calculations, and avoid unstable lambdas inside `@Composable` loops.

---

## 7. The Rigid Non-Gesture Modal

### The Tell
A modal screen or overlay that appears abruptly with a basic fade-in or slide-up, featuring an "X" button in the corner, but cannot be swiped or dragged down to dismiss.

### Why it reads as AI-Slop
Desktop modal dialog pattern. On mobile, natural ergonomics dictate that one-handed users swipe down with their thumb to dismiss sheets.

### The Fix
- Use **Detent Bottom Sheets** with a subtle grab handle pill at the top.
- Wire gesture responders with velocity-aware dismiss thresholds: if dragged down past 25% or swiped with velocity > 500pt/s, animate smoothly to dismiss; otherwise, spring back to open detent.

---

## 8. Arbitrary & Web-Scale Spacing

### The Tell
Margins and paddings like `15px`, `18px`, `22px`, `35px`, or massive desktop-scale margins (`paddingHorizontal: 48`).

### Why it reads as AI-Slop
Ignoring the universal physical 4pt / 8pt grid system. Mobile screens have subpixel rendering and display densities (@2x, @3x, mdpi, xxhdpi). Arbitrary odd numbers cause half-pixel blur and visual misalignment.

### The Fix
- Strict adherence to the 4pt grid: `4`, `8`, `12`, `16`, `20`, `24`, `32`, `40`, `48`, `64`.
- Standard mobile screen horizontal gutter is `16pt` (compact) or `20pt` (large phones/tablets). Never blow past 24pt for standard content padding.

---

## 9. Dynamic Type Text Clipping

### The Tell
Headers, buttons, or list rows with fixed pixel heights (e.g. `height: 44`, `height: 48`) with text set to `numberOfLines={1}` without minimum scale factors or wrapping fallback. When users increase system accessibility font sizes, the text is truncated into `Sav...` or overflows out of its container.

### Why it reads as AI-Slop
Disregard for mobile accessibility. Millions of users increase system font sizes via iOS Dynamic Type or Android Display Scaling.

### The Fix
- Avoid hardcoded heights on containers containing text; use `minHeight` with vertical padding.
- Test text scaling resilience. If text must remain one line, provide `adjustsFontSizeToFit` with a reasonable `minimumFontScale` (e.g., 0.8), or allow multi-line wrap with flexible layout.

---

## 10. The Generic 5-Tab Hallucination

### The Tell
Creating a bottom tab bar with 5 generic icons: Home, Search, Plus/Add, Notifications/Heart, Profile, regardless of what the application actually does.

### Why it reads as AI-Slop
Defaulting to an Instagram/Twitter clone archetype instead of understanding the specific problem space.

### The Fix
- Only use bottom tabs if the app has 3 to 5 distinct top-level operational domains.
- If the workflow is tool-driven, single-task, or canvas-based, use a floating command capsule, contextual bottom sheet, or single-view hierarchy.

---

## 11. Fake Drawn Mobile Chrome

### The Tell
Rendering a fake battery icon, fake Wi-Fi bars, or a mock notch/dynamic island directly in CSS/JSX code inside the screen.

### Why it reads as AI-Slop
The target device already has an actual hardware notch, camera hole, and operating system status bar. Drawing a fake one creates a redundant double-notch nightmare.

### The Fix
- Never draw fake hardware frames or OS indicators unless explicitly building a design-system documentation mockup site for web preview.
- In production mobile code, leverage the real system status bar via platform APIs (`StatusBar` / `SystemBars`).
