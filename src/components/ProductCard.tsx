import React, { memo } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  item: Product;
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 36) / 2; 

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    marginVertical: 8,
    width: CARD_WIDTH,
  },
  image: {
    width: '100%',
    height: 180, 
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 10,
    minHeight: 90, 
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  price: {
    color: '#FF7043',
    marginTop: 6,
    fontWeight: '600',
    fontSize: 14,
  },
  desc: {
    color: '#607D8B',
    marginTop: 6,
    fontSize: 12,
  },
});

const ProductCard = memo(function ProductCard({ item }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>
          Rp{item.price.toLocaleString('id-ID')}
        </Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>
      </View>
    </View>
  );
});

export default ProductCard;
