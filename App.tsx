import React, { useState } from 'react';
import {
  Text, FlatList, StyleSheet, Alert, Pressable, ImageBackground, 
  useWindowDimensions,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context'; 

import { Product } from './src/types';
import { initialProducts, HEADER_BG_URI } from './src/data';

import AddProductModal from './src/components/AddProductModal.tsx';
import ProductCard from './src/components/ProductCard';

export default function App() {
  const { width } = useWindowDimensions(); 
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan.');
  };

  const renderItem = ({ item }: { item: Product }) => <ProductCard item={item} />;

  const isWideScreen = width > 500;
  const headerContainerStyle = isWideScreen ? styles.appHeaderWide : styles.appHeader;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}> 
      <ImageBackground 
        source={{ uri: HEADER_BG_URI }} 
        style={headerContainerStyle}
        imageStyle={{ opacity: 0.8 }} 
      >
        <Text style={styles.headerTitle}>Mini E-Commerce</Text>
        <Text style={styles.headerDescription}>Kelola inventaris produk Anda dengan mudah dan cepat.</Text>
      </ImageBackground>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        contentContainerStyle={[
          styles.flatListContent, 
          !isWideScreen && { paddingBottom: 100 } 
        ]}
      />

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+ Add</Text>
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
  appHeader: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    marginBottom: 5,
    alignItems: 'center', 
    justifyContent: 'center', 
  },
  appHeaderWide: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
    elevation: 1, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.0,
    marginBottom: 5,
  },
  headerTitle: { 
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF', 
    marginBottom: 4,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flexShrink: 1,
  },
  headerDescription: {
    fontSize: 14,
    color: '#E0E0E0', 
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
    flexShrink: 1,
  },
  flatListContent: {
    paddingHorizontal: 10, 
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
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: { 
    color: '#fff', 
    fontWeight: '700', 
    fontSize: 16 
  }
});