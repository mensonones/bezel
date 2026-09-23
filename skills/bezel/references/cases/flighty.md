# Case Study · Flighty (Apple Design Award Winner)

Flighty is universally considered a masterclass in mobile information density, OLED dark mode craft, and ambient background state tracking.

---

## The Core Design DNA

### 1. Zero "Card Slop" in High-Density Views
Instead of wrapping every flight segment, delay, and gate in isolated rounded cards with blurry drop shadows, Flighty uses a **single continuous inset grouped surface** with subtle hairline dividers (`0.5pt`). This preserves horizontal space on narrow screens and prevents visual fatigue.

### 2. Tabular Numbers Everywhere
Flight delays, countdown timers, altitude, air speed, and gate departure times use strictly monospaced figures (`tabular-nums`):
```tsx
// React Native
<Text style={{ fontVariant: ['tabular-nums'] }}>02h 44m</Text>
```
As countdown seconds tick down in the Live Activity or screen header, the typography never jitters or horizontally shakes adjacent text.

### 3. OLED True Black Canvas
The root canvas is pure `#000000`. Flighty pairs this with a muted graphite grouped surface (`#121214`) and an unmistakable semantic color hierarchy:
- **On Time:** Vibrant Emerald Green (`#30D158`)
- **Warning / Delay:** Radioactive Amber (`#FFD60A`)
- **Cancelled / Critical:** Alert Red (`#FF453A`)

### 4. Background State Supremacy (Live Activities & Dynamic Island)
Flighty was one of the first apps to master Live Activities:
- **Dynamic Island Compact:** Left: `[ ✈️ FL-412 ]` · Right: `[ 0h 42m ]`
- **Dynamic Island Expanded:** Real-time flight progress bar, departure gate, baggage carousel indicator.
- **Lock Screen Activity:** Full flight itinerary that updates over satellite or Wi-Fi without opening the app.

---

## Lessons for Bezel

1. When building travel, logistics, or real-time tracking screens, route to **`MS02` (Dynamic Collapsing Header)** or **`MS10` (Metric Specimen Deck)**.
2. Forbid floating cards for dense timeline data; use hairline-separated stream rows.
3. Every dynamic timestamp or metric must enforce `tabular-nums`.
