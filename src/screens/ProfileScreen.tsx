import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert } from "react-native";
import { useUser } from '../context/UserContext'; 
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ProfileScreen() {
  const { userID, setUserID } = useUser();
  
  const navigation = useNavigation();
  const route = useRoute<any>(); 

  useEffect(() => {
    if (route.params?.userId) {
      const incomingUserId = route.params.userId;
      console.log("🔗 Deep Link Parameter Detected:", incomingUserId);

      const isValid = incomingUserId.toLowerCase() !== 'guest' && incomingUserId.length >= 3;

      if (!isValid) {
        Alert.alert(
          "Akses Ditolak",
          `User ID "${incomingUserId}" tidak valid. ID harus lebih dari 3 karakter.`,
          [
            { 
              text: "Kembali ke Home", 
              onPress: () => navigation.navigate('Beranda' as never) 
            }
          ]
        );
      } else {
        setUserID(incomingUserId);
      }
    }
  }, [route.params?.userId]); 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://i.pinimg.com/736x/89/3b/8e/893b8e08cca8bbecb2f6e8693b80d72c.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>Naufal Hibatullah</Text>
        <Text style={styles.role}>Content Creator & Motivator</Text>
        
        <View style={styles.userIDBadge}>
          <Text style={styles.userIDText}>User ID: {userID}</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>Biodata</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Nama Lengkap</Text>
          <Text style={styles.value}>Naufal Hibatullah Nuril Azmi</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Tanggal Lahir</Text>
          <Text style={styles.value}>08 November 2005</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Pekerjaan</Text>
          <Text style={styles.value}>Content Creator</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Kota Asal</Text>
          <Text style={styles.value}>Bandar Lampung</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#FF7043",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  role: {
    fontSize: 16,
    color: "#666",
  },
  userIDBadge: {
    backgroundColor: '#FF7043',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 10,
  },
  userIDText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoCard: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#FF7043",
  },
  infoRow: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: "#888",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
});