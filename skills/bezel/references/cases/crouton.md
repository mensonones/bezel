# Case Study · Crouton (Apple Design Award Winner · Interaction)

Crouton, created by Devin Davies, won the 2024 Apple Design Award for Interaction because it respects the physical context in which it is used: a messy kitchen with wet, flour-covered hands.

---

## The Core Design DNA

### 1. 1-Meter Glanceable Typography
In cooking mode, Crouton shifts into a full-screen step view where typography is sized (`28pt` to `34pt`) and contrasted so the user can read the instruction while standing a meter away from their countertop.

### 2. Physical Ingredient Ticking
Ingredients are rendered with large touch targets (minimum `56pt` height). Tapping an ingredient:
- Strikes through with a subtle animation.
- Triggers a crisp mechanical haptic tick (`impactAsync(Medium)`).
- Dims the item slightly (`opacity: 0.5`) to keep focus on remaining ingredients.

### 3. Step-by-Step Modal Sheet (`MS07`)
Instead of forcing the user to scroll through a 2,000-word blog post or monolithic webpage, Crouton breaks the process into a **Focused Stepper Sheet**:
- Fixed large "Next Step" button anchored directly above the bottom safe area.
- Progressive disclosure: each step shows only what needs to be done right now.
- Swipe left/right gestures to move between steps effortlessly.

---

## Lessons for Bezel

1. **Context dictates scale:** When an app is used on the go, outdoors, or hands-free, increase typography and touch targets beyond standard desktop proportions.
2. **Step-based flows must reduce cognitive overload:** Implement **`MS07` (Focused Stepper)** for multi-stage tasks.
