import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native'; 
import HomeScreen from '../screens/Home/HomeScreen';
import YappingScreen from '../screens/Yapping/YappingScreen';
import FlipSpaceScreen from '../screens/FlipSpace/FlipSpaceScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import ViewProfile from '../screens/Profile/ViewProfile'; 
import ConnectZoneStack from './ConnectZoneStack';
import { AuthProps, MainStackParamList } from '../types/types';
import DirectMessageScreen from '../screens/Profile/DirectMessageScreen';

const Tab = createBottomTabNavigator();
const  Stack = createNativeStackNavigator<MainStackParamList>();

function BottomTabs({ setIsLoggedIn }: AuthProps) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen 
        name="Updates"
        options={{
          title: "Updates", 
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/updates.png')} 
              style={{ width: focused ? 40 : 25, height: focused ? 42 : 25, resizeMode: 'contain', borderRadius: 17 }}
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
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/yapping.png')} 
              style={{width: focused ? 40 : 25, height: focused ? 42 : 25, resizeMode: 'contain', borderRadius: 17 }}
            />
          )
        }}
      />

      <Tab.Screen 
        name="Connect"
        component={ConnectZoneStack}
        options={{
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <Image 
              source={require('../../assets/network.png')} 
              style={{width: focused ? 40 : 25, height: focused ? 42 : 25, resizeMode: 'contain', borderRadius: 17 }}
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
              style={{width: focused ? 40 : 25, height: focused ? 42 : 25, resizeMode: 'contain', borderRadius: 17 }}
            />
          )
        }}
      />

      <Tab.Screen
       name="Profile"
       options={{
         tabBarIcon: ({focused}) => (
           <Image 
             source={require('../../assets/Profile.png')} 
             style={{width: focused ? 40 : 25, height: focused ? 42 : 25, resizeMode: 'contain', borderRadius: 17 }}
           />
         )
       }}
      >
      {(props) => <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function MainNavigator({ setIsLoggedIn }: AuthProps) {
  return (
    <Stack.Navigator>
      {/* Bottom Tabs */}
      <Stack.Screen name="MainTabs" options={{ headerShown: false }}>
        {() => <BottomTabs setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>

      {/* User Profile screen */}
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{ title: 'User Profile' }}
      />
      {/* Direct Message screen */}
      <Stack.Screen name="DirectMessageScreen" component={DirectMessageScreen} />
    </Stack.Navigator>
  );
}
