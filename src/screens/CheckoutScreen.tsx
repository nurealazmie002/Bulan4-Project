import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import { promptBiometricAuth, checkBiometricAvailability } from '../utils/biometricUtils';

export default function CheckoutScreen() {
  const { getTotalPrice, clearCart, cart } = useCart();
  const navigation = useNavigation();
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [errors, setErrors] = useState<any>({});

  const handleOrder = async () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = 'Wajib diisi';
    if (!form.address) newErrors.address = 'Wajib diisi';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Data Belum Lengkap');
      return;
    }

    const bioStatus = await checkBiometricAvailability();
    
    if (bioStatus.available) {
      const totalStr = getTotalPrice().toFixed(2);
      
      const { success } = await promptBiometricAuth(
        `Konfirmasi Pembayaran $${totalStr}`, 
        'Batalkan'
      );

      if (success) {
        processSuccess();
      } else {
        Alert.alert('Dibatalkan', 'Verifikasi diperlukan.');
      }
    } else {
      processSuccess();
    }
  };

  const processSuccess = () => {
    const orderId = 'TRX-' + Math.floor(Math.random() * 1000000);
    Alert.alert(
      '🎉 Pesanan Berhasil!',
      `ID: ${orderId}\nTotal: $${getTotalPrice().toFixed(2)}`,
      [{
        text: 'OK',
        onPress: () => {
          clearCart();
          (navigation as any).reset({ index: 0, routes: [{ name: 'AppContent' }] });
        },
      }]
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 60 }}>🛒</Text>
        <Text style={styles.emptyText}>Keranjang Kosong</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Belanja Dulu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        
        <View style={styles.section}>
          <View style={styles.rowHeader}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>📍</Text> 
            <Text style={styles.sectionTitle}>Data Pengiriman</Text>
          </View>

          <TextInput 
            style={[styles.input, errors.name && {borderColor:'red'}]} 
            value={form.name} onChangeText={(t) => setForm({...form, name: t})} 
            placeholder="Nama Penerima" placeholderTextColor="#999"
          />
          <TextInput 
            style={[styles.input, errors.address && {borderColor:'red'}]} 
            value={form.address} onChangeText={(t) => setForm({...form, address: t})} 
            placeholder="Alamat Lengkap" placeholderTextColor="#999" multiline
          />
        </View>

        <View style={styles.section}>
          <View style={styles.rowHeader}>
            <Text style={{ fontSize: 18, marginRight: 8 }}>📦</Text> 
            <Text style={styles.sectionTitle}>Ringkasan ({cart.length} Item)</Text>
          </View>
          {cart.map((item, idx) => (
             <View key={idx} style={{flexDirection:'row', justifyContent:'space-between', marginBottom:5}}>
                <Text style={{color:'#555', flex:1}} numberOfLines={1}>{item.quantity}x {item.title}</Text>
                <Text style={{fontWeight:'bold', color:'#333'}}>${(item.price * item.quantity).toFixed(2)}</Text>
             </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={{fontSize:12, color:'#666'}}>Total Pembayaran</Text>
          <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleOrder}>
          <Text style={styles.checkoutBtnText}>Bayar Sekarang ➔</Text>
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
  backLinkText: { color: '#FF7043', fontWeight: 'bold' },
  
  section: { backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, padding: 15, borderRadius: 12, elevation: 2 },
  rowHeader: { flexDirection:'row', alignItems:'center', marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  
  input: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 10, marginBottom: 10, color: '#333' },
  
  footer: { 
    position: 'absolute', bottom: 0, width: '100%', backgroundColor: '#fff', 
    padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', elevation: 10 
  },
  totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#FF7043' },
  checkoutBtn: { backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});