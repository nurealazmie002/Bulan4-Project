import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import FontAwesome from '@react-native-vector-icons/fontawesome';

export default function TentangScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoSection}>
        <View style={styles.logoCircle}>
          <FontAwesome name="shopping-bag" size={50} color="#FF7043" />
        </View>
        <Text style={styles.appName}>Mini E-Commerce</Text>
        <Text style={styles.appVersion}>Versi 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👨‍💻 Developer</Text>
        <View style={styles.developerCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/89/3b/8e/893b8e08cca8bbecb2f6e8693b80d72c.jpg' }}
            style={styles.devAvatar}
          />
          <View style={styles.devInfo}>
            <Text style={styles.devName}>Naufal Hibatullah Nuril Azmi</Text>
            <Text style={styles.devRole}>Full Stack Developer</Text>
            <Text style={styles.devLocation}>Kota Bandar Lampung, Indonesia</Text>
          </View>
        </View>
      </View>

      {/* Tech Stack */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}> Teknologi yang Digunakan</Text>
        
        <View style={styles.techItem}>
          <View style={styles.techIcon}>
            <Text style={styles.techEmoji}>⚛️</Text>
          </View>
          <View style={styles.techInfo}>
            <Text style={styles.techName}>React Native</Text>
            <Text style={styles.techDesc}>Framework untuk mobile app</Text>
          </View>
        </View>

        <View style={styles.techItem}>
          <View style={styles.techIcon}>
            <Text style={styles.techEmoji}>📘</Text>
          </View>
          <View style={styles.techInfo}>
            <Text style={styles.techName}>TypeScript</Text>
            <Text style={styles.techDesc}>Type-safe JavaScript</Text>
          </View>
        </View>

        <View style={styles.techItem}>
          <View style={styles.techIcon}>
            <Text style={styles.techEmoji}>🧭</Text>
          </View>
          <View style={styles.techInfo}>
            <Text style={styles.techName}>React Navigation</Text>
            <Text style={styles.techDesc}>Routing dan navigasi</Text>
          </View>
        </View>
      </View>

      {/* Features List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitur Aplikasi</Text>
        <Text style={styles.featureText}>✅ Manajemen produk (CRUD)</Text>
        <Text style={styles.featureText}>✅ Filter produk berdasarkan kategori</Text>
        <Text style={styles.featureText}>✅ Statistik penjualan</Text>
        <Text style={styles.featureText}>✅ Drawer navigation</Text>
        <Text style={styles.featureText}>✅ Material top tabs</Text>
        <Text style={styles.featureText}>✅ Bottom tabs navigation</Text>
        <Text style={styles.featureText}>✅ Responsive design</Text>
      </View>

      {/* Contact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📬 Kontak</Text>
        <TouchableOpacity style={styles.contactItem}>
          <FontAwesome name="envelope" size={20} color="#FF7043" />
          <Text style={styles.contactText}>nurealazmie002@email.com</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <FontAwesome name="github" size={20} color="#FF7043" />
          <Text style={styles.contactText}>github.com/naufalhibatullah</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactItem}>
          <FontAwesome name="instagram" size={20} color="#FF7043" />
          <Text style={styles.contactText}>@naufalhibatullah</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Made in Bandar Lampung</Text>
        <Text style={styles.copyright}>© 2024 Naufal Hibatullah</Text>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 30,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFE0B2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  appVersion: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
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
  developerCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  devAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#FF7043',
    marginRight: 15,
  },
  devInfo: {
    flex: 1,
  },
  devName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  devRole: {
    fontSize: 14,
    color: '#FF7043',
    marginBottom: 4,
  },
  devLocation: {
    fontSize: 13,
    color: '#666',
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  techIcon: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  techEmoji: {
    fontSize: 24,
  },
  techInfo: {
    flex: 1,
  },
  techName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  techDesc: {
    fontSize: 13,
    color: '#666',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  copyright: {
    fontSize: 12,
    color: '#999',
  },
});