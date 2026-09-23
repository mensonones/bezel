# Component · L02 · Swipeable Action Row

The **Swipeable Action Row** allows quick triage in list feeds, inboxes, and task lists without requiring navigation to a detail screen.

---

## Anatomy & Interaction Rules

```
┌────────────────────────────────────────────────────────┐
│  Row Content (Swiped Left)         │ 🗑 Delete │ 📁 Pin│
└────────────────────────────────────────────────────────┘
```

1. **Short Swipe (< 80pt):** Springs back to zero on release.
2. **Standard Detent (80–160pt):** Snaps open, revealing action buttons.
3. **Full Swipe (> 60% screen width):** Triggers the primary destructive or archive action directly with an immediate `impactAsync(Medium)` haptic pulse.

---

## Production React Native / Reanimated 3 Implementation

```tsx
import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const ACTION_WIDTH = 80;
const SPRING_CONFIG = { damping: 20, stiffness: 260, mass: 0.8 };

interface SwipeableRowProps {
  children: React.ReactNode;
  onDelete: () => void;
  onArchive?: () => void;
}

export const SwipeableRow: React.FC<SwipeableRowProps> = ({
  children,
  onDelete,
  onArchive,
}) => {
  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  const triggerDelete = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onDelete();
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      contextX.value = translateX.value;
    })
    .onUpdate((e) => {
      // Only allow swiping left
      if (e.translationX < 0) {
        translateX.value = contextX.value + e.translationX;
      }
    })
    .onEnd((e) => {
      // Full swipe threshold: > 50% screen width
      if (translateX.value < -SCREEN_WIDTH * 0.5) {
        translateX.value = withSpring(-SCREEN_WIDTH, { velocity: e.velocityX }, () => {
          runOnJS(triggerDelete)();
        });
      } else if (translateX.value < -ACTION_WIDTH * 0.5) {
        // Snap open action shelf
        translateX.value = withSpring(-ACTION_WIDTH, SPRING_CONFIG);
      } else {
        // Snap closed
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Background Action Shelf */}
      <View style={styles.actionShelf}>
        <Pressable onPress={triggerDelete} style={styles.deleteButton}>
          <Text style={styles.actionText}>Delete</Text>
        </Pressable>
      </View>

      {/* Foreground Content */}
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.content, rowStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { position: 'relative', overflow: 'hidden' },
  actionShelf: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: ACTION_WIDTH,
    backgroundColor: '#FF453A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  actionText: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  content: { backgroundColor: '#1C1C1E' },
});
```
