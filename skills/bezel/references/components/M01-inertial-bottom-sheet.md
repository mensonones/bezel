# Component · M01 · Inertial Bottom Sheet

The **Inertial Bottom Sheet** is the flagship spatial component of modern mobile apps. It replaces full-screen modal takeovers with an interactive surface that preserves context, supports multiple detents, and responds to velocity flicks.

---

## Anatomy & Detent Rules

```
┌──────────────────────────────────────┐
│                [═══]                 │  ← Grab Handle Pill (36 × 5pt)
│  Title or Search Bar                 │
├──────────────────────────────────────┤
│                                      │
│         Sheet Content View           │
│                                      │
└──────────────────────────────────────┘
```

- **Detent 1 (Collapsed / Peek):** `15%` screen height (Quick trigger or summary bar).
- **Detent 2 (Half Sheet):** `50%` screen height (Standard inspection / key choices).
- **Detent 3 (Expanded):** `90%` screen height (Full list / deep content).
- **Dismissible:** Dragging downward with velocity > `600pt/s` or past threshold animates to close.

---

## Production React Native / Reanimated 3 Implementation

```tsx
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { calculateInertialTarget, applyRubberBand } from '../motion-and-gestures';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// Detents from top of screen: Expanded (10%), Half (50%), Closed (100%)
const DETENTS = [SCREEN_HEIGHT * 0.1, SCREEN_HEIGHT * 0.5, SCREEN_HEIGHT];
const SPRING_CONFIG = { damping: 22, stiffness: 220, mass: 1.0 };

interface InertialBottomSheetProps {
  children: React.ReactNode;
  onClose: () => void;
}

export const InertialBottomSheet: React.FC<InertialBottomSheetProps> = ({
  children,
  onClose,
}) => {
  const translateY = useSharedValue(DETENTS[1]); // Start at half-sheet
  const contextY = useSharedValue(0);

  const pan = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((e) => {
      const rawY = contextY.value + e.translationY;
      if (rawY < DETENTS[0]) {
        // Apply rubber-banding when dragging above maximum expansion
        translateY.value = applyRubberBand(rawY, DETENTS[0], SCREEN_HEIGHT);
      } else {
        translateY.value = rawY;
      }
    })
    .onEnd((e) => {
      // Calculate inertial destination based on release velocity
      const target = calculateInertialTarget(translateY.value, e.velocityY, DETENTS);

      if (target >= SCREEN_HEIGHT) {
        translateY.value = withSpring(SCREEN_HEIGHT, { velocity: e.velocityY }, () => {
          runOnJS(onClose)();
        });
      } else {
        translateY.value = withSpring(target, {
          velocity: e.velocityY,
          ...SPRING_CONFIG,
        });
      }
    });

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.sheet, sheetStyle]}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: SCREEN_HEIGHT,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
  },
  handleContainer: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
```
