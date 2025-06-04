import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './auth/appNavigator'; // main app when logged in
import AuthNavigator from './auth/AuthNavigator'; // includes GetStarted, Login, SignUp
import { NavigationContainer } from '@react-navigation/native';
import { GlobalProvider } from './contexts/GlobalContext';
import { View, ActivityIndicator } from 'react-native';
import AuthNavigatorInitial from './auth/AuthNavigatorInitial';

export default function App() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<null | boolean>(true);
  const tester = true;
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
        {tester ? (
          // Show only the GetStarted screen first
          <AuthNavigatorInitial />
        ) : (
          <AuthNavigator />
        )}
      </NavigationContainer>
    </GlobalProvider>
  );
}
