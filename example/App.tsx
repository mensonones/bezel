/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import * as Haptics from 'expo-haptics';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { color, space, radius, type, spring } from './theme';
import { DemoShell, Mode } from './components/DemoShell';

import { BezelTransferScreen } from './bezel-transfer';
import { SlopTransferScreen } from './slop-transfer';
import { BezelKeypadScreen } from './bezel-keypad';
import { SlopKeypadScreen } from './slop-keypad';
import { BezelOtpScreen } from './bezel-otp';
import { SlopOtpScreen } from './slop-otp';
import { BezelSlideScreen } from './bezel-slide';
import { SlopSlideScreen } from './slop-slide';
import { BezelNowPlayingScreen } from './bezel-nowplaying';
import { SlopNowPlayingScreen } from './slop-nowplaying';
import { BezelStreakScreen } from './bezel-streak';
import { SlopStreakScreen } from './slop-streak';

type Demo = {
  id: string;
  title: string;
  genre: string;
  blurb: string;
  accent: string;
  Bezel: React.ComponentType;
  Slop: React.ComponentType;
};

const DEMOS: Demo[] = [
  {
    id: 'transfer',
    title: 'Send money',
    genre: 'G1 · Tactile utility',
    blurb: 'Recipients, amount, and a confirm that feels like weight.',
    accent: color.periwinkle,
    Bezel: BezelTransferScreen,
    Slop: SlopTransferScreen,
  },
  {
    id: 'keypad',
    title: 'Amount keypad',
    genre: 'D03 · Currency entry',
    blurb: 'A custom pad with tabular figures and per-key haptics.',
    accent: color.mint,
    Bezel: BezelKeypadScreen,
    Slop: SlopKeypadScreen,
  },
  {
    id: 'otp',
    title: 'Verification code',
    genre: 'D02 · One-time code',
    blurb: 'Six cells that fill with a spring, not a caret blink.',
    accent: color.violet,
    Bezel: BezelOtpScreen,
    Slop: SlopOtpScreen,
  },
  {
    id: 'slide',
    title: 'Slide to confirm',
    genre: 'A02 · Commit gesture',
    blurb: 'Intent proven by travel — the finger follows the glass.',
    accent: color.periwinkle,
    Bezel: BezelSlideScreen,
    Slop: SlopSlideScreen,
  },
  {
    id: 'nowplaying',
    title: 'Now playing',
    genre: 'G3 · Atmospheric',
    blurb: 'Art-led, a scrubber you can grab, colour bled from the cover.',
    accent: color.ember,
    Bezel: BezelNowPlayingScreen,
    Slop: SlopNowPlayingScreen,
  },
  {
    id: 'streak',
    title: 'Daily streak',
    genre: 'G4 · Expressive',
    blurb: 'A check-in worth the tap: it springs, it rewards, it counts.',
    accent: color.amber,
    Bezel: BezelStreakScreen,
    Slop: SlopStreakScreen,
  },
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function DemoCard({ demo, onOpen }: { demo: Demo; onOpen: () => void }) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const open = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onOpen();
  }, [onOpen]);
  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.97, spring.snappy))}
      onPressOut={() => (scale.value = withSpring(1, spring.snappy))}
      onPress={open}
      style={[styles.card, style]}
    >
      <View style={[styles.cardDot, { backgroundColor: demo.accent }]} />
      <View style={styles.cardText}>
        <Text style={[styles.cardGenre, { color: demo.accent }]}>{demo.genre}</Text>
        <Text style={styles.cardTitle}>{demo.title}</Text>
        <Text style={styles.cardBlurb}>{demo.blurb}</Text>
      </View>
      <Text style={styles.cardChevron}>›</Text>
    </AnimatedPressable>
  );
}

const FILTERS = ['All', 'G1 Utility', 'G3 Media', 'G4 Habits', 'Patterns'] as const;
type Filter = (typeof FILTERS)[number];

