import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, TouchableOpacity, Alert, Dimensions } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import apiClient from '../api/apiClient';
import { useCart } from '../context/CartContext';

export default function ProductListAPIScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [connectionType, setConnectionType] = useState('');
  const [numColumns, setNumColumns] = useState(2);
  const { addToCart } = useCart();

  useEffect(() => {
    const updateLayout = () => {
      const { width, height } = Dimensions.get('window');
      setNumColumns(width > height ? 3 : 2);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);
    updateLayout();

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProducts = async () => {
      try {
        const netInfo = await NetInfo.fetch();
        setConnectionType(netInfo.type || 'unknown');

        if (!netInfo.isInternetReachable) {
          setError('Anda sedang Offline. Cek koneksi Anda.');
          setLoading(false);
          return;
        }

        const response = await apiClient.get('/products', {
          signal: abortController.signal,
          params: { limit: 20 },
        });

        setProducts(response.data.products);
        setError('');
      } catch (err: any) {
        if (err.name === 'CanceledError') {
          console.log('Request dibatalkan');
        } else if (err.code === 'ECONNABORTED') {
          setError('Request timeout (>7 detik)');
        } else {
          setError('Gagal memuat produk');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleAddToCart = (item: any) => {
    addToCart(item);
    Alert.alert('✅ Berhasil', `${item.title} ditambahkan ke keranjang`);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7043" />
        <Text style={styles.loadingText}>Memuat produk...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>📡</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const { width } = Dimensions.get('window');
  const cardWidth = (width - 30) / numColumns;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>☁️ Produk dari API</Text>
        <Text style={styles.headerSubtitle}>{products.length} produk tersedia</Text>
      </View>

      <FlatList
        key={numColumns}
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={numColumns}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: any) => (
          <View style={[styles.card, { width: cardWidth }]}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <View style={styles.ratingBadge}>
                <Text style={styles.ratingText}>⭐ {item.rating || 4.5}</Text>
              </View>
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.title} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description}
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>+ Keranjang</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>📡 Koneksi: {connectionType}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
  header: {
    backgroundColor: '#FF7043',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFE0B2',
    marginTop: 5,
  },
  listContent: {
    paddingBottom: 100,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 140,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  cardBody: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    height: 36,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7043',
    marginBottom: 6,
  },
  description: {
    fontSize: 11,
    color: '#888',
    lineHeight: 15,
    height: 30,
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  footer: {
    backgroundColor: '#FF7043',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});