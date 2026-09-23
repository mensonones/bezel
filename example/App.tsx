import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

import { SlopTransferScreen } from './slop-transfer';
import { BezelTransferScreen } from './bezel-transfer';

export default function App() {
  const getInitialMode = (): 'bezel' | 'slop' => {
    if (typeof window !== 'undefined' && window.location?.search?.includes('mode=slop')) {
      return 'slop';
    }
    return 'bezel';
  };

  const [mode, setMode] = useState<'bezel' | 'slop'>(getInitialMode);
  const hideToggle = typeof window !== 'undefined' && window.location?.search?.includes('hideToggle=true');

  const handleToggle = (newMode: 'bezel' | 'slop') => {
    Haptics.selectionAsync();
    setMode(newMode);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style={mode === 'bezel' ? 'light' : 'dark'} />
        <View style={styles.container}>
          {/* Active Screen */}
          <View style={styles.screenWrapper}>
            {mode === 'bezel' ? <BezelTransferScreen /> : <SlopTransferScreen />}
          </View>

          {/* Floating Switcher Bar to test difference */}
          {!hideToggle && (
            <SafeAreaView edges={['top']} style={styles.floatingSwitcherContainer}>
              <View style={styles.toggleBar}>
                <Pressable
                  onPress={() => handleToggle('slop')}
                  style={[styles.toggleButton, mode === 'slop' && styles.toggleActiveSlop]}
                >
                  <Text style={[styles.toggleText, mode === 'slop' && styles.toggleTextActive]}>
                    ❌ AI-Slop Mode
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => handleToggle('bezel')}
                  style={[styles.toggleButton, mode === 'bezel' && styles.toggleActiveBezel]}
                >
                  <Text style={[styles.toggleText, mode === 'bezel' && styles.toggleTextActive]}>
                    ✨ Bezel Craft
                  </Text>
                </Pressable>
              </View>
            </SafeAreaView>
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  screenWrapper: {
    flex: 1,
  },
  floatingSwitcherContainer: {
    position: 'absolute',
    top: 50,
    left: 16,
    right: 16,
    alignItems: 'center',
    zIndex: 9999,
  },
  toggleBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(28, 28, 30, 0.95)',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  toggleActiveSlop: {
    backgroundColor: '#FF453A',
  },
  toggleActiveBezel: {
    backgroundColor: '#0A84FF',
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
  },
  toggleTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
