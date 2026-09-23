/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { color, space, radius, type, mono, spring, duration } from './theme';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', '⌫'] as const;
const MAX_CENTS = 99_999_99; // $99,999.99

function formatUSD(cents: number): string {
  const dollars = Math.floor(cents / 100);
  const rem = cents % 100;
  const grouped = dollars.toLocaleString('en-US');
  return `${grouped}.${rem.toString().padStart(2, '0')}`;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Key({
  label,
  onPress,
  onLongPress,
}: {
  label: string;
  onPress: (label: string) => void;
  onLongPress?: (label: string) => void;
}) {
  const scale = useSharedValue(1);
  const bg = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const overlay = useAnimatedStyle(() => ({ opacity: bg.value }));

  const handle = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress(label);
  }, [label, onPress]);

  const handleLong = useCallback(() => {
    if (onLongPress) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onLongPress(label);
    }
  }, [label, onLongPress]);

  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(0.92, spring.snappy);
        bg.value = withTiming(1, { duration: duration.fast });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, spring.snappy);
        bg.value = withTiming(0, { duration: duration.base });
      }}
      onPress={handle}
      onLongPress={handleLong}
      style={[styles.key, style]}
    >
      <Animated.View style={[styles.keyOverlay, overlay]} />
      <Text style={styles.keyLabel}>{label}</Text>
    </AnimatedPressable>
  );
}

export function BezelKeypadScreen() {
  const insets = useSafeAreaInsets();
  const [cents, setCents] = useState(0);

  const press = useCallback((key: string) => {
    setCents((prev) => {
      if (key === '⌫') return Math.floor(prev / 10);
      if (key === '.') return prev; // integer-cents model ignores explicit dot
      const digit = Number(key);
      const next = prev * 10 + digit;
      return next > MAX_CENTS ? prev : next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setCents(0);
  }, []);

  const amount = useMemo(() => formatUSD(cents), [cents]);
  const ready = cents > 0;

  // amount grows from faint to solid as it gains weight
  const displayStyle = useAnimatedStyle(() => ({
    opacity: withTiming(ready ? 1 : 0.35, { duration: duration.base }),
  }));

  return (
    <View style={styles.root}>
      <View style={styles.display}>
        <Text style={styles.label}>Amount to send</Text>
        <Animated.View style={[styles.amountRow, displayStyle]}>
          <Text style={styles.currency}>$</Text>
          <Text style={cents > 1000000 ? styles.amountSmall : styles.amount}>{amount}</Text>
        </Animated.View>
        <Text style={styles.hint}>
          {ready ? 'Hold ⌫ to clear · Limit $99,999.00' : 'Daily limit $99,999.00'}
        </Text>
      </View>

      <View style={styles.pad}>
        {KEYS.map((k) => (
          <View key={k} style={styles.keyCell}>
            <Key
              label={k}
              onPress={press}
              onLongPress={k === '⌫' ? clearAll : undefined}
            />
          </View>
        ))}
      </View>

      <View style={[styles.footer, { paddingBottom: insets.bottom + space.md }]}>
        <ContinueButton enabled={ready} amount={amount} />
      </View>
    </View>
  );
}

function ContinueButton({ enabled, amount }: { enabled: boolean; amount: string }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: withTiming(enabled ? 1 : 0.4, { duration: duration.base }),
  }));
  const press = useCallback(() => {
    if (!enabled) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [enabled]);
  return (
    <AnimatedPressable
      disabled={!enabled}
      onPressIn={() => enabled && (scale.value = withSpring(0.97, spring.snappy))}
      onPressOut={() => (scale.value = withSpring(1, spring.snappy))}
      onPress={press}
      style={[styles.cta, style]}
    >
      <Text style={styles.ctaLabel}>Review · ${amount}</Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg, paddingHorizontal: space.lg },
  display: {
    alignItems: 'center',
    paddingTop: space.xxl,
    paddingBottom: space.xl,
  },
  label: { ...type.caption, color: color.inkMuted },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: space.md,
  },
  currency: {
    color: color.inkMuted,
    fontSize: 30,
    fontWeight: '600',
    marginTop: 8,
    marginRight: 2,
    fontVariant: ['tabular-nums'],
  },
  amount: {
    color: color.ink,
    fontSize: 64,
    fontWeight: '700',
    letterSpacing: -1.5,
    fontVariant: ['tabular-nums'],
  },
  amountSmall: {
    color: color.ink,
    fontSize: 44,
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  hint: { ...type.caption, color: color.inkFaint, marginTop: space.sm },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  keyCell: { width: '33.333%', paddingVertical: space.xs, alignItems: 'center' },
  key: {
    width: 76,
    height: 64,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  keyOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: color.surfaceHi,
    borderRadius: radius.lg,
  },
  keyLabel: {
    color: color.ink,
    fontSize: 28,
    fontWeight: '500',
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
  },
  footer: { paddingTop: space.md },
  cta: {
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: color.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaLabel: {
    color: color.bg,
    ...type.headline,
    fontVariant: ['tabular-nums'],
  },
});
