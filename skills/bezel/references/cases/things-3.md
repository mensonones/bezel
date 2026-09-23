# Case Study · Things 3 (Cultured Code)

Things 3 by Cultured Code is the undisputed gold standard for tactile interactions, responsive spring physics, and restraint on iOS.

---

## The Core Design DNA

### 1. The "Magic Plus Button"
Instead of a static Floating Action Button (FAB) that only creates items at the top of a list, the Things Plus button can be:
- **Tapped:** Creates a task in the inbox.
- **Dragged:** The button lifts with a heavy haptic tick (`impactAsync(Heavy)`), scales up slightly, and follows the user's thumb. As the user drags it over the list, the list items fluidly separate with spring physics, creating a visual drop slot. Releasing the button drops the task directly at that position.

### 2. The Satisfying Completion Microinteraction
Tapping a todo checkbox does not abruptly vanish the item:
1. Touch-down: Checkbox scales down (`scale: 0.90`) with immediate `impactAsync(Light)`.
2. Touch-up: Checkmark animates with a cheerful spring pop.
3. Pause: The task remains visible for **400ms**, strikes through, and then smoothly collapses height with spring physics (`withSpring(0)`).
*Why it works:* It gives the user's brain time to absorb the chemical dopamine hit of completion before removing the element.

### 3. Pure Inset Grouped Hierarchy
Things 3 completely avoids isolated floating cards. Every view is composed of:
- Clean canvas background.
- Clean typography hierarchy without borders.
- Direct row interactions without decorative box wrappers.

---

## Lessons for Bezel

1. **Delight in completion:** Destructive or completion actions must have a brief visual grace period (300–400ms) with spring confirmation before disappearing.
2. **Gesture continuity:** Gestures should have spatial meaning (dragging a button to position an item).
3. **Restraint over decoration:** Do not decorate what can be understood through typography and white space alone.
