// import React, { useState, useCallback } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   ImageBackground,
//   Modal,
//   StatusBar,
//   Switch,
//   StyleSheet,
//   SafeAreaView,
//   Pressable,
//   ScrollView,
//   RefreshControl,
//   SectionList,
//   FlatList,
//   Alert,
//   ViewToken,
// } from 'react-native';
// import TextTicker from 'react-native-text-ticker';

// const BACKGROUND_IMAGE_URI =
//   'https://i.pinimg.com/736x/f9/d3/1e/f9d31e8a803f3a4fdf61e4fe1be929dc.jpg';
// const LOGO_IMAGE_URI =
//   'https://i.pinimg.com/474x/38/c8/31/38c831c1291e025623a640e43762c31d.jpg';

// type DataItem = { id: string; title: string };
// const DATA: DataItem[] = Array.from({ length: 30 }, (_, i) => ({
//   id: i.toString(),
//   title: `Item ${i + 1}`,
// }));

// const App = () => {
//   const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [refreshing, setRefreshing] = useState(false);

//   const toggleSwitch = () =>
//     setIsNotificationsEnabled((previousState) => !previousState);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setUserName('');
//       setIsNotificationsEnabled(false);
//       setIsModalVisible(false);
//       setRefreshing(false);
//     }, 1500);
//   }, []);

//   const viewabilityConfig = { itemVisiblePercentThreshold: 50 };

//   const onViewableItemsChanged = useCallback(
//     (info: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
//       if (info.viewableItems.length > 0) {
//         const firstItem = info.viewableItems[0].item as DataItem;
//         Alert.alert('Item Terlihat', `${firstItem.title} sedang terlihat`);
//       }
//     },
//     []
//   );

//   const getItemLayout = useCallback(
//   (_data: any, index: number) => ({
//     length: 50,
//     offset: 50 * index,
//     index,
//   }),
//   []
// );


//   const sections = [
//     {
//       title: 'Komponen Input',
//       data: ['TextInput untuk nama pengguna', 'Switch untuk notifikasi'],
//     },
//     {
//       title: 'Interaksi Pengguna',
//       data: ['Tombol untuk membuka modal', 'Tombol untuk menutup modal'],
//     },
//     {
//       title: 'Fitur UI',
//       data: [
//         'Gambar latar belakang dengan overlay',
//         'ScrollView dengan RefreshControl',
//         'Modal interaktif',
//       ],
//     },
//   ];

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />

//       <SafeAreaView style={styles.container}>
//         <ImageBackground
//           source={{ uri: BACKGROUND_IMAGE_URI }}
//           style={styles.headerBackground}
//           resizeMode="cover">
//           <View style={styles.headerOverlay}>
//             <Text style={styles.headerText}>Component Showcase</Text>
//           </View>
//         </ImageBackground>

//         <ScrollView
//           contentContainerStyle={styles.body}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               colors={['#3498db']}
//             />
//           }>
//           <Image
//             source={{ uri: LOGO_IMAGE_URI }}
//             style={styles.logoImage}
//             accessibilityLabel="Logo Aplikasi"
//           />

//           <Text style={styles.label}>Masukkan Nama Pengguna:</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="Ketik nama Anda di sini..."
//             value={userName}
//             onChangeText={setUserName}
//             placeholderTextColor="#95a5a6"
//           />

//           <View style={styles.settingRow}>
//             <Text style={styles.label}>Aktifkan Notifikasi:</Text>
//             <Switch
//               trackColor={{ false: '#767577', true: '#3498db' }}
//               thumbColor="#f4f3f4"
//               onValueChange={toggleSwitch}
//               value={isNotificationsEnabled}
//             />
//           </View>

//           <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
//             <Text style={styles.buttonText}>Lihat Detail (Modal)</Text>
//           </Pressable>

//           <View style={styles.sectionContainer}>
//             <Text style={styles.sectionTitle}>Daftar Komponen di Aplikasi</Text>
//             <SectionList
//               sections={sections}
//               keyExtractor={(item, index) => item + index}
//               renderItem={({ item }) => (
//                 <Text style={styles.itemText}>{'• ' + item}</Text>
//               )}
//               renderSectionHeader={({ section: { title } }) => (
//                 <Text style={styles.sectionHeader}>{title}</Text>
//               )}
//             />
//           </View>

