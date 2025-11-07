// import React from 'react';
// import {
//   View,
//   Text,
//   Button,
//   Pressable,
//   TouchableOpacity,
//   TouchableHighlight,
//   TouchableWithoutFeedback,
//   TouchableNativeFeedback,
//   Animated,
//   Alert,
//   Platform,
//   ScrollView,
//   StyleSheet,
// } from 'react-native';

// export default function SemuaSoalScreen() {
//   const scale = new Animated.Value(1);

//   const handlePressIn = () => {
//     Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
//   };
//   const handlePressOut = () => {
//     Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
//   };

//   const renderTouchableWithoutFeedback = () => (
//     <TouchableWithoutFeedback
//       onPress={() => Alert.alert('Soal 5', 'Tanpa Feedback Visual')}
//       onPressIn={handlePressIn}
//       onPressOut={handlePressOut}
//     >
//       <Animated.View style={[styles.demoButton, { backgroundColor: '#FF9800', transform: [{ scale }] }]}>
//         <Text style={styles.demoText}>Tanpa Feedback</Text>
//       </Animated.View>
//     </TouchableWithoutFeedback>
//   );

//   const renderTouchableNativeFeedback = () => {
//     const content = (
//       <View style={[styles.demoButton, { backgroundColor: '#2196F3' }]}>
//         <Text style={styles.demoText}>Ripple Android</Text>
//       </View>
//     );
//     if (Platform.OS === 'android') {
//       return (
//         <TouchableNativeFeedback
//           background={TouchableNativeFeedback.Ripple('#BBDEFB', false)}
//           onPress={() => Alert.alert('Soal 6', 'Ripple Android ditekan!')}
//         >
//           {content}
//         </TouchableNativeFeedback>
//       );
//     } else {
//       return content;
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.title}>Soal 1 – Button</Text>
//       <Button
//         title="Klik Saya"
//         onPress={() => Alert.alert('Soal 1', 'Tombol ditekan!')}
//         color="#4CAF50"
//       />

//       <Text style={styles.title}>Soal 2 – Pressable</Text>
//       <Pressable
//         onPress={() => Alert.alert('Soal 2', 'Pressed!')}
//         onLongPress={() => Alert.alert('Soal 2', 'Long Pressed!')}
//         style={({ pressed }) => [
//           styles.demoButton,
//           { backgroundColor: pressed ? '#2196F3' : '#4CAF50' },
//         ]}
//         android_ripple={{ color: '#BBDEFB' }}
//       >
//         {({ pressed }) => (
//           <Text style={styles.demoText}>
//             {pressed ? 'Menekan...' : 'Tekan Saya'}
//           </Text>
//         )}
//       </Pressable>

//       <Text style={styles.title}>Soal 3 – TouchableOpacity</Text>
//       <TouchableOpacity
//         activeOpacity={0.5}
//         onPress={() => Alert.alert('Soal 3', 'Opacity Button ditekan!')}
//         style={[styles.demoButton, { backgroundColor: '#6200EE' }]}
//       >
//         <Text style={styles.demoText}>Tekan dengan Efek Opacity</Text>
//       </TouchableOpacity>

//       <Text style={styles.title}>Soal 4 – TouchableHighlight</Text>
//       <TouchableHighlight
//         underlayColor="#BBDEFB"
//         activeOpacity={0.8}
//         onPress={() => Alert.alert('Soal 4', 'Highlight Button ditekan!')}
//         style={[styles.demoButton, { backgroundColor: '#2196F3' }]}
//       >
//         <Text style={styles.demoText}>Tombol Highlight</Text>
//       </TouchableHighlight>

//       <Text style={styles.title}>Soal 5 – TouchableWithoutFeedback</Text>
//       {renderTouchableWithoutFeedback()}

//       <Text style={styles.title}>Soal 6 – TouchableNativeFeedback</Text>
//       {renderTouchableNativeFeedback()}

//       <View style={{ height: 100 }} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#FAFAFA',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '700',
//     marginTop: 24,
//     marginBottom: 8,
//     color: '#333',
//   },
//   demoButton: {
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   demoText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });
