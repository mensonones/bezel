# Mobile Microcopy & Voice

Typography and layout are only half the battle. Stock, sloppy, or apologetic copy instantly betrays an AI-generated mobile app.

On a 6-inch touchscreen, users read while walking, commuting, or glancing with one thumb. Every syllable must earn its pixel space.

---

## 1. Principles of Mobile Copy

- **Verbs lead the finger:** Buttons declare the exact physical action. *"Transfer $50"* beats *"Confirm"* beats *"Submit"*.
- **Max 3 words for primary CTAs:** *"Create project"*, *"Order now"*, *"Save draft"*. Long multi-line buttons break native thumb rhythm.
- **Errors are instructions, not apologies:** State what broke, why, and how to fix it. Never say *"Oops!"* or perform artificial embarrassment.
- **Empty states drive action:** An empty screen is an invitation to create, not a dead end.
- **Zero fabricated social proof:** Never hallucinate *"Trusted by 500,000+ teams"* or *"4.9★ rating"* unless provided by the user.

---

## 2. Button & Action Label Standards

| Context | ❌ Slop | ✅ Bezel Standard |
|---|---|---|
| **Form Submission** | `Submit` / `Send Form` / `Click Here` | `Save Changes` / `Send Message` / `Apply Filter` |
| **Destructive Action** | `OK` / `Proceed` | `Delete Account` / `Remove Item` / `Discard Draft` |
| **Authentication** | `Go` / `Login to Account` | `Sign In` / `Create Account` / `Continue with Apple` |
| **Multi-Step Flow** | `Next` (used everywhere) | `Review Order` / `Choose Delivery` / `Confirm Payment` |

---

## 3. Empty States in 3 Beats

Never render an empty screen with just *"No items found"*. Every empty state must follow the **3-Beat Structure**:

1. **Beat 1 · Fact (The state):** A concise one-line headline naming what is absent.
   - *"No active flights"*
2. **Beat 2 · Value (Why it matters):** One sentence explaining what this view will contain.
   - *"Your upcoming bookings and live gate updates will appear here."*
3. **Beat 3 · Trigger (The single next step):** One high-contrast primary action button.
   - `[ Search Flights ]`

---

## 4. Error Messages & Recovery

When network drops, validation fails, or biometrics error out:

```
┌────────────────────────────────────────────────────────┐
│  1. What happened  →  "Unable to complete transfer."   │
│  2. Why it failed  →  "Insufficient funds in balance." │
│  3. How to resolve →  "Add funds or try another card." │
│                                                        │
│  [ Add Funds ]            [ Try Another Card ]         │
└────────────────────────────────────────────────────────┘
```

- **Strict Ban:** Exclamation marks in error titles (`Error!` / `Oops!`).
- **Network drop:** Convey non-blocking connection errors via an unobtrusive top banner: *"Offline · changes will sync when connected"*.

---

## 5. Microcopy Bans

- 🚫 *"Click here"* / *"Tap here to continue"*. Link text must stand alone.
- 🚫 *"Oops!"*, *"Uh oh!"*, *"Something went wrong"*. Be specific about what failed.
- 🚫 *"Please note that..."* / *"Kindly ensure that..."*. Drop bureaucratic filler words.
- 🚫 Fabricated metrics (*"Over 10M happy users"*, *"#1 Top Rated App"*).
