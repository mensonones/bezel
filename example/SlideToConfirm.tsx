import React, { useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  interpolateColor,
  Extrapolation,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { color, space, radius, spring, type } from './theme';

interface SlideToConfirmProps {
  label: string;
  onConfirm: () => void;
}

const KNOB_SIZE = 48;
const PADDING = 4;

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
        translateX.value = withSpring(maxTranslate, spring.snappy);
        isComplete.value = true;
        runOnJS(triggerConfirm)();
      } else {
        translateX.value = withSpring(0, spring.gentle);
      }
    });

  const knobStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      translateX.value,
      [0, maxTranslate * 0.65, maxTranslate * 0.9],
      [color.periwinkle, color.periwinkle, color.mint]
    );
    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor: bgColor,
    };
  });

  const textStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, maxTranslate * 0.5], [1, 0], Extrapolation.CLAMP),
  }));

  const arrowStyle = useAnimatedStyle(() => {
    const rot = interpolate(translateX.value, [0, maxTranslate * 0.85], [0, 90], Extrapolation.CLAMP);
    return {
      transform: [{ rotate: `${rot}deg` }],
    };
  });

  return (
    <View onLayout={handleLayout} style={styles.track}>
      <Animated.Text style={[styles.label, textStyle]}>{label}</Animated.Text>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.knob, knobStyle]}>
          <Animated.Text style={[styles.arrow, arrowStyle]}>→</Animated.Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  track: {
    height: 56,
    backgroundColor: color.surface,
    borderRadius: radius.pill,
    padding: PADDING,
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.hairlineStrong,
  },
  label: {
    ...type.body,
    position: 'absolute',
    alignSelf: 'center',
    color: color.inkMuted,
    fontWeight: '600',
  },
  knob: {
    width: KNOB_SIZE,
    height: KNOB_SIZE,
    borderRadius: radius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  arrow: {
    color: color.bg,
    fontSize: 20,
    fontWeight: '700',
  },
});
