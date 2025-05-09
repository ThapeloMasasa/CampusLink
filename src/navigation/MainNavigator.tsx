import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native'; 
import HomeScreen from '../screens/Home/HomeScreen';
import YappingScreen from '../screens/Yapping/YappingScreen';
import ConnectZoneScreen from '../screens/ConnectZone/ConnectZoneScreen';
import FlipSpaceScreen from '../screens/FlipSpace/FlipSpaceScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import { AuthProps } from '../types/types';

const Tab = createBottomTabNavigator();

export default function MainNavigator({ setIsLoggedIn }: AuthProps) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen 
        name="Home"
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/updates.png')} 
              style={{ width: focused? 40: 25, height:  focused? 42: 25, resizeMode: 'contain',   borderRadius: 17 }}
            />
          )
        }}
      >
        {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>

      <Tab.Screen 
        name="Yapping"
        component={YappingScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/yapping.png')} 
              style={{width: focused? 40: 25, height:  focused? 42: 25, resizeMode: 'contain',   borderRadius: 17, }}
            />
          )
        }}
      />

      <Tab.Screen 
        name="Connect"
        component={ConnectZoneScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/network.png')} 
              style={{ width: focused? 40: 25, height:  focused? 42: 25, resizeMode: 'contain' ,   borderRadius: 17,}}
            />
          )
        }}
      />

      <Tab.Screen 
        name="FlipSpace"
        component={FlipSpaceScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/Market.png')} 
              style={{ width: focused? 40: 25, height:  focused? 42: 25, resizeMode: 'contain',   borderRadius: 17,}}
            />
          )
        }}
      />
      <Tab.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/Profile.png')} 
              style={{ width: focused? 40: 25, height:  focused? 42: 25, resizeMode: 'contain',   borderRadius: 17 }}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}
