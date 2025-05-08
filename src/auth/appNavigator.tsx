// navigation/AppNavigator.tsx
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from '../navigation/MainNavigator';
import { useState } from 'react';


export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // TEMP: Hardcoded for now

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator /> : <AuthNavigator setIsLoggedIn={setIsLoggedIn} />}
    </NavigationContainer>
  );
}
