# The Combinatorial Engine & Project Memory

The primary cause of AI-slop repetition is **amnesia**. An LLM generating 5 screens for the same app treats each screen as an isolated universe, invariably defaulting to the same centered layout, the same 3 cards, and the same primary button.

Bezel solves this via **Project Memory** stored in `.bezel/log.json`.

---

## 1. Project Memory (`.bezel/log.json`)

When running in full Screen-scope (not single components), Bezel checks for `.bezel/log.json` at the project root. If missing, it creates the directory and file automatically.

### Memory Schema

```json
{
  "project": "FlightDesk",
  "locked_genre": "tactile-utility",
  "locked_theme": "obsidian-pro",
  "history": [
    {
      "timestamp": "2026-09-23T11:45:00Z",
      "screen": "FlightOverviewScreen",
      "genre": "tactile-utility",
      "theme": "obsidian-pro",
      "macrostructure": "MS02",
      "archetype_name": "Dynamic Collapsing Large Title",
      "interaction_model": "scroll-driven-collapse"
    },
    {
      "timestamp": "2026-09-23T12:05:00Z",
      "screen": "SeatMapSelector",
      "genre": "tactile-utility",
      "theme": "obsidian-pro",
      "macrostructure": "MS01",
      "archetype_name": "Sheet-Anchored Canvas",
      "interaction_model": "snap-detent-bottom-sheet"
    }
  ]
}
```

---

## 2. The Diversification Rule

When generating a new screen for an existing project:

1. **Read History:** Inspect the last 3 entries in `.bezel/log.json`.
2. **Exclude Recent Macrostructures:** The newly generated screen **CANNOT** use the macrostructure of the immediately preceding screen. If Screen A used `MS02` (Collapsing Header), Screen B must route to `MS01`, `MS04`, `MS05`, or another distinct archetype.
3. **Theme Coherence:**
   - If a `design.md` exists or `locked_theme` is recorded in `.bezel/log.json`, the new screen **MUST** consume those exact tokens, maintaining brand consistency across the entire app.
   - If the project is still in exploratory phase (no locked theme), rotate themes within the established genre.
4. **Append Entry:** After emitting the code, silently append the new screen's record to `.bezel/log.json`.

---

## 3. When Component-Scope Runs

Component builds (a single button, chip, toggle, or row) **do NOT** log to `.bezel/log.json`. They inherit the surrounding project's tokens without triggering macrostructure diversification.
