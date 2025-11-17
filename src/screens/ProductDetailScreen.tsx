import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from 'react-native';
import Toast from 'react-native-simple-toast';
import apiClient from '../api/apiClient';

const FALLBACK_PRODUCT = {
  id: 0,
  title: 'Produk Arsip',
  price: 99,
  thumbnail: 'https://via.placeholder.com/300',
  description: 'Data produk tidak tersedia. Ini adalah versi arsip.',
  rating: 0,
};

export default function ProductDetailScreen({ route }: any) {
  const { productId } = route.params || { productId: 1 };
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await apiClient.get(`/products/${productId}`);
        setProduct(response.data);
      } catch (error: any) {
        const status = error.response?.status;
        
        if (status === 404) {
          console.log('🔴 Error 404: Produk tidak ditemukan');
        } else if (status === 500) {
          console.log('🔴 Error 500: Server error');
        }
        
        setProduct(FALLBACK_PRODUCT);
        Toast.show('⚠️ Gagal memuat data terbaru. Menampilkan versi arsip.', Toast.LONG);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7043" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.rating}>⭐{product.rating || 'N/A'}</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 300, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  price: { fontSize: 28, fontWeight: 'bold', color: '#FF7043', marginBottom: 10 },
  rating: { fontSize: 16, marginBottom: 15 },
  description: { fontSize: 14, color: '#666', lineHeight: 20 },
});