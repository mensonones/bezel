# Component · A02 · Slide to Confirm

The **Slide to Confirm** pattern (popularized by iOS Slide to Power Off and Cash App Slide to Pay) introduces intentional physical friction for high-consequence, irreversible actions (transfers, deletions, order placements).

---

## Anatomy & Interaction Rules

```
┌────────────────────────────────────────────────────────┐
│  [  →  ]    Slide to transfer $50.00       >>>>        │
└────────────────────────────────────────────────────────┘
    Knob                   Track               Shimmer
```

1. **Track:** Rounded pill track (`56pt` height, full width) with subtle background (`surfaceGrouped`).
2. **Knob:** Elevated circle or pill (`48 × 48pt`, white or accent tint) with spring touch feedback.
3. **Threshold:** Reaching **85% of track width** completes the action.
4. **Haptics:**
   - Crossing the 85% threshold fires `notificationAsync(Success)`.
   - Releasing before threshold springs back to origin with `withSpring(0)`.
5. **Locked State:** Once triggered, knob stays locked and transforms into an inline checkmark/spinner.

---

## Production React Native / Reanimated 3 Implementation

```tsx
import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface SlideToConfirmProps {
  label: string;
  onConfirm: () => void;
}

const KNOB_SIZE = 48;
const PADDING = 4;
const SPRING_CONFIG = { damping: 20, stiffness: 250, mass: 0.8 };

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({ label, onConfirm }) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const translateX = useSharedValue(0);
  const isComplete = useSharedValue(false);

  const maxTranslate = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);

  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const triggerConfirm = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm();
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (isComplete.value) return;
      translateX.value = Math.min(Math.max(0, e.translationX), maxTranslate);
    })
    .onEnd(() => {
      if (isComplete.value) return;
      if (translateX.value > maxTranslate * 0.85) {
        translateX.value = withSpring(maxTranslate, SPRING_CONFIG);
        isComplete.value = true;
        runOnJS(triggerConfirm)();
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, maxTranslate * 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View onLayout={handleLayout} style={styles.track}>
      <Animated.Text style={[styles.label, textStyle]}>{label}</Animated.Text>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.knob, knobStyle]}>
          <Text style={styles.arrow}>→</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 56,
    backgroundColor: '#1C1C1E',
    borderRadius: 28,
    padding: PADDING,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#8E8E93',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
```
