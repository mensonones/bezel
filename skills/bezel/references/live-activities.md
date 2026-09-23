# Live Activities, Dynamic Island & Glanceable States

In modern mobile design (iOS 16.1+ / Android 14+), the application boundary extends beyond the foreground viewport. Ongoing tasks — rides, deliveries, timers, audio playback, file uploads, and checkout processes — live continuously in the **Dynamic Island**, **Lock Screen**, and **Status Glanceables**.

---

## 1. The 4 Dynamic Island Presentation States

```
1. Compact Leading & Trailing (Status Pill)
┌────────────────────────────────────────────────────────┐
│   [ ✈️ FL-412 ]                   [ 0h 42m remaining ]  │
└────────────────────────────────────────────────────────┘

2. Minimal State (Competing Activities)
┌───────────────────────────┐
│          [ ✈️ ]           │
└───────────────────────────┘

3. Expanded State (Long-press overlay)
┌────────────────────────────────────────────────────────┐
│  ✈️ Flight AA-1284 · On Time                           │
│  SFO ────────────── ✈ ────────────── JFK               │
│  Departed 14:10                      Gate 42 · In 42m  │
│                                                        │
│  [ Boarding Pass ]              [ View Live Map ]      │
└────────────────────────────────────────────────────────┘

4. Lock Screen Activity Card (Bottom Tray)
Full-width inset grouped surface with live progress bar and status.
```

---

## 2. Design Rules for Live Activities

1. **Tabular Numerals Always:** Timers, miles, flight minutes, and price counters MUST use `tabular-nums` / `.monospacedDigit()` so digits update without horizontal jitter.
2. **Glanceable Hierarchy:**
   - Leading: A recognizable glyph or badge (Airplane, Delivery scooter, Stopwatch).
   - Trailing: The single critical metric (Time remaining, distance, or percentage).
3. **Deep Linking:** Every touch on a Live Activity or Island must deep-link directly to the specific active sub-route in the app (e.g. `myapp://trip/412`), never the generic home screen.
4. **Graceful Completion State:** When an event finishes (e.g., "Order Delivered"), show a clear green success checkmark and auto-dismiss after 4–5 seconds. Never leave stale or frozen widgets lingering.
5. **Dark Canvas Contrast:** Dynamic Island hardware cutout is physical black (`#000000`). All Island backgrounds must seamlessly match pure OLED black with high-contrast text (`#FFFFFF`) and vibrant accent indicators.
