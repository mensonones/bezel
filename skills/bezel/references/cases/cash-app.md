# Case Study · Cash App (High-Velocity Financial Craft)

Cash App revolutionized mobile finance by stripping away traditional banking dashboard clutter (no loan carousels, no stock tickers on home, no 5-tab generic bar) in favor of **pure transactional speed**.

---

## The Core Design DNA

### 1. The Full-Screen Mechanical Keypad
The default home screen is not a dashboard; it is a giant interactive cash calculator:
- **Hero Amount:** Huge tabular number display (`64pt` Bold) centered on screen.
- **Dynamic Auto-Scaling:** As the user types more digits (`$1` -> `$10` -> `$1,000` -> `$100,000`), the font size automatically scales down fluidly so numbers never wrap to two lines.
- **Custom Keypad:** Custom `0–9` grid buttons with direct `44×44pt+` hitboxes that trigger instant `selectionAsync` haptics on touch-down.

### 2. High-Stakes Action Friction: "Slide to Confirm"
For irreversible actions like sending money or transferring funds:
- Cash App rejects standard single-tap buttons (which cause accidental transfers).
- It employs a **Physical Swipe Slider**: the user must drag an elevated pill horizontally across the screen track.
- If released early, the pill snaps back with spring physics.
- When reaching the end threshold, it triggers a solid latch haptic (`notificationAsync(Success)`) and locks into place.

---

## Lessons for Bezel

1. **High-velocity flows should prioritize the core action:** If the app is about making payments, placing orders, or recording audio, put the action trigger front and center.
2. **Prevent accidental destructive / monetary errors with physical drag friction:** Implement `A02-slide-to-confirm` for high-consequence user actions.
