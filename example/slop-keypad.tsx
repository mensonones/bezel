import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

// AI-slop currency entry: a raw numeric TextInput, the OS keyboard, no
// formatting, no haptics, a gradient-ish glowing button, inline styles.
export function SlopKeypadScreen() {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7FB', padding: 20, alignItems: 'center' }}>
      <Text style={{ fontSize: 40, marginTop: 30 }}>💰</Text>
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#1a1a1a',
          marginTop: 8,
          textAlign: 'center',
        }}
      >
        Enter Amount
      </Text>
      <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 4, textAlign: 'center' }}>
        Type the amount you want to send below 👇
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          borderWidth: 2,
          borderColor: '#6C5CE7',
          paddingHorizontal: 18,
          marginTop: 40,
          width: '100%',
          shadowColor: '#6C5CE7',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.35,
          shadowRadius: 20,
          elevation: 10,
        }}
      >
        <Text style={{ fontSize: 32, color: '#6C5CE7', fontWeight: 'bold' }}>$</Text>
        <TextInput
          value={value}
          onChangeText={setValue}
          keyboardType="numeric"
          placeholder="0.00"
          placeholderTextColor="#C7C7CC"
          style={{ flex: 1, fontSize: 32, padding: 16, color: '#1a1a1a' }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 1400);
        }}
        style={{
          backgroundColor: '#6C5CE7',
          borderRadius: 30,
          paddingVertical: 18,
          width: '100%',
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
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>
            Continue ✨
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
