import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home/HomeScreen';
import YappingScreen from '../screens/Yapping/YappingScreen';
import ConnectZoneScreen from '../screens/ConnectZone/ConnectZoneScreen';
import FlipSpaceScreen from '../screens/FlipSpace/FlipSpaceScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { AuthProps } from '../types/types';

const Tab = createBottomTabNavigator();

export default function MainNavigator({setIsLoggedIn}: AuthProps) {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        <Tab.Screen name="Yapping" component={YappingScreen} />
        <Tab.Screen name="Connect" component={ConnectZoneScreen} />
        <Tab.Screen name="FlipSpace" component={FlipSpaceScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
