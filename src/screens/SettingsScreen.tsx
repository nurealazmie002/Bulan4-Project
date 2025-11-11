import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerParamList } from '../navigation/DrawerNavigator'; 

type SettingsScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Settings'>;

export default function SettingsScreen() {
    const navigation = useNavigation<SettingsScreenNavigationProp>();
    
    const [isSwipeEnabled, setIsSwipeEnabled] = useState(false); 

    const handleToggleLock = () => {
        const newStatus = !isSwipeEnabled;
        setIsSwipeEnabled(newStatus);
        
        navigation.getParent()?.setOptions({
            swipeEnabled: newStatus,
        });
    };

    const handleGoHomeAndClose = () => {
        navigation.navigate('MainTabs'); 
        navigation.closeDrawer();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Pengaturan Navigasi</Text>
            
            <View style={styles.row}>
                <Text style={styles.label}>Buka Kunci Swipe Drawer:</Text>
                <Switch 
                    onValueChange={handleToggleLock}
                    value={isSwipeEnabled}
                    trackColor={{ false: '#767577', true: '#FF7043' }}
                />
            </View>
            <Text style={styles.hint}>
                Drawer saat ini {(isSwipeEnabled ? 'Dapat' : 'TIDAK DAPAT')} dibuka dengan gesture swipe.
            </Text>
            
            <View style={styles.spacer} />

            <Button
                title="Kembali ke Home & Tutup Menu"
                onPress={handleGoHomeAndClose}
                color="#007AFF"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
    label: { fontSize: 16 },
    hint: { fontSize: 12, color: '#666', marginBottom: 20 },
    spacer: { height: 30 }
});