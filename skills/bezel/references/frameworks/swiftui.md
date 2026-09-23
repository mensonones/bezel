# SwiftUI Implementation Guide

This guide defines idiomatic Swift and SwiftUI patterns that adhere to the Bezel standard.

---

## 1. Universal Tactile Button Style

In SwiftUI, applying `.buttonStyle(TactileButtonStyle())` universally gives any button the Bezel micro-scale spring physics and native haptic feedback.

```swift
import SwiftUI

struct TactileButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .scaleEffect(configuration.isPressed ? 0.96 : 1.0)
            .animation(.spring(response: 0.25, dampingFraction: 0.65), value: configuration.isPressed)
            .sensoryFeedback(.impact(weight: .light), trigger: configuration.isPressed) { oldValue, newValue in
                newValue == true // Trigger haptic on press-down
            }
    }
}

extension ButtonStyle where Self == TactileButtonStyle {
    static var tactile: TactileButtonStyle { TactileButtonStyle() }
}
```

---

## 2. Inset Grouped Lists & Hairline Dividers

```swift
struct InsetGroupedSettingsView: View {
    var body: some View {
        NavigationStack {
            List {
                Section {
                    NavigationLink {
                        ProfileDetailView()
                    } label: {
                        HStack(spacing: 12) {
                            Image(systemName: "person.crop.circle.fill")
                                .font(.system(size: 28))
                                .foregroundStyle(.tint)
                            
                            VStack(alignment: .leading, spacing: 2) {
                                Text("Emerson Vieira")
                                    .font(.headline)
                                Text("Lead Mobile Engineer")
                                    .font(.subheadline)
                                    .foregroundStyle(.secondary)
                            }
                        }
                        .padding(.vertical, 4)
                    }
                }
            }
            .listStyle(.insetGrouped)
            .navigationTitle("Settings")
        }
    }
}
```

---

## 3. Safe Area Insets for Sticky Controls

```swift
ScrollView {
    // Scrollable content
}
.safeAreaInset(edge: .bottom) {
    VStack(spacing: 0) {
        Divider()
        Button("Confirm Order") {
            processPayment()
        }
        .buttonStyle(.tactile)
        .padding(.horizontal, 16)
        .padding(.vertical, 12)
    }
    .background(.ultraThinMaterial)
}
```
