import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import YapsScreen from '../screens/Yapping/YapsScreen';         
import YapsLeaderboard from '../screens/Yapping/YapsLeaderBoard'; 

const Tab = createMaterialTopTabNavigator();

export default function YapTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
        tabBarIndicatorStyle: { backgroundColor: '#007AFF', height: 3 },
      }}
    >
      <Tab.Screen name="Yaps" component={YapsScreen} />
      <Tab.Screen name="Leaderboard" component={YapsLeaderboard} />
    </Tab.Navigator>
  );
}
