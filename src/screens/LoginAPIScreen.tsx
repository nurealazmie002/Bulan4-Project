import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator 
} from 'react-native';
import apiClient from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { saveTokenSecure, getTokenSecure, resetTokenSecure } from '../utils/keychain';
import { checkBiometricAvailability, promptBiometricAuth } from '../utils/biometricUtils';

export default function LoginAPIScreen() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  const [biometricType, setBiometricType] = useState<string | null>(null);
  const [canUseBiometric, setCanUseBiometric] = useState(false);

  useEffect(() => {
    const initBio = async () => {
      const status = await checkBiometricAvailability();
      
      if (status.available) {
        setCanUseBiometric(true);
        setBiometricType(status.type || 'Biometrics');
      } else {
        setCanUseBiometric(false);
        if (status.error === 'NotEnrolled') {
          console.log('User belum daftar sidik jari di HP.');
        }
      }
    };
    initBio();
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await apiClient.post('/auth/login', {
        username, password, expiresInMins: 30,
      });
      const token = response.data.token;
      
      await saveTokenSecure(token);
      await login(token);
      
    } catch (error) {
      Alert.alert('Login Gagal', 'Cek username/password');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    const promptMsg = biometricType === 'FaceID' 
      ? 'Pindai Wajah untuk Masuk' 
      : 'Tempelkan Jari untuk Masuk';

    const { success, error } = await promptBiometricAuth(promptMsg);

    if (success) {
      const storedToken = await getTokenSecure();
      if (storedToken) {
        await login(storedToken);
      } else {
        Alert.alert('Info', 'Silakan login manual dulu sekali untuk menyimpan sesi.');
      }
    } else {
      if (error && (error.includes('Lockout') || error.includes('Too many attempts'))) {
        Alert.alert('Keamanan', 'Sensor terkunci. Login manual.');
        await resetTokenSecure(); 
      } else if (error !== 'UserCanceled') {
        Alert.alert('Gagal', 'Verifikasi gagal.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Secure</Text>
      <Text style={styles.subtitle}>Mini E-Commerce</Text>
      
      <TextInput 
        style={styles.input} 
        value={username} onChangeText={setUsername} 
        placeholder="Username" autoCapitalize='none' placeholderTextColor="#999"
      />
      <TextInput 
        style={styles.input} 
        value={password} onChangeText={setPassword} 
        placeholder="Password" secureTextEntry placeholderTextColor="#999"
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff"/> : <Text style={styles.text}>Masuk</Text>}
      </TouchableOpacity>

      {canUseBiometric && (
        <TouchableOpacity style={styles.bioButton} onPress={handleBiometricLogin}>
          <Text style={{ fontSize: 24 }}>👆</Text> 
          <Text style={styles.bioText}>
            Login dengan {biometricType === 'FaceID' ? 'Wajah' : 'Sidik Jari'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 5, textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', padding: 15, borderRadius: 10, marginBottom: 15, color: '#333', backgroundColor: '#FAFAFA' },
  button: { backgroundColor: '#FF7043', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  
  bioButton: { 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', 
    marginTop: 30, padding: 12, 
    borderWidth: 1.5, borderColor: '#FF7043', borderRadius: 12,
    backgroundColor: '#FFF3E0'
  },
  bioText: { marginLeft: 10, color: '#FF7043', fontWeight: 'bold', fontSize: 15 }
});