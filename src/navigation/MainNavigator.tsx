import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import YappingScreen from '../screens/Yapping/YappingScreen';
import ConnectZoneScreen from '../screens/ConnectZone/ConnectZoneScreen';
import FlipSpaceScreen from '../screens/FlipSpace/FlipSpaceScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';


const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Yapping" component={YappingScreen} />
        <Tab.Screen name="Connect" component={ConnectZoneScreen} />
        <Tab.Screen name="FlipSpace" component={FlipSpaceScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
