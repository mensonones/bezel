# Verb · `bezel audit`

The `bezel audit` verb scans an existing mobile screen, component, or codebase and evaluates it ruthlessly against the Bezel standard.

**Rules of Engagement:**
- **Read-only:** Do NOT modify the target file during an audit unless the user explicitly requests immediate application of the fixes.
- **Ruthless precision:** Call out exact anti-patterns by their named tells.
- **Reference quality gates:** Cite the specific failing Bezel Quality Gates (1–60).

---

## Audit Output Structure

Every `bezel audit` response must follow this structured template:

```markdown
# Bezel Audit · [Target Component / File]

### Pre-Emit Score: T[1-5] B[1-5] P[1-5] H[1-5] G[1-5] R[1-5] (Overall: [Pass/Fail])

---

## 🚨 Critical Mobile Slop Detected
- **[Anti-Pattern Name]** (Line XX): Brief explanation of why this violates mobile native standards.
- **Failing Gates:** Gate X, Gate Y.
- **Code Tell:**
  ```tsx
  // Offending snippet
  ```

---

## ⚠️ Performance & Ergonomics Warnings
- Inefficient re-renders, inline style objects, touch targets smaller than 44x44pt, missing haptics.

---

## 🛠 Recommended Native Punch List
1. Replace floating card containers with an Inset Grouped Table (MS04).
2. Wire `useSafeAreaInsets()` to content insets instead of boxing root view.
3. Migrate `TouchableOpacity` to `TactilePressable` with `Haptics.impactAsync(Light)` and spring scale.
4. Replace centered `ActivityIndicator` with structural shimmer skeleton (C09).
```
