/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { color, space, radius, type, spring } from '../theme';

export type Mode = 'bezel' | 'slop';

interface DemoShellProps {
  title: string;
  genre: string;
  accent?: string;
  mode?: Mode;
  onChangeMode?: (mode: Mode) => void;
  onBack: () => void;
  children: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function BackButton({ onBack, accent }: { onBack: () => void; accent: string }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const press = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onBack();
  }, [onBack]);
  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.9, spring.snappy))}
      onPressOut={() => (scale.value = withSpring(1, spring.snappy))}
      onPress={press}
      hitSlop={12}
      style={[styles.back, style]}
    >
      <Text style={[styles.backGlyph, { color: accent }]}>‹</Text>
    </AnimatedPressable>
  );
}

export function DemoShell({
  title,
  genre,
  accent = color.periwinkle,
  mode,
  onChangeMode,
  onBack,
  children,
}: DemoShellProps) {
  const insets = useSafeAreaInsets();

  const toggle = useCallback(
    (next: Mode) => {
      if (next === mode) return;
      Haptics.selectionAsync();
      onChangeMode?.(next);
    },
    [mode, onChangeMode],
  );

  return (
    <View style={styles.root}>
      <StatusBar style={mode === 'slop' ? 'dark' : 'light'} />
      <View style={[styles.header, { paddingTop: insets.top + space.sm }]}>
        <BackButton onBack={onBack} accent={accent} />
        <View style={styles.headerText}>
          <Text style={[styles.genre, { color: accent }]}>{genre}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
        {mode && onChangeMode ? (
          <View style={styles.segment}>
            <Pressable
              onPress={() => toggle('slop')}
              style={[styles.seg, mode === 'slop' && styles.segActiveSlop]}
            >
              <Text style={[styles.segLabel, mode === 'slop' && styles.segLabelActive]}>
                Slop
              </Text>
            </Pressable>
            <Pressable
              onPress={() => toggle('bezel')}
              style={[styles.seg, mode === 'bezel' && styles.segActiveBezel]}
            >
              <Text style={[styles.segLabel, mode === 'bezel' && styles.segLabelActive]}>
                Bezel
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.segSpacer} />
        )}
      </View>

      <View style={styles.body}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: color.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingBottom: space.md,
    gap: space.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: color.hairline,
  },
  back: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  backGlyph: { fontSize: 24, lineHeight: 26, marginTop: -2, fontWeight: '600' },
  headerText: { flex: 1 },
  genre: { ...type.overline, textTransform: 'uppercase' },
  title: { ...type.headline, color: color.ink, marginTop: 2 },
  segment: {
    flexDirection: 'row',
    backgroundColor: color.surface,
    borderRadius: radius.pill,
    padding: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  segSpacer: { width: 0 },
  seg: {
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.pill,
  },
  segActiveSlop: { backgroundColor: color.coral },
  segActiveBezel: { backgroundColor: color.periwinkle },
  segLabel: { ...type.caption, color: color.inkMuted },
  segLabelActive: { color: color.bg, fontWeight: '700' },
  body: { flex: 1 },
});
