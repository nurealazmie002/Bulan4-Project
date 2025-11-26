import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { requestLocationPermission, calculateDistance, sendLocationToServer } from '../utils/locationUtils';
const STORE_LOC = { latitude: -7.9918683, longitude: 110.3003782 }; 

export default function StoreLocatorScreen() {
  const [myLocation, setMyLocation] = useState<{lat: number, lon: number} | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [distance, setDistance] = useState<number>(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => { sendLocationToServer(); }, []);

  const startLiveTracking = async () => {
    const hasPerm = await requestLocationPermission();
    if (!hasPerm) return;

    setIsTracking(true);
    
    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMyLocation({ lat: latitude, lon: longitude });
        
        const dist = calculateDistance(latitude, longitude, STORE_LOC.latitude, STORE_LOC.longitude);
        setDistance(dist);

        if (dist < 10000) {
          Alert.alert(" PROMO ALERT!", "Anda dekat toko! Diskon 20%.");
          stopTracking();
        }
      },
      (error) => {
        console.log(error);
        if (error.code === 3) {
          Alert.alert("Lemah Sinyal", "Gagal mendapat lokasi (Timeout). Coba geser posisi HP.");
        } else if (error.code === 1) {
          Alert.alert("Izin Ditolak", "Mohon nyalakan izin lokasi.");
        } else {
          Alert.alert("GPS Error", "Pastikan GPS hidup.");
        }
        stopTracking(); 
      },
      { 
        enableHighAccuracy: false, 
        distanceFilter: 10,        
        timeout: 30000,            
        maximumAge: 10000          
      }
    );
    setWatchId(id);
  };

  const stopTracking = () => {
    if (watchId !== null) {
      Geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  };

  useEffect(() => {
    return () => { if (watchId !== null) Geolocation.clearWatch(watchId); };
  }, [watchId]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={{fontSize: 60}}>📡</Text>
        <Text style={styles.title}>Store Radar</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Pusat Toko:</Text>
        <Text style={styles.coord}>Lat: {STORE_LOC.latitude}</Text>
        <Text style={styles.coord}>Lon: {STORE_LOC.longitude}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lokasi Anda:</Text>
        {myLocation ? (
          <>
            <Text style={styles.coord}>Lat: {myLocation.lat.toFixed(6)}</Text>
            <Text style={styles.coord}>Lon: {myLocation.lon.toFixed(6)}</Text>
            
            <View style={styles.distBox}>
              <Text style={styles.distLabel}>Jarak ke Toko</Text>
              <Text style={styles.distValue}>{distance.toFixed(0)} Meter</Text>
            </View>
          </>
        ) : (
          <Text style={{color:'#999'}}>Menunggu Sinyal GPS...</Text>
        )}
      </View>

      <TouchableOpacity 
        style={[styles.btn, isTracking ? styles.btnStop : styles.btnStart]}
        onPress={isTracking ? stopTracking : startLiveTracking}
      >
        <Text style={{fontSize: 18, color: '#fff'}}>
          {isTracking ? "⏹️" : "▶️"}
        </Text>
        <Text style={styles.btnText}>
          {isTracking ? 'Matikan Radar' : 'Mulai Tracking'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.hint}>*Pastikan GPS Nyala & Izin Diberikan</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  header: { alignItems: 'center', marginBottom: 30, marginTop: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginTop: 10, color: '#333' },
  card: { width: '100%', backgroundColor: '#F5F5F5', padding: 15, borderRadius: 10, marginBottom: 15 },
  label: { fontWeight: 'bold', marginBottom: 5, color: '#555' },
  coord: { fontFamily: 'monospace', color: '#333' },
  distBox: { marginTop: 15, backgroundColor: '#E3F2FD', padding: 10, borderRadius: 8, alignItems: 'center' },
  distLabel: { fontSize: 12, color: '#1976D2' },
  distValue: { fontSize: 24, fontWeight: 'bold', color: '#1976D2' },
  btn: { flexDirection: 'row', padding: 15, borderRadius: 30, width: '100%', justifyContent: 'center', alignItems: 'center', gap: 10, elevation: 3 },
  btnStart: { backgroundColor: '#4CAF50' },
  btnStop: { backgroundColor: '#F44336' },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  hint: { marginTop: 20, color: '#999', fontSize: 12, fontStyle: 'italic' }
});