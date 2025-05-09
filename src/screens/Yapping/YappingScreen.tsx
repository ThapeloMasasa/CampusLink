import React from 'react'
import { View } from 'react-native';
import YapsScreen from './YapsScreen';
import YapsLeaderBoard from './YapsLeaderBoard';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

 const Tab = createMaterialTopTabNavigator();
const YappingScreen = () => {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
    }} >
      <Tab.Screen name="Yaps" component={YapsScreen} />
      <Tab.Screen name="Leaderboard" component={YapsLeaderBoard} />
    </Tab.Navigator>
  )
}
export default YappingScreen