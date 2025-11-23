import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  PermissionsAndroid,
  Platform,
  ActivityIndicator
} from 'react-native';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadScreen() {
  const [selectedImages, setSelectedImages] = useState<Asset[]>([]);
  const [ktpImage, setKtpImage] = useState<Asset | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem('@ecom:newProductAssets');
      if (saved) setSelectedImages(JSON.parse(saved));
      
      const savedProfile = await AsyncStorage.getItem('@profile:preview');
      if (savedProfile) setProfilePreview(savedProfile);
    };
    loadData();
  }, []);

  const pickProductImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5,
        maxWidth: 600, maxHeight: 600, quality: 0.8,
      });

      if (result.assets) {
        setSelectedImages(result.assets);
        saveToStorage(result.assets);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeImage = async (indexToRemove: number) => {
    const updated = selectedImages.filter((_, index) => index !== indexToRemove);
    setSelectedImages(updated);
    saveToStorage(updated);
  };

  const saveToStorage = async (assets: Asset[]) => {
    const data = assets.map(item => ({
      uri: item.uri, fileName: item.fileName, type: item.type
    }));
    await AsyncStorage.setItem('@ecom:newProductAssets', JSON.stringify(data));
  };

  const requestCamera = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        if (granted === PermissionsAndroid.RESULTS.GRANTED || Platform.Version >= 33) {
          openCamera(true);
        } else {
          openCamera(false);
        }
      } catch (err) { console.warn(err); }
    } else {
      openCamera(true);
    }
  };

  const openCamera = async (saveToPhotos: boolean) => {
    const result = await launchCamera({ mediaType: 'photo', saveToPhotos, quality: 0.7 });

    if (result.errorCode === 'camera_unavailable') {
      Alert.alert('Info', 'Kamera tidak tersedia', [{ text: 'OK' }]);
      return;
    }

    if (result.assets) {
      setKtpImage(result.assets[0]);
      setUploading(true);
      setTimeout(() => {
        setUploading(false);
        Alert.alert('Sukses', 'KTP Terupload!');
      }, 2000);
    }
  };

  const removeKtp = () => {
    setKtpImage(null);
  };

  const pickProfile = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', includeBase64: true, maxWidth: 300, maxHeight: 300 });

    if (result.assets && result.assets[0].base64) {
      const base64 = `data:${result.assets[0].type};base64,${result.assets[0].base64}`;
      setProfilePreview(base64);
      await AsyncStorage.setItem('@profile:preview', base64);
    }
  };

  const removeProfile = async () => {
    setProfilePreview(null);
    await AsyncStorage.removeItem('@profile:preview');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}> Upload Manager</Text>

      <View style={styles.section}>
        <Text style={styles.label}>A. Foto Produk (Max 5)</Text>
        <TouchableOpacity style={styles.btnPrimary} onPress={pickProductImages}>
          <Text style={styles.emojiIcon}></Text> 
          <Text style={styles.btnText}>Pilih Foto</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          {selectedImages.map((img, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri: img.uri }} style={styles.thumb} />
              <TouchableOpacity style={styles.deleteBtn} onPress={() => removeImage(index)}>
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>B. Verifikasi KTP</Text>
        <TouchableOpacity style={styles.btnSecondary} onPress={requestCamera}>
          <Text style={styles.emojiIcon}></Text>
          <Text style={styles.btnText}>Ambil Foto KTP</Text>
        </TouchableOpacity>

        {uploading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="small" color="#FF7043" />
            <Text style={styles.loadingText}>Mengupload...</Text>
          </View>
        )}
        
        {ktpImage && !uploading && (
          <View style={styles.ktpWrapper}>
            <Image source={{ uri: ktpImage.uri }} style={styles.largePreview} />
            
            <View style={styles.successBadge}>
              <Text style={styles.successText}>✅ Terupload</Text>
            </View>

            <TouchableOpacity style={styles.deleteBtnLarge} onPress={removeKtp}>
              <Text style={styles.deleteText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>C. Profil Preview</Text>
        <View style={styles.profileRow}>
          <TouchableOpacity style={styles.btnOutline} onPress={pickProfile}>
            <Text style={styles.btnOutlineText}>Ganti Avatar</Text>
          </TouchableOpacity>
          
          {profilePreview ? (
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: profilePreview }} style={styles.avatar} />
              
              <TouchableOpacity style={styles.deleteBtnRound} onPress={removeProfile}>
                <Text style={styles.deleteText}>X</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={{ fontSize: 30 }}>👤</Text>
            </View>
          )}
        </View>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, color: '#333' },
  
  section: { marginBottom: 30, borderBottomWidth: 1, borderBottomColor: '#F0F0F0', paddingBottom: 20 },
  label: { fontSize: 15, fontWeight: 'bold', marginBottom: 12, color: '#555' },
  emojiIcon: { fontSize: 18, marginRight: 8 },
  btnPrimary: { backgroundColor: '#FF7043', padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnSecondary: { backgroundColor: '#42A5F5', padding: 12, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnOutline: { borderWidth: 1, borderColor: '#FF7043', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  btnOutlineText: { color: '#FF7043', fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 15 },
  imageWrapper: { position: 'relative' },
  thumb: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#EEE' },
  deleteBtn: {
    position: 'absolute', top: -8, right: -8, backgroundColor: '#D32F2F',
    width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff', elevation: 4, zIndex: 10,
  },
  deleteBtnLarge: {
    position: 'absolute', top: -10, right: -10, backgroundColor: '#D32F2F',
    width: 30, height: 30, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff', elevation: 4, zIndex: 10,
  },
  deleteBtnRound: {
    position: 'absolute', top: 0, right: 0, backgroundColor: '#D32F2F',
    width: 24, height: 24, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#fff', elevation: 4, zIndex: 10,
  },
  deleteText: { color: '#fff', fontWeight: 'bold', fontSize: 12, marginTop: -2 },
  loadingBox: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
  loadingText: { marginLeft: 8, color: '#666', fontSize: 13 },
  ktpWrapper: { marginTop: 15, position: 'relative' }, 
  largePreview: { width: '100%', height: 180, borderRadius: 10, resizeMode: 'cover', backgroundColor: '#F5F5F5' },
  successBadge: {
    position: 'absolute', bottom: 10, left: 10, backgroundColor: 'rgba(0,0,0,0.6)', 
    paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12
  },
  successText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  profileRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 },
  avatarWrapper: { position: 'relative' }, 
  avatar: { width: 70, height: 70, borderRadius: 35 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5', width: 70, height: 70, borderRadius: 35 }
});