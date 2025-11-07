import React, { useState } from 'react';
import {
  Text, FlatList, StyleSheet, SafeAreaView, Alert, Pressable, ImageBackground, 
} from 'react-native';

import { Product } from './src/types';
import { initialProducts, HEADER_BG_URI } from './src/data';

import AddProductModal from './src/components/AddProductModal.tsx';
import ProductCard from './src/components/ProductCard';

export default function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan');
  };

  const renderItem = ({ item }: { item: Product }) => <ProductCard item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        source={{ uri: HEADER_BG_URI }} 
        style={styles.appHeader}
        imageStyle={{ opacity: 0.8 }} 
      >
        <Text style={styles.headerTitle}>Mini E-Commerce</Text>
        <Text style={styles.headerDescription}>Kelola inventaris produk Anda dengan mudah dan cepat.</Text>
      </ImageBackground>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>+ Add</Text>
      </Pressable>

      <AddProductModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onAdd={handleAddProduct} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  appHeader: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    borderBottomWidth: 0,
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    marginBottom: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  headerTitle: { 
    fontSize: 20, 
    fontWeight: '800',
    color: '#FFFFFF', 
    marginBottom: 2,
    paddingBottom: 2,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  headerDescription: {
    fontSize: 13,
    color: '#E0E0E0', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    elevation: 6,
  },
});