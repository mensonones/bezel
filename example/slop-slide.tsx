import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

// AI-slop confirm: a flat button that commits a $1,240 payment on a single
// tap — no travel, no weight, no proof of intent. Inline styles, glow shadow.
export function SlopSlideScreen() {
  const [sent, setSent] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F7FB', padding: 20 }}>
      <View
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          padding: 24,
          marginTop: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.12,
          shadowRadius: 24,
          elevation: 8,
        }}
      >
        <Text style={{ fontSize: 13, color: '#8E8E93', fontWeight: '600' }}>PAYING</Text>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', marginTop: 6 }}>
          Ada Lovelace
        </Text>
        <Text style={{ fontSize: 14, color: '#8E8E93', marginTop: 2 }}>
          @ada · Analytical Engine Co.
        </Text>
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: '#1a1a1a', marginTop: 20 }}>
          $1,240
        </Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setSent(true)}
        style={{
          backgroundColor: sent ? '#34C759' : '#6C5CE7',
          borderRadius: 16,
          paddingVertical: 18,
          alignItems: 'center',
          marginTop: 'auto',
          marginBottom: 30,
          shadowColor: sent ? '#34C759' : '#6C5CE7',
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.5,
          shadowRadius: 24,
          elevation: 12,
        }}
      >
        <Text style={{ color: '#fff', fontSize: 17, fontWeight: '600' }}>
          {sent ? 'Payment Sent! 🎉' : 'Confirm Payment'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
