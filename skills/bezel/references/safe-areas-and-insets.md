# Safe Areas, Edge-to-Edge & Inset Architecture

Modern mobile hardware is characterized by curved display corners, camera notches, Dynamic Islands, and gesture navigation bars. Android 15+ and modern iOS mandate edge-to-edge rendering by default.

AI models routinely fail here by either:
1. Hardcoding fixed paddings like `paddingTop: 44` (which breaks on new devices).
2. Boxing the entire app inside a solid letterbox frame.
3. Allowing buttons to get hidden under the iOS Home Indicator or software keyboard.

---

## 1. The Edge-to-Edge Golden Rule

> **Backgrounds and scroll containers bleed to the physical glass edges.**
> **Safe Area insets are applied strictly as padding for touch targets, text, and interactive chrome.**

```
┌──────────────────────────────────────┐  ← Physical Top Edge
│      [ Transparent Status Bar ]      │  ← Background (Map, Image, Blur) Bleeds Through
├──────────────────────────────────────┤
│  [Top Inset Applied to Content]      │  ← Headers, Search Bars, Buttons Start Here
│                                      │
│           Scrollable Body            │
│               Content                │
│                                      │
│  [Bottom Inset Applied to Content]   │  ← Primary CTA, Bottom Nav, List End Padding
├──────────────────────────────────────┤
│      [ Home Indicator Pill ]         │  ← Background Bleeds to Bottom Glass
└──────────────────────────────────────┘  ← Physical Bottom Edge
```

---

## 2. Inset Handling by Framework

### React Native (`react-native-safe-area-context`)

```tsx
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView, StyleSheet } from 'react-native';

export function EdgeToEdgeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Scroll container fills entire screen */}
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: insets.top + 16,
            paddingBottom: insets.bottom + 24, // Clearance for home bar
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Screen Content */}
      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton title="Continue" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0C', // Root background extends edge-to-edge
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(20, 20, 24, 0.85)',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
```

### Jetpack Compose
```kotlin
@Composable
fun EdgeToEdgeScreen() {
    Scaffold(
        contentWindowInsets = WindowInsets(0, 0, 0, 0), // Bleed root
        bottomBar = {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .windowInsetsPadding(WindowInsets.safeDrawing.only(WindowInsetsSides.Bottom))
                    .padding(16.dp)
            ) {
                PrimaryButton(text = "Continue")
            }
        }
    ) { innerPadding ->
        LazyColumn(
            contentPadding = PaddingValues(
                top = WindowInsets.safeDrawing.asPaddingValues().calculateTopPadding() + 16.dp,
                bottom = 96.dp // Accommodate bottom bar
            )
        ) {
            // Items
        }
    }
}
```

### SwiftUI
```swift
struct EdgeToEdgeView: View {
    var body: some View {
        ScrollView {
            VStack(spacing: 16) {
                // Content
            }
            .padding(.horizontal, 16)
        }
        // Let background ignore safe areas
        .background(Color(.systemGroupedBackground).ignoresSafeArea())
        // Safe area inset for sticky bottom bar
        .safeAreaInset(edge: .bottom) {
            PrimaryButton(title: "Continue")
                .padding(.horizontal, 16)
                .padding(.vertical, 8)
                .background(.ultraThinMaterial)
        }
    }
}
```

---

## 3. Keyboard Management & Avoidance

When a user taps an input, the virtual keyboard animates upward and occupies ~45% of the viewport.

### Requirements:
1. **Never obscure the focused input:** The scroll view must automatically offset to keep the active input visible above the keyboard.
2. **Dock primary CTAs:** Forms with a primary "Submit" or "Continue" button must dock that button to the top edge of the keyboard tray.
3. **Scroll to dismiss:** The scroll container must set `keyboardDismissMode="on-drag"`.
4. **Persist taps:** Set `keyboardShouldPersistTaps="handled"` on the scroll container so the user's first tap on a button triggers the action without getting swallowed by a keyboard dismissal.
