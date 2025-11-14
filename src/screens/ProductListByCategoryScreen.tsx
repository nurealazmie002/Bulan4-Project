import React from 'react';
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';

interface ProductListByCategoryScreenProps {
  products: Product[];
  category: string;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 30) / 2; 

export default function ProductListByCategoryScreen({ 
  products, 
  category 
}: ProductListByCategoryScreenProps) {
  const filteredProducts = category === 'Semua'
    ? products
    : products.filter(p => p.category === category);

  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ width: CARD_WIDTH }}>
      <ProductCard item={item} />
    </View>
  );

  if (filteredProducts.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}></Text>
        <Text style={styles.emptyText}>Tidak ada produk di kategori ini</Text>
        <Text style={styles.emptySubtext}>Silakan tambah produk baru</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContainer: {
    paddingBottom: 100,
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});