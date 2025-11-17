import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetwork } from '../context/NetworkContext';

export default function OfflineBanner() {
  const { isOnline } = useNetwork();

  if (isOnline) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>Koneksi terputus. Masuk ke mode offline.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#D32F2F',
    padding: 12,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
});