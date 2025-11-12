import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import ButtonTabNavigator from './src/navigation/ButtonTabNavigator';
enableScreens();




export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ButtonTabNavigator/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}