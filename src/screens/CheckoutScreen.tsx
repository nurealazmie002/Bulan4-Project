import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
  Image,
} from 'react-native';
import { useCart } from '../context/CartContext';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function CheckoutScreen({ navigation }: any) {
  const { getTotalPrice, clearCart, cart, removeFromCart } = useCart();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [errors, setErrors] = useState<any>({});

  const handleCheckout = () => {
    if (cart.length === 0) {
      Alert.alert('⚠️ Keranjang Kosong', 'Tambahkan produk terlebih dahulu');
      return;
    }

    setErrors({});
    const newErrors: any = {};

    if (!name.trim()) {
      newErrors.name = 'Nama wajib diisi';
    }
    if (!address.trim()) {
      newErrors.address = 'Alamat wajib diisi';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    Alert.alert(
      '✅ Checkout Berhasil',
      `Total: $${getTotalPrice().toFixed(2)}\nTerima kasih ${name}!`,
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛒 Checkout</Text>

      {cart.length > 0 ? (
        <View style={styles.cartSection}>
          <Text style={styles.sectionTitle}>Produk ({cart.length} item)</Text>
          {cart.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.thumbnail }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.itemPrice}>
                  ${item.price} x {item.quantity}
                </Text>
                <Text style={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => removeFromCart(item.id)}
              >
                <FontAwesome name="trash" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Keranjang Kosong</Text>
        </View>
      )}

      <View style={styles.summary}>
        <Text style={styles.summaryLabel}>Total Belanja:</Text>
        <Text style={styles.summaryPrice}>${getTotalPrice().toFixed(2)}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>

        <Text style={styles.label}>Nama Lengkap *</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={name}
          onChangeText={setName}
          placeholder="Masukkan nama lengkap"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

        <Text style={styles.label}>Alamat Pengiriman *</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.address && styles.inputError]}
          value={address}
          onChangeText={setAddress}
          placeholder="Masukkan alamat lengkap"
          multiline
          numberOfLines={4}
        />
        {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
      </View>

      <TouchableOpacity
        style={[styles.button, cart.length === 0 && styles.buttonDisabled]}
        onPress={handleCheckout}
        disabled={cart.length === 0}
      >
        <Text style={styles.buttonText}>💳 Bayar Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  cartSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 14, fontWeight: '600', color: '#333' },
  itemPrice: { fontSize: 12, color: '#666', marginTop: 4 },
  itemTotal: { fontSize: 14, fontWeight: 'bold', color: '#FF7043', marginTop: 4 },
  deleteButton: {
    backgroundColor: '#F44336',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCart: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
  },
  emptyIcon: { fontSize: 60, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#666' },
  summary: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
  },
  summaryLabel: { fontSize: 16, color: '#666' },
  summaryPrice: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF7043',
    marginTop: 5,
  },
  formSection: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    fontSize: 15,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  inputError: { borderColor: '#D32F2F', backgroundColor: '#FFEBEE' },
  errorText: { color: '#D32F2F', fontSize: 12, marginTop: 5 },
  button: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 30,
    elevation: 3,
  },
  buttonDisabled: { backgroundColor: '#A5D6A7' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});