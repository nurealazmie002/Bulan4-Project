import { useEffect } from 'react';
import { Linking, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import apiClient from '../api/apiClient';

interface LinkingEvent {
  url: string;
}

export const useDeepLinkAction = () => {
  const navigation = useNavigation();
  const { addToCart } = useCart();

  useEffect(() => {
    const handleUrl = async ({ url }: LinkingEvent) => {
      if (!url) return;
      console.log('🔗 Deep Link Detected:', url);

      if (url.includes('add-to-cart')) {
        const parts = url.split('/');
        const id = parts[parts.length - 1];

        if (id && !isNaN(Number(id))) {
          try {
             console.log(`Processing Add-to-Cart ID: ${id}`);
             
             const res = await apiClient.get(`/products/${id}`);
             
             addToCart({ 
               id: res.data.id, 
               title: res.data.title, 
               price: res.data.price, 
               thumbnail: res.data.thumbnail,
               quantity: 1 
             });
             
             Alert.alert(
               'Sukses', 
               `Produk "${res.data.title}" berhasil ditambahkan!`, 
               [
                 { 
                   text: 'Lihat Keranjang', 
                   onPress: () => navigation.navigate('Cart' as never) 
                 },
                 { text: 'OK', style: 'cancel' }
               ]
             );
          } catch(e) {
             console.error(e);
             Alert.alert('Error', 'Gagal mengambil produk dari link. Pastikan koneksi aman.');
          }
        }
      }
    };

    const subscription = Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleUrl({ url }); 
      }
    });

    return () => {
      subscription.remove();
    };
  }, [addToCart, navigation]); 
};