// auth/AuthNavigatorInitial.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStartedScreen from '../screens/Home/GetStartedScreen';
import LoginScreen from './LogIn';
import SignUpScreen from './SignUp';

const Stack = createNativeStackNavigator();

export default function AuthNavigatorInitial() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="LogIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
