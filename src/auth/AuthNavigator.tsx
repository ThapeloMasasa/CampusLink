import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LogIn';
import SignUpScreen from './SignUp';




const Stack = createNativeStackNavigator();

function RootStack() {
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LogIn">
        {(props) => <LoginScreen />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(props) => <SignUpScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// AuthNavigator needs to also have typed props
const AuthNavigator = () => {
  return (
    <RootStack />
  );
};

export default AuthNavigator;
