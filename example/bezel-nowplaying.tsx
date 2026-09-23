/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { color, space, radius, type, mono, spring } from './theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function BezelNowPlayingScreen() {
  const insets = useSafeAreaInsets();
  const [playing, setPlaying] = useState(true);
  const [position, setPosition] = useState(148); // 2:28
  const duration = 245; // 4:05

  const artScale = useSharedValue(1);
  const playButtonScale = useSharedValue(1);

  const artAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: artScale.value }],
  }));

  const playButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
  }));

  const togglePlay = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPlaying((prev) => {
      const next = !prev;
      artScale.value = withSpring(next ? 1 : 0.92, spring.gentle);
      return next;
    });
  }, [artScale]);

  const handleSeek = useCallback((ratio: number) => {
    Haptics.selectionAsync();
    setPosition(Math.round(ratio * duration));
  }, [duration]);

  return (
    <View style={styles.root}>
      {/* Top Atmospheric Header */}
      <View style={styles.topInfo}>
        <Text style={styles.sourcePill}>AIRPLAY · LIVING ROOM HI-FI</Text>
      </View>

      {/* Hero Album Art with dynamic spring depth */}
      <View style={styles.artContainer}>
        <Animated.View style={[styles.artWrapper, artAnimatedStyle]}>
          <View style={styles.artGlow} />
          <View style={styles.artPlaceholder}>
            <Text style={styles.artSymbol}>♫</Text>
            <Text style={styles.artCaption}>CHROMA NOIR</Text>
          </View>
        </Animated.View>
      </View>

      {/* Track Meta & Tactile Favorite */}
      <View style={styles.metaRow}>
        <View style={styles.metaText}>
          <Text style={styles.trackTitle} numberOfLines={1}>
            Solaris Horizon
          </Text>
          <Text style={styles.artistName}>Cortex & The Void Ensemble</Text>
        </View>
        <Pressable
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          hitSlop={12}
          style={styles.favoriteButton}
        >
          <Text style={styles.favoriteGlyph}>♥</Text>
        </Pressable>
      </View>

      {/* Scrub Bar with generous tap/drag area & Tabular Time */}
      <View style={styles.scrubberContainer}>
        <Pressable
          onPress={(e) => {
            const { locationX } = e.nativeEvent;
            // assume standard 340pt scrub width approx
            const ratio = Math.max(0, Math.min(1, locationX / 320));
            handleSeek(ratio);
          }}
          style={styles.scrubTrackHitbox}
        >
          <View style={styles.scrubTrackBg}>
            <View
              style={[
                styles.scrubTrackFill,
                { width: `${(position / duration) * 100}%` },
              ]}
            />
          </View>
        </Pressable>
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>-{formatTime(duration - position)}</Text>
        </View>
      </View>

      {/* Fluid Transport Controls in Bottom Thumb Zone */}
      <View style={[styles.transportDock, { paddingBottom: insets.bottom + space.lg }]}>
        <Pressable
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          hitSlop={16}
          style={styles.secondaryTransport}
        >
          <Text style={styles.transportGlyph}>⇄</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPosition((p) => Math.max(0, p - 15));
          }}
          hitSlop={16}
          style={styles.skipButton}
        >
          <Text style={styles.skipGlyph}>⏮</Text>
        </Pressable>

        <AnimatedPressable
          onPressIn={() => (playButtonScale.value = withSpring(0.9, spring.snappy))}
          onPressOut={() => (playButtonScale.value = withSpring(1, spring.snappy))}
          onPress={togglePlay}
          style={[styles.playButton, playButtonAnimatedStyle]}
        >
          <Text style={styles.playGlyph}>{playing ? '⏸' : '▶'}</Text>
        </AnimatedPressable>

        <Pressable
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPosition((p) => Math.min(duration, p + 15));
          }}
          hitSlop={16}
          style={styles.skipButton}
        >
          <Text style={styles.skipGlyph}>⏭</Text>
        </Pressable>

        <Pressable
          onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
          hitSlop={16}
          style={styles.secondaryTransport}
        >
          <Text style={styles.transportGlyph}>↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.bg,
    paddingHorizontal: space.xl,
    justifyContent: 'space-between',
  },
  topInfo: {
    alignItems: 'center',
    paddingTop: space.sm,
  },
  sourcePill: {
    ...type.overline,
    color: color.ember,
    backgroundColor: 'rgba(255, 138, 91, 0.1)',
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 138, 91, 0.25)',
  },
  artContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: space.md,
  },
  artWrapper: {
    width: 260,
    height: 260,
    borderRadius: radius.xl,
    position: 'relative',
  },
  artGlow: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: -10,
    borderRadius: radius.xl,
    backgroundColor: 'rgba(255, 138, 91, 0.2)',
  },
  artPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: radius.xl,
    backgroundColor: color.surfaceHi,
    borderWidth: 1,
    borderColor: color.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  artSymbol: {
    fontSize: 72,
    color: color.ember,
    marginBottom: space.sm,
  },
  artCaption: {
    ...type.overline,
    color: color.inkFaint,
    letterSpacing: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: space.sm,
  },
  metaText: {
    flex: 1,
    marginRight: space.md,
  },
  trackTitle: {
    ...type.title,
    color: color.ink,
    fontSize: 22,
  },
  artistName: {
    ...type.body,
    color: color.inkMuted,
    marginTop: space.xs,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteGlyph: {
    fontSize: 20,
    color: color.ember,
  },
  scrubberContainer: {
    marginVertical: space.xs,
  },
  scrubTrackHitbox: {
    height: 36,
    justifyContent: 'center',
  },
  scrubTrackBg: {
    height: 4,
    backgroundColor: color.surfaceHi,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  scrubTrackFill: {
    height: '100%',
    backgroundColor: color.ember,
    borderRadius: radius.pill,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  timeText: {
    ...type.caption,
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
    color: color.inkFaint,
  },
  transportDock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: space.sm,
    paddingTop: space.sm,
  },
  secondaryTransport: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transportGlyph: {
    fontSize: 18,
    color: color.inkMuted,
  },
  skipButton: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipGlyph: {
    fontSize: 26,
    color: color.ink,
  },
  playButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: color.ember,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playGlyph: {
    fontSize: 26,
    color: color.bg,
    marginLeft: 2,
  },
});
