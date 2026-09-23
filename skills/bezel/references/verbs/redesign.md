# Verb · `bezel redesign`

The `bezel redesign` verb elevates an existing mobile screen or component to world-class native craft.

**Implementation Safety Rail:**
- **Preserve Business Logic:** Never destroy existing state hooks, queries, mutations, navigation routes, tracking events, or business rules.
- **In-Place Transformation:** Redesign the visual and tactile presentation layer while keeping component interfaces intact.
- **Stamp Pre-Emit Critique:** The refactored file must be stamped with the 6-axis score comment at the very top.

---

## Redesign Execution Workflow

1. **Scan & Preserve:** Identify all existing state variables (`useState`, `useQuery`), navigation props, and callbacks.
2. **Select Archetype:** Match the screen's core purpose to one of the 10 Mobile Screen Macrostructures (MS01–MS10).
3. **Edge-to-Edge Reconstruction:**
   - Strip solid letterbox boundaries.
   - Let backgrounds bleed behind status bars.
   - Apply `useSafeAreaInsets()` strictly to content and floating chrome.
4. **Tactile Elevation:**
   - Convert standard buttons to spring-scaling `TactilePressable` instances.
   - Attach light/selection haptic feedback.
5. **Anti-Card Refactor:**
   - Dismantle isolated floating card clutter into an Inset Grouped Table or hairline-separated stream.
6. **Performance Lockdown:**
   - Hoist all styles into `StyleSheet.create`.
   - Wrap row handlers in `useCallback`.
7. **Replace Spinners:**
   - Swap naked centered spinners for structural layout-matching skeletons.
