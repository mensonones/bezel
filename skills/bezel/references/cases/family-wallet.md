# Case Study · Family Wallet (Playful Tactile Craft)

Family Wallet gained widespread acclaim in the mobile design engineering community for demonstrating that technical tools (crypto, finance, security) can feel delightful, physical, and joyful rather than cold and intimidating.

---

## The Core Design DNA

### 1. Custom Rubber-Banding Everywhere
When pulling down on lists or dragging card carousels, Family does not use rigid limits. It implements **logarithmic rubber-banding resistance** that feels like stretching an elastic band. Releasing the drag produces a natural spring bounce.

### 2. Multi-Sensory Audio-Haptic Earcons
Every key interaction is accompanied by a paired sensory signal:
- Unlocking the wallet: Subtle mechanical latch click sound + medium haptic tick.
- Sending a transaction: Rising celebratory sound chime + success double-haptic vibration.
- Dragging a card: Subtle micro-friction ticks as the card tilts in 3D space.

### 3. Layered Surface Depth & Soft Radii
- Friendly, pillowed corner radii (`16pt` to `24pt`).
- Surface cards elevate with subtle colored specular borders that react to device tilt (gyroscope).
- Joyful empty states featuring interactive illustrations that react to finger touch.

---

## Lessons for Bezel

1. **Craft transforms utility into delight:** Don't settle for static utility; make interfaces respond to finger pressure, velocity, and releases.
2. **Synchronize earcons with haptics:** Combine subtle acoustic feedback with haptic impulses for premium native polish. See [`references/assets.md`](../assets.md).