//           <View style={styles.flatListContainer}>
//             <Text style={styles.sectionTitle}>Daftar Item FlatList</Text>
//             <FlatList
//               data={DATA}
//               keyExtractor={(item) => item.id}
//               renderItem={({ item }) => (
//                 <View style={styles.flatItem}>
//                   <Text style={styles.flatText}>{item.title}</Text>
//                 </View>
//               )}
//               getItemLayout={getItemLayout}
//               initialNumToRender={10}
//               viewabilityConfig={viewabilityConfig}
//               onViewableItemsChanged={onViewableItemsChanged} 
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               ListHeaderComponent={
//                 <Text style={styles.flatHeader}>-- Awal Daftar --</Text>
//               }
//               ListFooterComponent={
//                 <Text style={styles.flatFooter}>-- Akhir Daftar --</Text>
//               }
//             />
//           </View>
//         </ScrollView>

//         <View style={styles.listScroll}>
//           <TextTicker
//             style={styles.textScroll}
//             duration={15000}
//             loop
//             repeatSpacer={100}
//             marqueeDelay={1000}>
//             Powered by React Native • Powered by React Native • Powered by React Native •
//             Powered by React Native
//           </TextTicker>
//         </View>

//         <Modal
//           animationType="slide"
//           transparent
//           visible={isModalVisible}
//           onRequestClose={() => setIsModalVisible(false)}>
//           <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//               <Text style={styles.modalText}>Halo, {userName || 'Tamu'}!</Text>
//               <Text style={styles.modalTextSmall}>
//                 Notifikasi saat ini: {isNotificationsEnabled ? 'AKTIF' : 'NONAKTIF'}
//               </Text>
//               <Pressable
//                 style={[styles.button, styles.buttonClose]}
//                 onPress={() => setIsModalVisible(false)}>
//                 <Text style={styles.buttonText}>Tutup</Text>
//               </Pressable>
//             </View>
//           </View>
//         </Modal>
//       </SafeAreaView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#ecf0f1' },
//   headerBackground: { width: '100%', height: 150, justifyContent: 'center', alignItems: 'center' },
//   headerOverlay: { backgroundColor: 'rgba(0,0,0,0.4)', padding: 20, borderRadius: 5 },
//   headerText: { fontSize: 24, fontWeight: 'bold', color: 'white' },
//   body: { flexGrow: 1, alignItems: 'center', paddingVertical: 20 },
//   logoImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
//   label: { fontSize: 18, marginBottom: 5, color: '#2c3e50', fontWeight: '500' },
//   input: {
//     height: 38,
//     borderColor: '#bdc3c7',
//     borderWidth: 1,
//     paddingHorizontal: 8,
//     marginBottom: 20,
//     borderRadius: 5,
//     backgroundColor: 'white',
//     width: '80%',
//   },
//   settingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     width: '80%',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     marginBottom: 20,
//   },
//   button: {
//     borderRadius: 5,
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     backgroundColor: '#3498db',
//     elevation: 2,
//     marginTop: 10,
//   },
//   buttonText: { color: 'white', fontWeight: 'bold', textAlign: 'center' },
//   buttonClose: { backgroundColor: '#e74c3c' },
//   sectionContainer: {
//     marginTop: 20,
//     width: '85%',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     elevation: 3,
//   },
//   sectionTitle:{ 
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//     marginBottom: 10,
//     textAlign: 'center' 
//   },
//   sectionHeader:{
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color: '#2980b9' 
//   },
//   itemText:{
//     fontSize: 14,
//     marginLeft: 10,
//     color: '#2c3e50', 
//     marginVertical: 2 
//   },
//   flatListContainer:{
//     width: '85%', 
//     marginTop: 25, 
//     backgroundColor: '#fff', 
//     borderRadius: 8, 
//     padding: 10, 
//     elevation: 3 
//   },
//   flatItem: { 
//     padding: 10, 
//     borderBottomWidth: 1, 
//     borderBottomColor: '#ecf0f1' 
//   },
//   flatText: { 
//     color: '#2c3e50', 
//     fontSize: 14 
//   },
//   flatHeader: { 
//     textAlign: 'center', 
//     fontWeight: 'bold', 
//     color: '#2980b9', 
//     marginVertical: 5 
//   },
//   flatFooter: { 
//     textAlign: 'center', 
//     fontWeight: 'bold', 
//     color: '#27ae60', 
//     marginVertical: 5 
//   },
//   listScroll: { 
//     paddingVertical: 10, 
//     backgroundColor: '#3498db', 
//     alignItems: 'center' 
//   },
//   textScroll: { 
//     color: 'white', 
//     fontWeight: 'bold' 
//   },
//   centeredView: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center', 
//     backgroundColor: 'rgba(0,0,0,0.5)' 
//   },
//   modalView: { 
//     margin: 20, 
//     backgroundColor: 'white', 
//     borderRadius: 10, 
//     padding: 35, 
//     alignItems: 'center', 
//     elevation: 5 
//   },
//   modalText: { 
//     marginBottom: 15, 
//     textAlign: 'center', 
//     fontSize: 18, 
//     fontWeight: 'bold' 
//   },
//   modalTextSmall: { 
//     marginBottom: 20, 
//     textAlign: 'center', 
//     fontSize: 14, 
//     color: '#7f8c8d' 
//   },
// });

// export default App;//
