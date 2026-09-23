# Verb · `bezel study`

The `bezel study` verb deconstructs a screenshot of a world-class mobile app to extract its architectural and design DNA.

**Core Principle:**
> Do NOT blindly copy pixels or graphic assets. Extract the underlying engineering principles, spatial hierarchy, and interaction models.

---

## Mobile DNA Deconstruction Protocol

When provided with a mobile screenshot or design reference, Bezel analyzes six layers:

### 1. Macrostructure & Viewport Flow
- Which of the 10 Mobile Screen Macrostructures (MS01–MS10) does this screen instantiate?
- How does the screen interact with the top status bar and bottom home indicator? (Bleed vs sticky vs floating).

### 2. Surface & Containment Strategy
- How is content separated?
  - Inset grouped containers?
  - Hairline dividers (`0.5pt`)?
  - Negative space / typography rhythm?
  - Native blur materials (`ultraThinMaterial`)?
- Note: If floating cards with heavy blur shadows are used, evaluate whether they are justified or slip into card fatigue.

### 3. Touch Ergonomics & Thumb Zone
- Where are the primary interactive triggers located?
- What are the estimated hit targets (ensuring ≥ 44×44pt)?
- Are destructive actions safely partitioned?

### 4. Typographic DNA
- Primary font role (System Sans vs Display Serif vs Monospace).
- Hierarchy and contrast between Title, Headline, Body, and Caption.
- Use of tabular figures for numbers.

### 5. Motion & Tactile Opportunities
- Where should spring physics apply? (Sheet drag detents, button depressions, segmented thumb slider).
- Where should native haptic feedback be wired? (Selection ticks, impact clicks, notification buzzes).

### 6. Framework Architecture Blueprint
Provide a clean architecture skeleton showing how to build this cleanly in the target mobile framework (React Native / Compose / SwiftUI), with locked design tokens and proper component modularity.
