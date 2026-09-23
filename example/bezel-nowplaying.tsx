/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
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
  const [isFavorite, setIsFavorite] = useState(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const duration = 245; // 4:05

  const artScale = useSharedValue(1);
  const playButtonScale = useSharedValue(1);
  const favScale = useSharedValue(1);

  const artAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: artScale.value }],
  }));

  const playButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: playButtonScale.value }],
  }));

  const favAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: favScale.value }],
  }));

  const togglePlay = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setPlaying((prev) => {
      const next = !prev;
      artScale.value = withSpring(next ? 1 : 0.92, spring.gentle);
      return next;
    });
  }, [artScale]);

  const toggleFavorite = useCallback(() => {
    setIsFavorite((prev) => {
      const next = !prev;
      favScale.value = withSpring(1.3, spring.snappy, () => {
        favScale.value = withSpring(1.0, spring.gentle);
      });
      if (next) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      return next;
    });
  }, [favScale]);

  const toggleShuffle = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setShuffle((s) => !s);
  }, []);

  const toggleRepeat = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setRepeat((r) => !r);
  }, []);

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
        <AnimatedPressable
          onPress={toggleFavorite}
          hitSlop={12}
          style={[styles.favoriteButton, isFavorite && styles.favoriteActive, favAnimatedStyle]}
        >
          <Text style={[styles.favoriteGlyph, isFavorite && styles.favoriteGlyphActive]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </AnimatedPressable>
      </View>

      {/* Tactile Gestural Scrubber */}
      <Scrubber
        position={position}
        duration={duration}
        onSeek={setPosition}
      />

      {/* Fluid Transport Controls in Bottom Thumb Zone */}
      <View style={[styles.transportDock, { paddingBottom: insets.bottom + space.lg }]}>
        <Pressable
          onPress={toggleShuffle}
          hitSlop={16}
          style={[styles.secondaryTransport, shuffle && styles.secondaryActive]}
        >
          <Text style={[styles.transportGlyph, shuffle && styles.glyphActive]}>⇄</Text>
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
          onPress={toggleRepeat}
          hitSlop={16}
          style={[styles.secondaryTransport, repeat && styles.secondaryActive]}
        >
          <Text style={[styles.transportGlyph, repeat && styles.glyphActive]}>↻</Text>
        </Pressable>
      </View>
    </View>
  );
}

function Scrubber({
  position,
  duration,
  onSeek,
}: {
  position: number;
  duration: number;
  onSeek: (seconds: number) => void;
}) {
  const [trackWidth, setTrackWidth] = useState(300);
  const [displayPos, setDisplayPos] = useState(position);
  const isDragging = useSharedValue(false);
  const progress = useSharedValue(duration > 0 ? position / duration : 0);
  const knobScale = useSharedValue(0.6);
  const trackHeight = useSharedValue(4);

  useEffect(() => {
    if (!isDragging.value && duration > 0) {
      progress.value = position / duration;
      setDisplayPos(position);
    }
  }, [position, duration, isDragging, progress]);

  const fireHapticTick = () => {
    Haptics.selectionAsync();
  };

  const updateScrubTime = (ratio: number) => {
    setDisplayPos(Math.round(ratio * duration));
  };

  const commitSeek = (ratio: number) => {
    const target = Math.round(ratio * duration);
    onSeek(target);
    setDisplayPos(target);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const pan = Gesture.Pan()
    .minDistance(0)
    .onBegin((e) => {
      'worklet';
      isDragging.value = true;
      knobScale.value = withSpring(1.1, spring.snappy);
      trackHeight.value = withSpring(7, spring.snappy);
      const ratio = Math.max(0, Math.min(1, e.x / (trackWidth || 1)));
      progress.value = ratio;
      runOnJS(fireHapticTick)();
      runOnJS(updateScrubTime)(ratio);
    })
    .onUpdate((e) => {
      'worklet';
      const ratio = Math.max(0, Math.min(1, e.x / (trackWidth || 1)));
      progress.value = ratio;
      runOnJS(updateScrubTime)(ratio);
    })
    .onFinalize(() => {
      'worklet';
      isDragging.value = false;
      knobScale.value = withSpring(0.6, spring.snappy);
      trackHeight.value = withSpring(4, spring.snappy);
      runOnJS(commitSeek)(progress.value);
    });

  const fillStyle = useAnimatedStyle(() => ({
    width: `${Math.max(0, Math.min(1, progress.value)) * 100}%`,
  }));

  const knobStyle = useAnimatedStyle(() => ({
    left: `${Math.max(0, Math.min(1, progress.value)) * 100}%`,
    transform: [{ translateX: -7 }, { scale: knobScale.value }],
  }));

  const trackBgStyle = useAnimatedStyle(() => ({
    height: trackHeight.value,
  }));

  return (
    <View
      style={styles.scrubberContainer}
      onLayout={(e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)}
    >
      <GestureDetector gesture={pan}>
        <Animated.View style={styles.scrubTrackHitbox}>
          <Animated.View style={[styles.scrubTrackBg, trackBgStyle]}>
            <Animated.View style={[styles.scrubTrackFill, fillStyle]} />
          </Animated.View>
          <Animated.View style={[styles.scrubKnob, knobStyle]} />
        </Animated.View>
      </GestureDetector>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{formatTime(displayPos)}</Text>
        <Text style={styles.timeText}>-{formatTime(Math.max(0, duration - displayPos))}</Text>
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
    color: color.inkMuted,
  },
  favoriteActive: {
    backgroundColor: 'rgba(255, 138, 91, 0.15)',
    borderColor: 'rgba(255, 138, 91, 0.35)',
  },
  favoriteGlyphActive: {
    color: color.ember,
  },
  scrubberContainer: {
    marginVertical: space.xs,
  },
  scrubTrackHitbox: {
    height: 36,
    justifyContent: 'center',
    position: 'relative',
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
  scrubKnob: {
    position: 'absolute',
    top: '50%',
    marginTop: -7,
    width: 14,
    height: 14,
    borderRadius: radius.pill,
    backgroundColor: color.ink,
    borderWidth: 2,
    borderColor: color.ember,
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
  secondaryActive: {
    backgroundColor: 'rgba(255, 138, 91, 0.12)',
    borderRadius: radius.pill,
  },
  transportGlyph: {
    fontSize: 18,
    color: color.inkMuted,
  },
  glyphActive: {
    color: color.ember,
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
