import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';

export default function LoginAPIScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });

      const token = response.data.token;
      console.log('Token received:', token);
      
      await login(token);
      
      Alert.alert('Login Berhasil', 'Token tersimpan aman di Keychain!');
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.response?.status === 401) {
        Alert.alert('Error', 'API Key tidak valid atau tidak ditemukan');
      } else {
        Alert.alert('Login Gagal', 'Username atau password salah');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Secure</Text>
      <Text style={styles.subtitle}>Token disimpan aman di Keychain</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>
      <Text style={styles.info}>
        Username: {username} || Password: {password}
      </Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>Token: Keychain</Text>
        <Text style={styles.infoText}>API Key: Keychain</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, color: '#4CAF50', textAlign: 'center', marginBottom: 30, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 15, marginBottom: 15, backgroundColor: '#fff' },
  button: { backgroundColor: '#FF7043', padding: 15, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  buttonDisabled: { backgroundColor: '#FFB89A' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  infoBox: { backgroundColor: '#E8F5E9', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#4CAF50' },
  infoText: { fontSize: 12, color: '#2E7D32', marginBottom: 5 },
  info : { fontSize: 12, color: '#2E7D32', marginBottom: 5, textAlign: 'center' },
});
