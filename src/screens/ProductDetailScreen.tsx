import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert,
  Dimensions,
  StatusBar
} from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import Toast from 'react-native-simple-toast';

import apiClient from '../api/apiClient';
import { retryRequest } from '../utils/retryRequest';
import { getCachedProduct, cacheProduct, getWishlist, saveWishlist } from '../utils/storage';
import { useCart } from '../context/CartContext';

const { width, height } = Dimensions.get('window');

export default function ProductDetailScreen({ route, navigation }: any) {
  const { productId } = route.params;
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (productId === 'invalid') {
      Alert.alert('Error', 'Produk tidak ditemukan', [{ text: 'Kembali', onPress: () => navigation.goBack() }]);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const wishlist = await getWishlist();
        if (wishlist.includes(productId.toString())) {
          setIsWishlisted(true);
        }

        const cached = await getCachedProduct(productId.toString());
        if (cached) {
          setProduct(cached);
          setLoading(false);
          return;
        }

        const response = await retryRequest(() => apiClient.get(`/products/${productId}`), 3);
        setProduct(response.data);
        
        await cacheProduct(productId.toString(), response.data);

      } catch (error) {
        Alert.alert('Gagal Memuat', 'Cek koneksi internet.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  const toggleWishlist = async () => {
    const list = await getWishlist();
    let newList;
    const strId = productId.toString();

    if (isWishlisted) {
       newList = list.filter(id => id !== strId);
       Toast.show('Dihapus dari Favorit', Toast.SHORT);
    } else {
       newList = [...list, strId];
       Toast.show('Disukai', Toast.SHORT);
    }
    
    setIsWishlisted(!isWishlisted); 
    await saveWishlist(newList, newList.length); 
  };

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1
    });
    Toast.show('Berhasil masuk keranjang', Toast.SHORT);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF7043" />
      </View>
    );
  }

  if (!product) return null;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <FontAwesome name="arrow-left" size={20} color="#333" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.wishlistButton} 
        onPress={toggleWishlist}
      >
        <FontAwesome 
          name={isWishlisted ? "heart" : "heart-o"} 
          size={22} 
          color={isWishlisted ? "#F44336" : "#333"} 
        />
      </TouchableOpacity>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.brandText}>{product.brand || 'Generic'}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={14} color="#FFC107" />
              <Text style={styles.ratingText}>{product.rating} / 5.0</Text>
            </View>
          </View>

          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.priceRow}>
            <Text style={styles.currency}>$</Text>
            <Text style={styles.price}>{product.price}</Text>
            {product.discountPercentage > 0 && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Hemat {product.discountPercentage}%</Text>
              </View>
            )}
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.sectionHeader}>Deskripsi Produk</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPrice}>
          <Text style={styles.footerLabel}>Total Harga</Text>
          <Text style={styles.footerValue}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <FontAwesome name="shopping-cart" size={18} color="#fff" />
          <Text style={styles.buyButtonText}>+ Keranjang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollContent: { paddingBottom: 100 },
  backButton: {
    position: 'absolute',
    top: 45,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  wishlistButton: {
    position: 'absolute',
    top: 45,
    right: 20, 
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  imageContainer: {
    width: width,
    height: height * 0.45, 
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: { color: '#fff', fontSize: 12, fontWeight: 'bold', textTransform: 'capitalize' },
  infoContainer: {
    marginTop: -20, 
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    minHeight: 500, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  brandText: { fontSize: 14, color: '#FF7043', fontWeight: 'bold', textTransform: 'uppercase' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF8E1', padding: 5, borderRadius: 5 },
  ratingText: { marginLeft: 5, fontSize: 12, fontWeight: 'bold', color: '#333' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#222', marginBottom: 10, lineHeight: 30 },
  priceRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  currency: { fontSize: 18, color: '#FF7043', fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 32, color: '#FF7043', fontWeight: 'bold' },
  discountBadge: { marginLeft: 10, backgroundColor: '#FFEBEE', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginBottom: 6 },
  discountText: { color: '#D32F2F', fontSize: 10, fontWeight: 'bold' },
  stockWarning: { color: '#D32F2F', fontSize: 12, marginBottom: 10, fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 20 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  description: { fontSize: 15, color: '#555', lineHeight: 24, textAlign: 'justify' },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    elevation: 20,
  },
  footerPrice: { flex: 1 },
  footerLabel: { fontSize: 12, color: '#888' },
  footerValue: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  buyButton: {
    backgroundColor: '#FF7043',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    elevation: 3,
  },
  buyButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});