# Component · D03 · High-Velocity Currency Keypad

The **Currency Keypad** pattern replaces the default system keyboard with an integrated, full-screen touch calculator. It maximizes speed for financial transfers, donations, tips, and numerical entry.

---

## Anatomy & Interaction Rules

```
┌────────────────────────────────────────┐
│                                        │
│               $1,250                   │  ← Tabular, auto-scaling hero number
│                                        │
├────────────────────────────────────────┤
│       1           2           3        │
│       4           5           6        │  ← Direct 44×44pt+ touch cells
│       7           8           9        │  ← Instant selectionAsync haptics
│       .           0           ⌫        │
└────────────────────────────────────────┘
```

1. **Auto-Scaling Font Size:** Starts at `60pt` Bold. When digit count exceeds 5, scales down proportionally to `44pt`, then `32pt` to prevent line wrapping.
2. **Tabular Numerals:** Always set `fontVariant: ['tabular-nums']` to prevent horizontal jitter.
3. **Instant Mechanical Haptics:** Fires `Haptics.selectionAsync()` immediately on `onPressIn`.

---

## Production React Native Implementation

```tsx
import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

interface CurrencyKeypadProps {
  currencySymbol?: string;
  onValueChange?: (val: string) => void;
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'];

export const CurrencyKeypad: React.FC<CurrencyKeypadProps> = ({
  currencySymbol = '$',
  onValueChange,
}) => {
  const [value, setValue] = useState('0');

  const handleKeyPress = useCallback((key: string) => {
    Haptics.selectionAsync();

    setValue((prev) => {
      let next = prev;
      if (key === '⌫') {
        next = prev.length > 1 ? prev.slice(0, -1) : '0';
      } else if (key === '.') {
        if (!prev.includes('.')) next = prev + '.';
      } else {
        next = prev === '0' ? key : prev + key;
      }
      onValueChange?.(next);
      return next;
    });
  }, [onValueChange]);

  const getFontSize = () => {
    if (value.length > 8) return 36;
    if (value.length > 5) return 48;
    return 64;
  };

  return (
    <View style={styles.container}>
      {/* Hero Display */}
      <View style={styles.displayArea}>
        <Text style={[styles.amountText, { fontSize: getFontSize() }]}>
          <Text style={styles.symbol}>{currencySymbol}</Text>
          {value}
        </Text>
      </View>

      {/* Mechanical Keypad */}
      <View style={styles.keypadGrid}>
        {KEYS.map((key) => (
          <Pressable
            key={key}
            onPressIn={() => handleKeyPress(key)}
            style={({ pressed }) => [styles.keyCell, pressed && styles.keyPressed]}
          >
            <Text style={styles.keyText}>{key}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'space-between', paddingVertical: 24 },
  displayArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  amountText: {
    fontWeight: '700',
    color: '#FFFFFF',
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  symbol: { color: '#8E8E93', fontWeight: '500' },
  keypadGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    rowGap: 12,
  },
  keyCell: {
    width: '33.333%',
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  keyPressed: { backgroundColor: 'rgba(255, 255, 255, 0.08)' },
  keyText: { fontSize: 24, fontWeight: '600', color: '#FFFFFF' },
});
```
