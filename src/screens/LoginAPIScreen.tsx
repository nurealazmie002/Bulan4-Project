import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import apiClient from '../api/apiClient';

export default function LoginAPIScreen({ navigation }: any) {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass')
  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
      });

      console.log('Token:', response.data.token);
      Alert.alert(' Login Berhasil', `Token: ${response.data.token}`);
      navigation.navigate('Main');
    } catch (error) {
      Alert.alert(' Login Gagal', 'Username atau password salah');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login API</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Login'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 10, padding: 15, marginBottom: 15, backgroundColor: '#fff' , color: '#000' },
  button: { backgroundColor: '#FF7043', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#FFB89A' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});