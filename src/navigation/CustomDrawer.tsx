import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import { useAuth } from '../context/AuthContext';

interface CustomDrawerProps extends DrawerContentComponentProps {
  isAuthenticated: boolean;
}

export default function CustomDrawer(props: CustomDrawerProps) {
  const { logout } = useAuth();
  const { navigation } = props;

  const handleLogout = async () => {
    console.log('Logout button pressed');
    navigation.closeDrawer();
    
    setTimeout(async () => {
      await logout();
      console.log('Logout complete');
    }, 300);
  };


  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/89/3b/8e/893b8e08cca8bbecb2f6e8693b80d72c.jpg' }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Naufal Hibatullah</Text>
          <Text style={styles.profileRole}>Content Creator & Motivator</Text>
          
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <FontAwesome name="map-marker" size={14} color="#FFE0B2" />
              <Text style={styles.infoText}>Bandar Lampung</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="envelope" size={14} color="#FFE0B2" />
              <Text style={styles.infoText}>naufal@email.com</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu Navigasi</Text>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <FontAwesome name="sign-out" size={20} color="#F44336" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        <Text style={styles.footerVersion}>Keychain Protected v1.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  profileCard: {
    padding: 20,
    paddingBottom: 25,
    alignItems: 'center',
    backgroundColor: '#FF7043',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: '#fff',
    marginBottom: 12,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  profileRole: {
    fontSize: 14,
    color: '#FFE0B2',
    marginTop: 4,
    marginBottom: 12,
  },
  infoContainer: {
    width: '100%',
    marginTop: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
    paddingHorizontal: 10,
  },
  infoText: {
    fontSize: 13,
    color: '#FFE0B2',
    marginLeft: 8,
  },
  menuSection: {
    flex: 1,
    paddingTop: 10,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 20,
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FAFAFA',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: {
    fontSize: 16,
    color: '#F44336',
    marginLeft: 12,
    fontWeight: 'bold',
  },
  footerVersion: {
    fontSize: 11,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
  },
});