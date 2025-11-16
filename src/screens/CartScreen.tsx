import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function CartScreen({ navigation }: any) {
  const { cart, removeFromCart, clearCart, getTotalPrice, getTotalItems } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('⚠️ Keranjang Kosong', 'Tambahkan produk terlebih dahulu');
      return;
    }

    Alert.alert(
      '✅ Checkout Berhasil',
      `Total: $${getTotalPrice().toFixed(2)}\nTerima kasih telah berbelanja!`,
      [
        {
          text: 'OK',
          onPress: () => {
            clearCart();
            navigation.navigate('Beranda');
          },
        },
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
        <Text style={styles.emptyText}>Tambahkan produk dari halaman API Products</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛒 Keranjang Belanja</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{getTotalItems()}</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price} x {item.quantity}</Text>
              <Text style={styles.itemTotal}>Total: ${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeFromCart(item.id)}
            >
              <FontAwesome name="trash" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Belanja:</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FF7043',
    padding: 15,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  listContent: { paddingBottom: 150 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 10 },
  itemInfo: { flex: 1, justifyContent: 'center' },
  itemTitle: { fontSize: 15, fontWeight: '600', color: '#333' },
  itemPrice: { fontSize: 13, color: '#666', marginTop: 4 },
  itemTotal: { fontSize: 15, fontWeight: 'bold', color: '#FF7043', marginTop: 4 },
  deleteButton: {
    backgroundColor: '#F44336',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  emptyIcon: { fontSize: 80, marginBottom: 20 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  emptyText: { fontSize: 14, color: '#666', textAlign: 'center' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    elevation: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: { fontSize: 18, fontWeight: '600', color: '#333' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#FF7043' },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});