import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './LogIn';
import SignUpScreen from './SignUp';
import { AuthProps } from '../types/types';

const Stack = createNativeStackNavigator();

function RootStack({ setIsLoggedIn }: AuthProps) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LogIn">
        {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(props) => <SignUpScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// AuthNavigator needs to also have typed props
const AuthNavigator = ({ setIsLoggedIn }: AuthProps) => {
  return (
    <RootStack setIsLoggedIn={setIsLoggedIn} />
  );
};

export default AuthNavigator;
