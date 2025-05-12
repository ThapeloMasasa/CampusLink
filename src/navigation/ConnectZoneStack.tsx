import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectZoneScreen from '../screens/ConnectZone/ConnectZoneScreen';
import SectionScreen from '../screens/ConnectZone/SectionScreen'; 

const Stack = createNativeStackNavigator();

const ConnectZoneStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ConnectZoneHome" 
        component={ConnectZoneScreen} 
        options={{ title: '🤝Connect Zone🤝' }} 
      />
      <Stack.Screen 
        name="Section" 
        component={SectionScreen} 
        options={{ title: 'Section' }}
      />
    </Stack.Navigator>
  );
};

export default ConnectZoneStack;
