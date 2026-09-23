import React, { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

// AI-slop OTP: six raw TextInputs, the OS keyboard, brittle focus jumps,
// no haptics, a glowing purple button, inline styles everywhere.
export function SlopOtpScreen() {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const refs = useRef<Array<TextInput | null>>([]);

  const setAt = (i: number, v: string) => {
    const next = [...digits];
    next[i] = v.slice(-1);
    setDigits(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7FB', padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginTop: 24 }}>🔐</Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginTop: 8,
        }}
      >
        Verify Your Identity
      </Text>
      <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 4, textAlign: 'center' }}>
        Please enter the 6-digit code we sent to your device.
      </Text>

      <View style={{ flexDirection: 'row', marginTop: 40, gap: 8 }}>
        {digits.map((d, i) => (
          <TextInput
            key={i}
            ref={(r) => (refs.current[i] = r)}
            value={d}
            onChangeText={(v) => setAt(i, v)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 44,
              height: 54,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#6C5CE7',
              backgroundColor: '#fff',
              textAlign: 'center',
              fontSize: 22,
              color: '#1a1a1a',
              shadowColor: '#6C5CE7',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 10,
              elevation: 5,
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: '#6C5CE7',
          borderRadius: 30,
          paddingVertical: 18,
          paddingHorizontal: 60,
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 30,
          shadowColor: '#6C5CE7',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 24,
          elevation: 12,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>Verify Now ✨</Text>
      </TouchableOpacity>
    </View>
  );
}
