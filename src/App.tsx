import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './contexts/GlobalContext';
import AppNavigator from './auth/appNavigator';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {

      
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };
    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GlobalProvider>
      <NavigationContainer>
        <AppNavigator isFirstLaunch={isFirstLaunch} />
      </NavigationContainer>
    </GlobalProvider>
  );
}
