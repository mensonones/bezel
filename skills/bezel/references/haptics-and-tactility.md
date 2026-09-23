# Haptics & Tactility Matrix

A mobile app without haptics feels like tapping on inert glass. Haptic feedback bridges the physical and digital worlds, giving digital UI elements tactile weight, confirmation, and mechanical satisfaction.

Bezel enforces an exact sensory mapping for all interactions.

---

## 1. The Haptic Sensory Matrix

| Interaction Type | Recommended Haptic Event | Physical Metaphor |
|---|---|---|
| **Button / Link Tap** | `Impact: Light` | Mechanical keypress / microswitch click |
| **Segmented Switch / Tab Select** | `Selection` | Precision mechanical detent / rotary dial click |
| **Pull-to-Refresh Trigger** | `Impact: Medium` | Rubber band snapping past release threshold |
| **Swipe Action Threshold (Archive/Delete)** | `Impact: Medium` | Latch engagement |
| **List Row Drag & Reorder Lift** | `Impact: Heavy` | Lifting a physical magnetic tile |
| **Form Error / Blocked Action** | `Notification: Error` | Double buzz / obstruction feedback |
| **Action Completion (Saved / Sent)** | `Notification: Success` | Satisfying dual-tick confirmation |
| **Slider Scrubbing / Value Step** | `Selection` (throttled to 60ms) | Ratchet gear click |

---

## 2. Multi-Platform Implementation

### React Native (`expo-haptics`)
```ts
import * as Haptics from 'expo-haptics';

export const TactileFeedback = {
  tap: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  select: () => Haptics.selectionAsync(),
  threshold: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium),
  heavy: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy),
  success: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
};
```

### Jetpack Compose
```kotlin
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback

@Composable
fun rememberTactileFeedback() {
    val haptic = LocalHapticFeedback.current
    return remember {
        object {
            fun tap() = haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
            fun select() = haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
            fun error() = haptic.performHapticFeedback(HapticFeedbackType.LongPress)
        }
    }
}
```

### SwiftUI
```swift
// iOS 17+ SensoryFeedback
Button("Save") {
    saveData()
}
.sensoryFeedback(.impact(weight: .light), trigger: isPressed)
.sensoryFeedback(.success, trigger: isSaved)
```

---

## 3. Rules of Haptic Restraint

1. **Never spam haptics:** During continuous pan or scroll gestures (like scrolling a long list), do NOT trigger haptics on every item passed. Only fire haptics when scrubbing discrete steps or crossing meaningful action thresholds.
2. **Synchronize with touch-down:** Trigger tap haptics immediately on `onPressIn`, not `onPress`. This eliminates perceived input latency.
3. **Respect user system settings:** Native platform APIs automatically honor the user's OS-level haptic preferences; never attempt to bypass or force vibration when the user has disabled system haptics.
4. **Combine with visual scale:** Haptics must never exist in a vacuum. A tactile haptic pulse must always pair with a subtle visual depression (`scale: 0.96` to `0.98`).
