import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export function SlopNowPlayingScreen() {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);

  return (
    // ❌ Slop: Hardcoded status bar padding, ignores safe area
    <View style={{ flex: 1, backgroundColor: '#1E1B2E', paddingTop: 45, paddingHorizontal: 20 }}>
      {/* ❌ Slop: Generic centered title bar */}
      <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 20 }}>
        Playing Audio
      </Text>

      {/* ❌ Slop: Card fatigue with heavy neon purple drop shadow */}
      <View
        style={{
          width: 280,
          height: 280,
          backgroundColor: '#2A2438',
          borderRadius: 16,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#A855F7',
          shadowOpacity: 0.5,
          shadowRadius: 20,
          elevation: 8,
          marginBottom: 30,
        }}
      >
        <Text style={{ fontSize: 50, color: '#A855F7' }}>🎵</Text>
      </View>

      {/* ❌ Slop: Floating card wrapping metadata */}
      <View
        style={{
          backgroundColor: '#2A2438',
          borderRadius: 12,
          padding: 16,
          marginBottom: 20,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#FFF' }}>Solaris Horizon</Text>
        <Text style={{ fontSize: 14, color: '#A09CB0', marginTop: 4 }}>Cortex & The Void Ensemble</Text>
      </View>

      {/* ❌ Slop: Tiny scrub bar, jittery non-tabular numbers */}
      <View style={{ marginBottom: 30 }}>
        <View style={{ height: 4, backgroundColor: '#3E3753', borderRadius: 2, marginBottom: 8 }}>
          <View style={{ width: '45%', height: '100%', backgroundColor: '#A855F7' }} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12, color: '#A09CB0' }}>02:41</Text>
          <Text style={{ fontSize: 12, color: '#A09CB0' }}>-01:24</Text>
        </View>
      </View>

      {/* ❌ Slop: Dead buttons without haptics or spring depression */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
        <TouchableOpacity
          onPress={() => setError(true)}
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#3E3753', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFF', fontSize: 18 }}>⏮</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setPlaying(!playing)}
          style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: '#A855F7', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFF', fontSize: 24 }}>{playing ? '⏸' : '▶'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setError(true)}
          style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#3E3753', alignItems: 'center', justifyContent: 'center' }}
        >
          <Text style={{ color: '#FFF', fontSize: 18 }}>⏭</Text>
        </TouchableOpacity>
      </View>

      {error && (
        <View style={{ marginTop: 20, padding: 12, backgroundColor: '#FFE5E5', borderRadius: 8 }}>
          <Text style={{ color: '#FF3B30', fontSize: 13, textAlign: 'center' }}>
            Oops! Something went wrong with audio streaming. Click here to retry.
          </Text>
        </View>
      )}
    </View>
  );
}
