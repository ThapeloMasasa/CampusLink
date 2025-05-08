
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from '../navigation/MainNavigator';
import { useState } from 'react';


export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigator setIsLoggedIn = {setIsLoggedIn}/> : <AuthNavigator setIsLoggedIn={setIsLoggedIn} />}
    </NavigationContainer>
  );
}