function Home({ onOpen }: { onOpen: (id: string) => void }) {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<Filter>('All');

  const filteredDemos = DEMOS.filter((d) => {
    if (filter === 'All') return true;
    if (filter === 'G1 Utility') return d.id === 'transfer';
    if (filter === 'G3 Media') return d.id === 'nowplaying';
    if (filter === 'G4 Habits') return d.id === 'streak';
    if (filter === 'Patterns') return ['keypad', 'otp', 'slide'].includes(d.id);
    return true;
  });

  return (
    <ScrollView
      style={styles.homeRoot}
      contentContainerStyle={[
        styles.homeContent,
        { paddingTop: insets.top + space.xl, paddingBottom: insets.bottom + space.xxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>BEZEL · SHOWCASE</Text>
      <Text style={styles.hero}>Six screens,{'\n'}two ways to build them.</Text>
      <Text style={styles.lede}>
        Every demo ships a Bezel build and its AI-slop twin. Toggle between them and
        feel the difference in your thumb.
      </Text>

      {/* Tactile Genre Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <Pressable
              key={f}
              onPress={() => {
                Haptics.selectionAsync();
                setFilter(f);
              }}
              style={[styles.filterChip, active && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, active && styles.filterChipTextActive]}>
                {f}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.list}>
        {filteredDemos.map((d) => (
          <DemoCard key={d.id} demo={d} onOpen={() => onOpen(d.id)} />
        ))}
      </View>
    </ScrollView>
  );
}

function Root() {
  const [screen, setScreen] = useState<string>('home');
  const [modes, setModes] = useState<Record<string, Mode>>({});

  const goHome = useCallback(() => setScreen('home'), []);
  const open = useCallback((id: string) => setScreen(id), []);

  if (screen === 'home') {
    return <Home onOpen={open} />;
  }

  const demo = DEMOS.find((d) => d.id === screen)!;
  const mode = modes[demo.id] ?? 'bezel';
  const Screen = mode === 'bezel' ? demo.Bezel : demo.Slop;

  return (
    <DemoShell
      title={demo.title}
      genre={demo.genre}
      accent={demo.accent}
      mode={mode}
      onChangeMode={(m) => setModes((prev) => ({ ...prev, [demo.id]: m }))}
      onBack={goHome}
    >
      <Screen />
    </DemoShell>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Root />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: color.bg },
  homeRoot: { flex: 1, backgroundColor: color.bg },
  homeContent: { paddingHorizontal: space.lg },
  eyebrow: { ...type.overline, color: color.periwinkle, marginBottom: space.md },
  hero: { ...type.display, color: color.ink, lineHeight: 40 },
  lede: {
    ...type.body,
    color: color.inkMuted,
    marginTop: space.md,
    lineHeight: 22,
  },
  list: { marginTop: space.xl, gap: space.md },
  filterRow: {
    flexDirection: 'row',
    gap: space.sm,
    marginTop: space.lg,
  },
  filterChip: {
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 3,
    borderRadius: radius.pill,
    backgroundColor: color.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  filterChipActive: {
    backgroundColor: color.periwinkle,
    borderColor: color.periwinkle,
  },
  filterChipText: {
    ...type.caption,
    color: color.inkMuted,
    fontWeight: '600',
  },
  filterChipTextActive: {
    color: color.bg,
    fontWeight: '700',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    padding: space.lg,
    gap: space.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
  },
  cardDot: { width: 10, height: 10, borderRadius: radius.pill },
  cardText: { flex: 1 },
  cardGenre: { ...type.overline, textTransform: 'uppercase' },
  cardTitle: { ...type.title, color: color.ink, marginTop: 4 },
  cardBlurb: { ...type.caption, color: color.inkMuted, marginTop: 4, lineHeight: 18 },
  cardChevron: { fontSize: 26, color: color.inkFaint, fontWeight: '400' },
});
