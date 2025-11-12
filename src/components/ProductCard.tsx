import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types'; 

interface ProductCardProps {
  item: Product;
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: '#fff', marginHorizontal: 10, marginVertical: 5, borderRadius: 10, overflow: 'hidden', elevation: 2 },
  image: { width: 100, height: 100 },
  cardBody: { flex: 1, padding: 10, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: '700' },
  price: { color: '#FF7043', marginTop: 4, fontWeight: '600' },
  desc: { color: '#607D8B', marginTop: 6 },
});

const ProductCard = memo(function ProductCard({ item }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rp{item.price.toLocaleString('id-ID')}</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>
      </View>
    </View>
  );
});

export default ProductCard;