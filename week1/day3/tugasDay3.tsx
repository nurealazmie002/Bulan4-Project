// import React, { useState } from 'react';
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
// } from 'react-native';

// const BACKGROUND_IMAGE_URI = 'https://picsum.photos/800/400';
// const LOGO_IMAGE_URI = 'https://i.pinimg.com/474x/38/c8/31/38c831c1291e025623a640e43762c31d.jpg';

// const App = () => {
//   const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [userName, setUserName] = useState('');

//   const toggleSwitch = () => setIsNotificationsEnabled(previousState => !previousState);

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#2c3e50" />
      
//       <SafeAreaView style={styles.container}>

//         <ImageBackground 
//           source={{ uri: BACKGROUND_IMAGE_URI }} 
//           style={styles.headerBackground} 
//           resizeMode="cover"
//         >
//           <View style={styles.headerOverlay}>
//             <Text style={styles.headerText}>Component Showcase</Text>
//           </View>
//         </ImageBackground>

//         <View style={styles.body}>

//           <Image 
//             source={{ uri: LOGO_IMAGE_URI }} 
//             style={styles.logoImage} 
//             accessibilityLabel="Logo Aplikasi"
//             accessibilityRole="image"
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
//               trackColor={{ false: "#767577", true: "#3498db" }}
//               thumbColor={isNotificationsEnabled ? "#f4f3f4" : "#f4f3f4"}
//               onValueChange={toggleSwitch}
//               value={isNotificationsEnabled}
//             />
//           </View>

//           <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
//             <Text style={styles.buttonText}>Lihat Detail (Modal)</Text>
//           </Pressable>
//         </View>

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={isModalVisible}
//           onRequestClose={() => setIsModalVisible(false)}
//         >
//           <View style={styles.centeredView}>
//             {/* View untuk kotak konten Modal */}
//             <View style={styles.modalView}>
              
              
//               <Text style={styles.modalText}>
//                 Halo, {userName || 'Tamu'}!
//               </Text>
//               <Text style={styles.modalTextSmall}>
//                 Notifikasi saat ini: {isNotificationsEnabled ? 'AKTIF' : 'NONAKTIF'}
//               </Text>
              
//               <Pressable
//                 style={[styles.button, styles.buttonClose]}
//                 onPress={() => setIsModalVisible(!isModalVisible)}
//               >
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
//   container: {
//     flex: 1,
//     backgroundColor: '#ecf0f1',
//   },
//   headerBackground: {
//     width: '100%',
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerOverlay: {
//     backgroundColor: 'rgba(0,0,0,0.4)', 
//     padding: 20,
//     borderRadius: 5,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//  body: {
//   flex: 1,
//   justifyContent: 'center', 
//   alignItems: 'center',  
// },
//   logoImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 20,
//     marginBottom: 5,
//     color: '#2c3e50',
//     fontWeight: '500',
//   },
//   input: {
//     height: 40,
//     borderColor: '#bdc3c7',
//     borderWidth: 1,
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     borderRadius: 5,
//     backgroundColor: 'white',
//   },
//   settingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//     marginBottom: 20,
//   },
//   button: {
//     borderRadius: 5,
//     padding: 20,
//     elevation: 2,
//     backgroundColor: '#3498db',
//     marginTop: 10,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)', 
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 35,
//     alignItems: 'center',
//     elevation: 5,
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalTextSmall: {
//     marginBottom: 20,
//     textAlign: 'center',
//     fontSize: 14,
//     color: '#7f8c8d',
//   },
//   buttonClose: {
//     backgroundColor: '#e74c3c',
//   },
// });

// export default App;