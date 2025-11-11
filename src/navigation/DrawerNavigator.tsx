import React from 'react'; 
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';

export type DrawerParamList = { 
    MainTabs: undefined; 
    Settings: undefined; 
};

const MyDrawer = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
    
    const CustomDrawerContent = require('./CustomDrawerContent').default;
    const TopTabNavigator = require('./TopTabNavigator').default;
    const SettingsScreen = require('../screens/SettingsScreen').default;

    return (
        <MyDrawer.Navigator 
            initialRouteName="MainTabs"
            
            drawerContent={(props: DrawerContentComponentProps) => <CustomDrawerContent {...props} />} 
            
            screenOptions={{
                headerShown: true, 
                swipeEnabled: false,
            }}
        >
            <MyDrawer.Screen 
                name="MainTabs" 
                component={TopTabNavigator} 
                options={{ title: 'Home' }}
            />
            <MyDrawer.Screen 
                name="Settings" 
                component={SettingsScreen} 
            />
        </MyDrawer.Navigator>
    );
}