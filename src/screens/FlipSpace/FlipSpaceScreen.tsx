import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import LocalDealsScreen from './LocalDealsScreen';
import StudentDealsScreen from './StudentDealsScreen';
import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { RouteProp } from '@react-navigation/native';
import { FlipSpaceTabParamList } from '../../types/types';

const Tab = createMaterialTopTabNavigator<FlipSpaceTabParamList>();

const FlipSpaceScreen: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<FlipSpaceTabParamList, keyof FlipSpaceTabParamList>;
      }): MaterialTopTabNavigationOptions => ({
        tabBarIcon: ({ color }) => {
          return route.name === 'Students' ? (
            <Ionicons name="people" size={22} color={color} />
          ) : (
            <Ionicons name="storefront" size={22} color={color} />
          );
        },
        tabBarLabel:
          route.name === 'Students' ? 'Students Selling' : 'Local Businesses',
        tabBarShowIcon: true,
        tabBarIndicatorStyle: { backgroundColor: '#000' },
        tabBarStyle: { backgroundColor: '#fff' },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
      })}
    >
      <Tab.Screen name="Students" component={StudentDealsScreen} />
      <Tab.Screen name="Local" component={LocalDealsScreen} />
    </Tab.Navigator>
  );
};

export default FlipSpaceScreen;
