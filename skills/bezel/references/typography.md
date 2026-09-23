# Mobile Typography & Font Scaling

Typography on mobile devices must navigate unique physical constraints: screens are small, users operate them outdoors under direct sunlight, and millions of users scale system text sizes for accessibility.

Bezel enforces a strict typographic hierarchy and accessibility discipline.

---

## 1. The Mobile Native Type Scale

Bezel adopts a standardized 4pt-aligned scale rooted in iOS Human Interface Guidelines and Android Material Design:

| Role | Font Size | Line Height | Weight | Tracking / Letter Spacing | Ideal Usage |
|---|---|---|---|---|---|
| **Large Title** | `34pt` | `41pt` | Bold (`700`) | `-0.4pt` | Flagship screen header (MS02 expanded state) |
| **Title 1** | `28pt` | `34pt` | Bold (`700`) | `-0.3pt` | Section hero, sheet modal title |
| **Title 2** | `22pt` | `28pt` | Bold (`700`) | `-0.2pt` | Card cluster title, group header |
| **Title 3** | `20pt` | `25pt` | SemiBold (`600`) | `0pt` | Inner card headline, drawer section |
| **Headline** | `17pt` | `22pt` | SemiBold (`600`) | `-0.2pt` | List item primary text, table row title |
| **Body** | `17pt` | `22pt` | Regular (`400`) | `-0.2pt` | Running prose, paragraphs, descriptions |
| **Callout** | `16pt` | `21pt` | Regular (`400`) | `0pt` | Emphasized inline text, secondary row labels |
| **Subhead** | `15pt` | `20pt` | Regular (`400`) | `0pt` | Secondary metadata, timestamps |
| **Footnote** | `13pt` | `18pt` | Regular (`400`) | `0pt` | Explanatory helper copy under forms |
| **Caption 1** | `12pt` | `16pt` | Regular / Medium | `0pt` | Badges, bottom tab labels, tags |
| **Caption 2** | `11pt` | `13pt` | Regular (`400`) | `0.1pt` | Micro-labels, legal disclaimers |

---

## 2. Dynamic Type & Font Scaling Resilience

Disregarding user text size preferences is a critical AI slop failure mode.

### The Golden Rules:
1. **Never use fixed heights on text containers:** Do NOT write `height: 48` on a button or list row containing text. Use `minHeight: 48` with `paddingVertical: 12`. When the user doubles system text size, the container expands vertically instead of clipping text.
2. **Never truncate critical user numbers:** Amounts, passcodes, and verification codes must not be truncated with ellipses (`...`). Allow them to wrap or use `adjustsFontSizeToFit` with a safe `minimumFontScale: 0.75`.
3. **Line height proportion:** Keep line heights between `1.25×` and `1.35×` of the font size. Anything higher creates detached lines on mobile; anything lower causes ascender/descender collisions.

---

## 3. Tabular Figures (No Jitter)

For any number that updates in real time (clocks, countdown timers, stock tickers, heart rates, audio playback time):

```tsx
// React Native
<Text style={{ fontVariant: ['tabular-nums'] }}>$1,248.50</Text>
```

```swift
// SwiftUI
Text("$1,248.50").monospacedDigit()
```

Without tabular figures, varying numeral glyph widths cause layout jitter (the numbers visibly bounce left and right as digits change).

---

## 4. Anti-Slop Typography Rules

- **No italic headers:** Never emit italic display headings (`fontStyle: 'italic'` on titles). Italic headers are an unmistakable AI tell. Use weight (`Bold` / `Black`) or tint for emphasis.
- **Max 2 font families:** A mobile screen should use at most 2 font families (e.g., an expressive display serif like *New York* for hero titles, and the system sans *SF Pro* / *Roboto* for all UI and body text).
- **No gradient-clipped text:** Banned: headlines with linear gradient text fills (`background-clip: text`). Use solid, high-contrast ink.
