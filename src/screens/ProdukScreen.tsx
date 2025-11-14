import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Product } from '../types';
import { initialProducts } from '../data';
import AddProductModal from '../components/AddProductModal';
import ProductListByCategoryScreen from './ProductListByCategoryScreen';

const TopTab = createMaterialTopTabNavigator();

export default function ProdukScreen() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleAddProduct = (p: Product) => {
    setProducts((prev) => [p, ...prev]);
    Alert.alert(' Sukses', 'Produk berhasil ditambahkan!', [{ text: 'OK' }]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerInfo}>
        <View>
          <Text style={styles.headerTitle}>Daftar Produk</Text>
          <Text style={styles.headerSubtitle}>Kelola produk Anda dengan mudah</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{products.length}</Text>
        </View>
      </View>

      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#FF7043',
          tabBarInactiveTintColor: '#757575',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '700',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 3,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#FF7043',
            height: 3,
            borderRadius: 2,
          },
          tabBarScrollEnabled: false,
        }}
      >
        <TopTab.Screen name="Semua" options={{ title: 'Semua' }}>
          {() => <ProductListByCategoryScreen key="semua" products={products} category="Semua" />}
        </TopTab.Screen>
        <TopTab.Screen name="Pakaian" options={{ title: 'Pakaian' }}>
          {() => <ProductListByCategoryScreen key="pakaian" products={products} category="Pakaian" />}
        </TopTab.Screen>
        <TopTab.Screen name="Sepatu" options={{ title: 'Sepatu' }}>
          {() => <ProductListByCategoryScreen key="sepatu" products={products} category="Sepatu" />}
        </TopTab.Screen>
        <TopTab.Screen name="Aksesoris" options={{ title: 'Aksesoris' }}>
          {() => <ProductListByCategoryScreen key="aksesoris" products={products} category="Aksesoris" />}
        </TopTab.Screen>
      </TopTab.Navigator>

      <Pressable 
        style={styles.fab} 
        onPress={() => setModalVisible(true)}
        android_ripple={{ color: 'rgba(255,255,255,0.3)', radius: 30 }}
      >
        <Text style={styles.fabIcon}>+</Text>
      </Pressable>

      <AddProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={handleAddProduct}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF7043',
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#FFE0B2',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  badgeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    backgroundColor: '#FF7043',
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabIcon: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});