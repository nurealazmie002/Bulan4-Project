import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import apiClient from '../api/apiClient';
import { getWishlist } from '../utils/storage';
import { retryRequest } from '../utils/retryRequest';
import Toast from 'react-native-simple-toast';

const { width } = Dimensions.get('window');

const cardStyles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 170, resizeMode: 'cover', backgroundColor: '#eee' },
  cardBody: { padding: 12, justifyContent: 'space-between', flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4, height: 40, lineHeight: 20 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#FF7043' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  addButton: { backgroundColor: '#FF7043', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 'auto' },
  addButtonText: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
  rating: { fontSize: 11, color: '#666', backgroundColor: '#F5F5F5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
});


export default function FavoriteProductsScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFavorites = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    try {
      const favoriteIds = await getWishlist();
      
      if (favoriteIds.length === 0) {
        setProducts([]);
        return;
      }

      const fetchPromises = favoriteIds.map(id => 
        retryRequest(() => apiClient.get(`/products/${id}`), 3)
      );

      const responses = await Promise.all(fetchPromises);
      const favoriteProducts = responses.map(res => res.data);

      setProducts(favoriteProducts);

    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      Alert.alert('Error', 'Gagal memuat detail produk favorit.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavorites(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={cardStyles.card}
      onPress={() => (navigation as any).navigate('ProductDetail', { productId: item.id.toString() })}
    >
      <Image source={{ uri: item.thumbnail }} style={cardStyles.image} />
      <View style={cardStyles.cardBody}>
        <Text style={cardStyles.title} numberOfLines={2}>{item.title}</Text>
        <View style={cardStyles.row}>
          <Text style={cardStyles.price}>${item.price}</Text>
          <Text style={cardStyles.rating}>⭐ {item.rating}</Text>
        </View>
        
        <TouchableOpacity
          style={cardStyles.addButton}
          onPress={() => Toast.show('Fitur add to cart detail belum diaktifkan', Toast.SHORT)} 
        >
          <Text style={cardStyles.addButtonText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#FF7043" /></View>;
  }

  if (products.length === 0) {
    return (
      <View style={styles.center}>
        <FontAwesome name="heart-o" size={80} color="#E0E0E0" />
        <Text style={styles.emptyText}>Anda belum memiliki produk favorit.</Text>
        <Text style={styles.emptySubText}>Tekan tombol hati pada produk untuk menambahkannya!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  listContent: { padding: 10, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#666', marginTop: 20 },
  emptySubText: { fontSize: 14, color: '#999', marginTop: 5, textAlign: 'center' },
});