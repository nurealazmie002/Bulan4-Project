import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  ActivityIndicator 
} from 'react-native';
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

      await login(response.data.token);
    } catch (error) {
      Alert.alert('Login Gagal', 'Cek username/password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login Secure</Text>
      <Text style={styles.subtitle}>Mini E-Commerce</Text>
      
      <TextInput 
        style={styles.input} 
        value={username} 
        onChangeText={setUsername} 
        placeholder="Username" 
        autoCapitalize='none'
        placeholderTextColor="#999"
      />
      <TextInput 
        style={styles.input} 
        value={password} 
        onChangeText={setPassword} 
        placeholder="Password" 
        secureTextEntry
        placeholderTextColor="#999"
      />
      <Text style={styles.subtitle}> username: emilys || password: emilyspass</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff"/> 
        ) : (
          <Text style={styles.text}>Masuk</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 5, textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
  input: { 
    borderWidth: 1, 
    borderColor: '#E0E0E0', 
    padding: 15, 
    borderRadius: 10, 
    marginBottom: 15, 
    color: '#333',
    backgroundColor: '#FAFAFA'
  },
  button: { 
    backgroundColor: '#FF7043', 
    padding: 15, 
    borderRadius: 10, 
    alignItems: 'center',
    marginTop: 10,
    elevation: 2
  },
  text: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  subtitles: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 30 },
});