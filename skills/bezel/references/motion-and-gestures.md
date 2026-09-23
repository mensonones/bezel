# Motion, Physics & Gestures in Mobile

Mobile interfaces are touched directly with human fingers. Because physical objects in the real world have mass, inertia, and momentum, artificial linear easing (`cubic-bezier`, `ease-in-out`, or fixed durations) feels synthetic and lifeless on a touchscreen.

Bezel enforces **Physics-Based Spring Motion**, **Inertial Projection**, **Rubber-Banding**, and **Interruptible Gestures**.

---

## 1. Dual Spring Parameterization

Bezel supports two parameter models for springs:

### A. Perceptual Model (Apple HIG / Emil Kowalski)
Best for visual tuning; intuitive to reason about:
- **`duration` (seconds):** Total perceptual settle time (typically `0.3s` to `0.5s`).
- **`bounce` (-1.0 to 1.0):**
  - `bounce: 0` = Critically damped (no overshoot, smooth settle).
  - `bounce: 0.15` to `0.25` = Subtle native bounce (recommended for interactive gestures).
  - `bounce: 0.4+` = Playful, rubbery (for celebrations and game-like UIs).

```ts
// Reanimated 3 Perceptual Spring
translateY.value = withSpring(target, { duration: 400, bounce: 0.2 });
```

### B. Physical Model (Mechanical Springs)

| Preset Name | Physics Config (RN Reanimated) | Ideal Use Case | Vibe |
|---|---|---|---|
| **Tactile Press** | `{ damping: 15, stiffness: 300, mass: 0.8 }` | Button press-down/up, chips, switches, icons | Snappy, bouncy, direct |
| **Sheet Snap** | `{ damping: 22, stiffness: 220, mass: 1.0 }` | Bottom sheets, drawers, modal cards | Fluid, responsive, weighty |
| **Morph / Hero** | `{ damping: 28, stiffness: 180, mass: 1.0 }` | Shared element transitions, card expansion | Elegant, smooth, graceful |
| **Micro-Wiggle** | `{ damping: 10, stiffness: 400, mass: 0.6 }` | Form input error shake, invalid passcode | Alerting, crisp, energetic |

---

## 2. Inertial Projection (Flick & Release)

Never evaluate gesture release solely on finger coordinate. A user flicking a bottom sheet downward with high velocity expects it to dismiss, even if their finger only traveled 20pt.

### The Inertial Projection Formula

$$\text{projectedOffset} = \text{currentOffset} + \frac{\text{velocity}}{1 - d}$$

*(where $d$ is deceleration rate, typically $0.997$ on mobile).*

```ts
'worklet';
export function calculateInertialTarget(
  currentOffset: number,
  velocity: number,
  snapPoints: number[]
): number {
  // Project where the gesture would naturally stop under friction
  const projected = currentOffset + velocity * 0.2; // 200ms projection horizon

  // Find nearest snap point to projected destination
  let closest = snapPoints[0];
  let minDiff = Math.abs(projected - closest);

  for (let i = 1; i < snapPoints.length; i++) {
    const diff = Math.abs(projected - snapPoints[i]);
    if (diff < minDiff) {
      minDiff = diff;
      closest = snapPoints[i];
    }
  }
  return closest;
}
```

---

## 3. Rubber-Banding Physics (Logarithmic Resistance)

When a user pulls an element past its boundary (overscrolling a list, overdragging a bottom sheet upward), the element must not hit a brick wall. It must stretch with **exponentially increasing resistance**.

### The Apple Rubber-Band Formula

$$f(x) = \frac{x \cdot d \cdot c}{d + c \cdot x}$$

- $x$: The raw finger displacement past boundary.
- $d$: Screen dimension (height or width).
- $c$: Elasticity coefficient (standard: `0.55`).

```ts
'worklet';
export function applyRubberBand(
  offset: number,
  limit: number,
  dimension: number = 800
): number {
  const overdrag = offset - limit;
  if (overdrag <= 0) return offset;

  const c = 0.55;
  const rubberBanded = (overdrag * dimension * c) / (dimension + c * overdrag);
  return limit + rubberBanded;
}
```

---

## 4. Velocity-Aware Drag-to-Dismiss Protocol

When a user drags a sheet, modal, or floating card:
1. **While Dragging:** Apply `applyRubberBand` if dragged upward past maximum expansion detent.
2. **On Release (`onEnd`):** Calculate `calculateInertialTarget` passing `event.velocityY`.
3. If projected target crosses the dismiss threshold (or `velocityY > 600pt/s`), animate to dismiss with `withSpring(DISMISS_POINT, { velocity: event.velocityY })`.
4. If not dismissed, snap back to active detent with momentum.

---

## 5. Interruptibility & Frame Budget

- Gestures must be **100% interruptible**: touching a moving element mid-spring captures its current position and momentum instantly.
- Handlers run as **Reanimated worklets** directly on the UI thread to guarantee 120Hz frame pacing without JS bridge latency.
