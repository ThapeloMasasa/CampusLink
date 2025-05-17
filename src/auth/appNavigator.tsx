
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from '../navigation/MainNavigator';
import { useState } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';


export default function AppNavigator() { 
  const { state } = useGlobalContext();

  return (
    <NavigationContainer>
      {state.isLoggedIn ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
