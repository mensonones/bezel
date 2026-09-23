# React Native & Expo Implementation Guide

This guide defines idiomatic, performance-rigorous React Native and Expo patterns that adhere to the Bezel standard.

---

## 1. Zero Inline Styles & Render Optimization

### The Rule
Never write inline style objects in JSX:
```tsx
// ❌ SLOP: Re-creates style object on every frame, triggers garbage collection thrash
<View style={{ flex: 1, padding: 16, backgroundColor: '#000' }}>
```

```tsx
// ✅ BEZEL: Hoisted, memoized, static style references
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: BezelTokens.colors.background,
  },
});
```

### Callback Stability
Always wrap callbacks passed down to list items or children with `useCallback` to prevent cascading re-renders:
```tsx
const handleItemPress = useCallback((id: string) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  navigation.navigate('Details', { id });
}, [navigation]);
```

---

## 2. Reanimated 3 & Gesture Handler 2

All gestures and spatial animations must run directly on the UI thread via Reanimated worklets.

### Production Example: TactilePressable Component
```tsx
import React from 'react';
import { StyleSheet, Pressable, PressableProps, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface TactilePressableProps extends PressableProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  damping: 15,
  stiffness: 300,
  mass: 0.8,
};

export const TactilePressable: React.FC<TactilePressableProps> = ({
  children,
  style,
  onPress,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.96, SPRING_CONFIG);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1.0, SPRING_CONFIG);
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[styles.base, style, animatedStyle]}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      {...props}
    >
      {children}
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 44, // Minimum iOS touch target
    justifyContent: 'center',
  },
});
```

---

## 3. Virtualized Lists (`FlashList`)

When rendering lists of 10+ items, prefer `@shopify/flash-list` over standard `FlatList`:
- Specify `estimatedItemSize` accurately to avoid scroll jumps.
- Avoid variable item heights without explicit keying.
- Add `showsVerticalScrollIndicator={false}` for clean edge-to-edge feel.
- Set `contentContainerStyle` with bottom inset padding:
  `paddingBottom: insets.bottom + 24`.
