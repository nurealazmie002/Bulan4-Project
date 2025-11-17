import React, { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log('🔴 ERROR CAUGHT BY BOUNDARY:');
    console.log('Error:', error.toString());
    console.log('Component Stack:', errorInfo.componentStack);
  }

  handleRestart = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.icon}>⚠️</Text>
          <Text style={styles.title}>Aplikasi Mengalami Masalah Tak Terduga</Text>
          <Text style={styles.message}>
            Terjadi kesalahan saat menampilkan halaman ini
          </Text>
          {__DEV__ && this.state.error && (
            <Text style={styles.error}>{this.state.error.toString()}</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={this.handleRestart}>
            <Text style={styles.buttonText}>🔄 Mulai Ulang Aplikasi</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 20,
  },
  icon: { fontSize: 80, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 10 },
  message: { fontSize: 14, color: '#666', textAlign: 'center', marginBottom: 20 },
  error: { fontSize: 12, color: '#D32F2F', textAlign: 'center', marginBottom: 20, padding: 10, backgroundColor: '#FFEBEE' },
  button: { backgroundColor: '#FF7043', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 10 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});