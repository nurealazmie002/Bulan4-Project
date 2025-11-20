import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import apiClient from '../api/apiClient';
import { useCart } from '../context/CartContext';
import { retryRequest } from '../utils/retryRequest';
import Toast from 'react-native-simple-toast';

interface Props {
  category: string; 
}

export default function ProductListCategory({ category }: Props) {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = useCallback(async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    try {
      let endpoint = '/products';
      if (category !== 'all') {
        endpoint = `/products/category/${category}`;
      }

      const response = await retryRequest(
        () => apiClient.get(endpoint, { params: { limit: 20 } }),
        3
      );

      setProducts(response.data.products);

    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(true);
  };

  const handleAddToCart = (item: any) => {
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      quantity: 1
    });
    Toast.show('Masuk Keranjang ', Toast.SHORT);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7043" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item.id.toString()}
        numColumns={2}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item }: any) => (
          <TouchableOpacity 
            style={styles.card}
            onPress={() => (navigation as any).navigate('ProductDetail', { 
              productId: item.id.toString() 
            })}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.image} />
            <View style={styles.cardBody}>
              <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
              <View style={styles.row}>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.rating}>⭐ {item.rating}</Text>
              </View>
              
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addButtonText}>+ Beli</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  listContent: { padding: 10, paddingBottom: 100 },
  columnWrapper: { justifyContent: 'space-between' },
  
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
  image: { width: '100%', height: 200, resizeMode: 'cover', backgroundColor: '#eee' },
  cardBody: { padding: 15, justifyContent: 'space-between', flex: 1 },
  title: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4, height: 40, lineHeight: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#FF7043' },
  rating: { fontSize: 11, color: '#666', backgroundColor: '#F5F5F5', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  addButton: { backgroundColor: '#4CAF50', paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginTop: 'auto' },
  addButtonText: { color: '#fff', fontSize: 13, fontWeight: 'bold' }
});