import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ConnectZoneScreen from '../screens/ConnectZone/ConnectZoneScreen';
import SectionScreen from '../screens/ConnectZone/SectionScreen'; 
import GroupChat from '../screens/ConnectZone/GroupChat';
import { RootStackParamList } from '../types/types';

const Stack = createNativeStackNavigator<RootStackParamList>();


const ConnectZoneStack = () => {
  return (
    <Stack.Navigator>
  <Stack.Screen 
    name="ConnectZone" 
    component={ConnectZoneScreen} 
    options={{ title: '🤝Connect Zone🤝' }} 
  />
  <Stack.Screen 
    name="SectionScreen"
    component={SectionScreen}
    options={{ title: 'Sections' }}
  />
  <Stack.Screen 
    name="GroupChat" 
    component={GroupChat} 
    options={{ title: 'GroupChat' }}
  />
</Stack.Navigator>

  );
};

export default ConnectZoneStack;
