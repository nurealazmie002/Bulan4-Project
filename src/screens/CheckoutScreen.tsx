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
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission } from '../utils/locationUtils';
import { promptBiometricAuth, checkBiometricAvailability } from '../utils/biometricUtils';
import { formatCurrency } from '../utils/currency';

export default function CheckoutScreen() {
  const { getTotalPrice, clearCart, cart } = useCart();
  const navigation = useNavigation();
  
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [errors, setErrors] = useState<any>({});

  const [shippingCost, setShippingCost] = useState(0);
  const [loadingLoc, setLoadingLoc] = useState(false);

  const calculateShipping = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) {
      Alert.alert('Permission Denied', 'Need location for shipping.');
      return;
    }

    setLoadingLoc(true);

    Geolocation.getCurrentPosition(
      (position) => {
        console.log('Location:', position.coords);
        setShippingCost(15); 
        setLoadingLoc(false);
        Alert.alert('Location Found', 'Shipping cost $15.00 applied.');
      },
      (error) => {
        setLoadingLoc(false);
        Alert.alert('GPS Error', 'Using default shipping.');
        setShippingCost(20);
      },
      { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 }
    );
  };

  const handleOrder = async () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = 'Required';
    if (!form.email || !form.email.includes('@')) newErrors.email = 'Invalid Email';
    if (form.phone.length < 10) newErrors.phone = 'Invalid Phone';
    if (!form.address) newErrors.address = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Alert.alert('Incomplete', 'Please fill in the red fields.');
      return;
    }

    const bioStatus = await checkBiometricAvailability();
    
    if (bioStatus.available) {
      const finalTotal = formatCurrency(getTotalPrice() + shippingCost);
      
      const { success } = await promptBiometricAuth(
        `Pay ${finalTotal}`, 
        'Cancel'
      );

      if (success) processSuccess();
      else Alert.alert('Cancelled', 'Verification failed.');
    } else {
      processSuccess();
    }
  };

  const processSuccess = () => {
    const orderId = 'TRX-' + Math.floor(Math.random() * 1000000);
    const finalTotal = formatCurrency(getTotalPrice() + shippingCost);

    Alert.alert(
      'Order Successful!',
      `ID: ${orderId}\nTotal: ${finalTotal}`,
      [{
        text: 'Back to Home',
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
        <Text style={{fontSize: 60}}>🛒</Text>
        <Text style={styles.emptyText}>Cart is Empty</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backLink}>
          <Text style={styles.backLinkText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.headerEmoji}>📦</Text>
            <Text style={styles.sectionTitle}>Order Details</Text>
          </View>
          
          {cart.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>{item.quantity}x</Text>
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPriceSingle}>@ {formatCurrency(item.price)}</Text>
              </View>
              <Text style={styles.itemTotalPrice}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          
          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal</Text>
            <Text style={styles.totalValue}>{formatCurrency(getTotalPrice())}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Shipping</Text>
            {shippingCost > 0 ? (
              <Text style={styles.totalValue}>{formatCurrency(shippingCost)}</Text>
            ) : (
              <Text style={styles.freeShipping}>CALCULATE BELOW</Text>
            )}
          </View>
          <View style={[styles.totalRow, { marginTop: 10 }]}>
            <Text style={styles.grandTotalLabel}>Total Payment</Text>
            <Text style={styles.grandTotalValue}>
              {formatCurrency(getTotalPrice() + shippingCost)}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.headerEmoji}></Text>
            <Text style={styles.sectionTitle}>Shipping Address</Text>
          </View>
          
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            value={form.name} onChangeText={(t) => setForm({...form, name: t})}
            placeholder="Full Name" placeholderTextColor="#999"
          />
          
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={form.email} onChangeText={(t) => setForm({...form, email: t})}
            placeholder="email@example.com" placeholderTextColor="#999" keyboardType="email-address" autoCapitalize="none"
          />

          <Text style={styles.inputLabel}>Phone</Text>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            value={form.phone} onChangeText={(t) => setForm({...form, phone: t})}
            placeholder="0812..." placeholderTextColor="#999" keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Address</Text>
          <TextInput
            style={[styles.input, styles.textArea, errors.address && styles.inputError]}
            value={form.address} onChangeText={(t) => setForm({...form, address: t})}
            placeholder="Full Address..." placeholderTextColor="#999" multiline numberOfLines={3}
          />

          <TouchableOpacity style={styles.locButton} onPress={calculateShipping}>
            <Text style={{fontSize: 18, marginRight: 8, color: '#fff'}}>📡</Text>
            <Text style={styles.locButtonText}>
              {loadingLoc ? 'Locating...' : 'Calculate Shipping (GPS)'}
            </Text>
          </TouchableOpacity>
          
          {shippingCost > 0 && (
            <Text style={styles.shippingText}>
              ✅ Location Detected (+{formatCurrency(shippingCost)})
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.headerEmoji}>💳</Text>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.paymentOption, paymentMethod === 'transfer' && styles.paymentActive]}
            onPress={() => setPaymentMethod('transfer')}
          >
            <View style={styles.radioCircle}>
              {paymentMethod === 'transfer' && <View style={styles.selectedRb} />}
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.paymentTitle}>Bank Transfer (VA)</Text>
              <Text style={styles.paymentDesc}>Automatic verification.</Text>
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
              <Text style={styles.paymentTitle}>Cash on Delivery (COD)</Text>
              <Text style={styles.paymentDesc}>Pay when item arrives.</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerInfo}>
          <Text style={styles.footerTotalLabel}>Total Bill</Text>
          <Text style={styles.footerTotalValue}>
            {formatCurrency(getTotalPrice() + shippingCost)}
          </Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} onPress={handleOrder}>
          <Text style={styles.checkoutBtnText}>Place Order</Text>
          <Text style={{color:'#fff', fontSize:18, marginLeft: 5}}>➔</Text>
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

  section: { backgroundColor: '#fff', marginHorizontal: 15, marginTop: 15, padding: 15, borderRadius: 12, elevation: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  headerEmoji: { fontSize: 20, marginRight: 10 }, // Style Emoji Header
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
  freeShipping: { fontSize: 13, color: '#999', fontStyle: 'italic' },
  grandTotalLabel: { fontSize: 15, fontWeight: 'bold', color: '#333' },
  grandTotalValue: { fontSize: 16, fontWeight: 'bold', color: '#FF7043' },

  inputLabel: { fontSize: 12, color: '#666', marginBottom: 5, marginTop: 10 },
  input: { backgroundColor: '#FAFAFA', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, fontSize: 14, color: '#333' },
  textArea: { height: 80, textAlignVertical: 'top' },
  inputError: { borderColor: '#EF5350', backgroundColor: '#FFEBEE' },

  locButton: { backgroundColor: '#2196F3', padding: 12, borderRadius: 8, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  locButtonText: { color: '#fff', fontWeight: 'bold' },
  shippingText: { marginTop: 10, color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' },

  paymentOption: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, marginBottom: 10 },
  paymentActive: { borderColor: '#FF7043', backgroundColor: '#FFF3E0' },
  paymentTitle: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  paymentDesc: { fontSize: 11, color: '#888' },
  
  radioCircle: { height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: '#FF7043', alignItems: 'center', justifyContent: 'center' },
  selectedRb: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#FF7043' },

  footer: { backgroundColor: '#fff', padding: 15, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#E0E0E0', flexDirection: 'row', alignItems: 'center', elevation: 10 },
  footerInfo: { flex: 1 },
  footerTotalLabel: { fontSize: 11, color: '#888' },
  footerTotalValue: { fontSize: 18, fontWeight: 'bold', color: '#FF7043' },
  checkoutBtn: { backgroundColor: '#FF7043', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 5 },
  checkoutBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});