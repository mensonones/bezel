# The Bezel Benchmark · Slop vs. Craft

> **"How do you prove that Bezel eliminates mobile AI-slop?"**
> By taking the exact same prompt, generating code with a standard AI vs Bezel, and measuring them side-by-side across performance, physics, and quality gates.

---

## The Shootout: Same Prompt

```text
"Build a mobile money transfer screen with recipient selection,
amount entry, and transfer confirmation."
```

---

## 1. The Metric Scorecard

| Evaluation Metric | Default LLM Output (Mobile Slop) ❌ | Bezel Output (Craft Standard) ✨ |
|---|---|---|
| **Pre-Emit Critique Score** | `T1 B2 P1 H2 G5 R2` **(FAIL)** | `T5 B5 P5 H5 G5 R5` **(100% PASS)** |
| **Quality Gates Compliance** | **8 / 60** Passed (52 Violations) | **60 / 60** Passed (0 Violations) |
| **Inline Style Allocations** | **18 inline style objects** (`style={{ ... }}`) | **Zero inline styles** (`StyleSheet.create`) |
| **120Hz GC Pressure** | High garbage collection allocations per gesture | Zero re-render churn (UI-thread worklets) |
| **Edge-to-Edge & Insets** | Hardcoded `paddingTop: 45` (Letterboxed) | Dynamic `useSafeAreaInsets` (Glass bleed) |
| **Touch Feedback** | Flat `TouchableOpacity` (opacity 0.2, dead) | Spring scale (`0.96`) + instant Light haptics |
| **Surface Architecture** | 4 isolated white cards with black blur shadows | Inset Grouped Table (`12pt` radius, `0.5pt` hairline) |
| **Number Jitter** | Proportional font (numbers bounce as typed) | Tabular figures (`tabular-nums`) |
| **High-Stakes Friction** | Single blue tap button (accidental transfers) | **`A02 · Slide to Confirm`** with haptic lock |
| **Loading State** | Naked `ActivityIndicator` centered in void | Structural layout-matching shimmer skeleton |
| **Microcopy** | *"Oops! Something went wrong. Click here"* | *"Transfer Funds · Instant Zero-Fee Settlement"* |

---

## 2. Automated Proof (Run it Yourself)

Bezel includes an automated static analysis auditor (`scripts/audit-slop.js`) that scans mobile files against the 60 Quality Gates.

### Test the Slop Version:
```bash
npm run audit ./example/slop-transfer.tsx
```
**Output:**
```text
======================================================
 BEZEL SLOP AUDITOR · slop-transfer.tsx
======================================================

Pre-Emit Critique Score: T1 B2 P1 H2 G5 R2
Result: ✖ FAILED (MOBILE AI-SLOP DETECTED)

Found 6 violation(s) against Bezel Quality Gates:
1. [CRITICAL] Inline Style Spaghetti Detected (Gate 33)
2. [WARNING] Floating Card Fatigue Detected (Gate 55)
3. [CRITICAL] Boxed Viewport / Hardcoded Top Inset (Gate 1 & 3)
4. [CRITICAL] Frozen Touch / Missing Haptics (Gate 19 & 21)
5. [WARNING] The Naked Centered Spinner (Gate 48)
6. [WARNING] Slop Microcopy Detected (Gate 59)
```

### Test the Bezel Version:
```bash
npm run audit ./example/bezel-transfer.tsx
```
**Output:**
```text
======================================================
 BEZEL SLOP AUDITOR · bezel-transfer.tsx
======================================================

Pre-Emit Critique Score: T5 B5 P5 H5 G5 R5
Result: ✔ PASSED BEZEL CRAFT STANDARD

✨ Zero AI-slop detected! Code is production-ready, performant, and tactile.
```

---

## 3. Physical & Interactive Proof (Touch It on Your Phone)

You can run the interactive comparison app on your own device via Expo:

```bash
cd example
npm install
npm start
```

Scan the QR code with **Expo Go** (iOS or Android):
- Tap the top floating switcher to toggle between **AI-Slop Mode** and **Bezel Craft**.
- Feel the difference in:
  - Finger scale depression on contact rows.
  - The mechanical resistance and haptic lock of `Slide to Confirm`.
  - Seamless edge-to-edge status bar bleed vs rigid letterboxing.
