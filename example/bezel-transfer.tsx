/* Bezel · pre-emit critique: T5 B5 P5 H5 G5 R5 */
import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { SlideToConfirm } from './SlideToConfirm';
import { color, space, radius, type, mono, spring } from './theme';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const RECENT_CONTACTS = [
  { id: '1', name: 'Alice Smith', tag: '@alice', initials: 'AS' },
  { id: '2', name: 'Bob Jones', tag: '@bob_j', initials: 'BJ' },
  { id: '3', name: 'Charlie Brown', tag: '@charlie', initials: 'CB' },
];

const CHIPS = [10, 25, 50, 100];

function Chip({
  value,
  onAdd,
}: {
  value: number;
  onAdd: (val: number) => void;
}) {
  const scale = useSharedValue(1);
  const style = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const handlePress = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAdd(value);
  }, [value, onAdd]);

  return (
    <AnimatedPressable
      onPressIn={() => (scale.value = withSpring(0.92, spring.snappy))}
      onPressOut={() => (scale.value = withSpring(1, spring.snappy))}
      onPress={handlePress}
      style={[styles.chip, style]}
    >
      <Text style={styles.chipText}>+${value}</Text>
    </AnimatedPressable>
  );
}

export function BezelTransferScreen() {
  const insets = useSafeAreaInsets();
  const safeBottom = insets.bottom || 34;
  const [selectedContact, setSelectedContact] = useState(RECENT_CONTACTS[0]);
  const [cents, setCents] = useState(5000); // $50.00

  const handleSelect = useCallback((contact: typeof RECENT_CONTACTS[0]) => {
    Haptics.selectionAsync();
    setSelectedContact(contact);
  }, []);

  const handleAdd = useCallback((addedDollars: number) => {
    setCents((prev) => prev + addedDollars * 100);
  }, []);

  const formattedAmount = (cents / 100).toFixed(2);

  const handleConfirm = useCallback(() => {
    console.log(`Transferred $${formattedAmount} to ${selectedContact.name}`);
  }, [formattedAmount, selectedContact]);

  return (
    <View style={styles.canvas}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: space.sm,
            paddingBottom: safeBottom + 110,
          },
        ]}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
      >
        <View style={styles.header}>
          <Text style={styles.largeTitle}>Transfer Funds</Text>
          <Text style={styles.subtitle}>Instant Zero-Fee Settlement</Text>
        </View>

        {/* Hero Amount Display (Tabular Figures) */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>
          <Text style={styles.amountDisplay}>{formattedAmount}</Text>
        </View>

        {/* Tactile Quick Add Chips */}
        <View style={styles.chipRow}>
          {CHIPS.map((chipVal) => (
            <Chip key={chipVal} value={chipVal} onAdd={handleAdd} />
          ))}
        </View>

        {/* Inset Grouped Recipient Table */}
        <Text style={styles.sectionLabel}>RECENT RECIPIENTS</Text>
        <View style={styles.groupedContainer}>
          {RECENT_CONTACTS.map((contact, idx) => {
            const isSelected = selectedContact.id === contact.id;
            const isLast = idx === RECENT_CONTACTS.length - 1;

            return (
              <ContactRow
                key={contact.id}
                contact={contact}
                isSelected={isSelected}
                isLast={isLast}
                onPress={() => handleSelect(contact)}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Dock with Slide to Confirm */}
      <View style={[styles.bottomDock, { paddingBottom: safeBottom + space.sm }]}>
        <SlideToConfirm
          label={`Slide to send $${formattedAmount}`}
          onConfirm={handleConfirm}
        />
      </View>
    </View>
  );
}

function ContactRow({
  contact,
  isSelected,
  isLast,
  onPress,
}: {
  contact: typeof RECENT_CONTACTS[0];
  isSelected: boolean;
  isLast: boolean;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scale.value = withSpring(0.97, spring.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1.0, spring.snappy);
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.row, isSelected && styles.rowSelected]}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{contact.initials}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactTag}>{contact.tag}</Text>
        </View>
        {isSelected && <Text style={styles.checkMark}>✓</Text>}
      </Pressable>
      {!isLast && <View style={styles.divider} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    backgroundColor: color.bg,
  },
  scrollContent: {
    paddingHorizontal: space.lg,
  },
  header: {
    marginBottom: space.lg,
  },
  largeTitle: {
    ...type.display,
    color: color.ink,
  },
  subtitle: {
    ...type.body,
    color: color.inkMuted,
    marginTop: space.xs,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    paddingVertical: space.md,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: '600',
    color: color.inkMuted,
    marginRight: space.xs,
  },
  amountDisplay: {
    fontSize: 54,
    fontWeight: '700',
    color: color.ink,
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
    letterSpacing: -1,
  },
  chipRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: space.sm,
    marginBottom: space.xl,
  },
  chip: {
    backgroundColor: color.surface,
    paddingHorizontal: space.md,
    paddingVertical: space.xs + 2,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  chipText: {
    ...type.caption,
    fontFamily: mono,
    fontVariant: ['tabular-nums'],
    color: color.periwinkle,
    fontWeight: '700',
  },
  sectionLabel: {
    ...type.overline,
    color: color.inkFaint,
    marginBottom: space.sm,
    marginLeft: space.xs,
  },
  groupedContainer: {
    backgroundColor: color.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairline,
  },
  row: {
    minHeight: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: space.lg,
    paddingVertical: space.sm + 2,
  },
  rowSelected: {
    backgroundColor: 'rgba(122, 162, 247, 0.08)',
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceHi,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: space.md,
  },
  avatarText: {
    color: color.ink,
    fontWeight: '600',
    fontSize: 14,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    ...type.headline,
    color: color.ink,
  },
  contactTag: {
    ...type.caption,
    color: color.inkMuted,
    marginTop: 2,
  },
  checkMark: {
    color: color.periwinkle,
    fontSize: 18,
    fontWeight: '700',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: color.hairline,
    marginLeft: 66,
  },
  bottomDock: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(11, 11, 15, 0.94)',
    paddingHorizontal: space.lg,
    paddingTop: space.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: color.hairline,
  },
});
