# Mobile Assets, Iconography & Audio-Haptic Pairing

Assets in mobile applications must balance crisp rendering across retina densities (@2x, @3x, xxxhdpi) with accessible touch target hit-boxes.

---

## 1. Iconography Standards

Never use raster PNG or JPEG images for icons. Always use vector glyph libraries that adapt to system tint colors:

| Platform / Framework | Preferred Library | Key Features |
|---|---|---|
| **iOS / SwiftUI** | `SF Symbols 5 & 6` | Native variable fill, hierarchical rendering, built-in symbol bounce animations (`.symbolEffect(.bounce)`). |
| **React Native / Expo** | `lucide-react-native` or `@expo/vector-icons` | Crisp stroke weights (`1.5pt` to `2.0pt`), uniform geometric bounding boxes. |
| **Jetpack Compose** | `Material Symbols Expressive` | Modern rounded stroke terminals, dynamic tinting via `MaterialTheme.colorScheme`. |

---

## 2. Icon Sizing & Hit Targets

The physical icon glyph size is independent of the touch target:

```
┌──────────────────────────────────────────────┐
│  Hit Target: 44 × 44pt (iOS) / 48 × 48dp     │
│                                              │
│        ┌────────────────────────────┐        │
│        │  Icon Glyph: 22 × 22pt     │        │
│        │                            │        │
│        └────────────────────────────┘        │
│                                              │
└──────────────────────────────────────────────┘
```

- **Inline Text Badge:** `14pt`–`16pt` glyph, centered vertically with text baseline.
- **List Item Accessory:** `20pt` glyph, centered inside row.
- **Navigation Bar Button:** `22pt`–`24pt` glyph inside a `minWidth: 44, minHeight: 44` container with `hitSlop: 8`.
- **Floating Action Pill:** `24pt`–`28pt` glyph.
- **Empty State Centerpiece:** `48pt`–`64pt` glyph with subtle background badge container (`surfaceGrouped`).

---

## 3. Audio-Haptic Earcon Pairing (Multi-Sensory Feedback)

World-class mobile craft engages two senses simultaneously: the fingertip (haptics) and the ear (earcons).

A subtle, low-volume acoustic click paired with an instantaneous physical vibration makes screen interactions feel like mechanical physical switches.

### Sensory Pairing Matrix

| User Action | Haptic Pulse | Earcon Acoustic Profile |
|---|---|---|
| **Toggle Switch Flick** | `Selection` | High-pitch mechanical micro-click (5ms duration, ~4kHz) |
| **Pull-to-Refresh Trigger** | `Impact: Medium` | Rubber-band snap / mechanical latch click |
| **Payment / Biometric Success** | `Notification: Success` | Two-tone rising harmonic chime (Apple Pay style) |
| **Card Delete / Trash** | `Impact: Medium` | Soft paper crumple or mechanical slide-down |

*(Note: Audio earcons must always respect the device physical mute switch and user accessibility settings.)*
