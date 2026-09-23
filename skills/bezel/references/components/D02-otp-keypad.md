# Component · D02 · OTP Passcode Input

The **OTP Passcode Input** handles 4- to 6-digit verification codes with auto-advance, clipboard autofill, and error shake physics.

---

## Anatomy & Interaction Rules

```
┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
│  4   │  │  8   │  │  2   │  │  •   │  │      │  │      │
└──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘
  Filled    Filled    Filled   Focused   Empty     Empty
```

1. **Auto-Advance:** Typing a digit automatically advances focus to the next input cell without manual tapping.
2. **Hidden Native Field:** Uses a single transparent hidden `TextInput` to leverage the OS autofill accessory and prevent keyboard glitching.
3. **Error Micro-Wiggle Shake:** On invalid code, triggers a mechanical horizontal shake animation (`damping: 10, stiffness: 400`) and fires `notificationAsync(Error)`.

---

## Production React Native Implementation

```tsx
import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface OTPInputProps {
  length?: number;
  onComplete: (code: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState('');
  const inputRef = useRef<TextInput>(null);
  const shakeX = useSharedValue(0);

  const triggerErrorShake = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    shakeX.value = withSequence(
      withTiming(-12, { duration: 50 }),
      withSpring(12, { damping: 8, stiffness: 400 }),
      withSpring(-8, { damping: 8, stiffness: 400 }),
      withSpring(0, { damping: 10, stiffness: 300 })
    );
  };

  const handleChangeText = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, length);
    setCode(cleaned);
    Haptics.selectionAsync();

    if (cleaned.length === length) {
      onComplete(cleaned);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return (
    <Pressable onPress={() => inputRef.current?.focus()} style={styles.container}>
      <Animated.View style={[styles.boxContainer, animatedStyle]}>
        {Array.from({ length }).map((_, index) => {
          const digit = code[index];
          const isFocused = code.length === index;

          return (
            <View
              key={index}
              style={[
                styles.cell,
                digit && styles.cellFilled,
                isFocused && styles.cellFocused,
              ]}
            >
              <Text style={styles.cellText}>{digit || ''}</Text>
            </View>
          );
        })}
      </Animated.View>

      {/* Hidden real input capturing OS autofill and keyboard events */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleChangeText}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
        style={styles.hiddenInput}
        autoFocus
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 16 },
  boxContainer: { flexDirection: 'row', gap: 8 },
  cell: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellFilled: { borderColor: 'rgba(255, 255, 255, 0.3)' },
  cellFocused: { borderColor: '#0A84FF', backgroundColor: '#2C2C2E' },
  cellText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
  },
  hiddenInput: { position: 'absolute', opacity: 0, width: 1, height: 1 },
});
```
