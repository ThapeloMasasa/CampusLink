import React from 'react'
import { View , StyleSheet} from 'react-native';
import YapsScreen from './YapsScreen';
import YapsLeaderBoard from './YapsLeaderBoard';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';

 const Tab = createMaterialTopTabNavigator();
const YappingScreen = () => {
  return (
    < SafeAreaView style={styles.safeArea}>
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
      tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
    }} >
      <Tab.Screen name="Yaps" component={YapsScreen} />
      <Tab.Screen name="Leaderboard" component={YapsLeaderBoard} />
    </Tab.Navigator>
    </SafeAreaView>
  )
}
export default YappingScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // or whatever background you want
  },
});