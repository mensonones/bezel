# Performance & 120Hz ProMotion Engineering

Modern mobile devices feature variable refresh rate displays up to **120Hz** (Apple ProMotion, Android Smooth Display). At 120Hz, each frame must compute, render, and paint in under **8.33 milliseconds**.

A dropped frame breaks the physical illusion of touch. Bezel enforces strict performance rules across the modern mobile stack.

---

## 1. The 120Hz Frame Budget

```
┌────────────────────────────────────────────────────────┐
│  120Hz Display Budget: 8.33ms per frame               │
│                                                        │
│  [ Touch Event: < 2ms ] → [ Gesture Worklet: < 3ms ]   │
│  → [ GPU Paint: < 3ms ]  =  FLUID 120 FPS              │
└────────────────────────────────────────────────────────┘
```

If the JavaScript thread blocks or garbage collection pauses for more than 16ms, the app visibly hitches and drops frames.

---

## 2. React Native New Architecture (Fabric & Bridgeless)

### Zero Bridge Serialization
In React Native's New Architecture (Fabric + TurboModules + Bridgeless):
- Native and JavaScript communicate via direct JSI (JavaScript Interface) memory pointers, eliminating asynchronous JSON bridge bottlenecks.
- **Rule:** Never calculate gesture-driven animation frames on the JS thread. Always use Reanimated worklets (`'worklet'`) that execute directly on the UI/Render thread.

### Garbage Collection Discipline
Creating object literals inside JSX allocations triggers V8/Hermes GC passes during high-velocity gestures:
```tsx
// ❌ SLOP: New object allocation on every 60/120Hz frame
<View style={{ padding: 16, transform: [{ scale: currentScale }] }} />

// ✅ BEZEL: Hoisted static style + UI-thread animated style
<Animated.View style={[styles.staticContainer, animatedStyle]} />
```

---

## 3. Jetpack Compose: Strong Skipping Mode

### Recomposition Hygiene
In Jetpack Compose, recomposing unnecessary views during scroll or animation creates micro-stutters:
1. **Strong Skipping Mode:** Enabled by default in Compose 1.7+.
2. **Immutable Data Contracts:** Annotate feed item models with `@Immutable` or `@Stable` so Compose can reliably skip unchanged items:
   ```kotlin
   @Immutable
   data class FlightItem(
       val id: String,
       val flightNumber: String,
       val gate: String
   )
   ```
3. **`derivedStateOf` for Scroll Calculations:** Never read raw scroll offsets directly in composable bodies without wrapping in `derivedStateOf`, which throttles recompositions to actual threshold crossings.

---

## 4. SwiftUI: The `@Observable` Revolution

In iOS 17+, Apple introduced the Swift Observation framework:
- **Rule:** Replace legacy `ObservableObject` and `@ObservedObject` with the `@Observable` macro.
- **Why it matters:** Legacy `ObservableObject` triggers view re-renders whenever *any* `@Published` property changes, causing massive redraw cascades across view trees. The `@Observable` macro tracks property access at the field level, re-evaluating only views that read the specific mutated property.

```swift
// ✅ BEZEL (iOS 17+)
@Observable
final class WalletViewModel {
    var balance: Double = 1250.00
    var isRefreshing: Boolean = false
}
```
