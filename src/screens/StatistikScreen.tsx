import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function StatistikScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}> Statistik Penjualan</Text>

      <View style={styles.summaryRow}>
        <View style={[styles.summaryCard, { backgroundColor: '#4CAF50' }]}>
          <FontAwesome name="money" size={30} color="#fff" />
          <Text style={styles.summaryNumber}>Rp 2.5Jt</Text>
          <Text style={styles.summaryLabel}>Total Penjualan</Text>
        </View>
        <View style={[styles.summaryCard, { backgroundColor: '#2196F3' }]}>
          <FontAwesome name="shopping-cart" size={30} color="#fff" />
          <Text style={styles.summaryNumber}>45</Text>
          <Text style={styles.summaryLabel}>Total Transaksi</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Produk Terlaris</Text>
        
        <View style={styles.productItem}>
          <View style={styles.rank}>
            <Text style={styles.rankText}>1</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Sepatu Sneaker Putih</Text>
            <Text style={styles.productSales}>25 terjual</Text>
          </View>
          <Text style={styles.productPrice}>Rp 325K</Text>
        </View>

        <View style={styles.productItem}>
          <View style={styles.rank}>
            <Text style={styles.rankText}>2</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Jam Tangan Kulit</Text>
            <Text style={styles.productSales}>18 terjual</Text>
          </View>
          <Text style={styles.productPrice}>Rp 450K</Text>
        </View>

        <View style={styles.productItem}>
          <View style={styles.rank}>
            <Text style={styles.rankText}>3</Text>
          </View>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>Kardigan</Text>
            <Text style={styles.productSales}>15 terjual</Text>
          </View>
          <Text style={styles.productPrice}>Rp 280K</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Penjualan per Kategori</Text>
        
        <View style={styles.categoryBar}>
          <View style={styles.categoryInfo}>
            <FontAwesome name="suitcase" size={20} color="#FF7043" />
            <Text style={styles.categoryName}>Pakaian</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: '70%', backgroundColor: '#FF7043' }]} />
            <Text style={styles.barLabel}>70%</Text>
          </View>
        </View>

        <View style={styles.categoryBar}>
          <View style={styles.categoryInfo}>
            <FontAwesome name="location-arrow" size={20} color="#4CAF50" />
            <Text style={styles.categoryName}>Sepatu</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: '50%', backgroundColor: '#4CAF50' }]} />
            <Text style={styles.barLabel}>50%</Text>
          </View>
        </View>

        <View style={styles.categoryBar}>
          <View style={styles.categoryInfo}>
            <FontAwesome name="headphones" size={20} color="#2196F3" />
            <Text style={styles.categoryName}>Aksesoris</Text>
          </View>
          <View style={styles.barContainer}>
            <View style={[styles.bar, { width: '35%', backgroundColor: '#2196F3' }]} />
            <Text style={styles.barLabel}>35%</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#fff',
    marginTop: 5,
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  rank: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FF7043',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  productSales: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF7043',
  },
  categoryBar: {
    marginBottom: 20,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginLeft: 10,
  },
  barContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 25,
    borderRadius: 12.5,
  },
  barLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    marginLeft: 10,
  },
});