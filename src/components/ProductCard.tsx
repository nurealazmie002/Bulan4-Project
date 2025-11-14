import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Product } from '../types';

interface ProductCardProps {
  item: Product;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 5,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  price: {
    color: '#FF7043',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  desc: {
    color: '#888',
    fontSize: 12,
    lineHeight: 16,
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 112, 67, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
});

const ProductCard = memo(function ProductCard({ item }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <View>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.price}>Rp{item.price.toLocaleString('id-ID')}</Text>
        <Text numberOfLines={2} style={styles.desc}>
          {item.description}
        </Text>
      </View>
    </View>
  );
});

export default ProductCard;