import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useCart } from '../context/CartContext';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useNavigation } from '@react-navigation/native'; 

export default function CheckoutScreen() { 
  const { getTotalPrice, clearCart, cart } = useCart();
  const navigation = useNavigation(); 
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [errors, setErrors] = useState<any>({});

  const handleOrder = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = 'Nama wajib diisi';
    if (!form.email || !form.email.includes('@')) newErrors.email = 'Email tidak valid';
    if (form.phone.length < 10) newErrors.phone = 'Nomor HP minimal 10 digit';
    if (!form.address) newErrors.address = 'Alamat pengiriman wajib diisi';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Data Belum Lengkap', 'Mohon lengkapi data pengiriman yang berwarna merah.');
      return;
    }

    const orderId = 'TRX-' + Math.floor(Math.random() * 1000000);
    const total = getTotalPrice();

    Alert.alert(
      'Pesanan Berhasil Dibuat!',
      `ID Pesanan: ${orderId}\nTotal Bayar: $${total}\n\nTerima kasih ${form.name}, paket akan segera dikirim ke ${form.address}.`,
      [
        {
          text: 'Kembali ke Beranda',
          onPress: () => {
            clearCart(); 
            (navigation as any).reset({
              index: 0,
              routes: [{ name: 'AppContent' }], 
            });
          },
        },
      ]
    );
  };


  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <FontAwesome name="shopping-cart" size={60} color="#DDD" />
        <Text style={styles.emptyText}>Keranjang Belanja Kosong</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Mulai Belanja</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="dropbox" size={16} color="#FF7043" />
            <Text style={styles.sectionTitle}>Rincian Pesanan</Text>
          </View>
          
          {cart.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>{item.quantity}x</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPriceSingle}>@ ${item.price}</Text>
              </View>
              <Text style={styles.itemTotalPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal Produk</Text>
            <Text style={styles.totalValue}>${getTotalPrice().toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Ongkos Kirim</Text>
            <Text style={styles.freeShipping}>GRATIS</Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 10 }]}>
            <Text style={styles.grandTotalLabel}>Total Pembayaran</Text>
            <Text style={styles.grandTotalValue}>${getTotalPrice().toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="map-marker" size={18} color="#FF7043" />
            <Text style={styles.sectionTitle}>Alamat Pengiriman</Text>
          </View>
          
          <Text style={styles.inputLabel}>Nama Penerima</Text>
        <TextInput
          style={[styles.input, errors.name && styles.inputError]}
          value={form.name}
          onChangeText={(t) => setForm({...form, name: t})}
          placeholder="Nama Lengkap"
          placeholderTextColor="#999" 
        />
        
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={[styles.input, errors.email && styles.inputError]}
          value={form.email}
          onChangeText={(t) => setForm({...form, email: t})}
          placeholder="email@contoh.com"
          placeholderTextColor="#999" 
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.inputLabel}>No. Handphone</Text>
        <TextInput
          style={[styles.input, errors.phone && styles.inputError]}
          value={form.phone}
          onChangeText={(t) => setForm({...form, phone: t})}
          placeholder="0812..."
          placeholderTextColor="#999" 
          keyboardType="phone-pad"
        />
        <Text style={styles.inputLabel}>Alamat Lengkap</Text>
        <TextInput
          style={[styles.input, styles.textArea, errors.address && styles.inputError]}
          value={form.address}
          onChangeText={(t) => setForm({...form, address: t})}
          placeholder="Jalan, Nomor Rumah, Kelurahan, Kecamatan..."
          placeholderTextColor="#999" 
          numberOfLines={3}
        />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="credit-card" size={16} color="#FF7043" />
            <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'transfer' && styles.paymentActive]}
            onPress={() => setPaymentMethod('transfer')}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === 'transfer' && <View style={styles.selectedRb} />}
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.paymentTitle}>Transfer Bank (Virtual Account)</Text>
              <Text style={styles.paymentDesc}>Otomatis dicek, tanpa upload bukti.</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'cod' && styles.paymentActive]}
            onPress={() => setPaymentMethod('cod')}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === 'cod' && <View style={styles.selectedRb} />}
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.paymentTitle}>Bayar di Tempat (COD)</Text>
              <Text style={styles.paymentDesc}>Bayar tunai ke kurir saat barang sampai.</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerTotalLabel}>Total Tagihan</Text>
          <Text style={styles.footerTotalValue}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleOrder}>
          <Text style={styles.checkoutBtnText}>Buat Pesanan</Text>
          <FontAwesome name="arrow-right" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F2F4F8' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#888', marginTop: 15 },
  backLink: { marginTop: 10, padding: 10 },
  backLinkText: { color: '#FF7043', fontWeight: 'bold', fontSize: 16 },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, gap: 10 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  qtyBadge: { backgroundColor: '#F5F5F5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginRight: 10 },
  qtyText: { fontSize: 12, fontWeight: 'bold', color: '#555' },
  itemInfo: { flex: 1 },
  itemTitle: { fontSize: 14, color: '#333', fontWeight: '500' },
  itemPriceSingle: { fontSize: 11, color: '#888' },
  itemTotalPrice: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  divider: { height: 1, backgroundColor: '#F0F0F0', marginVertical: 10 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  totalLabel: { fontSize: 13, color: '#666' },
  totalValue: { fontSize: 13, color: '#333', fontWeight: '600' },
  freeShipping: { fontSize: 13, color: '#4CAF50', fontWeight: 'bold' },
  grandTotalLabel: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  grandTotalValue: { fontSize: 16, fontWeight: 'bold', color: '#FF7043' },
  inputLabel: { fontSize: 12, color: '#666', marginBottom: 5, marginTop: 10 },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#333'
  },
  textArea: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: '#EF5350', backgroundColor: '#FFEBEE' },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 10,
  },
  paymentActive: { borderColor: '#FF7043', backgroundColor: '#FFF3E0' },
  paymentTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  paymentDesc: { fontSize: 11, color: '#888' },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FF7043',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF7043',
  },
  footer: {
    backgroundColor: '#fff',
    padding: 15,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 10,
  },
  footerInfo: { flex: 1 },
  footerTotalLabel: { fontSize: 11, color: '#888' },
  footerTotalValue: { fontSize: 18, fontWeight: 'bold', color: '#FF7043' },
  checkoutBtn: {
    backgroundColor: '#FF7043',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});