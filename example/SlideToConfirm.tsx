import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

interface SlideToConfirmProps {
  label: string;
  onConfirm: () => void;
}

const KNOB_SIZE = 48;
const PADDING = 4;
const SPRING_CONFIG = { damping: 20, stiffness: 250, mass: 0.8 };

export const SlideToConfirm: React.FC<SlideToConfirmProps> = ({ label, onConfirm }) => {
  const [trackWidth, setTrackWidth] = useState(0);
  const translateX = useSharedValue(0);
  const isComplete = useSharedValue(false);

  const maxTranslate = Math.max(0, trackWidth - KNOB_SIZE - PADDING * 2);

  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const triggerConfirm = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onConfirm();
  };

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      if (isComplete.value) return;
      translateX.value = Math.min(Math.max(0, e.translationX), maxTranslate);
    })
    .onEnd(() => {
      if (isComplete.value) return;
      if (translateX.value > maxTranslate * 0.85) {
        translateX.value = withSpring(maxTranslate, SPRING_CONFIG);
        isComplete.value = true;
        runOnJS(triggerConfirm)();
      } else {
        translateX.value = withSpring(0, SPRING_CONFIG);
      }
    });

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, maxTranslate * 0.6], [1, 0], Extrapolation.CLAMP),
  }));

  return (
    <View onLayout={handleLayout} style={styles.track}>
      <Animated.Text style={[styles.label, textStyle]}>{label}</Animated.Text>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.knob, knobStyle]}>
          <Text style={styles.arrow}>→</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 56,
    backgroundColor: '#1C1C1E',
    borderRadius: 28,
    padding: PADDING,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  label: {
    position: 'absolute',
    alignSelf: 'center',
    color: '#8E8E93',
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: KNOB_SIZE / 2,
    backgroundColor: '#0A84FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
  },
});
