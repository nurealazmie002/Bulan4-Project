import React, { useState } from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Pressable,
} from 'react-native';
import { Product } from '../types';
import { initialProducts } from '../data';
import AddProductModal from '../components/AddProductModal';
import ProductCard from '../components/ProductCard';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan.');
  };

  const renderItem = ({ item }: { item: Product }) => <ProductCard item={item} />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Daftar Produk</Text>
        <Text style={styles.headerSubtitle}>{products.length} produk tersedia</Text>
      </View>

    <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2} 
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 8, marginTop: 16 ,paddingTop: 8}}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        
    />


      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>+ Tambah</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#FF7043',
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 30,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});