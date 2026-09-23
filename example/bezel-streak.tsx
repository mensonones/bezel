/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
} from 'react-native-reanimated';
import { color, space, radius, type, mono, spring } from './theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const DAYS = [
  { day: 'M', completed: true },
  { day: 'T', completed: true },
  { day: 'W', completed: true },
  { day: 'T', completed: true },
  { day: 'F', completed: true },
  { day: 'S', completed: false, isToday: true },
  { day: 'S', completed: false },
];

export function BezelStreakScreen() {
  const insets = useSafeAreaInsets();
  const [streakCount, setStreakCount] = useState(14);
  const [checkedIn, setCheckedIn] = useState(false);

  const flameScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const flameStyle = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleCheckIn = useCallback(() => {
    if (checkedIn) return;

    // Tactile multi-stage celebration feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    flameScale.value = withSequence(
      withSpring(1.35, spring.bouncy),
      withSpring(1.0, spring.gentle),
    );

    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }, 180);

    setCheckedIn(true);
    setStreakCount((prev) => prev + 1);
  }, [checkedIn, flameScale]);

  return (
    <View style={styles.root}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: space.lg,
            paddingBottom: insets.bottom + space.xxl,
          },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Milestone Hero with dynamic flame physics */}
        <View style={styles.heroSection}>
          <Animated.View style={[styles.flameBadge, flameStyle]}>
            <Text style={styles.flameEmoji}>🔥</Text>
          </Animated.View>
          <View style={styles.counterRow}>
            <Text style={styles.countText}>{streakCount}</Text>
            <Text style={styles.unitText}>DAYS</Text>
          </View>
          <Text style={styles.subtitleText}>Consistency unlocks mastery</Text>
        </View>

        {/* Weekly Tactile Habit Track */}
        <View style={styles.cardSection}>
          <Text style={styles.sectionHeader}>THIS WEEK</Text>
          <View style={styles.daysRow}>
            {DAYS.map((d, i) => {
              const active = d.isToday ? checkedIn : d.completed;
              return (
                <View key={i} style={styles.dayCol}>
                  <Text style={[styles.dayLabel, d.isToday && styles.dayLabelToday]}>
                    {d.day}
                  </Text>
                  <View
                    style={[
                      styles.dayDot,
                      active && styles.dayDotActive,
                      d.isToday && !checkedIn && styles.dayDotTodayPulse,
                    ]}
                  >
                    <Text style={[styles.dayCheck, active && styles.dayCheckActive]}>
                      {active ? '✓' : '•'}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Milestone Inset Card */}
        <View style={styles.rewardCard}>
          <View style={styles.rewardHeader}>
            <Text style={styles.rewardTitle}>Next Milestone: 21 Days</Text>
            <Text style={styles.rewardCounter}>
              {streakCount} / 21
            </Text>
          </View>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, (streakCount / 21) * 100)}%` },
              ]}
            />
          </View>
          <Text style={styles.rewardPerk}>Unlocks Bronze Collector Badge</Text>
        </View>

        {/* Interactive Bouncy Check-in Action in Thumb Zone */}
        <View style={styles.actionDock}>
          <AnimatedPressable
            onPressIn={() => (buttonScale.value = withSpring(0.94, spring.snappy))}
            onPressOut={() => (buttonScale.value = withSpring(1, spring.snappy))}
            onPress={handleCheckIn}
            disabled={checkedIn}
            style={[
              styles.checkInButton,
              checkedIn && styles.checkInButtonDone,
              buttonStyle,
            ]}
          >
            <Text
              style={[
                styles.checkInButtonText,
                checkedIn && styles.checkInButtonTextDone,
              ]}
            >
              {checkedIn ? '✓ Streak Logged for Today' : 'Claim Daily Check-in (+1)'}
            </Text>
          </AnimatedPressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scrollContent: {
    paddingHorizontal: space.lg,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: space.xl,
  },
  flameBadge: {
    width: 88,
    height: 88,
    borderRadius: radius.pill,
    backgroundColor: 'rgba(245, 200, 113, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 200, 113, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.md,
  },
  flameEmoji: {
    fontSize: 44,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: space.xs + 2,
  },
  countText: {
    fontSize: 54,
    fontWeight: '800',
    color: color.ink,
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  unitText: {
    fontSize: 20,
    fontWeight: '700',
    color: color.amber,
    letterSpacing: 1,
  },
  subtitleText: {
    ...type.body,
    color: color.inkMuted,
    marginTop: space.xs,
  },
  cardSection: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: space.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
    marginBottom: space.lg,
  },
  sectionHeader: {
    ...type.overline,
    color: color.inkFaint,
    marginBottom: space.md,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCol: {
    alignItems: 'center',
    gap: space.xs + 2,
  },
  dayLabel: {
    ...type.caption,
    color: color.inkMuted,
    fontWeight: '600',
  },
  dayLabelToday: {
    color: color.amber,
    fontWeight: '700',
  },
  dayDot: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceHi,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotActive: {
    backgroundColor: color.amber,
    borderColor: color.amber,
  },
  dayDotTodayPulse: {
    borderColor: color.amber,
    borderWidth: 1.5,
  },
  dayCheck: {
    fontSize: 14,
    color: color.inkFaint,
    fontWeight: '700',
  },
  dayCheckActive: {
    color: color.bg,
  },
  rewardCard: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: space.lg,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
    marginBottom: space.xl,
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: space.sm,
  },
  rewardTitle: {
    ...type.headline,
    color: color.ink,
    fontSize: 15,
  },
  rewardCounter: {
    ...type.caption,
    color: color.amber,
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
    fontWeight: '700',
  },
  progressTrack: {
    height: 6,
    backgroundColor: color.surfaceHi,
    borderRadius: radius.pill,
    overflow: 'hidden',
    marginBottom: space.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: color.amber,
    borderRadius: radius.pill,
  },
  rewardPerk: {
    ...type.caption,
    color: color.inkMuted,
  },
  actionDock: {
    paddingTop: space.sm,
  },
  checkInButton: {
    height: 56,
    borderRadius: radius.xl,
    backgroundColor: color.amber,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInButtonDone: {
    backgroundColor: color.surfaceHi,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  checkInButtonText: {
    ...type.headline,
    color: color.bg,
    fontWeight: '700',
  },
  checkInButtonTextDone: {
    color: color.inkMuted,
    fontWeight: '600',
  },
});
