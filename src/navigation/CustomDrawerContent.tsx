import React from 'react';
import { View, Text, Image, StyleSheet, Button, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';

const DUMMY_USER = {
    name: "Naufal Hibatullah",
    bio: "Content Creator & Motivator",
    profileUri: "https://i.pinimg.com/736x/89/3b/8e/893b8e08cca8bbecb2f6e8693b80d72c.jpg",
};

const ProfileCard = () => (
    <View style={styles.profileContainer}>
        <Image
            source={{ uri: DUMMY_USER.profileUri }} 
            style={styles.profileImage}
        />
        <View style={styles.textContainer}>
            <Text style={styles.nameText}>{DUMMY_USER.name}</Text>
            <Text style={styles.bioText}>{DUMMY_USER.bio}</Text>
        </View>
    </View>
);

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <View style={{ flex: 1 }}> 
            <DrawerContentScrollView {...props}>
                <ProfileCard />
                <View style={styles.divider} /> 
                
                <DrawerItemList {...props} /> 
            </DrawerContentScrollView>

            <View style={styles.bottomDrawer}>
                <Button 
                    title="Logout" 
                    onPress={() => {
                        Alert.alert('Logout', 'Anda telah berhasil keluar.', [{ text: 'OK' }]); 
                        props.navigation.closeDrawer();
                    }}
                    color="red"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        marginBottom: 10,
        paddingTop: 40,
    },
    profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 2, borderColor: '#FF7043' },
    textContainer: { justifyContent: 'center' },
    nameText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    bioText: { fontSize: 13, color: '#666' },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 5 },
    bottomDrawer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    }
});