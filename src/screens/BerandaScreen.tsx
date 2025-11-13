import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function BerandaScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.welcomeCard}>
        <Image
          source={{ uri: 'https://i.pinimg.com/736x/89/3b/8e/893b8e08cca8bbecb2f6e8693b80d72c.jpg' }}
          style={styles.avatar}
        />
        <Text style={styles.welcomeText}>Selamat Datang! </Text>
        <Text style={styles.userName}>Naufal Hibatullah</Text>
        <Text style={styles.userRole}>Programmer & Motivator</Text>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Tentang Aplikasi</Text>
        <Text style={styles.infoText}>
          Mini E-Commerce adalah aplikasi manajemen produk yang membantu Anda mengelola inventaris dengan mudah dan cepat.
        </Text>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Fitur Utama</Text>
        
        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <FontAwesome name="shopping-bag" size={24} color="#FF7043" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Kelola Produk</Text>
            <Text style={styles.featureDesc}>Tambah, edit, dan hapus produk dengan mudah</Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <FontAwesome name="bar-chart" size={24} color="#FF7043" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Statistik Lengkap</Text>
            <Text style={styles.featureDesc}>Lihat ringkasan dan analisis penjualan</Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <FontAwesome name="tags" size={24} color="#FF7043" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Kategori Produk</Text>
            <Text style={styles.featureDesc}>Organisir produk berdasarkan kategori</Text>
          </View>
        </View>

        <View style={styles.featureCard}>
          <View style={styles.featureIcon}>
            <FontAwesome name="mobile" size={24} color="#FF7043" />
          </View>
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Responsif & Cepat</Text>
            <Text style={styles.featureDesc}>Akses kapan saja, di mana saja</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Ringkasan Cepat</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <FontAwesome name="cart-plus" size={28} color="#4CAF50" />
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Total Produk</Text>
          </View>
          <View style={styles.statCard}>
            <FontAwesome name="list" size={28} color="#2196F3" />
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Kategori</Text>
          </View>
        </View>
      </View>

      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Siap Memulai?</Text>
        <Text style={styles.ctaText}>
          Kunjungi tab "Produk" untuk mulai mengelola inventaris Anda!
        </Text>
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
  welcomeCard: {
    backgroundColor: '#FF7043',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userName: {
    fontSize: 18,
    color: '#FFE0B2',
    fontWeight: '600',
  },
  userRole: {
    fontSize: 14,
    color: '#FFE0B2',
    marginTop: 4,
  },
  infoSection: {
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
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  featuresSection: {
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: '#666',
  },
  statsSection: {
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
  },
  ctaSection: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    color: '#E3F2FD',
    textAlign: 'center',
  },
});