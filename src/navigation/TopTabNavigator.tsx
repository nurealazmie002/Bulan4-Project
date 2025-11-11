import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProductListScreen from '../screens/ProductListScreen'; 
import { View, Text, StyleSheet } from 'react-native';

const TABS = [
    { name: 'Populer', title: 'Populer' },
    { name: 'Terbaru', title: 'Terbaru' },
    { name: 'Diskon', title: 'Diskon' },
    { name: 'Elektronik', title: 'Elektronik' },
    { name: 'Pakaian', title: 'Pakaian' },
    { name: 'Makanan', title: 'Makanan' },
    { name: 'Otomotif', title: 'Otomotif' },
    { name: 'Hiburan', title: 'Hiburan' },
];

export type TopTabParamList = {
    Populer: undefined;
    Terbaru: undefined;
    Diskon: undefined;
    Elektronik: undefined;
    Pakaian: undefined;
    Makanan: undefined;
    Otomotif: undefined;
    Hiburan: undefined;
};
const MyTopTabs = createMaterialTopTabNavigator<TopTabParamList>();

export default function TopTabNavigator() {
    return (
        <MyTopTabs.Navigator
            screenOptions={{
                tabBarScrollEnabled: true, 
                tabBarIndicatorContainerStyle: { backgroundColor: 'white' },
                tabBarActiveTintColor: '#007AFF',
                tabBarIndicatorStyle: { 
                    backgroundColor: '#007AFF',
                    height: 3, 
                }, 
                tabBarLabelStyle: { 
                    fontWeight: 'bold', 
                    fontSize: 14,
                    textTransform: 'none',
                }, 
                tabBarItemStyle: { width: 'auto' },
            }}
        >
            {TABS.map((tab) => (
                <MyTopTabs.Screen 
                    key={tab.name}
                    name={tab.name as keyof TopTabParamList}
                    children={() => <ProductListScreen category={tab.title} />} 
                    options={{ title: tab.title }} 
                />
            ))}
        </MyTopTabs.Navigator>
    );
}