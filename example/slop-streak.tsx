import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

export function SlopStreakScreen() {
  const [claimed, setClaimed] = useState(false);
  const [error, setError] = useState(false);

  return (
    // ❌ Slop: Hardcoded status bar letterboxing
    <View style={{ flex: 1, backgroundColor: '#F8F9FA', paddingTop: 45, paddingHorizontal: 16 }}>
      {/* ❌ Slop: Centered generic title */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#333' }}>
        Daily Streak
      </Text>

      <ScrollView style={{ flex: 1 }}>
        {/* ❌ Slop: Isolated floating card with blurry gray shadow */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 3,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 40, marginBottom: 8 }}>🔥</Text>
          <Text style={{ fontSize: 36, fontWeight: 'bold', color: '#111' }}>14</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>Days Active</Text>
        </View>

        {/* ❌ Slop: Another isolated card for weekly status */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 2,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
            Weekly Progress
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <View key={i} style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: '#777', marginBottom: 4 }}>{day}</Text>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: i < 5 ? '#3B82F6' : '#E5E7EB',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontSize: 12, color: '#FFF' }}>{i < 5 ? '✓' : ''}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {error && (
          // ❌ Slop: Banned apologetic error copy
          <View style={{ padding: 12, backgroundColor: '#FEE2E2', borderRadius: 8, marginBottom: 16 }}>
            <Text style={{ color: '#DC2626', fontSize: 13, textAlign: 'center' }}>
              Oops! Something went wrong while claiming your reward. Click here to try again.
            </Text>
          </View>
        )}

        {/* ❌ Slop: Flat standard button without haptics or spring */}
        <TouchableOpacity
          onPress={() => {
            if (!claimed) {
              setClaimed(true);
            } else {
              setError(true);
            }
          }}
          style={{
            backgroundColor: claimed ? '#9CA3AF' : '#F59E0B',
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
            {claimed ? 'Already Claimed Today' : 'Claim Reward'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
