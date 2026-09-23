/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { color, space, radius, type, mono, spring, duration } from './theme';

const LENGTH = 6;
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫'] as const;

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Cell({
  digit,
  focused,
  solved,
}: {
  digit: string;
  focused: boolean;
  solved: boolean;
}) {
  const pop = useSharedValue(0);
  useEffect(() => {
    if (digit) pop.value = withSequence(withSpring(1, spring.bouncy), withSpring(0, spring.gentle));
  }, [digit, pop]);

  const digitStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pop.value * 0.18 }],
  }));
  const caret = useAnimatedStyle(() => ({
    opacity: withTiming(focused && !digit ? 1 : 0, { duration: duration.fast }),
  }));

  return (
    <View
      style={[
        styles.cell,
        focused && styles.cellFocused,
        solved && styles.cellSolved,
      ]}
    >
      {digit ? (
        <AnimatedText style={[styles.cellDigit, digitStyle]}>{digit}</AnimatedText>
      ) : (
        <Animated.View style={[styles.caret, caret]} />
      )}
    </View>
  );
}

function Key({ label, onPress }: { label: string; onPress: (l: string) => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  if (!label) return <View style={styles.keyCell} />;
  return (
    <View style={styles.keyCell}>
      <AnimatedPressable
        onPressIn={() => (scale.value = withSpring(0.9, spring.snappy))}
        onPressOut={() => (scale.value = withSpring(1, spring.snappy))}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress(label);
        }}
        style={[styles.key, style]}
      >
        <Text style={styles.keyLabel}>{label}</Text>
      </AnimatedPressable>
    </View>
  );
}

export function BezelOtpScreen() {
  const insets = useSafeAreaInsets();
  const [code, setCode] = useState('');
  const solved = code.length === LENGTH;

  const shake = useSharedValue(0);
  const rowStyle = useAnimatedStyle(() => ({ transform: [{ translateX: shake.value }] }));

  const press = useCallback((key: string) => {
    setCode((prev) => {
      if (key === '⌫') return prev.slice(0, -1);
      if (prev.length >= LENGTH) return prev;
      return prev + key;
    });
  }, []);

  useEffect(() => {
    if (!solved) return;
    // demo: 123456 is "correct", anything else fails with a shake
    if (code === '123456') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      shake.value = withSequence(
        withTiming(-8, { duration: 40 }),
        withTiming(8, { duration: 80 }),
        withTiming(-6, { duration: 80 }),
        withTiming(0, { duration: 60 }),
      );
      const t = setTimeout(() => setCode(''), 450);
      return () => clearTimeout(t);
    }
  }, [solved, code, shake]);

  const verified = solved && code === '123456';

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Text style={styles.title}>Enter the code</Text>
        <Text style={styles.sub}>
          We texted a 6-digit code to ····84. Try 123456.
        </Text>
      </View>

      <Animated.View style={[styles.cells, rowStyle]}>
        {Array.from({ length: LENGTH }).map((_, i) => (
          <Cell
            key={i}
            digit={code[i] ?? ''}
            focused={i === code.length && !verified}
            solved={verified}
          />
        ))}
      </Animated.View>

      <Text style={[styles.status, verified && styles.statusOk]}>
        {verified ? 'Verified' : 'Waiting for code'}
      </Text>

      <View style={[styles.pad, { paddingBottom: insets.bottom + space.md }]}>
        {KEYS.map((k, i) => (
          <Key key={`${k}-${i}`} label={k} onPress={press} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg, paddingHorizontal: space.lg },
  head: { alignItems: 'center', paddingTop: space.xxl },
  title: { ...type.title, color: color.ink },
  sub: {
    ...type.body,
    color: color.inkMuted,
    marginTop: space.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  cells: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space.sm,
    marginTop: space.xxl,
  },
  cell: {
    width: 46,
    height: 58,
    borderRadius: radius.md,
    backgroundColor: color.surface,
    borderWidth: 1.5,
    borderColor: color.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellFocused: { borderColor: color.violet, backgroundColor: color.surfaceHi },
  cellSolved: { borderColor: color.mint },
  cellDigit: {
    color: color.ink,
    fontSize: 26,
    fontWeight: '600',
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
  },
  caret: {
    width: 2,
    height: 24,
    borderRadius: 1,
    backgroundColor: color.violet,
  },
  status: {
    ...type.caption,
    color: color.inkFaint,
    textAlign: 'center',
    marginTop: space.lg,
  },
  statusOk: { color: color.mint, fontWeight: '700' },
  pad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 'auto',
  },
  keyCell: { width: '33.333%', paddingVertical: space.xs, alignItems: 'center' },
  key: {
    width: 76,
    height: 60,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyLabel: {
    color: color.ink,
    fontSize: 26,
    fontWeight: '500',
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
  },
});
