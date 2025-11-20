import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useCart } from '../context/CartContext';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native';

export default function CartScreen() {
  const { cart, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const navigation = useNavigation(); 

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert(' Keranjang Kosong', 'Tambahkan produk terlebih dahulu');
      return;
    }
    (navigation as any).navigate('Checkout'); 
  };

  if (cart.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome name="shopping-cart" size={80} color="#E0E0E0" />
        <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
        <Text style={styles.emptyText}>Yuk, isi dengan barang impianmu!</Text>
        <TouchableOpacity 
          style={styles.shopNowBtn}
          onPress={() => (navigation as any).navigate('Produk')}
        >
          <Text style={styles.shopNowText}>Mulai Belanja</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Keranjang Belanja</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{getTotalItems()} Item</Text>
        </View>
      </View>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
            
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.qtyContainer}>
                <Text style={styles.qtyLabel}>Qty: {item.quantity}</Text>
              </View>
            </View>

            <View style={styles.actionContainer}>
              <Text style={styles.totalPerItem}>${(item.price * item.quantity).toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
              >
                <FontAwesome name="trash" size={18} color="#FF5252" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Belanja:</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Checkout Sekarang</Text>
          <FontAwesome name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: '#FF7043',
    padding: 20,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 4,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff' },
  itemCountBadge: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 15 },
  itemCountText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginTop: 20 },
  emptyText: { fontSize: 14, color: '#888', marginTop: 5, marginBottom: 30 },
  shopNowBtn: { backgroundColor: '#FF7043', paddingHorizontal: 25, paddingVertical: 12, borderRadius: 25 },
  shopNowText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  listContent: { padding: 15, paddingBottom: 100 },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: { width: 70, height: 70, borderRadius: 8, marginRight: 12, backgroundColor: '#eee' },
  itemInfo: { flex: 1, marginRight: 10 },
  itemTitle: { fontSize: 14, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#FF7043', fontWeight: '600' },
  qtyContainer: { marginTop: 4, backgroundColor: '#F5F5F5', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4 },
  qtyLabel: { fontSize: 11, color: '#666' },

  actionContainer: { alignItems: 'flex-end', justifyContent: 'space-between', height: 70 },
  totalPerItem: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  deleteButton: { padding: 8 },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    elevation: 10,
  },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { fontSize: 16, color: '#666' },
  totalPrice: { fontSize: 24, fontWeight: 'bold', color: '#FF7043' },
  
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    elevation: 3,
  },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});