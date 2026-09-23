/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { SlideToConfirm } from './SlideToConfirm';
import { color, space, radius, type, spring } from './theme';

export function BezelSlideScreen() {
  const insets = useSafeAreaInsets();
  const [done, setDone] = useState(false);

  const checkScale = useSharedValue(0);
  const cardOpacity = useSharedValue(1);

  const confirm = useCallback(() => {
    // SlideToConfirm already fires a success haptic; add the settle here.
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setDone(true);
    cardOpacity.value = withTiming(0.35, { duration: 240 });
    checkScale.value = withSpring(1, spring.bouncy);
  }, [cardOpacity, checkScale]);

  const reset = useCallback(() => {
    Haptics.selectionAsync();
    checkScale.value = withTiming(0, { duration: 160 });
    cardOpacity.value = withTiming(1, { duration: 240 });
    setDone(false);
  }, [cardOpacity, checkScale]);

  const cardStyle = useAnimatedStyle(() => ({ opacity: cardOpacity.value }));
  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkScale.value,
  }));

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + space.lg }]}>
      <Animated.View style={[styles.card, cardStyle]}>
        <Text style={styles.eyebrow}>PAYING</Text>
        <Text style={styles.payee}>Ada Lovelace</Text>
        <Text style={styles.handle}>@ada · Analytical Engine Co.</Text>

        <View style={styles.amountBlock}>
          <Text style={styles.amount}>$1,240.00</Text>
          <Text style={styles.amountNote}>Arrives instantly · no fee</Text>
        </View>
      </Animated.View>

      <View style={styles.checkWrap} pointerEvents="none">
        <Animated.View style={[styles.check, checkStyle]}>
          <Text style={styles.checkGlyph}>✓</Text>
        </Animated.View>
      </View>

      <View style={styles.footer}>
        {done ? (
          <Text style={styles.sentLabel} onPress={reset}>
            Sent · tap to reset
          </Text>
        ) : (
          <SlideToConfirm label="Slide to pay $1,240.00" onConfirm={confirm} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: space.lg,
    paddingTop: space.xl,
  },
  card: {
    backgroundColor: color.surface,
    borderRadius: radius.xl,
    padding: space.xl,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
  },
  eyebrow: { ...type.overline, color: color.periwinkle },
  payee: { ...type.display, color: color.ink, marginTop: space.sm },
  handle: { ...type.caption, color: color.inkMuted, marginTop: space.xs },
  amountBlock: {
    marginTop: space.xl,
    paddingTop: space.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.hairline,
  },
  amount: {
    color: color.ink,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
    fontVariant: ['tabular-nums'],
  },
  amountNote: { ...type.caption, color: color.inkFaint, marginTop: space.xs },
  checkWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: color.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkGlyph: { color: color.bg, fontSize: 48, fontWeight: '800' },
  footer: { marginTop: 'auto' },
  sentLabel: {
    ...type.headline,
    color: color.mint,
    textAlign: 'center',
    paddingVertical: space.lg,
  },
});
