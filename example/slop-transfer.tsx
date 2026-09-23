import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

// ❌ SLOP VERSION: What default LLMs emit without Bezel
// Features: 14 inline style objects, hardcoded top padding, floating cards with black blur,
// naked centered spinner, zero haptics, flat button, and apologetic error microcopy.

export function SlopTransferScreen() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('50');
  const [error, setError] = useState(false);

  if (loading) {
    // ❌ Slop: Naked centered spinner in a void
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    // ❌ Slop: Hardcoded status bar letterboxing (Gate 1 & 3)
    <View style={{ flex: 1, backgroundColor: '#F5F5F7', paddingTop: 12 }}>
      {/* ❌ Slop: Centered generic header with no native collapsible structure */}
      <View style={{ paddingHorizontal: 16, paddingBottom: 16, borderBottomWidth: 1, borderBottomColor: '#E5E5EA' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: '#000' }}>
          Transfer Money
        </Text>
      </View>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {/* ❌ Slop: Floating card slop with blurry black shadow (Gate 55) */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 12,
            padding: 16,
            marginBottom: 16,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <Text style={{ fontSize: 14, color: '#8E8E93', marginBottom: 8 }}>Enter Amount</Text>
          {/* ❌ Slop: Number without tabular-nums causing digit jitter */}
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            style={{ fontSize: 32, fontWeight: 'bold', color: '#000' }}
          />
        </View>

        <Text style={{ fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#000' }}>
          Recent Contacts
        </Text>

        {/* ❌ Slop: Every list item wrapped in an individual isolated floating card */}
        {['Alice Smith', 'Bob Jones', 'Charlie Brown'].map((name, index) => (
          <TouchableOpacity
            key={index}
            // ❌ Slop: Dead touch without haptics or scale depression
            onPress={() => {}}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 12,
              padding: 12,
              marginBottom: 8,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: '#007AFF',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>{name[0]}</Text>
            </View>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>{name}</Text>
          </TouchableOpacity>
        ))}

        {error && (
          // ❌ Slop: Banned apologetic error copy
          <View style={{ padding: 12, backgroundColor: '#FFE5E5', borderRadius: 8, marginTop: 12 }}>
            <Text style={{ color: '#FF3B30', fontSize: 14 }}>
              Oops! Something went wrong. Click here to try again.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* ❌ Slop: Flat action button not docked to keyboard and lacking haptics */}
      <View style={{ padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E5EA' }}>
        <TouchableOpacity
          onPress={() => setLoading(true)}
          style={{
            backgroundColor: '#007AFF',
            borderRadius: 8,
            paddingVertical: 14,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '600' }}>
            Submit Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
