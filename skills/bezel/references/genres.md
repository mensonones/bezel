# The 4 Mobile Genres

Every mobile application serves a distinct human context. An AI coding assistant that treats a high-frequency trading tool the same as a boutique reading app or a meditation tracker emits generic slop.

Bezel classifies all mobile briefs into **4 Mobile Genres**. The genre dictates spatial density, typographic character, surface depth, and tactile intensity.

```
┌──────────────────────────────────────────────────────────────────┐
│ G1 · Tactile Utility / Tool      G3 · Atmospheric / Media        │
│ G2 · Editorial / Journal         G4 · Expressive & Joyful        │
└──────────────────────────────────────────────────────────────────┘
```

---

## G1 · Tactile Utility / Tool
- **Vibe:** Precision, mechanical confidence, rapid execution, zero fluff.
- **Reference Apps:** Linear Mobile, Things 3, Raycast Companion, Flighty, Apple Calculator.
- **Spatial Density:** **High.** Compact row heights (`44pt` to `48pt`), minimal empty margins (`12pt` to `16pt`), high information density per screen inch.
- **Surfaces:** Pure OLED black canvas (`#000000`), dark graphite grouped containers (`#1C1C1E`), crisp `0.5pt` hairline borders (`borderSubtle`).
- **Typography:** Strict System Sans (`SF Pro` / `Roboto`). Heavy use of tabular figures (`tabular-nums`) for coordinates, timers, and metrics.
- **Tactility & Physics:** Ultra-snappy, tight springs (`stiffness: 350`, `damping: 18`). Mechanical, discrete haptics (`Selection` on pickers, `Light` impact on button presses).
- **Default Themes:** *Obsidian Pro*, *Cyberpunk Amber*, *Swiss Neo-Grotesk*.

---

## G2 · Editorial / Journal
- **Vibe:** Thoughtful, calm, literate, timeless print craftsmanship.
- **Reference Apps:** Apple Books, Substack, Kinfolk, Readwise Reader, NYT.
- **Spatial Density:** **Generous.** Open line heights (1.4× to 1.5×), generous paragraph spacing, breathing margins (`20pt` to `24pt`), calm status bars.
- **Surfaces:** Warm paper canvases (`#FBF9F5` light, `#141312` dark), subtle linen textures, zero drop shadows.
- **Typography:** High-contrast display serif for titles (*New York*, *Fraunces*, *Charter*) paired with a readable modern sans or book serif for prose.
- **Tactility & Physics:** Gentle, fluid springs (`stiffness: 160`, `damping: 26`). Soft page-turn gesture tracking, quiet haptic taps.
- **Default Themes:** *Paper & Serif*, *Nordic Pine*.

---

## G3 · Atmospheric / Media
- **Vibe:** Cinematic, sensory immersion, late-night focus, visceral depth.
- **Reference Apps:** Spotify, Apple Music, Arc Search, Luma, Netflix, VSCO.
- **Spatial Density:** **Dynamic.** Fluid alternation between massive full-bleed media heroes and compact horizontal scrubbing rails.
- **Surfaces:** Dark canvases with subtle colored ambient halos, **Liquid Glass** translucent overlays (`BlurView` with 80% intensity), hairlineWidth borders with specular gradients.
- **Typography:** Bold geometric display sans, tightly tracked display headlines (`-0.4pt` letter spacing), muted secondary metadata.
- **Tactility & Physics:** Fluid momentum springs (`stiffness: 200`, `damping: 22`). Interactive gestures for media scrubs, swipe-down dismissals.
- **Default Themes:** *Midnight Aurora*, *Cupertino Titanium*.

---

## G4 · Expressive & Joyful
- **Vibe:** Friendly, encouraging, vibrant, energetic, game-like satisfaction.
- **Reference Apps:** Cash App, Duolingo, Family, Headspace, Zenly.
- **Spatial Density:** **Comfortable.** Chunky touch targets (min `52pt` height), friendly rounded corners (`radii: 16pt` to `24pt`), expressive iconography.
- **Surfaces:** Vibrant colored backgrounds, high-contrast surface islands, cheerful micro-badges.
- **Typography:** Rounded sans display faces (*SF Pro Rounded*, *Nunito*, *Fredoka*) with punchy weights (`Bold` / `Black`).
- **Tactility & Physics:** Bouncy, high-rebound springs (`stiffness: 280`, `damping: 12`). Rewarding celebrations on success (`NotificationSuccess` double-buzz with confetti or checkmark scale pop).
- **Default Themes:** *Terracotta Clay*, custom vibrant brand palettes.
